import { Navigate, Outlet } from 'react-router-dom';
import { useAuth} from "./AuthContext.tsx";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the child routes if authenticated
    return <Outlet />;
};