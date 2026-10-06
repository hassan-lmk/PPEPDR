"""Remove solid white/light background from block-award-process.png via flood fill."""

from collections import deque
from PIL import Image

src = r"public/images/block-award-process.png"
img = Image.open(src).convert("RGBA")
w, h = img.size
px = img.load()


def is_bg(r, g, b, a=255):
    if a == 0:
        return True
    mx, mn = max(r, g, b), min(r, g, b)
    # Solid white / very light grey paper only (not frosted tinted cards)
    if mn >= 248 and mx - mn <= 8:
        return True
    if mn >= 242 and mx - mn <= 5:
        return True
    return False


visited = bytearray(w * h)
q = deque()


def idx(x, y):
    return y * w + x


for x in range(w):
    for y in (0, 1, h - 2, h - 1):
        if is_bg(*px[x, y]) and not visited[idx(x, y)]:
            q.append((x, y))
            visited[idx(x, y)] = 1
for y in range(h):
    for x in (0, 1, w - 2, w - 1):
        if not visited[idx(x, y)] and is_bg(*px[x, y]):
            q.append((x, y))
            visited[idx(x, y)] = 1

cleared = 0
while q:
    x, y = q.popleft()
    r, g, b, a = px[x, y]
    if is_bg(r, g, b, a):
        px[x, y] = (255, 255, 255, 0)
        cleared += 1
    for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
        if 0 <= nx < w and 0 <= ny < h and not visited[idx(nx, ny)]:
            if is_bg(*px[nx, ny]):
                visited[idx(nx, ny)] = 1
                q.append((nx, ny))

# Soft fringe: near-white touching transparency
for _ in range(2):
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            mx, mn = max(r, g, b), min(r, g, b)
            if mn < 235 or mx - mn > 12:
                continue
            for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0:
                    # Fade AA fringe
                    strength = (mn - 230) / 25.0
                    if strength > 0.5:
                        px[x, y] = (255, 255, 255, 0)
                        cleared += 1
                    else:
                        px[x, y] = (r, g, b, max(0, int(a * (1 - strength * 0.8))))
                    break

out = r"public/images/block-award-process.png"
img.save(out, "PNG")
trans = sum(1 for y in range(h) for x in range(w) if px[x, y][3] == 0)
print(f"saved {out} {w}x{h} cleared~={cleared} transparent={trans} ({100 * trans / (w * h):.1f}%)")
print("corner", px[0, 0], "mid", px[w // 2, 10])
