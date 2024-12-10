# SwivelEvents

A fully featured React Native application built from the ground up using the React Native CLI. This application showcases a modern mobile user experience, complete with a clean UI, centralized state management via Redux, comprehensive navigation setups, and integration with Firebase (Authentication & Realtime Database). The project follows a modular, layered architecture designed for scalability, maintainability, and ease of collaboration.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture & File Structure](#architecture--file-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Screens & UI](#screens--ui)
- [State Management](#state-management)
- [Data & Services](#data--services)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [Author](#author)

## Features

- **Firebase Authentication**: Secure user sign-up, login, and logout flows for a seamless user management experience.
- **Realtime Database Integration**: Dynamic content updates and data stored in Firebase Realtime Database.
- **Full Navigation Stack**: Intuitive user flow with stack, tab, and drawer navigators using React Navigation.
- **Redux for State Management**: Centralized application state with Redux slices, ensuring predictable state transitions and simplified debugging.
- **Comprehensive UI Components**: Thoughtfully designed reusable UI components for a consistent and responsive user interface.
- **Rich Media Displays**: Screens for posts, comments, and photo galleries, each following consistent design principles and patterns.

## Technologies Used

- **React Native CLI**: Core framework for native mobile development.
- **React Navigation**: Multiple navigators (Stack, Drawer, Bottom Tabs) for a fluid user journey.
- **Redux & Redux Toolkit**: Structured global state management.
- **Firebase & @react-native-firebase/app**: Integrated Authentication and Realtime Database for secure and scalable backend services.
- **TypeScript**: For type-safe, maintainable code.
- **ESLint & Prettier** (React Native CLI defaults): Ensuring code quality and stylistic consistency.

## Architecture & File Structure

This project’s structure takes inspiration from layered and modular architectures. Each major concern is isolated into its own directory, promoting separation of concerns, scalability, and maintainability. The structure and approach draw loosely from principles seen in “Clean Architecture,” domain-driven design, and a pragmatic layered architecture, rather than strictly following classical patterns like MVC, MVP, or MVVM.

**Key Points:**

- **UI/Presentation Layer**:  
  Contained within `components` and `screens`.

  - `components`: Reusable UI elements (buttons, inputs, cards, etc.)
  - `screens`: Page-level views grouped by feature (e.g., `user`, `welcome`)

- **Navigation Layer**:  
  Isolated in the `navigation` folder, providing stack, tab, and drawer navigators.

- **State Management / Domain Logic**:  
  Centralized in the `store` directory with Redux slices representing domain logic.

  - `store`: Contains `rootReducer`, Redux slices (e.g., `authSlice`, `postsSlice`), and test files.

- **Type Definitions & Utilities**:

  - `@types`: TypeScript definitions for entities (`photo.d.ts`, `post.d.ts`, `comment.d.ts`) ensuring type safety and clarity.
  - `helpers`: Utility functions and services (e.g., FirebaseMessagingService) to interact with external services.
  - `config`: Configuration files and constants.

- **Assets**:
  - `assets`: Fonts, icons, and images.

**Representative File Structure:**

```
project-root/
├── @types
│   ├── cloudinary.d.ts
│   ├── comment.d.ts
│   ├── custom.d.ts
│   ├── env.d.ts
│   ├── fonts.d.ts
│   ├── photo.d.ts
│   └── post.d.ts
├── assets
│   ├── fonts
│   │   ├── Inter-Black.ttf
│   │   ├── Inter-Bold.ttf
│   │   ├── ...
│   │   └── index.ts
│   └── icons
│       ├── arrow-back.png
│       ├── arrow.png
│       ├── ...
│       └── user.png
├── components
│   ├── Button.tsx
│   ├── InfoPanel.tsx
│   ├── OrganizerCard.tsx
│   ├── ...
│   ├── homeComponents
│   │   ├── Organizers.tsx
│   │   ├── PhotoCard.tsx
│   │   ├── ...
│   ├── navigationComponents
│   │   ├── BottomTabHeader.tsx
│   │   ├── DrawerContent.tsx
│   │   ├── ...
│   └── toast
│       ├── ToastConfig.tsx
│       └── ToastProvider.tsx
├── config
│   └── index.ts
├── helpers
│   └── FirebaseMessagingService.ts
├── hooks
│   └── index.ts
├── navigation
│   ├── BottomTabs.tsx
│   ├── Drawer.tsx
│   ├── InfoStack.tsx
│   ├── RootNavigator.tsx
│   ├── UserStack.tsx
│   └── WelcomeStack.tsx
├── screens
│   ├── user
│   │   ├── AllPhotos.tsx
│   │   ├── Comments.tsx
│   │   ├── EditProfile.tsx
│   │   ├── Home.tsx
│   │   ├── Posts.tsx
│   │   └── Profile.tsx
│   └── welcome
│       ├── Info.tsx
│       ├── Login.test.tsx
│       ├── Login.tsx
│       ├── ProfilePhoto.tsx
│       └── Signup.tsx
└── store
    ├── rootReducer.ts
    ├── slices
    │   ├── activitySlice.ts
    │   ├── authSlice.ts
    │   ├── imageSlice.test.ts
    │   ├── imagesSlice.ts
    │   └── postsSlice.ts
    └── store.ts
```

**Architectural Pattern**:  
This structure most closely aligns with a **layered, modular architecture**. It is a pragmatic approach that incorporates elements of clean architecture and domain-driven design principles without strictly following a traditional pattern like MVC or MVVM. Instead, it balances clarity, scalability, and maintainability, making it an ideal starting point for both small and complex React Native applications.

## Prerequisites

- **Node.js & npm/Yarn**: Ensure you have the latest LTS versions installed.
- **React Native CLI**: For running and building the app.
- **Android Studio / Xcode**: Required for native mobile environment setups.
- **Firebase Configuration**: A Firebase project with Authentication and Realtime Database enabled.

## Installation

1. **Clone the repo**:

   ```bash
   git clone https://github.com/hasithmeth/SwivelEvents.git
   cd SwivelEvents
   ```

2. **Install dependencies**:

   ```bash
   yarn
   ```

   and then

   ```bash
   yarn pods
   ```

3. **Configure Firebase**:
   - Add `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) as per [@react-native-firebase documentation](https://rnfirebase.io/). [Already in place for this assessment]
   - Confirm that Authentication and Realtime Database are enabled in your Firebase console.

## Running the App

- **Android**:

  ```bash
  npx react-native run-android
  ```

- **iOS** (macOS only):
  ```bash
  npx react-native run-ios
  ```

## Tests

- **Testing**:

  ```bash
  yarn test
  ```

## Screens & UI

- **Authentication**: Login and Signup screens with validation and error handling.
- **Post Feed**: List of user posts including images and text.
- **Comments**: Separate screen to view and add comments to posts.
- **All Photos**: Gallery-like interface for browsing images.
- **Profile & Settings**: Edit profile information and manage user settings for a personalized experience.
- **Navigators**: Customized navigators to comply with expected design.

## State Management

Utilizing Redux for predictable and maintainable state:

- **Slices**: Individual Redux slices for distinct features (Auth, Posts, Images).
- **Actions & Thunks**: Async operations for communicating with Firebase services.
- **Selectors**: For efficient state retrieval and memoization.

## Data & Services

Data interactions with Firebase are abstracted behind service layers, ensuring minimal coupling and easy future integrations:

- **Authentication Service**: Handles user registration, login, logout, and authentication state monitoring.
- **Database Service**: Reading and writing information to/from Firebase Realtime Database.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

**Hasith Methmal Jayasekara**  
[hasithmethmal@gmail.com](mailto:hasithmethmal@gmail.com)

---

**Questions or Further Info**:  
If you have any questions about this project’s architecture, testing strategy, or potential improvements, please reach out!
