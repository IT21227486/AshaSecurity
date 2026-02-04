import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Choose from "./pages/Choose.jsx";
import Wizard from "./pages/Wizard.jsx";
import Success from "./pages/Success.jsx";
import Update from "./pages/Update.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Layout from "./components/Layout.jsx";
import WizardRoute from "./pages/WizardRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/apply/:region" element={<Choose />} />
        {/* <Route path="/apply/:region/:type" element={<Wizard />} /> */}
        <Route path="/apply/:region/:type" element={<WizardRoute />} />
        <Route path="/success" element={<Success />} />
        <Route path="/update" element={<Update />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
