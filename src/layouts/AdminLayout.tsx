import { Outlet, Navigate } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const isAdmin = true; // replace with real auth/role check

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-layout">
      
      <main>
        <Outlet /> {/* renders nested admin routes */}
      </main>
    </div>
  );
};

export default AdminLayout;