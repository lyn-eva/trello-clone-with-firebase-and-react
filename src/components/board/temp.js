let ary = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 1],
  [4, 1],
  [4, 3],
];

const res = [];

function isCyclic(vertex, idx, queue = []) {
  console.log("\nqueue", queue);
  console.log('current vertex: ', vertex)
  let index;
  for (let i = 0; i < ary.length; i++) {
    const edge = ary[i];
    console.log("round:", i, "edge:", edge);
    if (idx !== i && edge[0] === vertex[1]) {
      if (queue.indexOf(edge[1]) !== -1) {
        res.push(edge);
        console.log("||looped edge: ", edge);
        console.log('\n<<< is cyclic >>>');
        break;
      }
      index = i;
      // break;
      queue.push(vertex[0]);
      isCyclic(ary[index], index, queue);
    }
  }
  return false;
}

console.log(isCyclic([0,1], 0));

console.log("\ncyclic edge", res)