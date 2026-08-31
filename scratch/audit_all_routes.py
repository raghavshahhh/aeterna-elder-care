import os

app_dir = "src/app"
pages = []

for root, dirs, files in os.walk(app_dir):
    for fn in files:
        if fn == "page.tsx":
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, app_dir)
            route = "/" if rel == "page.tsx" else "/" + os.path.dirname(rel)
            with open(full, "r", encoding="utf-8") as fp:
                content = fp.read()
            lines = len(content.splitlines())
            imports_3d = "3d" in content.lower() or "viewer" in content.lower()
            imports_modal = "modal" in content.lower() or "usemodal" in content.lower()
            has_fetch = "fetch(" in content
            pages.append((route, rel, lines, imports_3d, imports_modal, has_fetch))

print(f"Total Routes: {len(pages)}\n")
for r, rel, lines, has_3d, has_modal, has_fetch in sorted(pages, key=lambda x: x[0]):
    print(f"  {r:32s} | {lines:4d} lines | 3D: {str(has_3d):5s} | Modal: {str(has_modal):5s} | Fetch: {str(has_fetch):5s}")
