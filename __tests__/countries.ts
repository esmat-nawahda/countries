import {
  getByCodeArea,
  getByCode,
  getByCountry,
  getByCurrency,
  getByLanguage,
  getByCountryCode,
} from '../src';  // Adjust the path accordingly
import { Country } from '../src/country.interface';

// Sample data for testing
const mockCountry: Country = {
  label: "Testland",
  code: "TS",
  capital: "TestCity",
  region: "TE",
  currency: {
    code: "TSD",
    label: "Test Dollar",
    symbol: "$T",
  },
  language: {
    code: "ts",
    label: "Testish",
  },
  flag: "http://testflag.com",
  countryCode: "+999",
  isoCode: "999",
};

describe('Country Functions', () => {
  it('should get by code area', () => {
    const result = getByCodeArea('TE');
    expect(result).toEqual([mockCountry]);
  });

  it('should get by country code', () => {
    const result = getByCode('TS');
    expect(result).toEqual(mockCountry);
  });

  it('should get by country name', () => {
    const result = getByCountry('Testland');
    expect(result).toEqual(mockCountry);
  });

  it('should get by currency', () => {
    const result = getByCurrency('TSD');
    expect(result).toEqual([mockCountry]);
  });

  it('should get by language', () => {
    const result = getByLanguage('ts');
    expect(result).toEqual([mockCountry]);
  });

  it('should get by country phone code', () => {
    const result = getByCountryCode('+999');
    console.log(result)
    expect(result).toEqual(mockCountry);
  });
});
