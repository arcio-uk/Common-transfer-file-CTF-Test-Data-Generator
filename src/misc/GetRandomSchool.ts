import Schools from 'data/edubasealldata.json';

export type school = {
  URN: string;
  [key: string]: any;
};

const GetRandomSchool = (exclude?: school[]) => {
  const schoolsArray:school[] = Schools as school[];
  let selected = schoolsArray[Math.floor(Math.random() * schoolsArray.length)];
  if (exclude) {
    let count = 0;
    // eslint-disable-next-line no-loop-func
    while (exclude.find((x) => x.URN === selected.URN)) {
      selected = schoolsArray[Math.floor(Math.random() * schoolsArray.length)];
      if (count++ > 50) throw new Error("Error, while loop ran 50 times and couldn't find a unique school!");
    }
  }

  return selected;
};

export default GetRandomSchool;
