/**
 * Generates /public/og-image.png — the 1200×630 social share card used
 * by WhatsApp / Facebook / X link previews: the official UKF logo
 * (/public/logo.png) centered on a clean white background.
 *
 * Run with:  npm run og
 * (Uses only Node built-ins — decodes logo.png, composites it onto the
 * card and re-encodes the PNG; no dependencies required.)
 */
import { deflateSync, inflateSync } from "node:zlib"
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, "../public")
mkdirSync(outDir, { recursive: true })

const W = 1200
const H = 630
// Sized so WhatsApp's tighter link-preview crops never clip the logo.
const LOGO_WIDTH = 860

/* ---------- CRC32 ---------- */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const typeBuf = Buffer.from(type, "ascii")
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
  return Buffer.concat([len, typeBuf, data, crc])
}

/* ---------- decode logo.png → RGBA pixels (8-bit RGB/RGBA) ---------- */
function decodePng(buf) {
  let off = 8
  let width = 0
  let height = 0
  let colorType = 0
  const idat = []
  while (off < buf.length) {
    const len = buf.readUInt32BE(off)
    const type = buf.toString("ascii", off + 4, off + 8)
    const data = buf.subarray(off + 8, off + 8 + len)
    if (type === "IHDR") {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      if (data[8] !== 8 || data[12] !== 0) {
        throw new Error(`logo.png: unsupported bit depth (${data[8]}) or interlace (${data[12]})`)
      }
      colorType = data[9]
      if (colorType !== 6 && colorType !== 2) throw new Error(`logo.png: unsupported color type ${colorType}`)
    } else if (type === "IDAT") {
      idat.push(data)
    } else if (type === "IEND") {
      break
    }
    off += 12 + len
  }

  const channels = colorType === 6 ? 4 : 3
  const stride = width * channels
  const raw = inflateSync(Buffer.concat(idat))
  const pixels = Buffer.alloc(height * stride)
  const paeth = (a, b, c) => {
    const p = a + b - c
    const pa = Math.abs(p - a)
    const pb = Math.abs(p - b)
    const pc = Math.abs(p - c)
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c
  }
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)]
    const row = y * stride
    const src = row + y + 1
    for (let x = 0; x < stride; x++) {
      const v = raw[src + x]
      const left = x >= channels ? pixels[row + x - channels] : 0
      const up = y > 0 ? pixels[row - stride + x] : 0
      const upLeft = y > 0 && x >= channels ? pixels[row - stride + x - channels] : 0
      let out
      if (filter === 0) out = v
      else if (filter === 1) out = v + left
      else if (filter === 2) out = v + up
      else if (filter === 3) out = v + ((left + up) >> 1)
      else out = v + paeth(left, up, upLeft)
      pixels[row + x] = out & 0xff
    }
  }

  if (colorType === 6) return { width, height, pixels }
  const rgba = Buffer.alloc(width * height * 4)
  for (let i = 0, n = width * height; i < n; i++) {
    rgba[i * 4] = pixels[i * 3]
    rgba[i * 4 + 1] = pixels[i * 3 + 1]
    rgba[i * 4 + 2] = pixels[i * 3 + 2]
    rgba[i * 4 + 3] = 255
  }
  return { width, height, pixels: rgba }
}

/* ---------- bilinear resample (RGBA) ---------- */
function resampleBilinear(src, sw, sh, dw, dh) {
  const out = Buffer.alloc(dw * dh * 4)
  for (let dy = 0; dy < dh; dy++) {
    const fy = Math.min(sh - 1, Math.max(0, (dy + 0.5) * (sh / dh) - 0.5))
    const y0 = Math.floor(fy)
    const y1 = Math.min(sh - 1, y0 + 1)
    const wy = fy - y0
    for (let dx = 0; dx < dw; dx++) {
      const fx = Math.min(sw - 1, Math.max(0, (dx + 0.5) * (sw / dw) - 0.5))
      const x0 = Math.floor(fx)
      const x1 = Math.min(sw - 1, x0 + 1)
      const wx = fx - x0
      for (let c = 0; c < 4; c++) {
        const p00 = src[(y0 * sw + x0) * 4 + c]
        const p01 = src[(y0 * sw + x1) * 4 + c]
        const p10 = src[(y1 * sw + x0) * 4 + c]
        const p11 = src[(y1 * sw + x1) * 4 + c]
        const top = p00 + (p01 - p00) * wx
        const bottom = p10 + (p11 - p10) * wx
        out[(dy * dw + dx) * 4 + c] = Math.round(top + (bottom - top) * wy)
      }
    }
  }
  return out
}

/* ---------- composite: UKF logo centered on a white card ---------- */
const logo = decodePng(readFileSync(resolve(outDir, "logo.png")))
const logoW = LOGO_WIDTH
const logoH = Math.round((logo.height / logo.width) * logoW)
const scaled = resampleBilinear(logo.pixels, logo.width, logo.height, logoW, logoH)
const offX = Math.round((W - logoW) / 2)
const offY = Math.round((H - logoH) / 2)

const px = Buffer.alloc(H * (1 + W * 4))
let o = 0
for (let y = 0; y < H; y++) {
  px[o++] = 0 // PNG filter: none
  for (let x = 0; x < W; x++) {
    let r = 255
    let g = 255
    let b = 255
    const lx = x - offX
    const ly = y - offY
    if (lx >= 0 && lx < logoW && ly >= 0 && ly < logoH) {
      const li = (ly * logoW + lx) * 4
      const a = scaled[li + 3] / 255
      if (a > 0) {
        r = Math.round(scaled[li] * a + r * (1 - a))
        g = Math.round(scaled[li + 1] * a + g * (1 - a))
        b = Math.round(scaled[li + 2] * a + b * (1 - a))
      }
    }
    px[o++] = r
    px[o++] = g
    px[o++] = b
    px[o++] = 255
  }
}

/* ---------- PNG assembly ---------- */
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(W, 0)
ihdr.writeUInt32BE(H, 4)
ihdr[8] = 8 // bit depth
ihdr[9] = 6 // color type: RGBA
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(px, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
])

const outPath = resolve(outDir, "og-image.png")
writeFileSync(outPath, png)
console.log(`✓ og-image.png written (${W}×${H}, UKF logo ${logoW}×${logoH}, ${(png.length / 1024).toFixed(1)} kB)`)
