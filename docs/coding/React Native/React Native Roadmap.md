# React Native Roadmap

Vin's personal roadmap, built on top of React and Redux Toolkit · November 2026

## The Goal

Build and run real apps on my own phone, one project per batch, ending with a capstone I ship as a development build.

## Setup and Tools

- **Project:** created with Expo (`npx create-expo-app`), not the plain React Native CLI.
- **Editor:** VS Code, same as React.
- **Preview:** my own phone using the Expo Go app. No Android Studio and no emulator needed for now.
- **Styling:** plain StyleSheet in batch one, then NativeWind (Tailwind for React Native) from batch two onward.

## Mental Model

- React builds websites that run in a browser. React Native builds real apps for Android and iPhone using the same ideas: components, props, state, hooks.
- Instead of `div` and `p`, I use building blocks like `View` and `Text`.
- Expo is the tooling on my computer. Expo Go is just the viewer app on my phone.
- Running the dev server shows a QR code. Scanning it with Expo Go opens the app on the phone, and saving a file in VS Code updates it instantly.

## How This Course Works

This course is for learning React Native (with TypeScript/JavaScript). Reading is done differently here.

| Feature | Purpose |
|---------|---------|
| **Batches** | 7 batches. Each batch has a few concepts |
| **Mini-Projects** | A small isolated project for each concept |
| **Combined Projects** | After each batch, all concepts are combined into a real app |
| **Capstone** | Final project — your best app polished and shipped, for your resume |
| **TypeScript/JavaScript** | The entire course uses TypeScript/JavaScript |
| **Manual → Better** | First the manual approach (feel the problem), then the library (learn the solution) |

### Module Breakdown

- **Module 0** (this module) — Theory only. How React Native works under the hood. No code.
- **Batch 1** — Core components, Flexbox, StyleSheet. Project: To-do list app.
- **Batch 2** — Navigation, Context, NativeWind, safe areas. Project: Multi-screen notes app.
- **Batch 3** — FlatList, forms, validation. Project: Expense tracker.
- **Batch 4** — Fetching, global state, local storage. Project: Movie browser.
- **Batch 5** — Camera, location, notifications, permissions. Project: Photo journal.
- **Batch 6** — Animations, gestures, theming, performance. Project: Animated habit tracker.
- **Batch 7** — EAS, Jest, icon/splash, env, store. Project: Capstone.

### Prerequisites

- JavaScript basics (variables, functions, arrays, objects, Promises, async/await)
- React basics (components, props, state, hooks)
- HTML & CSS basics (helpful, not strictly required)
- No prior native (Kotlin/Swift) experience needed — we start from scratch

## Module 0: How React Native Works

No project. This is the under-the-hood module, like Module 0 in the React roadmap.

- How JavaScript turns into real native views
- The old bridge versus the new architecture
- What Expo does for me and what it hides
- Expo versus plain React Native CLI
- Expo Go versus development builds

## Batch 1: Core Components and Styling

**Project: To-do list app**

- Project structure and the Expo folder layout
- Core components: View, Text, Image, ScrollView, Pressable, TextInput
- Flexbox in React Native, and how it differs from CSS on the web
- StyleSheet basics, spacing, and colors
- Props, state, and events carried over from React

## Batch 2: Navigation

**Project: Multi-screen notes app, version two of the to-do idea**

- Expo Router with stacks and tabs
- Dynamic routes and a detail screen
- Protected routes with a login gate
- Context API and useEffect, as in the React roadmap
- Switch to NativeWind for styling from here on
- Safe areas and layout for tabs

## Batch 3: Lists and Forms

**Project: Expense tracker**

- FlatList and performance with long lists
- Forms with React Hook Form and Zod
- Keyboard-friendly screens
- Validation and error messages

## Batch 4: Data and State

**Project: Movie browser with offline favorites**

- Fetching from a public API with TanStack Query
- Global state with Redux Toolkit or Zustand
- Local storage with AsyncStorage or SQLite
- Loading, error, and empty states

## Batch 5: Device Features

**Project: Photo journal**

- Camera and image picker
- Location
- Local notifications and reminders
- Permissions handling

## Batch 6: Polish

**Project: Animated habit tracker**

- Animations with Reanimated
- Gestures
- Theming and dark mode
- Performance tuning

## Batch 7: Shipping

**Project: Capstone, my best app polished and shipped**

- EAS development builds installed on my phone
- Testing with Jest
- App icon and splash screen
- Environment configuration
- Store submission overview

## Styling Plan

- **Batch 1:** learn plain StyleSheet properly so nothing feels like magic later.
- **Batch 2 onward:** use NativeWind, since I already know Tailwind. It turns Tailwind classes into the same styles behind the scenes.
- Knowing both means I can read other people's code, because many projects still use StyleSheet.

## What Carries Over from React

Hooks, props, state, Context, custom hooks, Redux Toolkit, TanStack Query, React Hook Form, and Zod all work in React Native almost unchanged. The genuinely new parts are the building blocks, styling, navigation, and device features.
