import { useEffect } from "react";
import { Skeleton } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLoginModal } from "../context/LoginModalContext";

export default function ProtectedRoute() {
  const {
    isAuthenticated,
    isBootstrapping,
    isAccountSetup,
    isAccountSetupPromptDismissed,
  } = useAuth();
  const { openLogin } = useLoginModal();
  const location = useLocation();

  useEffect(() => {
    if (!isBootstrapping && !isAuthenticated) {
      openLogin();
    }
  }, [isAuthenticated, isBootstrapping, openLogin]);

  if (isBootstrapping) {
    return (
      <div
        className="container py-4"
        role="status"
        aria-label="Loading workspace"
      >
        <div className="d-flex justify-content-between border-bottom pb-3 mb-4">
          <Skeleton width={160} height={40} />
          <Skeleton variant="circular" width={36} height={36} />
        </div>
        <div className="mb-4">
          <Skeleton width={224} height={32} />
          <Skeleton width="60%" height={20} />
        </div>
        <div className="border rounded p-3">
          <Skeleton height={40} className="mb-2" />
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} height={48} className="mb-2" />
          ))}
        </div>
        <span className="visually-hidden">Restoring your session...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (
    !isAccountSetup &&
    !isAccountSetupPromptDismissed &&
    location.pathname !== "/accountsetup"
  ) {
    return <Navigate to="/accountsetup" replace />;
  }

  return <Outlet />;
}
