f = 'lib/subjects/react.subject.ts'
fh = open(f, 'r', encoding='utf-8')
text = fh.read()
fh.close()

old = '''      id: "capstone3",
      title: "Capstone 3 - Team Task Dashboard (Kanban + Redux)",
      lectures: [
        {
          id: "capstone3-flowchart-excalidraw",
          title: "Task Flow Dashboard (Excalidraw)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/task flow dashboard wireframe.excalidraw",
          isComponent: true,
        },
        {
          id: "capstone3-palette",
          title: "Task Dashboard Palette (HTML)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Task Dashboard Palette.html",
        },
        {
          id: "tt-t.1",
          title: "T.1 Setup and Project Structure",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/T.1 Setup and Project Structure.md",
        },
        {
          id: "tt-srs",
          title: "SRS - Software Requirements Specification",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Team_Task_Dashboard_SRS.md",
        },
        {
          id: "tt-datamodel",
          title: "Data Model (Design Phase)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Team Task Dashboard Data Model (Design Phase).md",
        },
        {
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
          id: "tt-uidesign",
          title: "UI Design Guide (Wireframes and Screens)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Team Task Dashboard UI Design Guide (Wireframes and Screens).md",
        },
        {
          id: "tt-tickets-v2",
          title: "Tickets v2 (Vertical Slices)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Team Task Dashboard Tickets v2 (Vertical Slices).md",
        },
      ],
    },'''

new = '''      id: "capstone3",
      title: "Capstone 3 - Team Task Dashboard (Kanban + Redux)",
      lectures: [
        {
          id: "tt-t.1",
          title: "T.1 Setup and Project Structure",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/T.1 Setup and Project Structure.md",
        },
        {
          id: "tt-srs",
          title: "SRS - Software Requirements Specification",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Team_Task_Dashboard_SRS.md",
        },
        {
          id: "tt-datamodel",
          title: "Data Model (Design Phase)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Team Task Dashboard Data Model (Design Phase).md",
        },
        {
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
          id: "tt-uidesign",
          title: "UI Design Guide (Wireframes and Screens)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Team Task Dashboard UI Design Guide (Wireframes and Screens).md",
        },
        {
          id: "capstone3-flowchart-excalidraw",
          title: "Task Flow Dashboard (Excalidraw)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/task flow dashboard wireframe.excalidraw",
          isComponent: true,
        },
        {
          id: "capstone3-palette",
          title: "Task Dashboard Palette (HTML)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Task Dashboard Palette.html",
        },
        {
          id: "tt-tickets-v2",
          title: "Tickets v2 (Vertical Slices)",
          path: "docs/coding/React JS/Capstone 3 - Team Task Dashboard/Team Task Dashboard Tickets v2 (Vertical Slices).md",
        },
      ],
    },'''

assert old in text, 'old not found'
text = text.replace(old, new, 1)
fh = open(f, 'w', encoding='utf-8')
fh.write(text)
fh.close()
print('Reordered capstone3 flow')