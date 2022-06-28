import { create as cHeader } from 'ATfile/Header';
import { create as cATFpupilData } from 'ATfile/ATFpupilData';

const create = (PUPILS_TO_GENERATE: number) => {
  const header = cHeader();
  const ATFpupilData = cATFpupilData(header, PUPILS_TO_GENERATE);
  return {
    header,
    ATFpupilData,
  };
};

export { create };
