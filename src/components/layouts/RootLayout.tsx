// RootLayout.tsx
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <div>
      {/* Header / Nav ... */}
      <Outlet />
    </div>
  );
};

export default RootLayout;
