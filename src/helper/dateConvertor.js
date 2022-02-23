export const dateConvertor = (validDate, startDate, endDate) => {
  startDate = startDate ? startDate : '';
  endDate = endDate ? endDate : '';

  const date = validDate
    ? (startDate + '-' + endDate).toString()
    : new Date(startDate).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }) +
      '-' +
      new Date(endDate).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });

  return date;
};
