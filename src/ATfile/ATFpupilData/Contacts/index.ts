import { faker, Gender } from '@faker-js/faker';
import {
  getRandomTitle, getRelationship, optionalRand, Address, generateAddress, SuppInfo,
} from 'misc/misc';

faker.locale = 'gb';

export type Contact = {
  Order?: number;
  Title?: string;
  Surname: string;
  Forename?: string;
  MiddleNames?: string;
  Gender?: string;
  Relationship: string;
  Responsibility?: string;
  Address?: Address;
  Phones?: any[];
  Email?: any;
  SuppInfo?: SuppInfo;
};

const create = () => {
  // True = Male, False = Female
  const genderBool = Math.random() > 0.5;
  const gender = genderBool ? Gender.male : Gender.female;
  const foreName = faker.name.firstName(gender);
  const surName = faker.name.lastName();
  const middleName = faker.name.middleName(gender);

  return {
    Order: optionalRand(faker.datatype.number({ min: 1, max: 10 })),
    Title: optionalRand(getRandomTitle(genderBool)),
    Surname: surName,
    Forename: optionalRand(foreName),
    MiddleNames: optionalRand(middleName),
    Gender: optionalRand(genderBool ? 'M' : 'F'),
    Relationship: getRelationship(genderBool),
    Responsibility: optionalRand(Math.random() < 0.7),
    Address: optionalRand(generateAddress()),
  };
};

export { create };
