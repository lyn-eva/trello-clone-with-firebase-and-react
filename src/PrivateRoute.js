import { useAuth } from "./components/context/AuthContext";
import { Navigate } from "react-router";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return currentUser ? children : <Navigate to="../login" />;
}

export default PrivateRoute;
