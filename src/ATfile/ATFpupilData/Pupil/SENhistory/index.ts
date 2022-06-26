import { faker } from '@faker-js/faker';
import {
  SuppInfo, createSuppInfo, optionalRand, getDateFromString,
} from 'misc/misc';
import moment from 'moment';

const SENprovisions = ['N', 'E', 'K'];
const SENtypes = ['PLD', 'MLD', 'SLD', 'PMLD', 'SEMH', 'SLCN', 'HI', 'VI', 'MSI', 'PD', 'ASD', 'OTH', 'NSA*'];

type SENneedType = {
  NeedStartDate?: string;
  NeedEndDate?: string;
  SENtypeRank: number; // 1 to 99, ranked needs
  SENtype: string;// any of the SEN types
}[];

type SENhistory = {
  SEN: {
      StartDate: string;
      SENprovision: string; // N, E or K
  }[];
  SENneeds?: {
    SENneed: SENneedType;
  };
  SuppInfo?: SuppInfo;
};

const create = (DOB: string) => {
  const DOBdate = getDateFromString(DOB);
  const SEN: SENhistory['SEN'] = [...Array(Math.floor(Math.random() * 3) + 1).keys()].map(() => ({
    StartDate: moment(faker.date.between(DOBdate, Date.now())).format('DD/MM/YY'),
    SENprovision: SENprovisions[Math.floor(Math.random() * SENprovisions.length)],
  }));
  const senNeedsCount = Math.floor(Math.random() * SENtypes.length - 1) + 1;
  const SENneed: SENneedType = [...Array(senNeedsCount).keys()].map((index) => {
    const maxStartDate = new Date();
    const startDate = faker.date.between(DOBdate, maxStartDate.setMonth(maxStartDate.getMonth() - 1));
    const endDate = faker.date.between(startDate, new Date());
    return {
      NeedStartDate: optionalRand(moment(startDate).format('DD/MM/YYYY')),
      NeedEndDate: optionalRand(moment(endDate)).format('DD/MM/YYYY'),
      SENtypeRank: index,
      SENtype: SENtypes[Math.floor(Math.random() * SENtypes.length)],
    };
  });

  return {
    SEN,
    SENneeds: optionalRand({ SENneed }),
    SuppInfo: createSuppInfo(),
  };
};

export { SENhistory, create };
