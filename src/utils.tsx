const addObj = (obj: any, objSetter: (arg0: any) => void, id: any) => {
  objSetter({ [id]: true, ...obj });
};

const removeObj = (
  obj: { [x: string]: any },
  objSetter: (arg0: any) => void,
  id: string | number
) => {
  const newObj = Object.keys(obj)
    .filter((key) => key !== id)
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: obj[key] });
    }, {});
  console.log(newObj);
  objSetter(newObj);
};

const toDollars = (num: number | bigint) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(num);
};

export { addObj, removeObj, toDollars };
