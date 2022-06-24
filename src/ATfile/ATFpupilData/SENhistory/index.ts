import { SuppInfo, createSuppInfo } from 'misc/misc';

const SENprovisions = ['N', 'E', 'K'];
const SENtypes = ['PLD', 'MLD', 'SLD', 'PMLD', 'SEMH', 'SLCN', 'HI', 'VI', 'MSI', 'PD', 'ASD', 'OTH', 'NSA*'];

type SENhistory = {
  SEN: {
    SEN: {
      StartDate: string;
      SENprovision: string; // N, E or K
    }
  }[];
  SENneeds?: {
    SENneed: {
      NeedStartDate?: string;
      NeedEndDate?: string;
      SENtypeRank: number; // 1 to 99, ranked needs
      SENtype: string;// any of the SEN types
    }[];
  }[];
  SuppInfo?: SuppInfo;
};

const create = (pupil: Pupil) => {
  const SEN: SENhistory['SEN'] = [...Array(Math.floor(Math.random() * 3)).keys()].map(() => {
    StartDate
  });

  return {
    SuppInfo: createSuppInfo(),
  };
};

export { SENhistory, create };
