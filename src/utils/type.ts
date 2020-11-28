/* eslint-disable */
export const isArray = (n: any): n is any[] => {
  return Object.prototype.toString.call(n) === '[object Array]';
}
