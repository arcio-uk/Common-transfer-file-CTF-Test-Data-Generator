import { Header } from 'ATfile/Header';
import { Pupil, create as cPupil } from './Pupil';

type ATFpupilData = {
  Pupil: Pupil[];
};

const create = (header: Header, PUPILS_TO_GENERATE: number) => ({
  Pupil: [...Array(PUPILS_TO_GENERATE).keys()].map(() => cPupil(header)),
});

export { ATFpupilData, create };
