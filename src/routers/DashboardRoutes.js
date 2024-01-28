import { Routes, Route } from "react-router-dom";

import { JournalScreen } from "../components/journal/JournalScreen";

export const DashboardRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<JournalScreen />} />
      </Routes>
  )
}
