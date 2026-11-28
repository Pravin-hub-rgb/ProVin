f = 'lib/subjects/react.subject.ts'
with open(f, 'r', encoding='utf-8') as fh:
    text = fh.read()

old = '''        {
          id: "capstone3-flowchart-excalidraw",
          title: "Task Flow Dashboard (Excalidraw)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/task flow dashboard wireframe.excalidraw",
          isComponent: true,
        },'''

new = '''        {
          id: "capstone3-flowchart-excalidraw",
          title: "Task Flow Dashboard (Excalidraw)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/task flow dashboard wireframe.excalidraw",
          isComponent: true,
        },
        {
          id: "capstone3-palette",
          title: "Task Dashboard Palette (HTML)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Task Dashboard Palette.html",
        },'''

assert old in text, 'old not found'
text = text.replace(old, new, 1)
with open(f, 'w', encoding='utf-8') as fh:
    fh.write(text)
print('Added palette HTML to capstone3')