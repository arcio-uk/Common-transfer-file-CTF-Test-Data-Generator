import { faker } from '@faker-js/faker';

type Phones = {
  TelephoneType?: string;
  PhoneNo: string;
}[];

const create = (): Phones => {
  const phoneTypes = ['F', 'H', 'A', 'M', 'W', 'D'];
  return [...Array(Math.floor(Math.random() * 3)).keys()].map(() => ({
    TelephoneType: phoneTypes[Math.floor(Math.random() * phoneTypes.length)],
    PhoneNo: faker.phone.number(),
  }));
};

export { Phones, create };
