import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("session"); // or use auth context / state
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default AuthRoute;
