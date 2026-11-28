f = 'lib/subjects/react.subject.ts'
with open(f, 'r', encoding='utf-8') as fh:
    text = fh.read()

# Add Design Basics to Capstone 3 (between State Design and UI Design Guide)
old1 = '''        {
          id: "tt-statedesign",
          title: "State Design",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Team Task Dashboard State Design.md",
        },
        {
          id: "tt-uidesign",'''

new1 = '''        {
          id: "tt-statedesign",
          title: "State Design",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Team Task Dashboard State Design.md",
        },
        {
          id: "tt-designbasics",
          title: "Design Basics for Developers (Friendly Guide)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Design Basics for Developers A Friendly Guide (Team Task Dashboard).md",
        },
        {
          id: "tt-uidesign",'''

assert old1 in text, 'old1 not found'
text = text.replace(old1, new1, 1)

# Add Design Basics to Batch 8 (after 8.4 Architecture and Tradeoffs, before 8.5 Case Study)
old2 = '''        {
          id: "bu-8.4",
          title: "8.4 Architecture and Tradeoffs",
          path: "docs/coding/React JS/Batch 8 - Project Understanding/8.4 Architecture and Tradeoffs.md",
        },
        {
          id: "bu-8.5",'''

new2 = '''        {
          id: "bu-8.4",
          title: "8.4 Architecture and Tradeoffs",
          path: "docs/coding/React JS/Batch 8 - Project Understanding/8.4 Architecture and Tradeoffs.md",
        },
        {
          id: "bu-8.4b",
          title: "8.4b Design Basics for Developers (Friendly Guide)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Design Basics for Developers A Friendly Guide (Team Task Dashboard).md",
        },
        {
          id: "bu-8.5",'''

assert old2 in text, 'old2 not found'
text = text.replace(old2, new2, 1)

with open(f, 'w', encoding='utf-8') as fh:
    fh.write(text)
print('Added Design Basics to both Capstone 3 and Batch 8')