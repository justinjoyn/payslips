import moment from 'moment';

/**
 * @description: Function to format the date to DD MMM, YYYY
 * @param {string} date
 */
export const formatDate = (date: string) => {
    return moment(date).format('DD MMM, YYYY');
};
