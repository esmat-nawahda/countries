import {
  getByCodeArea,
  getByCode,
  getByAlpha2,
  getByAlpha3,
  getByCountry,
  getByCurrency,
  getByLanguage,
  getByCountryCode,
  searchCountries,
  getByMultipleCodes,
  getByCurrencySymbol,
  getRegions,
  getCurrencies,
  getLanguages,
  isValidCountryCode,
  isValidCurrencyCode,
  isValidPhoneCode,
  formatCountryName,
  compareCountries,
  sortCountriesBy,
  getRandomCountry,
  getFlagUrl,
  getCapitals,
  getCountryByCapital,
  getByIsoCode,
  searchCountriesAdvanced,
  getRegionName,
  getCurrencyDetails,
  getLanguageDetails,
  exportCountriesToCSV,
  validateCountryCodes,
  getCountriesBatch,
  getRegionStats,
  getCountriesUsingCurrency,
  getNeighboringCountries,
} from '../src';

describe('Country Functions', () => {
  // Test with real country data
  it('should get by code area', () => {
    const result = getByCodeArea('EU');
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].region).toBe('EU');
  });

  it('should get by country code', () => {
    const result = getByCode('US');
    expect(result).toBeDefined();
    expect(result?.label).toBe('United States of America');
    expect(result?.code).toBe('US');
  });

  it('should get by country name', () => {
    const result = getByCountry('Canada');
    expect(result).toBeDefined();
    expect(result?.code).toBe('CA');
  });

  it('should get by alpha-2 code', () => {
    const result = getByAlpha2('US');
    expect(result).toBeDefined();
    expect(result?.label).toBe('United States of America');
    expect(result?.code).toBe('US');
    
    // Test case insensitive
    const resultLower = getByAlpha2('us');
    expect(resultLower).toBeDefined();
    expect(resultLower?.code).toBe('US');
  });

  it('should get by alpha-3 code', () => {
    const result = getByAlpha3('USA');
    expect(result).toBeDefined();
    expect(result?.label).toBe('United States of America');
    expect(result?.code).toBe('US');
    
    // Test case insensitive
    const resultLower = getByAlpha3('usa');
    expect(resultLower).toBeDefined();
    expect(resultLower?.code).toBe('US');
    
    // Test another country
    const canada = getByAlpha3('CAN');
    expect(canada).toBeDefined();
    expect(canada?.label).toBe('Canada');
    expect(canada?.code).toBe('CA');
  });

  it('should return undefined for invalid alpha-3 code', () => {
    const result = getByAlpha3('XXX');
    expect(result).toBeUndefined();
  });

  it('should get by currency', () => {
    const result = getByCurrency('USD');
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(c => c.code === 'US')).toBe(true);
  });

  it('should get by language', () => {
    const result = getByLanguage('en');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should get by country phone code', () => {
    const result = getByCountryCode('+1');
    expect(result).toBeDefined();
  });

  // Test new search functionality
  it('should search countries by query', () => {
    const result = searchCountries('united');
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(c => c.label.includes('United'))).toBe(true);
  });

  it('should search countries with specific fields', () => {
    const result = searchCountries('paris', ['capital']);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].capital).toBe('Paris');
  });

  // Test multiple code functionality
  it('should get countries by multiple codes', () => {
    const result = getByMultipleCodes(['US', 'CA', 'MX']);
    expect(result.length).toBe(3);
    expect(result.map(c => c.code).sort()).toEqual(['CA', 'MX', 'US']);
  });

  // Test currency symbol functionality
  it('should get countries by currency symbol', () => {
    const result = getByCurrencySymbol('$');
    expect(result.length).toBeGreaterThan(0);
  });

  // Test region utilities
  it('should get all regions', () => {
    const regions = getRegions();
    expect(regions.length).toBeGreaterThan(0);
    expect(regions).toContain('EU');
    expect(regions).toContain('AS');
  });

  it('should get region statistics', () => {
    const stats = getRegionStats();
    expect(stats.length).toBeGreaterThan(0);
    expect(stats[0]).toHaveProperty('region');
    expect(stats[0]).toHaveProperty('count');
  });

  // Test currency utilities
  it('should get all currencies', () => {
    const currencies = getCurrencies();
    expect(currencies.length).toBeGreaterThan(0);
    expect(currencies[0]).toHaveProperty('code');
    expect(currencies[0]).toHaveProperty('label');
    expect(currencies[0]).toHaveProperty('symbol');
  });

  it('should count countries using a currency', () => {
    const count = getCountriesUsingCurrency('EUR');
    expect(count).toBeGreaterThan(0);
  });

  // Test language utilities
  it('should get all languages', () => {
    const languages = getLanguages();
    expect(languages.length).toBeGreaterThan(0);
    expect(languages[0]).toHaveProperty('code');
    expect(languages[0]).toHaveProperty('label');
  });

  // Test validation utilities
  it('should validate country codes', () => {
    expect(isValidCountryCode('US')).toBe(true);
    expect(isValidCountryCode('XX')).toBe(false);
  });

  it('should validate currency codes', () => {
    expect(isValidCurrencyCode('USD')).toBe(true);
    expect(isValidCurrencyCode('XXX')).toBe(false);
  });

  it('should validate phone codes', () => {
    expect(isValidPhoneCode('+1')).toBe(true);
    expect(isValidPhoneCode('+9999')).toBe(false);
  });

  // Test formatting utilities
  it('should format country names', () => {
    expect(formatCountryName('US')).toBe('United States of America (US)');
    expect(formatCountryName('US', 'short')).toBe('United States of America');
    expect(formatCountryName('XX')).toBeUndefined();
  });

  // Test comparison utilities
  it('should compare countries', () => {
    const comparison = compareCountries('US', 'CA');
    expect(comparison).toBeDefined();
    expect(comparison).toHaveProperty('sameRegion');
    expect(comparison).toHaveProperty('sameCurrency');
    expect(comparison).toHaveProperty('sameLanguage');
  });

  // Test sorting utilities
  it('should sort countries by field', () => {
    const sorted = sortCountriesBy('label');
    expect(sorted.length).toBeGreaterThan(0);
    expect(sorted[0].label.localeCompare(sorted[1].label)).toBeLessThanOrEqual(0);
  });

  // Test random utilities
  it('should get random country', () => {
    const country = getRandomCountry();
    expect(country).toBeDefined();
    expect(country).toHaveProperty('code');
    expect(country).toHaveProperty('label');
  });

  // Test flag utilities
  it('should get flag URL with different sizes', () => {
    const url = getFlagUrl('US', '96x72');
    expect(url).toBeDefined();
    expect(url).toContain('96x72');
  });

  // Test capital utilities
  it('should get all capitals', () => {
    const capitals = getCapitals();
    expect(capitals.length).toBeGreaterThan(0);
    expect(capitals[0]).toHaveProperty('country');
    expect(capitals[0]).toHaveProperty('capital');
  });

  it('should get country by capital', () => {
    const country = getCountryByCapital('Washington, D.C.');
    expect(country).toBeDefined();
    expect(country?.code).toBe('US');
  });

  // Test ISO code utilities
  it('should get by ISO code', () => {
    const country = getByIsoCode('840');
    expect(country).toBeDefined();
    expect(country?.code).toBe('US');
  });

  // Test advanced search
  it('should search with filters', () => {
    const result = searchCountriesAdvanced('a', {
      regions: ['EU'],
      currencies: ['EUR']
    });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(c => c.region === 'EU')).toBe(true);
  });

  // Test region name mapping
  it('should get region name', () => {
    expect(getRegionName('EU')).toBe('Europe');
    expect(getRegionName('AS')).toBe('Asia');
  });

  // Test currency details
  it('should get currency details', () => {
    const details = getCurrencyDetails('USD');
    expect(details).toBeDefined();
    expect(details?.code).toBe('USD');
    expect(details?.countries.length).toBeGreaterThan(0);
  });

  // Test language details
  it('should get language details', () => {
    const details = getLanguageDetails('en');
    expect(details).toBeDefined();
    expect(details?.code).toBe('en');
    expect(details?.countries.length).toBeGreaterThan(0);
  });

  // Test export utilities
  it('should export to CSV', () => {
    const csv = exportCountriesToCSV();
    expect(csv).toBeDefined();
    expect(csv).toContain('"Name","Code","Capital"');
  });

  // Test batch operations
  it('should validate country codes batch', () => {
    const result = validateCountryCodes(['US', 'CA', 'XX', 'MX', 'YY']);
    expect(result.valid).toEqual(['US', 'CA', 'MX']);
    expect(result.invalid).toEqual(['XX', 'YY']);
  });

  it('should get countries batch', () => {
    const result = getCountriesBatch(['US', 'CA', 'XX']);
    expect(result.length).toBe(3);
    expect(result[0]?.code).toBe('US');
    expect(result[1]?.code).toBe('CA');
    expect(result[2]).toBeUndefined();
  });

  // Test neighboring countries
  it('should get neighboring countries by region', () => {
    const neighbors = getNeighboringCountries('DE');
    expect(neighbors.length).toBeGreaterThan(0);
    expect(neighbors.every(c => c.region === 'EU')).toBe(true);
    expect(neighbors.every(c => c.code !== 'DE')).toBe(true);
  });
});
