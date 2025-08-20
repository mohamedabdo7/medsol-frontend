import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthRoutes from "./features/Auth";
import { RootLayout } from "./components/layouts";
import NotAuthorized from "./features/NotAuthorized/NotAuthorized";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AuthRoutes />} />
        <Route path="/unauthorized" element={<NotAuthorized />} />
        <Route element={<RootLayout />}>
          <Route path="/" element={<div>Home</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
