import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import Board from "./components/board/Board";
import { useTrello } from "./components/context/Context";

const Login = lazy(() => import("./components/form/Login"));
const SignUp = lazy(() => import("./components/form/SignUp"));

function App() {
  const { BG_THEME } = useTrello();

  const fallback = <p>Loading ...</p>;

  return (
    // <Suspense fallback={fallback}>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    // </Suspense>
    <main className='h-screen' style={{ backgroundColor: `${BG_THEME}`}}>
      <Board />
    </main>
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
