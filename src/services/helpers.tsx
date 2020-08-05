import { MovieInstance } from '../features/types';

export const checkStatus = (arrayTocheck: MovieInstance[], title: string): boolean => {
    return arrayTocheck.some(
        (m) => m.title.toLocaleLowerCase() === title.toLocaleLowerCase(),
    ) as boolean;
};
