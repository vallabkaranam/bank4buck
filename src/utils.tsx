const addObj = (
  obj: { [x: string]: boolean | string },
  objSetter: (object: object) => void,
  id: string,
  content: boolean | string = true
) => {
  objSetter({ ...obj, [id]: content });
};

const removeObj = (
  obj: { [x: string]: boolean | string },
  objSetter: (object: object) => void,
  id: string
) => {
  const newObj = Object.keys(obj)
    .filter((key) => key !== id)
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: obj[key] });
    }, {});
  objSetter(newObj);
};

const toDollars = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const limit = 20;

const bankUrl = `https://banks.data.fdic.gov/api/institutions`;
const locationsUrl = `https://banks.data.fdic.gov/api/locations`;

export { addObj, removeObj, toDollars, limit, bankUrl, locationsUrl };
