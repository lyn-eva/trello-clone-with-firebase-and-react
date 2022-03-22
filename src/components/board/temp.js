function onlyAlphanumeric(str) {
  return /^\w+$/g.test(str);
}

console.log(onlyAlphanumeric('jkld0_&'))

console.log({f: 3}.valueOf())