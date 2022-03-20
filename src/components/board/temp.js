// const query =
//   "user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue";
// const paths = query.split("&");
// const main = query.match(/^\w+/g);
// // console.log(main)
// const temp = { [main] : null };
// const segments = paths.map((path) => path.match(/^.+(?==)/g)[0].split("."));
// segments.forEach((seg) => {
//   let segment = temp[main];
//   seg.slice(1).forEach((path) => {
//     segment[path] = {}
//   });
// });

// console.log(temp)
let sus = [1,2,3,4,5]
console.log(sus.slice(1,3)+sus.slice(4))