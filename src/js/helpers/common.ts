export let times = (i, cb, l = i) => {
  if (i === 0) {
    return;
  }

  cb(l - i);
  times(i - 1, cb, l);
};
