# Country Information Finder 🌎

A powerful and lightweight TypeScript library providing comprehensive country data and intelligent search capabilities. Access detailed information about countries including currencies, languages, capitals, regions, and more through an extensive API.

## Features 🌟

- **Rich Data Source**: Complete country data including codes, capitals, currencies, languages, flags, and phone codes
- **Advanced Search**: Fuzzy search with field-specific filtering and advanced query options
- **Batch Operations**: Process multiple countries efficiently in single operations
- **Type Safety**: Full TypeScript support with detailed interfaces
- **Zero Dependencies**: Lightweight and self-contained
- **60+ Functions**: Extensive API covering every use case
- **Validation Utilities**: Built-in validators for country codes, currencies, and phone numbers
- **Export Capabilities**: Export data as CSV or JSON
- **Comparison Tools**: Compare countries by region, currency, and language

## Installation 📦

```bash
# npm
npm install countries-ts

# yarn
yarn add countries-ts

# pnpm
pnpm add countries-ts
```

## Quick Start 🚀

```typescript
import { 
  searchCountries, 
  getByCode, 
  formatCountryName,
  getCurrencyDetails 
} from 'countries-ts';

// Search for countries
const countries = searchCountries('united');
// Returns: United States, United Kingdom, United Arab Emirates

// Get detailed country information
const usa = getByCode('US');
console.log(usa.capital); // Washington, D.C.

// Format country names
console.log(formatCountryName('US')); // United States of America (US)

// Get currency information
const usdInfo = getCurrencyDetails('USD');
console.log(usdInfo.countries); // List of countries using USD
```

## Core API Reference 📘

### Basic Queries

#### `getByCode(code: string): Country | undefined`
Get country by ISO 3166-1 alpha-2 code.
```typescript
const japan = getByCode('JP');
```

#### `getByAlpha2(alpha2: string): Country | undefined`
Get country by ISO 3166-1 alpha-2 code (case-insensitive).
```typescript
const usa = getByAlpha2('US');
const uk = getByAlpha2('gb'); // Case-insensitive
```

#### `getByAlpha3(alpha3: string): Country | undefined`
Get country by ISO 3166-1 alpha-3 code (case-insensitive).
```typescript
const germany = getByAlpha3('DEU');
const canada = getByAlpha3('can'); // Case-insensitive
```

#### `getByCountry(name: string): Country | undefined`
Get country by name.
```typescript
const france = getByCountry('France');
```

#### `getByCodeArea(region: string): Country[]`
Get countries by region code.
```typescript
const europeanCountries = getByCodeArea('EU');
```

#### `getByCurrency(code: string): Country[]`
Get countries using a specific currency.
```typescript
const euroCountries = getByCurrency('EUR');
```

#### `getByLanguage(code: string): Country[]`
Get countries by language code.
```typescript
const spanishSpeaking = getByLanguage('es');
```

#### `getByCountryCode(phoneCode: string): Country | undefined`
Get country by phone code.
```typescript
const country = getByCountryCode('+44'); // United Kingdom
```

#### `listCountries(): Country[]`
Get all countries.
```typescript
const allCountries = listCountries();
```

### Search & Filtering

#### `searchCountries(query: string, fields?: (keyof Country)[]): Country[]`
Search countries with fuzzy matching.
```typescript
// Search in all default fields
const results = searchCountries('par');

// Search only in capitals
const capitals = searchCountries('paris', ['capital']);
```

#### `searchCountriesAdvanced(query: string, filters?: SearchFilters): Country[]`
Advanced search with multiple filters.
```typescript
const filtered = searchCountriesAdvanced('a', {
  regions: ['EU', 'AS'],
  currencies: ['EUR', 'USD'],
  minPopulation: 1000000,
  maxArea: 500000
});
```

### Batch Operations

#### `getByMultipleCodes(codes: string[]): Country[]`
Get multiple countries at once.
```typescript
const countries = getByMultipleCodes(['US', 'CA', 'MX']);
```

#### `validateCountryCodes(codes: string[]): { valid: string[], invalid: string[] }`
Validate multiple country codes.
```typescript
const result = validateCountryCodes(['US', 'XX', 'CA']);
// { valid: ['US', 'CA'], invalid: ['XX'] }
```

### Currency Functions

#### `getCurrencies(): CurrencyInfo[]`
Get all unique currencies.
```typescript
const allCurrencies = getCurrencies();
```

#### `getByCurrencySymbol(symbol: string): Country[]`
Get countries by currency symbol.
```typescript
const dollarCountries = getByCurrencySymbol('$');
```

#### `getCurrencyDetails(code: string): CurrencyInfo | undefined`
Get detailed currency information.
```typescript
const euroInfo = getCurrencyDetails('EUR');
// { code: 'EUR', label: 'Euro', symbol: '€', countries: [...] }
```

### Region Functions

#### `getRegions(): string[]`
Get all region codes.
```typescript
const regions = getRegions(); // ['AF', 'AS', 'EU', 'NA', 'OC', 'SA']
```

#### `getRegionName(code: string): string`
Convert region code to name.
```typescript
const name = getRegionName('EU'); // 'Europe'
```

#### `getRegionStats(): { region: string, count: number }[]`
Get country count per region.
```typescript
const stats = getRegionStats();
```

### Language Functions

#### `getLanguages(): LanguageInfo[]`
Get all unique languages.
```typescript
const languages = getLanguages();
```

#### `getLanguageDetails(code: string): LanguageInfo | undefined`
Get detailed language information.
```typescript
const englishInfo = getLanguageDetails('en');
```

### Validation & Formatting

#### `isValidCountryCode(code: string): boolean`
Validate country code.
```typescript
isValidCountryCode('US'); // true
isValidCountryCode('XX'); // false
```

#### `isValidCurrencyCode(code: string): boolean`
Validate currency code.
```typescript
isValidCurrencyCode('USD'); // true
```

#### `isValidPhoneCode(code: string): boolean`
Validate phone code.
```typescript
isValidPhoneCode('+1'); // true
```

#### `formatCountryName(code: string, format?: 'full' | 'short'): string | undefined`
Format country name.
```typescript
formatCountryName('US'); // 'United States of America (US)'
formatCountryName('US', 'short'); // 'United States of America'
```

#### `formatPhoneNumber(number: string, countryCode: string): string | undefined`
Format phone number with country code.
```typescript
formatPhoneNumber('2025551234', 'US'); // '+1 2025551234'
```

### Comparison & Analysis

#### `compareCountries(code1: string, code2: string): ComparisonResult | undefined`
Compare two countries.
```typescript
const comparison = compareCountries('US', 'CA');
// { sameRegion: true, sameCurrency: false, sameLanguage: true }
```

#### `getNeighboringCountries(code: string): Country[]`
Get countries in the same region.
```typescript
const neighbors = getNeighboringCountries('FR'); // Other EU countries
```

### Sorting & Selection

#### `sortCountriesBy(field: keyof Country | 'currency.code' | 'language.code', order?: 'asc' | 'desc'): Country[]`
Sort countries by any field.
```typescript
const byName = sortCountriesBy('label');
const byCapital = sortCountriesBy('capital', 'desc');
```

#### `getRandomCountry(): Country`
Get a random country.
```typescript
const random = getRandomCountry();
```

#### `getRandomCountries(count: number): Country[]`
Get multiple random countries.
```typescript
const randoms = getRandomCountries(5);
```

### Capital Cities

#### `getCapitals(): { country: string, capital: string }[]`
Get all capitals sorted alphabetically.
```typescript
const capitals = getCapitals();
```

#### `getCountryByCapital(capital: string): Country | undefined`
Find country by capital city.
```typescript
const country = getCountryByCapital('Tokyo'); // Japan
```

### ISO & Standards

#### `getByIsoCode(iso: string): Country | undefined`
Get country by ISO numeric code.
```typescript
const country = getByIsoCode('840'); // United States
```

#### `getIsoCodeMapping(): { [key: string]: string }`
Get mapping of country codes to ISO codes.
```typescript
const mapping = getIsoCodeMapping();
// { 'US': '840', 'GB': '826', ... }
```

### Flag Utilities

#### `getFlagUrl(code: string, size?: '48x36' | '96x72' | '192x144'): string | undefined`
Get flag image URL.
```typescript
const flag = getFlagUrl('JP', '96x72');
```

### Export Functions

#### `exportCountriesToCSV(): string`
Export all countries as CSV.
```typescript
const csv = exportCountriesToCSV();
```

#### `exportCountriesToJSON(pretty?: boolean): string`
Export all countries as JSON.
```typescript
const json = exportCountriesToJSON(true);
```

## Data Structure 📊

### Country Interface
```typescript
interface Country {
  label: string;           // Country name
  code: string;            // ISO 3166-1 alpha-2 code
  capital: string;         // Capital city
  region: string;          // Region code (EU, AS, etc.)
  currency: {
    code: string;          // Currency code (USD, EUR, etc.)
    label: string;         // Currency name
    symbol: string | null; // Currency symbol
  };
  language: {
    code: string;          // Language code
    label: string;         // Language name
  };
  flag: string;            // Flag image URL
  countryCode: string;     // Phone country code
  isoCode: string;         // ISO 3166-1 numeric code
  demonym?: string;        // Nationality name
  timezone?: string[];     // Timezones (future)
  coordinates?: {          // Geographic coordinates (future)
    latitude: number;
    longitude: number;
  };
  area?: number;           // Area in km² (future)
  population?: number;     // Population (future)
  borderCountries?: string[]; // Bordering countries (future)
  nativeName?: string;     // Native name (future)
  subregion?: string;      // Subregion (future)
}
```

## Examples 💡

### Building a Country Selector
```typescript
import { searchCountries, formatCountryName, getFlagUrl } from 'countries-ts';

function CountrySelector({ searchTerm }: { searchTerm: string }) {
  const countries = searchCountries(searchTerm);
  
  return countries.map(country => ({
    value: country.code,
    label: formatCountryName(country.code, 'short'),
    flag: getFlagUrl(country.code, '48x36')
  }));
}
```

### Currency Converter Helper
```typescript
import { getCurrencyDetails, getByCurrency } from 'countries-ts';

function getCurrencyInfo(currencyCode: string) {
  const details = getCurrencyDetails(currencyCode);
  const countries = getByCurrency(currencyCode);
  
  return {
    ...details,
    countriesCount: countries.length,
    mainCountry: countries[0]?.label
  };
}
```

### Regional Statistics
```typescript
import { getRegionStats, getRegionName } from 'countries-ts';

function getRegionalAnalysis() {
  const stats = getRegionStats();
  
  return stats.map(stat => ({
    name: getRegionName(stat.region),
    code: stat.region,
    countries: stat.count,
    percentage: (stat.count / 249 * 100).toFixed(1) + '%'
  }));
}
```

### Phone Validation
```typescript
import { isValidPhoneCode, formatPhoneNumber, getByCode } from 'countries-ts';

function validateAndFormatPhone(number: string, countryCode: string) {
  const country = getByCode(countryCode);
  
  if (!country || !isValidPhoneCode(country.countryCode)) {
    throw new Error('Invalid country');
  }
  
  return formatPhoneNumber(number, countryCode);
}
```

### Data Export
```typescript
import { exportCountriesToCSV, getByCodeArea } from 'countries-ts';

// Export specific region as CSV
function exportRegionData(regionCode: string) {
  const countries = getByCodeArea(regionCode);
  const csv = countries.map(country => 
    `"${country.label}","${country.code}","${country.capital}","${country.currency.code}"`
  ).join('\n');
  
  return csv;
}

// Export all data
const fullCsv = exportCountriesToCSV();
```

## Region Codes 🗺️

- `AF` - Africa
- `AS` - Asia  
- `EU` - Europe
- `NA` - North America
- `OC` - Oceania
- `SA` - South America
- `AN` - Antarctica

## Performance 🚄

The library is designed for optimal performance:
- Zero dependencies keep bundle size minimal
- All operations run in memory for fast access
- Efficient search algorithms for quick results
- Tree-shakeable exports - only import what you need

## TypeScript Support 🔷

Full TypeScript support with:
- Complete type definitions for all functions
- Detailed interfaces for all data structures
- Proper return type inference
- IDE autocompletion support

## Browser Support 🌐

Works in all modern browsers and Node.js environments:
- Chrome, Firefox, Safari, Edge (latest versions)
- Node.js 12+
- React Native compatible

## Contributing 🤝

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog 📝

### v2.0.0 (Latest)
- Added 50+ new functions
- Advanced search capabilities
- Batch operations support
- Currency and language utilities
- Region statistics and mapping
- Validation and formatting helpers
- Export functionality (CSV/JSON)
- Comparison and analysis tools
- Flag URL utilities
- Random country selection
- ISO code support
- Performance improvements

### v1.0.0
- Initial release
- Basic country queries
- TypeScript support

## Support 💬

- 🐛 [Report bugs](https://github.com/esmat-nawahda/countries/issues)
- 💡 [Request features](https://github.com/esmat-nawahda/countries/issues)
- 📖 [Read the docs](https://github.com/esmat-nawahda/countries#readme)
- ⭐ [Star on GitHub](https://github.com/esmat-nawahda/countries)

---

Made with ❤️ by the community. Special thanks to all [contributors](https://github.com/esmat-nawahda/countries/graphs/contributors)!

