/**
 * Generates /public/og-image.png — a 1200×630 branded green-gradient
 * social share card for Umer Khan Foundation.
 *
 * Run with:  npm run og
 * (Uses only Node built-ins — no dependencies required.)
 *
 * Replace with a designed share image or real foundation photography
 * whenever available; keep the same file name & dimensions.
 */
import { deflateSync } from "node:zlib"
import { writeFileSync, mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, "../public")
mkdirSync(outDir, { recursive: true })

const W = 1200
const H = 630

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

/* ---------- painting ---------- */
const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (v) => Math.max(0, Math.min(1, v))

const top = [7, 38, 27] // #07261B
const bottom = [13, 84, 53] // #0D5435
const glowA = [23, 146, 91] // brand-500
const glowB = [85, 186, 138] // brand-400

const glows = [
  { x: 0.82 * W, y: 0.12 * H, r: 460, color: glowA, alpha: 0.5 },
  { x: 0.1 * W, y: 0.95 * H, r: 420, color: glowB, alpha: 0.22 },
]
const rings = [
  { x: 0.82 * W, y: 0.12 * H, r: 300, w: 14 },
  { x: 0.82 * W, y: 0.12 * H, r: 380, w: 12 },
]

const px = Buffer.alloc(H * (1 + W * 4))
let o = 0
for (let y = 0; y < H; y++) {
  px[o++] = 0 // PNG filter: none
  for (let x = 0; x < W; x++) {
    const t = y / H
    let r = lerp(top[0], bottom[0], t)
    let g = lerp(top[1], bottom[1], t)
    let b = lerp(top[2], bottom[2], t)

    for (const s of glows) {
      const dx = x - s.x
      const dy = y - s.y
      const d = Math.sqrt(dx * dx + dy * dy)
      let f = clamp01(1 - d / s.r)
      f = f * f * s.alpha
      r = lerp(r, s.color[0], f)
      g = lerp(g, s.color[1], f)
      b = lerp(b, s.color[2], f)
    }
    for (const ring of rings) {
      const dx = x - ring.x
      const dy = y - ring.y
      const d = Math.sqrt(dx * dx + dy * dy)
      const band = Math.abs(d - ring.r)
      if (band < ring.w) {
        const f = clamp01(1 - band / ring.w) * 0.3
        r = lerp(r, 255, f)
        g = lerp(g, 255, f)
        b = lerp(b, 255, f)
      }
    }
    // vignette
    const vx = (x / W - 0.5) * 2
    const vy = (y / H - 0.5) * 2
    const v = 1 - 0.22 * clamp01((vx * vx + vy * vy) / 2.4)
    r *= v
    g *= v
    b *= v

    px[o++] = Math.round(r)
    px[o++] = Math.round(g)
    px[o++] = Math.round(b)
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
console.log(`✓ og-image.png written (${W}×${H}, ${(png.length / 1024).toFixed(1)} kB)`)
