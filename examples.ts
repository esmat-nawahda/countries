import {
    searchCountries,
    searchCountriesAdvanced,
    getByMultipleCodes,
    getByCurrencySymbol,
    getRegions,
    getRegionStats,
    getCurrencies,
    getLanguages,
    isValidCountryCode,
    formatCountryName,
    compareCountries,
    sortCountriesBy,
    getRandomCountries,
    getFlagUrl,
    getCapitals,
    getCountryByCapital,
    getCurrencyDetails,
    getLanguageDetails,
    exportCountriesToCSV,
    validateCountryCodes,
    getNeighboringCountries,
    getRegionName,
    getRegionsWithNames,
    getCountriesUsingCurrency,
    formatPhoneNumber
} from './src';

// 1. Search functionality
console.log('=== Search Examples ===');

// Basic search
const searchResults = searchCountries('united');
console.log('Countries containing "united":', searchResults.map(c => c.label));

// Search in specific fields
const capitalSearch = searchCountries('paris', ['capital']);
console.log('Countries with capital containing "paris":', capitalSearch.map(c => `${c.label} - ${c.capital}`));

// Advanced search with filters
const advancedResults = searchCountriesAdvanced('a', {
    regions: ['EU'],
    currencies: ['EUR']
});
console.log('EU countries using EUR containing "a":', advancedResults.map(c => c.label));

// 2. Batch operations
console.log('\n=== Batch Operations ===');

const multipleCodes = getByMultipleCodes(['US', 'CA', 'MX']);
console.log('North American countries:', multipleCodes.map(c => c.label));

const validation = validateCountryCodes(['US', 'CA', 'XX', 'MX', 'YY']);
console.log('Valid codes:', validation.valid);
console.log('Invalid codes:', validation.invalid);

// 3. Currency utilities
console.log('\n=== Currency Features ===');

const dollarCountries = getByCurrencySymbol('$');
console.log('Countries using $ symbol:', dollarCountries.map(c => c.label).slice(0, 5) + '...');

const euroDetails = getCurrencyDetails('EUR');
console.log('EUR details:', euroDetails);

const euroCount = getCountriesUsingCurrency('EUR');
console.log(`Number of countries using EUR: ${euroCount}`);

// 4. Region utilities
console.log('\n=== Region Features ===');

const regions = getRegionsWithNames();
console.log('All regions:', regions);

const regionStats = getRegionStats();
console.log('Countries per region:', regionStats);

// 5. Language utilities
console.log('\n=== Language Features ===');

const languages = getLanguages();
console.log(`Total languages: ${languages.length}`);
console.log('Sample languages:', languages.slice(0, 5));

const englishDetails = getLanguageDetails('en');
console.log('English language details:', englishDetails);

// 6. Validation and formatting
console.log('\n=== Validation & Formatting ===');

console.log('Is "US" valid?', isValidCountryCode('US'));
console.log('Is "XX" valid?', isValidCountryCode('XX'));

console.log('Format US (full):', formatCountryName('US'));
console.log('Format US (short):', formatCountryName('US', 'short'));

const phoneFormatted = formatPhoneNumber('1234567890', 'US');
console.log('Formatted US phone:', phoneFormatted);

// 7. Comparison and relationships
console.log('\n=== Country Comparisons ===');

const comparison = compareCountries('US', 'CA');
console.log('US vs CA comparison:', comparison);

const neighbors = getNeighboringCountries('DE');
console.log('Germany\'s neighbors (by region):', neighbors.map(c => c.label).slice(0, 5) + '...');

// 8. Sorting and selection
console.log('\n=== Sorting & Selection ===');

const sortedByName = sortCountriesBy('label', 'asc');
console.log('First 5 countries alphabetically:', sortedByName.slice(0, 5).map(c => c.label));

const randomCountries = getRandomCountries(3);
console.log('3 random countries:', randomCountries.map(c => c.label));

// 9. Capital cities
console.log('\n=== Capital Cities ===');

const capitals = getCapitals();
console.log('First 5 capitals:', capitals.slice(0, 5));

const countryByCapital = getCountryByCapital('Tokyo');
console.log('Country with capital Tokyo:', countryByCapital?.label);

// 10. Flag utilities
console.log('\n=== Flag Features ===');

const flagSmall = getFlagUrl('JP');
const flagLarge = getFlagUrl('JP', '192x144');
console.log('Japan flag (small):', flagSmall);
console.log('Japan flag (large):', flagLarge);

// 11. Export functionality
console.log('\n=== Export Features ===');

const csvExport = exportCountriesToCSV();
console.log('CSV export (first 200 chars):', csvExport.substring(0, 200) + '...');

console.log('\n=== Demo Complete ===');