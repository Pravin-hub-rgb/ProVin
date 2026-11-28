f = 'lib/subjects/react.subject.ts'
with open(f, 'r', encoding='utf-8') as fh:
    text = fh.read()

old = '''        {
          id: "tt-tickets",
          title: "Tickets (Planning Phase)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Team Task Dashboard Tickets (Planning Phase).md",
        },
        {
          id: "tt-tickets-v2",'''

new = '''        {
          id: "tt-tickets-v2",'''

assert old in text, 'old not found'
text = text.replace(old, new, 1)
with open(f, 'w', encoding='utf-8') as fh:
    fh.write(text)
print('Removed v1 tickets entry')