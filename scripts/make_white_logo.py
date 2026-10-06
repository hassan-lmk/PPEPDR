from PIL import Image

src = r"public/images/logo.png"
img = Image.open(src).convert("RGBA")
px = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        # Paper / near-white → transparent
        if min(r, g, b) >= 230 and max(r, g, b) - min(r, g, b) <= 30:
            px[x, y] = (255, 255, 255, 0)
            continue
        # Green / dark ink → white, preserve soft edges via luminance
        luminance = (r + g + b) / 3
        # Stronger green pixels become fully white
        strength = 1.0 - min(1.0, luminance / 255.0)
        # Prefer colored (logo) pixels
        chroma = max(r, g, b) - min(r, g, b)
        if chroma > 20 or luminance < 200:
            alpha = max(a, min(255, int(80 + chroma * 2.2)))
            px[x, y] = (255, 255, 255, alpha)
        else:
            px[x, y] = (255, 255, 255, 0)

out = r"public/images/logo-white.png"
img.save(out, "PNG")
print(f"saved {out}")
