import type { Subject } from "../coding-data";

export const csharpSubject: Subject = {
  id: "csharp",
  title: "C# & .NET",
  description:
    "Crash course — C# basics, OOP, .NET toolbox, EF Core, ASP.NET Core Web API + Library API project",
  lectures: [
    {
      id: "csharp-roadmap",
      title: "📋 C# & .NET Roadmap",
      path: "docs/coding/C Sharp/roadmap.md",
    },
  ],
  phases: [
    {
      id: "cs-module0",
      title: "Module 0 — Shuruaat",
      openByDefault: true,
      lectures: [
        {
          id: "csharp-0.1",
          title: "0.1 C# aur .NET kya hai",
          path: "docs/coding/C Sharp/Module 0 - Shuruaat/0.1 C# aur .NET kya hai.md",
        },
        {
          id: "csharp-0.2",
          title: "0.2 Setup — pehla program",
          path: "docs/coding/C Sharp/Module 0 - Shuruaat/0.2 Setup — pehla program.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-0.2",
          title: "🧪 0.1-0.2 Quiz",
          path: "docs/coding/C Sharp/Module 0 - Shuruaat/0.1 Quiz.md",
        },
      ],
    },
    {
      id: "cs-module1",
      title: "Module 1 — C# Basics",
      lectures: [
        {
          id: "csharp-1.1",
          title: "1.1 Variables aur Types",
          path: "docs/coding/C Sharp/Module 1 - C# Basics/1.1 Variables aur Types.md",
        },
        {
          id: "csharp-1.2",
          title: "1.2 Input aur Operators",
          path: "docs/coding/C Sharp/Module 1 - C# Basics/1.2 Input aur Operators.md",
        },
        {
          id: "csharp-1.3",
          title: "1.3 Conditions — if else switch",
          path: "docs/coding/C Sharp/Module 1 - C# Basics/1.3 Conditions — if else switch.md",
        },
        {
          id: "csharp-1.4",
          title: "1.4 Loops",
          path: "docs/coding/C Sharp/Module 1 - C# Basics/1.4 Loops.md",
        },
        {
          id: "csharp-1.5",
          title: "1.5 Arrays aur Lists",
          path: "docs/coding/C Sharp/Module 1 - C# Basics/1.5 Arrays aur Lists.md",
        },
        {
          id: "csharp-1.6",
          title: "1.6 Methods",
          path: "docs/coding/C Sharp/Module 1 - C# Basics/1.6 Methods.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-1.6",
          title: "🧪 1.1-1.6 Quiz",
          path: "docs/coding/C Sharp/Module 1 - C# Basics/1.1-1.6 Quiz.md",
        },
      ],
    },
    {
      id: "cs-module2",
      title: "Module 2 — OOP in C#",
      lectures: [
        {
          id: "csharp-2.1",
          title: "2.1 Class aur Object",
          path: "docs/coding/C Sharp/Module 2 - OOP in C#/2.1 Class aur Object.md",
        },
        {
          id: "csharp-2.2",
          title: "2.2 Properties aur Encapsulation",
          path: "docs/coding/C Sharp/Module 2 - OOP in C#/2.2 Properties aur Encapsulation.md",
        },
        {
          id: "csharp-2.3",
          title: "2.3 Inheritance aur Polymorphism",
          path: "docs/coding/C Sharp/Module 2 - OOP in C#/2.3 Inheritance aur Polymorphism.md",
        },
        {
          id: "csharp-2.4",
          title: "2.4 Interfaces aur Namespaces",
          path: "docs/coding/C Sharp/Module 2 - OOP in C#/2.4 Interfaces aur Namespaces.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-2.4",
          title: "🧪 2.1-2.4 Quiz",
          path: "docs/coding/C Sharp/Module 2 - OOP in C#/2.1-2.4 Quiz.md",
        },
      ],
    },
    {
      id: "cs-module3",
      title: "Module 3 — .NET Toolbox",
      lectures: [
        {
          id: "csharp-3.1",
          title: "3.1 BCL aur LINQ",
          path: "docs/coding/C Sharp/Module 3 - .NET Toolbox/3.1 BCL aur LINQ.md",
        },
        {
          id: "csharp-3.2",
          title: "3.2 Async Await (Task)",
          path: "docs/coding/C Sharp/Module 3 - .NET Toolbox/3.2 Async Await (Task).md",
        },
        {
          id: "csharp-3.3",
          title: "3.3 JSON Files aur Generics",
          path: "docs/coding/C Sharp/Module 3 - .NET Toolbox/3.3 JSON Files aur Generics.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-3.3",
          title: "🧪 3.1-3.3 Quiz",
          path: "docs/coding/C Sharp/Module 3 - .NET Toolbox/3.1-3.3 Quiz.md",
        },
      ],
    },
    {
      id: "cs-module4",
      title: "Module 4 — Database",
      lectures: [
        {
          id: "csharp-4.1",
          title: "4.1 SQL Recap aur C# se SQL",
          path: "docs/coding/C Sharp/Module 4 - Database/4.1 SQL Recap aur C# se SQL.md",
        },
        {
          id: "csharp-4.2",
          title: "4.2 Entity Framework Core",
          path: "docs/coding/C Sharp/Module 4 - Database/4.2 Entity Framework Core.md",
        },
        {
          id: "csharp-4.3",
          title: "4.3 Connection String aur appsettings",
          path: "docs/coding/C Sharp/Module 4 - Database/4.3 Connection String aur appsettings.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-4.3",
          title: "🧪 4.1-4.3 Quiz",
          path: "docs/coding/C Sharp/Module 4 - Database/4.1-4.3 Quiz.md",
        },
      ],
    },
    {
      id: "cs-module5",
      title: "Module 5 — ASP.NET Core Web API ⭐",
      lectures: [
        {
          id: "csharp-5.1",
          title: "5.1 Web API kya hai — pehla API",
          path: "docs/coding/C Sharp/Module 5 - ASP.NET Core Web API/5.1 Web API kya hai — pehla API.md",
        },
        {
          id: "csharp-5.2",
          title: "5.2 Endpoints Routing aur DTOs",
          path: "docs/coding/C Sharp/Module 5 - ASP.NET Core Web API/5.2 Endpoints Routing aur DTOs.md",
        },
        {
          id: "csharp-5.3",
          title: "5.3 Validation aur Error Handling",
          path: "docs/coding/C Sharp/Module 5 - ASP.NET Core Web API/5.3 Validation aur Error Handling.md",
        },
        {
          id: "csharp-5.4",
          title: "5.4 JWT Auth",
          path: "docs/coding/C Sharp/Module 5 - ASP.NET Core Web API/5.4 JWT Auth.md",
        },
        {
          id: "csharp-5.5",
          title: "5.5 CORS aur React se connect",
          path: "docs/coding/C Sharp/Module 5 - ASP.NET Core Web API/5.5 CORS aur React se connect.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-5.5",
          title: "🧪 5.1-5.5 Quiz",
          path: "docs/coding/C Sharp/Module 5 - ASP.NET Core Web API/5.1-5.5 Quiz.md",
        },
      ],
    },
    {
      id: "cs-module6",
      title: "Module 6 — Project: Library API",
      lectures: [
        {
          id: "csharp-6.1",
          title: "6.1 Setup Models aur Database",
          path: "docs/coding/C Sharp/Module 6 - Project Library API/6.1 Setup Models aur Database.md",
        },
        {
          id: "csharp-6.2",
          title: "6.2 CRUD Endpoints",
          path: "docs/coding/C Sharp/Module 6 - Project Library API/6.2 CRUD Endpoints.md",
        },
        {
          id: "csharp-6.3",
          title: "6.3 Search Validation aur Errors",
          path: "docs/coding/C Sharp/Module 6 - Project Library API/6.3 Search Validation aur Errors.md",
        },
        {
          id: "csharp-6.4",
          title: "6.4 Run Test aur README",
          path: "docs/coding/C Sharp/Module 6 - Project Library API/6.4 Run Test aur README.md",
        },
      ],
    },
  ],
};
