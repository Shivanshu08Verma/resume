import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import SkillsPage from "./pages/SkillsPage.tsx";
import ExperiencePage from "./pages/ExperiencePage.tsx";
import HeroPage from "./pages/HeroPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HeroPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/skills",
        element: <SkillsPage />,
      },
      {
        path: "/experience",
        element: <ExperiencePage />,
      },
    ],
  },
]);

const root = createRoot(document.querySelector("#root")!);
root.render(
  <StrictMode>
    <AppWrapper>
      <RouterProvider router={router} />
    </AppWrapper>
  </StrictMode>
);

