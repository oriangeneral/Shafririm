export let times = (i: number, cb: (n: number) => any, l = i) => {
  if (i === 0) {
    return;
  }

  cb(l - i);
  times(i - 1, cb, l);
};
