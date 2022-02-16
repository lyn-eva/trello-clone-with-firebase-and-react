import Board from "./components/board/Board";

function App() {
  return (
    <div className="text-list-clr">
      <Board />
    </div>
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
//         listHdr: {
//           sorting: ["by created time, by priority, by completed/uncompleted"]
//         },
//         Items: {
//           Item : {},
//           ItemDetail: {},
//         },
//         listFtr: "list footer",
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
