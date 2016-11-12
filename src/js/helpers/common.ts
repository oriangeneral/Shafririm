export const times = (i: number, cb: (n: number) => any, l = i) => {
  if (i === 0) {
    return;
  }

  cb(l - i);
  times(i - 1, cb, l);
};

export const shuffle = (array: Array<any>): Array<any> => {
  let currentIndex = array.length;
  let temporaryValue: any;
  let randomIndex: number;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
