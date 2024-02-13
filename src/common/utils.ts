import { format } from 'date-fns';

/**
 * @description: Function to format the date to DD MMM, YYYY
 * @param {string} date
 */
export const formatDate = (date: string) => {
    return format(date, 'dd MMM, yyyy');
};
