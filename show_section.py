f = 'lib/subjects/react.subject.ts'
fh = open(f, 'r', encoding='utf-8')
text = fh.read()
fh.close()

start = text.find('      id: "capstone3",')
end = text.find('      id: "batch8"')
section = text[start:end]
print(section)