import { faker } from '@faker-js/faker';
faker.locale = 'gb';

export type BasicDetails = {
	ApplicationReference: string;
	UPN: string;
	UniqueLearnerNumber:
};

const create = () => ({
	Forename: faker.name.firstName(),
	Surname: faker.name.lastName(),
	DOB: faker.date.betweens('1970-01-01', '2006-01-01'),
	gender: Math.random() > 0.5 ? 'M' : 'F',
	

});