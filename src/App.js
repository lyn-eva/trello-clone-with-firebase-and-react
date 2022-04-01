import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";

import PrivateRoute from "./PrivateRoute";
import LoadingCircle from "./components/utility/LoadingCircle";

const Login = lazy(() => import("./components/form/Login"));
const SignUp = lazy(() => import("./components/form/SignUp"));
const Profile = lazy(() => import("./components/profile/Profile"));
const Board = lazy(() => import("./components/board/Board"));
const ResetPwd = lazy(() => import("./components/form/ResetPwd"));
const DeleteAccount = lazy(() => import("./components/form/DeleteAccount"));

function App() {
  return (
    <Suspense fallback={<LoadingCircle msg="loading..." />}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path=":profile/reset_pwd"
          element={
            <PrivateRoute>
              <ResetPwd />
            </PrivateRoute>
          }
        />
        <Route
          path=":profile/delete_account"
          element={
            <PrivateRoute>
              <DeleteAccount />
            </PrivateRoute>
          }
        />
        <Route
          path=":profile/:board"
          element={
            <PrivateRoute>
              <Board />
            </PrivateRoute>
          }
        />
        <Route
          path=":profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="profile" />} />
      </Routes>
    </Suspense>
  );
}

export default App;