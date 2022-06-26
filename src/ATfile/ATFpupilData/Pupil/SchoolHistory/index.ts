import { faker } from '@faker-js/faker';
import GetRandomSchool from 'misc/GetRandomSchool';
import { getDateFromString, optionalRand, SuppInfo } from 'misc/misc';
import moment from 'moment';

const leavingReasons = ['PM', 'PI', 'PF', 'IM', 'II', 'IF', 'NH', 'NT', 'NE', 'NU', 'AT', 'EL', 'PE', 'LC', 'DD', 'OR', 'MI', 'UK'];

type SchoolHistory = {
  School: {
    LEA: string;
    Estab: string;
    URN?: number;
    SchoolName: string;
    EntryDate?: string;
    LeavingDate?: string;
    LeavingReason?: string;
    SuppInfo?: SuppInfo;
  }[]
};

const create = (DOB: string) => {
  const schoolsInHistory = Math.floor(Math.random() * 5) + 1;
  const School = [...Array(schoolsInHistory).keys()].reduce((prev: SchoolHistory['School']) => {
    const school = GetRandomSchool();
    const DOBdate = getDateFromString(DOB);
    // Get the most recent date, if it exists, otherwise use the DOB
    const lastSchoolDate: Date = prev.reduce((recent, next) => {
      let recentDateString = '';
      if (next.LeavingDate) {
        recentDateString = next.LeavingDate;
      } else if (next.EntryDate) {
        recentDateString = next.EntryDate;
      }
      const recentDate = getDateFromString(recentDateString);
      return recentDate < recent ? recent : recentDate;
    }, DOBdate);
    const maxDate = (lastSchoolDate.getTime() + Date.now()) / 2;
    const EntryDate = faker.date.between(lastSchoolDate, maxDate);
    const LeavingDate = faker.date.between(EntryDate, maxDate);
    prev.push({
      LEA: school['LA (code)'],
      Estab: school.EstablishmentNumber,
      URN: optionalRand(school.URN),
      SchoolName: school.EstablishmentName,
      EntryDate: optionalRand(moment(EntryDate).format('DD/MM/YYYY')),
      LeavingDate: optionalRand(moment(LeavingDate).format('DD/MM/YYYY')),
      LeavingReason: optionalRand(leavingReasons[Math.floor(Math.random() * leavingReasons.length)]),
    });
    return prev;
  }, []);
  return {
    School,
  };
};

export { SchoolHistory, create };
