# 📰 ThePulse — News Portal

A modern news portal built with React, TypeScript, Redux Toolkit, and Material UI.

🚀 **Live demo:** [news-portal-project.netlify.app](https://news-portal-project.netlify.app/)

## Tech Stack

- **React 18** + **TypeScript**
- **Redux Toolkit** — news feed, bookmarks, UI state
- **Material UI v5** — components & theming
- **React Router v6** — routing
- **Vite** — build tool

## Features

- 🗞️ Home page with featured hero + latest articles grid
- 🔥 Trending sidebar with most-viewed articles
- 🗂️ 7 categories: Technology, Business, Sports, Science, Health, Entertainment, Politics
- 🔍 Real-time search across all articles
- 📄 Full article page with related articles sidebar
- 🔖 Bookmarks (persisted in localStorage)
- 🌙 Dark / Light theme
- 📱 Fully responsive down to 320px

## Getting Started

```bash
npm install
npm run dev
```

## Redux Slices

| Slice            | Responsibility                                              |
| ---------------- | ----------------------------------------------------------- |
| `newsSlice`      | Articles, category filter, search, pagination (async thunk) |
| `bookmarksSlice` | Save/remove articles, localStorage persistence              |
| `uiSlice`        | Dark mode, search panel state                               |

## Pages

| Route             | Page                     |
| ----------------- | ------------------------ |
| `/`               | Home — featured + latest |
| `/article/:id`    | Full article             |
| `/category/:slug` | Category feed            |
| `/bookmarks`      | Saved articles           |
