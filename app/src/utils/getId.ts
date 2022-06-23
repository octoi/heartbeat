import moment from 'moment';

export const getId = (time: number) => {
  return moment(time).format('YYMMDDHHmm');
};
