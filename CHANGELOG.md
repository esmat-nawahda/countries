# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-01-XX

### Added
- **Search & Filtering**
  - `searchCountries()` - Fuzzy search across multiple fields
  - `searchCountriesAdvanced()` - Advanced search with filters
  - `getByMultipleCodes()` - Get multiple countries at once
  - `getByCurrencySymbol()` - Find countries by currency symbol

- **Region & Geography**
  - `getRegions()` - List all regions
  - `getRegionStats()` - Statistics per region
  - `getRegionName()` - Convert region codes to names
  - `getRegionsWithNames()` - Regions with full names and counts
  - `getNeighboringCountries()` - Countries in same region
  - `getCountriesByRegions()` - Filter by multiple regions

- **Currency Features**
  - `getCurrencies()` - All unique currencies
  - `getCountriesUsingCurrency()` - Count countries using a currency
  - `getCurrencyDetails()` - Detailed currency information

- **Language Features**
  - `getLanguages()` - All unique languages with null check
  - `getCountriesByLanguages()` - Filter by multiple languages
  - `getLanguageDetails()` - Detailed language information

- **Validation Utilities**
  - `isValidCountryCode()` - Validate country codes
  - `isValidCurrencyCode()` - Validate currency codes
  - `isValidPhoneCode()` - Validate phone codes
  - `validateCountryCodes()` - Batch validation

- **Formatting Helpers**
  - `formatCountryName()` - Format with full/short options
  - `formatPhoneNumber()` - Format phone numbers with country code

- **Comparison & Analysis**
  - `compareCountries()` - Compare region, currency, language
  - `sortCountriesBy()` - Sort by any field
  - `getCountryStatistics()` - Overall statistics
  - `getDistanceBetweenCountries()` - Calculate distance (future use)
  - `getPopulationDensity()` - Calculate density (future use)

- **Random Selection**
  - `getRandomCountry()` - Get one random country
  - `getRandomCountries()` - Get multiple random countries

- **Capital City Features**
  - `getCapitals()` - All capitals sorted
  - `getCountryByCapital()` - Find country by capital

- **ISO Code Support**
  - `getByIsoCode()` - Find by ISO numeric code
  - `getIsoCodeMapping()` - Map country codes to ISO codes

- **Export Capabilities**
  - `exportCountriesToCSV()` - Export as CSV
  - `exportCountriesToJSON()` - Export as JSON

- **Batch Operations**
  - `getCountriesBatch()` - Get multiple countries with validation

- **Flag Utilities**
  - `getFlagUrl()` - Get flag URLs in different sizes

- **Future-Ready Features**
  - `getMostPopulousCountries()` - Population rankings
  - `getLeastPopulousCountries()` - Population rankings
  - `getLargestCountries()` - Area rankings
  - `getSmallestCountries()` - Area rankings
  - `getCountriesInTimezone()` - Timezone filtering
  - `getCountriesByCoordinates()` - Geographic search
  - `getBorderingCountries()` - Border countries
  - `areBorderingCountries()` - Check if bordering
  - `getByDemonym()` - Find by nationality
  - `getDemonyms()` - List all demonyms
  - `getByNativeName()` - Find by native name
  - `getNativeNames()` - List native names
  - `getSubregions()` - List subregions
  - `getCountriesBySubregion()` - Filter by subregion

### Enhanced
- Country interface now includes optional fields for future expansion:
  - `timezone` - Array of timezones
  - `coordinates` - Latitude and longitude
  - `area` - Area in km²
  - `population` - Population count
  - `borderCountries` - Array of border country codes
  - `nativeName` - Native language name
  - `subregion` - Subregion classification
  - `demonym` - Nationality name

### Changed
- Improved TypeScript types with new interfaces:
  - `RegionInfo` - Region with name and country count
  - `CurrencyInfo` - Currency with countries using it
  - `LanguageInfo` - Language with countries speaking it
  - `CountryStats` - Overall statistics interface
  - `SearchFilters` - Advanced search filter options

### Fixed
- Language sorting now handles null codes properly
- All functions maintain backward compatibility

## [1.0.3] - Previous Release

### Fixed
- Minor bug fixes and improvements

## [1.0.2] - Previous Release

### Fixed
- Documentation updates

## [1.0.1] - Previous Release

### Fixed
- Initial bug fixes

## [1.0.0] - Initial Release

### Added
- Basic country query functions:
  - `getByCodeArea()` - Get by region
  - `getByCode()` - Get by country code
  - `getByCountry()` - Get by country name
  - `getByCurrency()` - Get by currency code
  - `getByLanguage()` - Get by language code
  - `getByCountryCode()` - Get by phone code
  - `listCountries()` - List all countries
- TypeScript support
- Comprehensive country data