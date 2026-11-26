#!/usr/bin/env python3
"""Génère src/data/image-meta.ts : dimensions + miniature floue (base64) de chaque photo de public/images.
Usage : python3 scripts/generate-image-meta.py  (à relancer après ajout d'une image)"""
import base64, io, os, glob
from PIL import Image, ImageFilter
root = os.path.join(os.path.dirname(__file__), '..')
entries = []
for path in sorted(glob.glob(os.path.join(root, 'public/images/**/*.jpg'), recursive=True)):
    rel = '/' + os.path.relpath(path, os.path.join(root, 'public')).replace(os.sep, '/')
    im = Image.open(path).convert('RGB')
    w, h = im.size
    t = im.copy(); t.thumbnail((16, 16)); t = t.filter(ImageFilter.GaussianBlur(0.6))
    buf = io.BytesIO(); t.save(buf, 'JPEG', quality=50)
    entries.append((rel, w, h, 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()))
out = ['// Fichier généré par scripts/generate-image-meta.py — ne pas modifier à la main.',
       'export type ImageMeta = { width: number; height: number; blurDataURL: string };',
       'export const imageMeta: Record<string, ImageMeta> = {']
for rel, w, h, b in entries:
    out.append(f'  "{rel}": {{ width: {w}, height: {h}, blurDataURL: "{b}" }},')
out.append('};')
open(os.path.join(root, 'src/data/image-meta.ts'), 'w').write('\n'.join(out) + '\n')
print(len(entries), 'images')
