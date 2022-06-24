import { faker } from '@faker-js/faker';

faker.locale = 'en_GB';

export type BasicDetails = {
  ApplicationReference: string;
  UPN: string;
  UniqueLearnerNumber: number;
};

const create = () => ({

});

export { create };
