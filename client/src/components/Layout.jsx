import { Outlet, useLocation } from "react-router-dom";
import NavigationDrawer from "./NavigationDrawer.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

/**
 * Global layout wrapper.
 * - Keeps the nav menu available on every route
 * - Provides a global theme toggle
 */
export default function Layout() {
  const { pathname } = useLocation();

  // Wizard pages are: /apply/:region/:type
  const parts = pathname.split("/").filter(Boolean);
  const isWizard = parts[0] === "apply" && parts.length === 3;

  // On wizard pages there is a step badge at top-right.
  // Move the toggle slightly left so they don't overlap.
  const toggleClass = isWizard
    // Mobile: keep the toggle on the SAME row as the compact title header.
    // Tablet/Desktop: keep it near the step badge (same as before).
    ? "fixed right-2 top-2 sm:right-28 sm:top-4 z-50"
    : "fixed right-2 top-4 sm:right-4 z-50";

  return (
    <div className="min-h-screen">
      <NavigationDrawer />
      <div className={toggleClass}>
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  );
}
