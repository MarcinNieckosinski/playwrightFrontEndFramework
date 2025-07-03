import {faker} from '@faker-js/faker';

export const generateRandomWord = (length: number) => {
    return faker.word.noun({length: length})
}