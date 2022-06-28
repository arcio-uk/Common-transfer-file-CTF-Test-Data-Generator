import { create as cHeader, Header } from 'ATfile/Header';
import { ATFpupilData as ATFpupilDataType, create as cATFpupilData } from 'ATfile/ATFpupilData';

type ATfile = {
  header: Header;
  ATFpupilData: ATFpupilDataType;
}

const create = (PUPILS_TO_GENERATE: number): ATfile => {
  const header = cHeader();
  const ATFpupilData = cATFpupilData(header, PUPILS_TO_GENERATE);
  return {
    header,
    ATFpupilData,
  };
};

export { create };
