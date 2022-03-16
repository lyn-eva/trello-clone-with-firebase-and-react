import { memo } from "react";
import List from "./List";

function Lists({ lists, notes }) {
  console.log('listssss re');

  return lists.map(({ id, title }, i) => {
    // console.log({notes})
    // console.log('note rerendered')
    return <List index={i} key={id} id={id} title={title} notes={notes[id]} />;
  });
}

export default memo(Lists);
// export default memo(Lists, (prev, next) => {
//   console.log(prev, next);
//   return prev.id === [prev.title]
// });
