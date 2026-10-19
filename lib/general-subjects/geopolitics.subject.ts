import type { Subject } from "../general-data";

const BASE = "docs/general/geopolitics";

export const geopoliticsSubject: Subject = {
  id: "geopolitics",
  title: "Geopolitics — From Zero to Daily",
  description:
    "An absolute-zero introduction to geopolitics for an Indian reader: maps, countries, borders, the timeline, the great powers, India's own matrix, how to think, and how to stay updated every day.",
  lectures: [
    {
      id: "geo-0.0",
      title: "Course Roadmap",
      path: `${BASE}/00-course-roadmap.md`,
    },
  ],
  phases: [
    {
      id: "geo-phase-0",
      title: "Phase 0 - Zero Foundation",
      openByDefault: true,
      lectures: [
        {
          id: "geo-0.1",
          title: "0.1 The World Map - Seven Continents and Five Oceans",
          path: `${BASE}/Phase 0 - Zero Foundation/0.1 The World Map - Seven Continents and Five Oceans.md`,
        },
        {
          id: "geo-0.2",
          title: "0.2 What Is a Country - Sovereignty, Population, Government and Recognition",
          path: `${BASE}/Phase 0 - Zero Foundation/0.2 What Is a Country - Sovereignty, Population, Government and Recognition.md`,
        },
        {
          id: "geo-0.3",
          title: "0.3 How Borders Are Made - Natural and Artificial Lines",
          path: `${BASE}/Phase 0 - Zero Foundation/0.3 How Borders Are Made - Natural and Artificial Lines.md`,
        },
        {
          id: "geo-0.4",
          title: "0.4 Land, People and Resources - Why Geography Decides Strategy",
          path: `${BASE}/Phase 0 - Zero Foundation/0.4 Land, People and Resources - Why Geography Decides Strategy.md`,
        },
        {
          id: "geo-0.5",
          title: "0.5 Reading a Map - Latitude, Longitude and How Projections Lie",
          path: `${BASE}/Phase 0 - Zero Foundation/0.5 Reading a Map - Latitude, Longitude and How Projections Lie.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-0.5",
          title: "Quiz - Zero Foundation",
          path: `${BASE}/Phase 0 - Zero Foundation/0.5 Quiz - Zero Foundation.md`,
        },
      ],
    },
    {
      id: "geo-phase-1",
      title: "Phase 1 - India's Map and Red Line Borders",
      openByDefault: false,
      lectures: [
        {
          id: "geo-1.1",
          title: "1.1 Where India Sits - Peninsula, Coastline and Shape",
          path: `${BASE}/Phase 1 - India's Map and Red Line Borders/1.1 Where India Sits - Peninsula, Coastline and Shape.md`,
        },
        {
          id: "geo-1.2",
          title: "1.2 Seven Neighbours - Land Borders and Their Lengths",
          path: `${BASE}/Phase 1 - India's Map and Red Line Borders/1.2 Seven Neighbours - Land Borders and Their Lengths.md`,
        },
        {
          id: "geo-1.3",
          title: "1.3 Red Line Borders - Radcliffe, McMahon, Durand, LoC and LAC",
          path: `${BASE}/Phase 1 - India's Map and Red Line Borders/1.3 Red Line Borders - Radcliffe, McMahon, Durand, LoC and LAC.md`,
        },
        {
          id: "geo-1.4",
          title: "1.4 Water Borders - Palk Strait, Sir Creek and the Indo-Pacific",
          path: `${BASE}/Phase 1 - India's Map and Red Line Borders/1.4 Water Borders - Palk Strait, Sir Creek and the Indo-Pacific.md`,
        },
        {
          id: "geo-1.5",
          title: "1.5 The World's Doorways - Hormuz, Malacca, Bab-el-Mandeb and Suez",
          path: `${BASE}/Phase 1 - India's Map and Red Line Borders/1.5 The World's Doorways - Hormuz, Malacca, Bab-el-Mandeb and Suez.md`,
        },
        {
          id: "geo-1.6",
          title: "1.6 Small India - Sikkim, Arunachal and the Chicken's Neck",
          path: `${BASE}/Phase 1 - India's Map and Red Line Borders/1.6 Small India - Sikkim, Arunachal and the Chicken's Neck.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-1.6",
          title: "Quiz - India's Map and Red Line Borders",
          path: `${BASE}/Phase 1 - India's Map and Red Line Borders/1.6 Quiz - India's Map and Red Line Borders.md`,
        },
      ],
    },
    {
      id: "geo-phase-2",
      title: "Phase 2 - The Timeline",
      openByDefault: false,
      lectures: [
        {
          id: "geo-2.0",
          title: "2.0 Phase 2 Introduction - Why Timeline Matters",
          path: `${BASE}/Phase 2 - The Timeline/2.0 Phase 2 Introduction - Why Timeline Matters.md`,
        },
        {
          id: "geo-2.1",
          title: "2.1 Before 1857 - How Britain Came to Rule India",
          path: `${BASE}/Phase 2 - The Timeline/2.1 Before 1857 - How Britain Came to Rule India.md`,
        },
        {
          id: "geo-2.2",
          title: "2.2 1914-1945 - The Two World Wars and the End of Empires",
          path: `${BASE}/Phase 2 - The Timeline/2.2 1914-1945 - The Two World Wars and the End of Empires.md`,
        },
        {
          id: "geo-2.3",
          title: "2.3 1947-1971 - Independence, Partition and India's First Two Wars",
          path: `${BASE}/Phase 2 - The Timeline/2.3 1947-1971 - Independence, Partition and India's First Two Wars.md`,
        },
        {
          id: "geo-2.4",
          title: "2.4 1971-1991 - The Cold War and India",
          path: `${BASE}/Phase 2 - The Timeline/2.4 1971-1991 - The Cold War and India.md`,
        },
        {
          id: "geo-2.5",
          title: "2.5 1991-2010 - Economic Liberalisation and the Rise of China",
          path: `${BASE}/Phase 2 - The Timeline/2.5 1991-2010 - Economic Liberalisation and the Rise of China.md`,
        },
        {
          id: "geo-2.6",
          title: "2.6 2010 to Today - Multipolarity, CPEC and Galwan",
          path: `${BASE}/Phase 2 - The Timeline/2.6 2010 to Today - Multipolarity, CPEC and Galwan.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-2.6",
          title: "Quiz - The Timeline, 1850 to Today",
          path: `${BASE}/Phase 2 - The Timeline/2.6 Quiz - The Timeline, 1850 to Today.md`,
        },
      ],
    },
    {
      id: "geo-phase-3",
      title: "Phase 3 - The World's Game",
      openByDefault: false,
      lectures: [
        {
          id: "geo-3.0",
          title: "3.0 Phase 3 Introduction - The Rules of the Game",
          path: `${BASE}/Phase 3 - The World's Game/3.0 Phase 3 Introduction - The Rules of the Game.md`,
        },
        {
          id: "geo-3.1",
          title: "3.1 Interest, Not Morality - Why Countries Do What They Do",
          path: `${BASE}/Phase 3 - The World's Game/3.1 Interest, Not Morality - Why Countries Do What They Do.md`,
        },
        {
          id: "geo-3.2",
          title: "3.2 What Power Actually Is - Hard, Soft and Economic",
          path: `${BASE}/Phase 3 - The World's Game/3.2 What Power Actually Is - Hard, Soft and Economic.md`,
        },
        {
          id: "geo-3.3",
          title: "3.3 Alliances, Blocs and the Price of Independence",
          path: `${BASE}/Phase 3 - The World's Game/3.3 Alliances, Blocs and the Price of Independence.md`,
        },
        {
          id: "geo-3.4",
          title: "3.4 Sanctions, Tariffs and Trade War",
          path: `${BASE}/Phase 3 - The World's Game/3.4 Sanctions, Tariffs and Trade War.md`,
        },
        {
          id: "geo-3.5",
          title: "3.5 Global South, Multipolarity and Strategic Autonomy",
          path: `${BASE}/Phase 3 - The World's Game/3.5 Global South, Multipolarity and Strategic Autonomy.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-3.5",
          title: "Quiz - The World's Game",
          path: `${BASE}/Phase 3 - The World's Game/3.5 Quiz - The World's Game.md`,
        },
      ],
    },
    {
      id: "geo-phase-4",
      title: "Phase 4 - India's Matrix",
      openByDefault: false,
      lectures: [
        {
          id: "geo-4.0",
          title: "4.0 Phase 4 Introduction - India's Matrix",
          path: `${BASE}/Phase 4 - India's Matrix/4.0 Phase 4 Introduction - India's Matrix.md`,
        },
        {
          id: "geo-4.1",
          title: "4.1 India and China - The Long Border",
          path: `${BASE}/Phase 4 - India's Matrix/4.1 India and China - The Long Border.md`,
        },
        {
          id: "geo-4.2",
          title: "4.2 India and Pakistan - Wars, Water and the Question of Kashmir",
          path: `${BASE}/Phase 4 - India's Matrix/4.2 India and Pakistan - Wars, Water and the Question of Kashmir.md`,
        },
        {
          id: "geo-4.3",
          title: "4.3 The Neighbourhood - Bangladesh to the Maldives",
          path: `${BASE}/Phase 4 - India's Matrix/4.3 The Neighbourhood - Bangladesh to the Maldives.md`,
        },
        {
          id: "geo-4.4",
          title: "4.4 The United States, Russia and the West",
          path: `${BASE}/Phase 4 - India's Matrix/4.4 The United States, Russia and the West.md`,
        },
        {
          id: "geo-4.5",
          title: "4.5 The Indian Ocean - String of Pearls and Necklace of Diamonds",
          path: `${BASE}/Phase 4 - India's Matrix/4.5 The Indian Ocean - String of Pearls and Necklace of Diamonds.md`,
        },
        {
          id: "geo-4.6",
          title: "4.6 India's Internal Politics and Its Foreign Policy",
          path: `${BASE}/Phase 4 - India's Matrix/4.6 India's Internal Politics and Its Foreign Policy.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-4.6",
          title: "Quiz - India's Matrix",
          path: `${BASE}/Phase 4 - India's Matrix/4.6 Quiz - India's Matrix.md`,
        },
      ],
    },
    {
      id: "geo-phase-5",
      title: "Phase 5 - How to Think",
      openByDefault: false,
      lectures: [
        {
          id: "geo-5.0",
          title: "5.0 Phase 5 Introduction - The Most Useful Phase",
          path: `${BASE}/Phase 5 - How to Think/5.0 Phase 5 Introduction - The Most Useful Phase.md`,
        },
        {
          id: "geo-5.1",
          title: "5.1 Taking a Headline Apart - Five Questions",
          path: `${BASE}/Phase 5 - How to Think/5.1 Taking a Headline Apart - Five Questions.md`,
        },
        {
          id: "geo-5.2",
          title: "5.2 Reading Both Sides Properly",
          path: `${BASE}/Phase 5 - How to Think/5.2 Reading Both Sides Properly.md`,
        },
        {
          id: "geo-5.3",
          title: "5.3 Propaganda, Spin and Base Rates",
          path: `${BASE}/Phase 5 - How to Think/5.3 Propaganda, Spin and Base Rates.md`,
        },
        {
          id: "geo-5.4",
          title: "5.4 Sources and Fact-Checking",
          path: `${BASE}/Phase 5 - How to Think/5.4 Sources and Fact-Checking.md`,
        },
        {
          id: "geo-5.5",
          title: "5.5 Your Weekly Analysis Log",
          path: `${BASE}/Phase 5 - How to Think/5.5 Your Weekly Analysis Log.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-5.5",
          title: "Quiz - How to Think",
          path: `${BASE}/Phase 5 - How to Think/5.5 Quiz - How to Think.md`,
        },
      ],
    },
    {
      id: "geo-phase-6",
      title: "Phase 6 - Daily Update",
      openByDefault: false,
      lectures: [
        {
          id: "geo-6.0",
          title: "6.0 Phase 6 Introduction - Making It Habitual",
          path: `${BASE}/Phase 6 - Daily Update/6.0 Phase 6 Introduction - Making It Habitual.md`,
        },
        {
          id: "geo-6.1",
          title: "6.1 Building Your Routine and Fighting Distraction",
          path: `${BASE}/Phase 6 - Daily Update/6.1 Building Your Routine and Fighting Distraction.md`,
        },
        {
          id: "geo-6.2",
          title: "6.2 Being Wrong - Calibrating Your Predictions",
          path: `${BASE}/Phase 6 - Daily Update/6.2 Being Wrong - Calibrating Your Predictions.md`,
        },
        {
          id: "geo-6.3",
          title: "6.3 Your First Thirty Days",
          path: `${BASE}/Phase 6 - Daily Update/6.3 Your First Thirty Days.md`,
        },
      ],
    },
  ],
};
