"""Remove paper background from process flowchart; keep diagram + white labels."""

from PIL import Image

src = r"public/images/process-img.jpg"
img = Image.open(src).convert("RGBA")
w, h = img.size
px = img.load()


def chroma(r, g, b):
    return max(r, g, b) - min(r, g, b)


def is_paper(r, g, b):
    return chroma(r, g, b) <= 28 and min(r, g, b) >= 210


def is_ink_color(r, g, b):
    """Green / blue circles (saturated) or near-black lines and badges."""
    c = chroma(r, g, b)
    mx = max(r, g, b)
    mn = min(r, g, b)
    if mx <= 70 and c <= 25:
        return True  # black
    if c >= 45 and (g > r + 20 or b > r + 20):
        return True  # green or cyan/blue
    if c >= 40 and mn < 200:
        return True
    return False


# Pass 1: classify
keep = [[True] * w for _ in range(h)]
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if is_ink_color(r, g, b):
            keep[y][x] = True
        elif is_paper(r, g, b):
            # Keep only if this white sits on/inside colored ink (label text)
            colored = 0
            for dy in range(-3, 4):
                for dx in range(-3, 4):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h:
                        rr, gg, bb, _ = px[nx, ny]
                        if is_ink_color(rr, gg, bb) and chroma(rr, gg, bb) >= 40:
                            colored += 1
            # Text glyphs are tightly surrounded by circle colour
            keep[y][x] = colored >= 8
        else:
            # Antialias / mixed edge — keep
            keep[y][x] = True

# Pass 2: write alpha
cleared = 0
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if keep[y][x]:
            continue
        px[x, y] = (255, 255, 255, 0)
        cleared += 1

# Pass 3: soft fringe — paper-like pixels next to transparency
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a == 0 or not is_paper(r, g, b):
            continue
        # If still paper-like and touching clear, and not kept as text
        if keep[y][x]:
            continue
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0:
                px[x, y] = (255, 255, 255, 0)
                cleared += 1
                break

out = r"public/images/process-img.png"
img.save(out, "PNG")
print(f"saved {out} {w}x{h} cleared={cleared}")
