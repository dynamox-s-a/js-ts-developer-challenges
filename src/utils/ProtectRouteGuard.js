import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRouteGuard({ children }) {
  const user = useSelector((state) => state.users);

  console.log(user);
  if (user.length === 0) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}