import { faker } from '@faker-js/faker';

faker.locale = 'en_GB';

type Phones = {
  Phone: {
    TelephoneType?: string;
    PhoneNo: string;
  }[];
};

const create = (): Phones => {
  const phoneTypes = ['F', 'H', 'A', 'M', 'W', 'D'];
  return {
    Phone: [...Array(Math.floor(Math.random() * 3)).keys()].map(() => ({
      TelephoneType: phoneTypes[Math.floor(Math.random() * phoneTypes.length)],
      PhoneNo: faker.phone.number(),
    })),
  };
};

export { Phones, create };
