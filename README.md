<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<h1 align="center">CCA Job Board 🚀</h1>

<p align="center">
  A modern, responsive, and professional student-focused job board web application.
  <br />
  <a href="https://github.com/codezelaca/fs-job-board-next-js-webapp"><strong>Explore the repo »</strong></a>
  <br />
  <br />
  <a href="https://github.com/codezelaca/fs-job-board-next-js-webapp/issues">Report Bug</a>
  ·
  <a href="https://github.com/codezelaca/fs-job-board-next-js-webapp/issues">Request Feature</a>
</p>

<!-- Badges -->
<p align="center">
  <a href="https://github.com/codezelaca/fs-job-board-next-js-webapp/stargazers"><img src="https://img.shields.io/github/stars/codezelaca/fs-job-board-next-js-webapp?style=flat-square&color=blue" alt="Stars Badge"/></a>
  <a href="https://github.com/codezelaca/fs-job-board-next-js-webapp/network/members"><img src="https://img.shields.io/github/forks/codezelaca/fs-job-board-next-js-webapp?style=flat-square&color=blue" alt="Forks Badge"/></a>
  <a href="https://github.com/codezelaca/fs-job-board-next-js-webapp/pulls"><img src="https://img.shields.io/github/issues-pr/codezelaca/fs-job-board-next-js-webapp?style=flat-square&color=blue" alt="Pull Requests Badge"/></a>
  <a href="https://github.com/codezelaca/fs-job-board-next-js-webapp/issues"><img src="https://img.shields.io/github/issues/codezelaca/fs-job-board-next-js-webapp?style=flat-square&color=blue" alt="Issues Badge"/></a>
</p>

---

## 📖 About The Project

**CCA Job Board** is a dedicated platform designed to connect students with professional opportunities. Built with the latest front-end technologies like **Next.js 16**, **React 19**, and **Tailwind CSS v4**, the application delivers a premium, fast, and accessible user experience.

The design features a professional purple color palette with dynamic typography, ensuring high visual quality. The platform includes a seamless dark mode, advanced server-side data fetching for SEO optimization, and a responsive layout that adapts to any device.

### ✨ Key Features

- **Dynamic Job Listings:** Server-driven search and filtering for an optimal, SEO-friendly experience.
- **Premium UI/UX:** Built with high-quality typography, a dedicated purple color scheme, and fluid micro-interactions.
- **Dark Mode Support:** Integrated via `next-themes` for a comfortable viewing experience in any lighting.
- **Intelligent Loading States:** Dedicated skeleton loaders (using Next.js `loading.tsx` conventions) for immediate user feedback during data fetching and navigation.
- **Advanced Modals:** An "Apply Now" application modal built with React Portals to perfectly handle `z-index` stacking and glassmorphism backdrop blur effects.
- **Responsive Layout:** Fully functional and beautiful across desktop, tablet, and mobile devices.
- **Robust Architecture:** A decoupled data access layer with simulated API routes to fetch and manage jobs seamlessly.

---

## 🛠 Tech Stack

The project relies on a robust and modern technology stack:

- **Framework:** [Next.js (App Router)](https://nextjs.org/) - v16
- **UI Library:** [React](https://react.dev/) - v19
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - v4
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes)

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Make sure you have Node.js installed (version 18 or above is recommended).

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/codezelaca/fs-job-board-next-js-webapp.git
   ```
2. Navigate to the project directory
   ```sh
   cd fs-job-board-next-js-webapp
   ```
3. Install dependencies
   ```sh
   npm install
   ```
4. Start the development server
   ```sh
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser.

---

## 📁 Project Structure

Here's a brief overview of the project's architecture:

```text
fs-job-board-next-js-webapp/
├── app/
│   ├── components/       # Reusable UI components (ThemeToggle, FeaturedJobs, Modals)
│   ├── jobs/             # Job listing and detailed job pages (slug-based routing)
│   │   └── [id]/         # Dynamic route for single job details
│   ├── globals.css       # Global styles and Tailwind configuration
│   ├── layout.tsx        # Main application layout, header, footer, providers
│   └── page.tsx          # Homepage
├── lib/
│   └── jobs.ts           # Decoupled Data Access Layer and helper functions
├── public/               # Static assets (images, icons)
├── package.json          # Project metadata and dependencies
└── tailwind.config.ts    # Tailwind CSS configuration (if using separate config)
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for the CCA Job Board
</p>
