import { faker } from '@faker-js/faker';

faker.locale = 'gb';

export type BasicDetails = {
  ApplicationReference: string;
  UPN: string;
  UniqueLearnerNumber: number;
};

const create = () => ({

});

export { create };
