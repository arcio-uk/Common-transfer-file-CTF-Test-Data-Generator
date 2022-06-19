import { create as cHeader } from 'ATfile/Header';
import { create as cATFpupilData } from 'ATfile/ATFpupilData';

const create = () => {
  const header = cHeader();
  const ATFpupilData = cATFpupilData(header);
  return {
    header,
    ATFpupilData,
  };
};

export { create };
