import type { Subject } from "../coding-data";

export const reactnativeSubject: Subject = {
  id: "reactnative",
  title: "React Native",
  description:
    "React Native with Expo — from native views to shipping a real app on your phone",
  lectures: [
    {
      id: "reactnative-roadmap",
      title: "📋 React Native Roadmap",
      path: "docs/coding/React Native/React Native Roadmap.md",
    },
  ],
  phases: [
    {
      id: "rn-module0",
      title: "Module 0 — How React Native Works",
      openByDefault: true,
      lectures: [
        {
          id: "rn-0.0",
          title: "0.0 What is React Native and How This Course Works",
          path: "docs/coding/React Native/Module 0 - How React Native Works/0.0 What is React Native and How This Course Works.md",
        },
        {
          id: "rn-0.1",
          title: "0.1 How JavaScript Becomes Native Views",
          path: "docs/coding/React Native/Module 0 - How React Native Works/0.1 How JavaScript Becomes Native Views.md",
        },
        {
          id: "rn-0.2",
          title: "0.2 Old Bridge vs New Architecture",
          path: "docs/coding/React Native/Module 0 - How React Native Works/0.2 Old Bridge vs New Architecture.md",
        },
        {
          id: "rn-0.3",
          title: "0.3 What Expo Does for You",
          path: "docs/coding/React Native/Module 0 - How React Native Works/0.3 What Expo Does for You.md",
        },
        {
          id: "rn-0.4",
          title: "0.4 Expo vs React Native CLI",
          path: "docs/coding/React Native/Module 0 - How React Native Works/0.4 Expo vs React Native CLI.md",
        },
        {
          id: "rn-0.5",
          title: "0.5 Expo Go vs Development Builds",
          path: "docs/coding/React Native/Module 0 - How React Native Works/0.5 Expo Go vs Development Builds.md",
        },
      ],
    },
    {
      id: "rn-batch1",
      title: "Batch 1 — Core Components and Styling",
      openByDefault: true,
      lectures: [
        {
          id: "rn-1.0",
          title: "1.0 Expo Project Structure and Folder Layout",
          path: "docs/coding/React Native/Batch 1 - Core Components and Styling/1.0 Expo Project Structure and Folder Layout.md",
        },
        {
          id: "rn-1.1",
          title: "1.1 Core Components - View Text and Image",
          path: "docs/coding/React Native/Batch 1 - Core Components and Styling/1.1 Core Components - View Text and Image.md",
        },
        {
          id: "rn-1.2",
          title: "1.2 ScrollView",
          path: "docs/coding/React Native/Batch 1 - Core Components and Styling/1.2 ScrollView.md",
        },
        {
          id: "rn-1.3",
          title: "1.3 Pressable",
          path: "docs/coding/React Native/Batch 1 - Core Components and Styling/1.3 Pressable.md",
        },
        {
          id: "rn-1.4",
          title: "1.4 TextInput",
          path: "docs/coding/React Native/Batch 1 - Core Components and Styling/1.4 TextInput.md",
        },
        {
          id: "rn-1.5",
          title: "1.5 Flexbox in React Native",
          path: "docs/coding/React Native/Batch 1 - Core Components and Styling/1.5 Flexbox in React Native.md",
        },
        {
          id: "rn-1.6",
          title: "1.6 StyleSheet Basics",
          path: "docs/coding/React Native/Batch 1 - Core Components and Styling/1.6 StyleSheet Basics.md",
        },
        {
          id: "rn-1.7",
          title: "1.7 Spacing and Colors",
          path: "docs/coding/React Native/Batch 1 - Core Components and Styling/1.7 Spacing and Colors.md",
        },
        {
          id: "rn-1.8",
          title: "1.8 Props State and Events from React",
          path: "docs/coding/React Native/Batch 1 - Core Components and Styling/1.8 Props State and Events from React.md",
        },
        {
          id: "rn-1.9",
          title: "1.9 To-do App - Project Overview",
          path: "docs/coding/React Native/Batch 1 - Core Components and Styling/1.9 To-do App - Project Overview.md",
        },
      ],
    },
    {
      id: "rn-batch2",
      title: "Batch 2 — Navigation",
      openByDefault: false,
      lectures: [
        { id: "rn-2.0", title: "2.0 Expo Router Basics (Stacks and Tabs)", path: "docs/coding/React Native/Batch 2 - Navigation/2.0 Expo Router Basics (Stacks and Tabs).md" },
        { id: "rn-2.1", title: "2.1 Dynamic Routes and Detail Screen", path: "docs/coding/React Native/Batch 2 - Navigation/2.1 Dynamic Routes and Detail Screen.md" },
        { id: "rn-2.2", title: "2.2 Protected Routes with Login Gate", path: "docs/coding/React Native/Batch 2 - Navigation/2.2 Protected Routes with Login Gate.md" },
        { id: "rn-2.3", title: "2.3 Context API and useEffect", path: "docs/coding/React Native/Batch 2 - Navigation/2.3 Context API and useEffect.md" },
        { id: "rn-2.4", title: "2.4 NativeWind (Tailwind for React Native)", path: "docs/coding/React Native/Batch 2 - Navigation/2.4 NativeWind (Tailwind for React Native).md" },
        { id: "rn-2.5", title: "2.5 Safe Areas and Tab Layout", path: "docs/coding/React Native/Batch 2 - Navigation/2.5 Safe Areas and Tab Layout.md" },
        { id: "rn-2.6", title: "2.6 Multi-screen Notes App - Project Overview", path: "docs/coding/React Native/Batch 2 - Navigation/2.6 Multi-screen Notes App - Project Overview.md" },
      ],
    },
    {
      id: "rn-batch3",
      title: "Batch 3 — Lists and Forms",
      openByDefault: false,
      lectures: [
        { id: "rn-3.0", title: "3.0 FlatList and Performance", path: "docs/coding/React Native/Batch 3 - Lists and Forms/3.0 FlatList and Performance.md" },
        { id: "rn-3.1", title: "3.1 Forms with React Hook Form and Zod", path: "docs/coding/React Native/Batch 3 - Lists and Forms/3.1 Forms with React Hook Form and Zod.md" },
        { id: "rn-3.2", title: "3.2 Keyboard-friendly Screens", path: "docs/coding/React Native/Batch 3 - Lists and Forms/3.2 Keyboard-friendly Screens.md" },
        { id: "rn-3.3", title: "3.3 Validation and Error Messages", path: "docs/coding/React Native/Batch 3 - Lists and Forms/3.3 Validation and Error Messages.md" },
        { id: "rn-3.4", title: "3.4 Expense Tracker - Project Overview", path: "docs/coding/React Native/Batch 3 - Lists and Forms/3.4 Expense Tracker - Project Overview.md" },
      ],
    },
    {
      id: "rn-batch4",
      title: "Batch 4 — Data and State",
      openByDefault: false,
      lectures: [
        { id: "rn-4.0", title: "4.0 Fetching from Public API with TanStack Query", path: "docs/coding/React Native/Batch 4 - Data and State/4.0 Fetching from Public API with TanStack Query.md" },
        { id: "rn-4.1", title: "4.1 Global State (Redux Toolkit or Zustand)", path: "docs/coding/React Native/Batch 4 - Data and State/4.1 Global State (Redux Toolkit or Zustand).md" },
        { id: "rn-4.2", title: "4.2 Local Storage (AsyncStorage or SQLite)", path: "docs/coding/React Native/Batch 4 - Data and State/4.2 Local Storage (AsyncStorage or SQLite).md" },
        { id: "rn-4.3", title: "4.3 Loading, Error, and Empty States", path: "docs/coding/React Native/Batch 4 - Data and State/4.3 Loading, Error, and Empty States.md" },
        { id: "rn-4.4", title: "4.4 Movie Browser with Offline Favorites - Project Overview", path: "docs/coding/React Native/Batch 4 - Data and State/4.4 Movie Browser with Offline Favorites - Project Overview.md" },
      ],
    },
    {
      id: "rn-batch5",
      title: "Batch 5 — Device Features",
      openByDefault: false,
      lectures: [
        { id: "rn-5.0", title: "5.0 Camera and Image Picker", path: "docs/coding/React Native/Batch 5 - Device Features/5.0 Camera and Image Picker.md" },
        { id: "rn-5.1", title: "5.1 Location", path: "docs/coding/React Native/Batch 5 - Device Features/5.1 Location.md" },
        { id: "rn-5.2", title: "5.2 Local Notifications and Reminders", path: "docs/coding/React Native/Batch 5 - Device Features/5.2 Local Notifications and Reminders.md" },
        { id: "rn-5.3", title: "5.3 Permissions Handling", path: "docs/coding/React Native/Batch 5 - Device Features/5.3 Permissions Handling.md" },
        { id: "rn-5.4", title: "5.4 Photo Journal - Project Overview", path: "docs/coding/React Native/Batch 5 - Device Features/5.4 Photo Journal - Project Overview.md" },
      ],
    },
    {
      id: "rn-batch6",
      title: "Batch 6 — Polish",
      openByDefault: false,
      lectures: [
        { id: "rn-6.0", title: "6.0 Animations with Reanimated", path: "docs/coding/React Native/Batch 6 - Polish/6.0 Animations with Reanimated.md" },
        { id: "rn-6.1", title: "6.1 Gestures", path: "docs/coding/React Native/Batch 6 - Polish/6.1 Gestures.md" },
        { id: "rn-6.2", title: "6.2 Theming and Dark Mode", path: "docs/coding/React Native/Batch 6 - Polish/6.2 Theming and Dark Mode.md" },
        { id: "rn-6.3", title: "6.3 Performance Tuning", path: "docs/coding/React Native/Batch 6 - Polish/6.3 Performance Tuning.md" },
        { id: "rn-6.4", title: "6.4 Animated Habit Tracker - Project Overview", path: "docs/coding/React Native/Batch 6 - Polish/6.4 Animated Habit Tracker - Project Overview.md" },
      ],
    },
    {
      id: "rn-batch7",
      title: "Batch 7 — Shipping",
      openByDefault: false,
      lectures: [
        { id: "rn-7.0", title: "7.0 EAS Development Builds", path: "docs/coding/React Native/Batch 7 - Shipping/7.0 EAS Development Builds.md" },
        { id: "rn-7.1", title: "7.1 Testing with Jest", path: "docs/coding/React Native/Batch 7 - Shipping/7.1 Testing with Jest.md" },
        { id: "rn-7.2", title: "7.2 App Icon and Splash Screen", path: "docs/coding/React Native/Batch 7 - Shipping/7.2 App Icon and Splash Screen.md" },
        { id: "rn-7.3", title: "7.3 Environment Configuration", path: "docs/coding/React Native/Batch 7 - Shipping/7.3 Environment Configuration.md" },
        { id: "rn-7.4", title: "7.4 Store Submission Overview", path: "docs/coding/React Native/Batch 7 - Shipping/7.4 Store Submission Overview.md" },
        { id: "rn-7.5", title: "7.5 Capstone - Your Best App Polished and Shipped", path: "docs/coding/React Native/Batch 7 - Shipping/7.5 Capstone - Your Best App Polished and Shipped.md" },
      ],
    },
  ],
};
