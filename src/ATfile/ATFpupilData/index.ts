import { Header } from 'ATfile/Header';
import { Pupil, create as cPupil } from './Pupil';

type ATFpupilData = {
  Pupils: Pupil[];
};

const create = (header: Header) => {
  const amount = 1;// Math.floor(Math.random() * 2)+1;
  return {
    Pupils: [...Array(amount).keys()].map(() => cPupil(header)),
  };
};

export { ATFpupilData, create };
