const { dateDifference, getRelativeDateString } = require('../js/utils');

describe('Utils function test case', () => {
  describe('Difference between two dates', function () {
    test('should handle negative differences correctly', () => {
      const startDate = 1691260200000; // 6 August 2023
      const endDate = 1674153000000; // 20 January 2023
      const difference = dateDifference(startDate, endDate);

      expect(difference).toEqual({ years: 0, months: 6, days: 17 });
    });

    test('should return correct date difference object', () => {
      const startDate = 1674153000000; // 20 January 2023
      const endDate = 1691260200000; // 6 August 2023
      const difference = dateDifference(startDate, endDate);

      expect(difference).toEqual({ years: 0, months: 6, days: 17 });
    });

    test('should handle date in the same month correctly', () => {
      const startDate = 1674153000000; // 20 January 2023
      const endDate = 1674844200000; // 28 January 2023
      const difference = dateDifference(startDate, endDate);

      expect(difference).toEqual({ years: 0, months: 0, days: 8 });
    });

    test('should handle date in different years correctly', () => {
      const startDate = 1640889000000; // 31 December 2021
      const endDate = 1640975400000; // 1 January 2022
      const difference = dateDifference(startDate, endDate);

      expect(difference).toEqual({ years: 0, months: 0, days: 1 });
    });
  });

  describe('Get relative date string', function () {
    it('returns correct string for years', () => {
      const dateDiffObj = { years: 2, months: 0, days: 0 };
      const result = getRelativeDateString(dateDiffObj);
      expect(result).toBe('2 years ago');
    });
    it('returns correct string for months', () => {
      const dateDiffObj = { years: 0, months: 3, days: 0 };
      const result = getRelativeDateString(dateDiffObj);
      expect(result).toBe('3 months ago');
    });
    it('returns correct string for days', () => {
      const dateDiffObj = { years: 0, months: 0, days: 5 };
      const result = getRelativeDateString(dateDiffObj);
      expect(result).toBe('5 days ago');
    });
    it('returns correct string for 1 day', () => {
      const dateDiffObj = { years: 0, months: 0, days: 1 };
      const result = getRelativeDateString(dateDiffObj);
      expect(result).toBe('1 day ago');
    });
    it('returns "within a day" for less than a day', () => {
      const dateDiffObj = { years: 0, months: 0, days: 0.5 };
      const result = getRelativeDateString(dateDiffObj);
      expect(result).toBe('within a day');
    });
  });
});
