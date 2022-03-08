import { useAuth } from "./components/context/AuthContext";
import { Navigate } from "react-router";

function PrivateRoute({ children }) {
  const { currentUsername } = useAuth();
  return currentUsername ? children : <Navigate to="../login" />;
}

export default PrivateRoute;
