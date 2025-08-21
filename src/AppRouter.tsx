import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthRoutes from "./features/Auth";
import { RootLayout } from "./components/layouts";
import NotAuthorized from "./features/NotAuthorized/NotAuthorized";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes - accessible when not authenticated */}
        <Route path="/*" element={<AuthRoutes />} />

        {/* Not Authorized Route */}
        <Route path="/unauthorized" element={<NotAuthorized />} />

        {/* Protected Routes - require authentication */}
        <Route
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<div>Home</div>} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
