import os, re

admin_dir = "src/app/admin"
admin_pages = []

for root, dirs, files in os.walk(admin_dir):
    for fn in files:
        if fn == "page.tsx":
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, admin_dir)
            with open(full, "r") as fp:
                content = fp.read()
            api_calls = re.findall(r"fetch\([\"\x27\x60](/api/[^\"\x27\x60\?]+)", content)
            methods = re.findall(r"method:\s*[\"\x27\x60]([A-Z]+)[\"\x27\x60]", content)
            has_modal = "modal" in content.lower() or "drawer" in content.lower()
            admin_pages.append((rel, len(content.splitlines()), set(api_calls), set(methods), has_modal))

print(f"Total Admin Pages: {len(admin_pages)}\n")
for rel, lines, apis, methods, modal in sorted(admin_pages, key=lambda x: x[0]):
    print(f"  {rel:25s} | {lines:4d} lines | APIs: {list(apis)} | Methods: {list(methods)} | Modals: {modal}")
