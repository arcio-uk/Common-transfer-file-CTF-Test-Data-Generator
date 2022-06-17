/**
 * This generates a random timestamp, within a given time frame
 *
 * @param {Date} start The start date
 * @param {Date} end The end date, optional (default now + 10 months)
 * @param {Boolean} workHours Whether or not the time should be within work hours
 * @returns {Number}
 */
const GenerateRandomDate = (start: number | Date, end: Date | undefined, workHours: boolean = false): Date => {
  const startDate = new Date(start);
  const endDate = end || new Date();

  if (end === undefined) endDate.setMonth(endDate.getMonth() + 10);

  const d = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  if (workHours) {
    d.setHours(9 + Math.floor(Math.random() * 8), 0, 0, 0);
  } else {
    d.setHours(Math.floor(Math.random() * 23), 0, 0, 0);
  }
  if (startDate.getHours() > d.getHours()) {
    d.setHours(startDate.getHours() + 1);
  }
  return d;
};

export default GenerateRandomDate;
