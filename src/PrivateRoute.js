import { useTrello } from "./components/context/Context";
import { Navigate } from "react-router";
function PrivateRoute({ children }) {
  const { currentUser } = useTrello();

  return currentUser ? children : <Navigate to="../login" />;
}

export default PrivateRoute;
