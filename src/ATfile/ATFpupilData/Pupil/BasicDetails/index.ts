import { faker } from '@faker-js/faker';

faker.locale = 'en_GB';

export type BasicDetails = {
  UPN: string;
  PreferredSurname: string;
  FormerSurname: string;
  PreferredForename: string;
  MiddleNames: string;
  NCyearActual: string;
  Ethnicity: string;
  EthnicitySource: string;
  Languages: { // not an array?
    Type: {

    }
  }[];
};

const create = () => ({

});

export { create };
