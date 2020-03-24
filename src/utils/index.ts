/**
 * 深拷贝
 */
export const deepCopy = (o: Record<string, any>): any => {
  if (o instanceof Array) {
    const n: any = [];
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else if (o instanceof Object) {
    const n: object = {};
    for (const i in o) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else {
    return o;
  }
};
