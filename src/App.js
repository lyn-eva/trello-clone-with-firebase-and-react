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
        <Route path=":profile/reset_pwd" element={<ResetPwd />} />
        <Route path=":profile/delete_account" element={<DeleteAccount />} />
        <Route
          path=":profile/:board"
          element={
            // <PrivateRoute>
            <Board />
            // </PrivateRoute>
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

// Component Tree
// const APP = {
//   SignUp: {},
//   LogIn: {},
//   Profile: {
//     Dashboard: Boards,
//   },
//   GuestMode: {
//     allowedComponents: [SignUp, LogIn, Board]
//   },
//   MainHdr: {
//     Auth: {
//       apiReq: ["firebase: download"],
//     }
//   },
//   Boards: {
//     Board: { // ofc, all of them are dndable/
//       apiReq: ["firebase: upload, download", "unsplash: download"],
//       BoardHdr: {},
//       BoardSideBar: {
//         apiReq: ["unsplash: download"],
//       },
//       List: {
//         ListHeader: {
//           sorting: ["by created time, by priority, by completed/uncompleted"]
//         },
//         Items: {
//           Item : {},
//           ItemDetail: {},
//         },
//         ListFooter: "list footer",
//       },
//       BoardFtr: {},
//     },
//   }
// };

// // Database Tree
// const firestore = {
//   "collection-users" : {
//     "user" : {
//       "preference" : {},
//       "boards": {
//         "board": {
//           "lists": {
//             "list": {
//               "item": {}
//             }
//           }
//         }
//       }
//     },
//     "user" : {
//       "preference" : {},
//       "boards": {
//         "board": {
//           "lists": {
//             "list": {
//               "item": {}
//             }
//           }
//         }
//       }
//     },
//   }
// }
