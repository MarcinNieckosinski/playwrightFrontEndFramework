import {faker} from '@faker-js/faker';

export const generateRandomUser = () => {
    return {
        username: faker.word.noun({length: 8}),
        password: faker.word.noun({length: 8})
    }
}