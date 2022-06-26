import { faker } from '@faker-js/faker';
import { getDateFromString, optionalRand } from 'misc/misc';
import moment from 'moment';

const UKCountries = ['ENG', 'NIR', 'SCT', 'WLS'];

type FSMhistory = {
  FSMreviewDate?: string;
  FSMinstance: {
    FSMstartDate: string;
    FSMendDate?: string;
    UKcountry?: string;
  }[];
};

const create = (DOB: string): FSMhistory => {
  const DOBdate = new Date(getDateFromString(DOB));
  DOBdate.setFullYear(DOBdate.getFullYear() + 3);
  const FSMreviewDate = faker.date.between(DOBdate, Date.now());

  const FSMinstance = [...Array(Math.floor(Math.random() * 3) + 1).keys()].reduce((prev: FSMhistory['FSMinstance']) => {
    let FSMstartDate;
    if (prev.length === 0) {
      FSMstartDate = faker.date.between(FSMreviewDate, Date.now());
    } else {
      const oldEnd = prev[prev.length - 1].FSMendDate;
      FSMstartDate = faker.date.between(oldEnd ? getDateFromString(oldEnd) : FSMreviewDate, Date.now());
    }

    const FSMendDate = faker.date.between(FSMstartDate, Date.now());
    const UKcountry = moment('1/12/2012', 'DD/MM/YYYY').toDate() < FSMendDate
      ? UKCountries[Math.floor(Math.random() * UKCountries.length)] : undefined;
    prev.push({
      FSMstartDate: optionalRand(moment(FSMstartDate).format('DD/MM/YYYY')),
      FSMendDate: moment(FSMendDate).format('DD/MM/YYYY'),
      UKcountry,
    });
    return prev;
  }, []);
  return {
    FSMreviewDate: moment(FSMreviewDate).format('DD/MM/YYYY'),
    FSMinstance,
  };
};

export { FSMhistory, create };
