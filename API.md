# API Documentation

Complete API reference for countries-ts library.

## Table of Contents

- [Basic Queries](#basic-queries)
- [Search & Filtering](#search--filtering)
- [Batch Operations](#batch-operations)
- [Currency Functions](#currency-functions)
- [Region Functions](#region-functions)
- [Language Functions](#language-functions)
- [Validation & Formatting](#validation--formatting)
- [Comparison & Analysis](#comparison--analysis)
- [Sorting & Selection](#sorting--selection)
- [Capital Cities](#capital-cities)
- [ISO & Standards](#iso--standards)
- [Flag Utilities](#flag-utilities)
- [Export Functions](#export-functions)
- [Geographical Functions](#geographical-functions)
- [Demographics Functions](#demographics-functions)
- [Additional Utilities](#additional-utilities)

## Basic Queries

### `getByCode(code: string): Country | undefined`
Get a country by its ISO 3166-1 alpha-2 code.

**Parameters:**
- `code` - ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB')

**Returns:** Country object or undefined if not found

**Example:**
```typescript
const usa = getByCode('US');
// { label: 'United States of America', code: 'US', ... }
```

### `getByCountry(name: string): Country | undefined`
Get a country by its name (exact match).

**Parameters:**
- `name` - Country name (case-sensitive)

**Returns:** Country object or undefined if not found

**Example:**
```typescript
const canada = getByCountry('Canada');
```

### `getByCodeArea(region: string): Country[]`
Get all countries in a specific region.

**Parameters:**
- `region` - Region code ('AF', 'AS', 'EU', 'NA', 'OC', 'SA', 'AN')

**Returns:** Array of countries in the region

**Example:**
```typescript
const europeanCountries = getByCodeArea('EU');
```

### `getByCurrency(code: string): Country[]`
Get all countries using a specific currency.

**Parameters:**
- `code` - Currency code (e.g., 'USD', 'EUR')

**Returns:** Array of countries using the currency

**Example:**
```typescript
const euroCountries = getByCurrency('EUR');
```

### `getByLanguage(code: string): Country[]`
Get all countries where a specific language is spoken.

**Parameters:**
- `code` - Language code (e.g., 'en', 'es', 'fr')

**Returns:** Array of countries with the language

**Example:**
```typescript
const englishSpeaking = getByLanguage('en');
```

### `getByCountryCode(phoneCode: string): Country | undefined`
Get a country by its phone code.

**Parameters:**
- `phoneCode` - Phone country code with + prefix (e.g., '+1', '+44')

**Returns:** Country object or undefined if not found

**Example:**
```typescript
const uk = getByCountryCode('+44');
```

### `listCountries(): Country[]`
Get all countries in the dataset.

**Returns:** Array of all countries

**Example:**
```typescript
const allCountries = listCountries();
```

## Search & Filtering

### `searchCountries(query: string, fields?: (keyof Country)[]): Country[]`
Search for countries with fuzzy matching.

**Parameters:**
- `query` - Search query string
- `fields` - Optional array of fields to search in (defaults to ['label', 'capital', 'code'])

**Returns:** Array of matching countries

**Example:**
```typescript
// Search in default fields
const results = searchCountries('united');

// Search only in capitals
const capitalResults = searchCountries('paris', ['capital']);
```

### `searchCountriesAdvanced(query: string, filters?: SearchFilters): Country[]`
Advanced search with multiple filter options.

**Parameters:**
- `query` - Search query string
- `filters` - Optional filter object:
  - `regions?: string[]` - Filter by regions
  - `currencies?: string[]` - Filter by currencies
  - `languages?: string[]` - Filter by languages
  - `minPopulation?: number` - Minimum population
  - `maxPopulation?: number` - Maximum population
  - `minArea?: number` - Minimum area
  - `maxArea?: number` - Maximum area

**Returns:** Array of matching countries

**Example:**
```typescript
const filtered = searchCountriesAdvanced('a', {
  regions: ['EU'],
  currencies: ['EUR'],
  minPopulation: 1000000
});
```

## Batch Operations

### `getByMultipleCodes(codes: string[]): Country[]`
Get multiple countries by their codes.

**Parameters:**
- `codes` - Array of ISO 3166-1 alpha-2 codes

**Returns:** Array of countries (in the same order as input)

**Example:**
```typescript
const nafta = getByMultipleCodes(['US', 'CA', 'MX']);
```

### `validateCountryCodes(codes: string[]): { valid: string[], invalid: string[] }`
Validate multiple country codes.

**Parameters:**
- `codes` - Array of country codes to validate

**Returns:** Object with valid and invalid code arrays

**Example:**
```typescript
const validation = validateCountryCodes(['US', 'XX', 'CA']);
// { valid: ['US', 'CA'], invalid: ['XX'] }
```

### `getCountriesBatch(codes: string[]): (Country | undefined)[]`
Get countries batch with undefined for invalid codes.

**Parameters:**
- `codes` - Array of country codes

**Returns:** Array of countries or undefined values

**Example:**
```typescript
const batch = getCountriesBatch(['US', 'XX', 'CA']);
// [Country, undefined, Country]
```

## Currency Functions

### `getCurrencies(): Array<{code: string; label: string; symbol: string | null}>`
Get all unique currencies in the dataset.

**Returns:** Array of currency objects sorted by code

**Example:**
```typescript
const currencies = getCurrencies();
// [{ code: 'AED', label: 'United Arab Emirates dirham', symbol: 'د.إ' }, ...]
```

### `getByCurrencySymbol(symbol: string): Country[]`
Get countries using a specific currency symbol.

**Parameters:**
- `symbol` - Currency symbol (e.g., '$', '€', '£')

**Returns:** Array of countries using the symbol

**Example:**
```typescript
const dollarCountries = getByCurrencySymbol('$');
```

### `getCurrencyDetails(code: string): CurrencyInfo | undefined`
Get detailed information about a currency.

**Parameters:**
- `code` - Currency code

**Returns:** CurrencyInfo object or undefined

**Example:**
```typescript
const euroInfo = getCurrencyDetails('EUR');
// { code: 'EUR', label: 'Euro', symbol: '€', countries: [...] }
```

### `getCountriesUsingCurrency(code: string): number`
Get count of countries using a currency.

**Parameters:**
- `code` - Currency code

**Returns:** Number of countries

**Example:**
```typescript
const euroCount = getCountriesUsingCurrency('EUR'); // 27
```

## Region Functions

### `getRegions(): string[]`
Get all unique region codes.

**Returns:** Array of region codes sorted

**Example:**
```typescript
const regions = getRegions(); // ['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA']
```

### `getRegionName(code: string): string`
Convert region code to full name.

**Parameters:**
- `code` - Region code

**Returns:** Region name or code if not found

**Example:**
```typescript
const name = getRegionName('EU'); // 'Europe'
```

### `getRegionStats(): { region: string; count: number }[]`
Get statistics for each region.

**Returns:** Array of region statistics

**Example:**
```typescript
const stats = getRegionStats();
// [{ region: 'AF', count: 54 }, { region: 'AS', count: 48 }, ...]
```

### `getRegionsWithNames(): RegionInfo[]`
Get regions with full names and country counts.

**Returns:** Array of RegionInfo objects

**Example:**
```typescript
const regionsInfo = getRegionsWithNames();
// [{ code: 'AF', name: 'Africa', countries: 54 }, ...]
```

### `getCountriesByRegions(regions: string[]): Country[]`
Get countries from multiple regions.

**Parameters:**
- `regions` - Array of region codes

**Returns:** Array of countries from specified regions

**Example:**
```typescript
const euAndNa = getCountriesByRegions(['EU', 'NA']);
```

## Language Functions

### `getLanguages(): Array<{code: string; label: string}>`
Get all unique languages.

**Returns:** Array of language objects sorted by code

**Example:**
```typescript
const languages = getLanguages();
```

### `getLanguageDetails(code: string): LanguageInfo | undefined`
Get detailed information about a language.

**Parameters:**
- `code` - Language code

**Returns:** LanguageInfo object or undefined

**Example:**
```typescript
const spanish = getLanguageDetails('es');
// { code: 'es', label: 'Spanish', countries: [...] }
```

### `getCountriesByLanguages(codes: string[]): Country[]`
Get countries speaking any of the specified languages.

**Parameters:**
- `codes` - Array of language codes

**Returns:** Array of countries

**Example:**
```typescript
const latinLanguages = getCountriesByLanguages(['es', 'pt', 'fr']);
```

## Validation & Formatting

### `isValidCountryCode(code: string): boolean`
Check if a country code is valid.

**Parameters:**
- `code` - Country code to validate

**Returns:** Boolean

**Example:**
```typescript
isValidCountryCode('US'); // true
isValidCountryCode('XX'); // false
```

### `isValidCurrencyCode(code: string): boolean`
Check if a currency code exists in the dataset.

**Parameters:**
- `code` - Currency code to validate

**Returns:** Boolean

**Example:**
```typescript
isValidCurrencyCode('USD'); // true
```

### `isValidPhoneCode(phoneCode: string): boolean`
Check if a phone code exists.

**Parameters:**
- `phoneCode` - Phone code with + prefix

**Returns:** Boolean

**Example:**
```typescript
isValidPhoneCode('+1'); // true
```

### `formatCountryName(code: string, format?: 'full' | 'short'): string | undefined`
Format a country name.

**Parameters:**
- `code` - Country code
- `format` - 'full' (with code) or 'short' (name only), defaults to 'full'

**Returns:** Formatted string or undefined

**Example:**
```typescript
formatCountryName('US'); // 'United States of America (US)'
formatCountryName('US', 'short'); // 'United States of America'
```

### `formatPhoneNumber(phoneNumber: string, countryCode: string): string | undefined`
Format a phone number with country code.

**Parameters:**
- `phoneNumber` - Phone number
- `countryCode` - Country code

**Returns:** Formatted phone number or undefined

**Example:**
```typescript
formatPhoneNumber('2025551234', 'US'); // '+1 2025551234'
```

## Comparison & Analysis

### `compareCountries(code1: string, code2: string): ComparisonResult | undefined`
Compare two countries.

**Parameters:**
- `code1` - First country code
- `code2` - Second country code

**Returns:** Comparison object or undefined

**Example:**
```typescript
const comparison = compareCountries('US', 'CA');
// { sameRegion: true, sameCurrency: false, sameLanguage: true }
```

### `getNeighboringCountries(code: string): Country[]`
Get countries in the same region (excluding the input country).

**Parameters:**
- `code` - Country code

**Returns:** Array of neighboring countries

**Example:**
```typescript
const neighbors = getNeighboringCountries('FR'); // Other EU countries
```

### `getCountryStatistics(): CountryStats`
Get overall statistics about the dataset.

**Returns:** CountryStats object

**Example:**
```typescript
const stats = getCountryStatistics();
// { totalCountries: 249, totalRegions: 7, ... }
```

## Sorting & Selection

### `sortCountriesBy(field: keyof Country | 'currency.code' | 'language.code', order?: 'asc' | 'desc'): Country[]`
Sort countries by a specific field.

**Parameters:**
- `field` - Field to sort by
- `order` - Sort order ('asc' or 'desc'), defaults to 'asc'

**Returns:** Sorted array of countries

**Example:**
```typescript
const byName = sortCountriesBy('label');
const byCapitalDesc = sortCountriesBy('capital', 'desc');
```

### `getRandomCountry(): Country`
Get a random country.

**Returns:** Random country object

**Example:**
```typescript
const random = getRandomCountry();
```

### `getRandomCountries(count: number): Country[]`
Get multiple random countries.

**Parameters:**
- `count` - Number of countries to return

**Returns:** Array of random countries

**Example:**
```typescript
const randomFive = getRandomCountries(5);
```

## Capital Cities

### `getCapitals(): Array<{country: string; capital: string}>`
Get all capitals sorted alphabetically.

**Returns:** Array of country-capital pairs

**Example:**
```typescript
const capitals = getCapitals();
// [{ country: 'UAE', capital: 'Abu Dhabi' }, ...]
```

### `getCountryByCapital(capital: string): Country | undefined`
Find a country by its capital (case-insensitive).

**Parameters:**
- `capital` - Capital city name

**Returns:** Country object or undefined

**Example:**
```typescript
const japan = getCountryByCapital('Tokyo');
```

## ISO & Standards

### `getByIsoCode(isoCode: string): Country | undefined`
Get a country by its ISO 3166-1 numeric code.

**Parameters:**
- `isoCode` - ISO numeric code (e.g., '840' for USA)

**Returns:** Country object or undefined

**Example:**
```typescript
const usa = getByIsoCode('840');
```

### `getIsoCodeMapping(): { [key: string]: string }`
Get mapping of alpha-2 codes to numeric ISO codes.

**Returns:** Object mapping codes to ISO codes

**Example:**
```typescript
const mapping = getIsoCodeMapping();
// { 'US': '840', 'GB': '826', ... }
```

## Flag Utilities

### `getFlagUrl(code: string, size?: '48x36' | '96x72' | '192x144'): string | undefined`
Get flag image URL in different sizes.

**Parameters:**
- `code` - Country code
- `size` - Image size (defaults to '48x36')

**Returns:** Flag URL or undefined

**Example:**
```typescript
const flag = getFlagUrl('JP', '96x72');
// 'https://flagcdn.com/96x72/jp.png'
```

## Export Functions

### `exportCountriesToCSV(): string`
Export all countries as CSV.

**Returns:** CSV string with headers

**Example:**
```typescript
const csv = exportCountriesToCSV();
// "Name","Code","Capital","Region",...
```

### `exportCountriesToJSON(pretty?: boolean): string`
Export all countries as JSON.

**Parameters:**
- `pretty` - Pretty print JSON (defaults to true)

**Returns:** JSON string

**Example:**
```typescript
const json = exportCountriesToJSON();
const minified = exportCountriesToJSON(false);
```

## Geographical Functions

### `getCountriesInTimezone(timezone: string): Country[]`
Get countries in a specific timezone (future use).

**Parameters:**
- `timezone` - Timezone identifier

**Returns:** Array of countries

### `getCountriesByCoordinates(lat: number, lng: number, radiusKm: number): Country[]`
Get countries within radius of coordinates (future use).

**Parameters:**
- `lat` - Latitude
- `lng` - Longitude
- `radiusKm` - Radius in kilometers

**Returns:** Array of countries within radius

### `getDistanceBetweenCountries(code1: string, code2: string): number | undefined`
Calculate distance between two countries (future use).

**Parameters:**
- `code1` - First country code
- `code2` - Second country code

**Returns:** Distance in kilometers or undefined

### `getBorderingCountries(code: string): Country[]`
Get countries that border a specific country (future use).

**Parameters:**
- `code` - Country code

**Returns:** Array of bordering countries

### `areBorderingCountries(code1: string, code2: string): boolean`
Check if two countries share a border (future use).

**Parameters:**
- `code1` - First country code
- `code2` - Second country code

**Returns:** Boolean

## Demographics Functions

### `getMostPopulousCountries(limit?: number): Country[]`
Get most populous countries (future use).

**Parameters:**
- `limit` - Number of countries to return (defaults to 10)

**Returns:** Array of countries sorted by population

### `getLeastPopulousCountries(limit?: number): Country[]`
Get least populous countries (future use).

**Parameters:**
- `limit` - Number of countries to return (defaults to 10)

**Returns:** Array of countries sorted by population

### `getLargestCountries(limit?: number): Country[]`
Get largest countries by area (future use).

**Parameters:**
- `limit` - Number of countries to return (defaults to 10)

**Returns:** Array of countries sorted by area

### `getSmallestCountries(limit?: number): Country[]`
Get smallest countries by area (future use).

**Parameters:**
- `limit` - Number of countries to return (defaults to 10)

**Returns:** Array of countries sorted by area

### `getPopulationDensity(code: string): number | undefined`
Calculate population density (future use).

**Parameters:**
- `code` - Country code

**Returns:** Population per km² or undefined

## Additional Utilities

### `getByDemonym(demonym: string): Country | undefined`
Find country by demonym/nationality (future use).

**Parameters:**
- `demonym` - Nationality name (e.g., 'American', 'French')

**Returns:** Country object or undefined

### `getDemonyms(): Array<{country: string; demonym: string}>`
Get all demonyms (future use).

**Returns:** Array of country-demonym pairs

### `getByNativeName(nativeName: string): Country | undefined`
Find country by native name (future use).

**Parameters:**
- `nativeName` - Native language country name

**Returns:** Country object or undefined

### `getNativeNames(): Array<{country: string; nativeName: string}>`
Get all native names (future use).

**Returns:** Array of country-nativeName pairs

### `getSubregions(): string[]`
Get all subregions (future use).

**Returns:** Array of unique subregions

### `getCountriesBySubregion(subregion: string): Country[]`
Get countries in a subregion (future use).

**Parameters:**
- `subregion` - Subregion name

**Returns:** Array of countries in the subregion