export const YearsList = (extraYears?: number) => {
  const currentYear = (new Date()).getFullYear();
  const startYear = 1940;
  let years = [];
  let actualYears = extraYears ? extraYears + currentYear : currentYear;

  for (var i = actualYears; i >= startYear; i--) {
    years.push(i);
  }
  return years;
};
