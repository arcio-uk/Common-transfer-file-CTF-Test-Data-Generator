import { faker } from '@faker-js/faker';

export type SuppInfo = {
  SuppId: String;
  annotation?: {
    documentation: string[];
  }
  // can have anything else in here
  // TODO: need to add ability to have anything else in here
} | any;

const create = () => ({
  SuppId: faker.datatype.uuid(),
  [faker.animal.type()]: JSON.parse(faker.datatype.json()),
});

export { create };
