f = 'lib/subjects/react.subject.ts'
with open(f, 'r', encoding='utf-8') as fh:
    text = fh.read()

old = '      id: "capstone3",\n      title: "Capstone 3 - Team Task Dashboard (Kanban + Redux)",\n      lectures: [\n        {\n          id: "tt-t.1",'

new = '      id: "capstone3",\n      title: "Capstone 3 - Team Task Dashboard (Kanban + Redux)",\n      lectures: [\n        {\n          id: "capstone3-flowchart-excalidraw",\n          title: "Task Flow Dashboard (Excalidraw)",\n          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/task flow dashboard wireframe.excalidraw",\n          isComponent: true,\n        },\n        {\n          id: "tt-t.1",'

assert old in text, 'old not found'
text = text.replace(old, new, 1)
with open(f, 'w', encoding='utf-8') as fh:
    fh.write(text)
print('Added excalidraw to capstone3')