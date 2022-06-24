import { faker } from '@faker-js/faker';
import { SuppInfo, createSuppInfo } from 'misc/misc';
import moment from 'moment';

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

const create = (DOB: string) => {
  const SEN: SENhistory['SEN'] = [...Array(Math.floor(Math.random() * 3)+1).keys()].map(() => ({
    SEN: {
      StartDate: moment(faker.date.between(moment(DOB, 'DD/MM/YYYY').date(), Date.now())).format('DD/MM/YY'),
      SENprovision: SENprovisions[Math.floor(Math.random() * SENprovisions.length)],
    },
  }));

  

  return {
    SEN,
    SuppInfo: createSuppInfo(),
  };
};

export { SENhistory, create };
