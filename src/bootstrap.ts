import { countries } from './countries';
import { Country, CountryStats, RegionInfo, CurrencyInfo, LanguageInfo } from './country.interface';

export const getByCodeArea = (region: string): Country[] => {
    const result = countries.filter((country: Country) => country.region === region);
    return result;
}

export const getByCode = (code: string): Country | undefined => {
    return countries.find((country: Country) => country.code === code);
}

export const getByCountry = (countryName: string): Country | undefined => {
    return countries.find((country: Country) => country.label === countryName);
}

export const getByCurrency = (currencyCode: string): Country[] => {
    return countries.filter((country: Country) => country.currency.code === currencyCode);
}

export const getByLanguage = (languageCode: string): Country[] => {
    return countries.filter((country: Country) => country.language.code === languageCode);
}

export const getByCountryCode = (countryCode: string): Country | undefined => {
    const result = countries.find((country: Country) => country.countryCode === countryCode);
    return result;
}

export const listCountries = (): Country[] => {
    return countries;
}

// Fuzzy search functionality
export const searchCountries = (query: string, fields?: (keyof Country)[]): Country[] => {
    const searchFields = fields || ['label', 'capital', 'code'];
    const normalizedQuery = query.toLowerCase().trim();
    
    return countries.filter((country: Country) => {
        return searchFields.some(field => {
            const value = country[field];
            if (typeof value === 'string') {
                return value.toLowerCase().includes(normalizedQuery);
            }
            if (field === 'currency' && country.currency) {
                return country.currency.label.toLowerCase().includes(normalizedQuery) ||
                       country.currency.code.toLowerCase().includes(normalizedQuery);
            }
            if (field === 'language' && country.language) {
                return country.language.label.toLowerCase().includes(normalizedQuery) ||
                       country.language.code.toLowerCase().includes(normalizedQuery);
            }
            return false;
        });
    });
}

// Get countries by multiple codes
export const getByMultipleCodes = (codes: string[]): Country[] => {
    return countries.filter((country: Country) => codes.includes(country.code));
}

// Get countries by currency symbol
export const getByCurrencySymbol = (symbol: string): Country[] => {
    return countries.filter((country: Country) => country.currency.symbol === symbol);
}

// Region/Continent utilities
export const getRegions = (): string[] => {
    const regions = new Set(countries.map(country => country.region));
    return Array.from(regions).sort();
}

export const getCountriesByRegions = (regions: string[]): Country[] => {
    return countries.filter((country: Country) => regions.includes(country.region));
}

export const getRegionStats = (): { region: string; count: number }[] => {
    const stats = countries.reduce((acc: { [key: string]: number }, country) => {
        acc[country.region] = (acc[country.region] || 0) + 1;
        return acc;
    }, {});
    
    return Object.entries(stats).map(([region, count]) => ({ region, count }));
}

// Currency utilities
export const getCurrencies = (): Array<{code: string; label: string; symbol: string | null}> => {
    const currencyMap = new Map();
    countries.forEach(country => {
        if (!currencyMap.has(country.currency.code)) {
            currencyMap.set(country.currency.code, country.currency);
        }
    });
    return Array.from(currencyMap.values()).sort((a, b) => a.code.localeCompare(b.code));
}

export const getCountriesUsingCurrency = (currencyCode: string): number => {
    return countries.filter(country => country.currency.code === currencyCode).length;
}

// Language utilities
export const getLanguages = (): Array<{code: string; label: string}> => {
    const languageMap = new Map();
    countries.forEach(country => {
        if (country.language && country.language.code && !languageMap.has(country.language.code)) {
            languageMap.set(country.language.code, country.language);
        }
    });
    return Array.from(languageMap.values()).sort((a, b) => {
        if (!a.code || !b.code) return 0;
        return a.code.localeCompare(b.code);
    });
}

export const getCountriesByLanguages = (languageCodes: string[]): Country[] => {
    return countries.filter(country => 
        country.language && languageCodes.includes(country.language.code)
    );
}

// Validation utilities
export const isValidCountryCode = (code: string): boolean => {
    return countries.some(country => country.code === code);
}

export const isValidCurrencyCode = (code: string): boolean => {
    return countries.some(country => country.currency.code === code);
}

export const isValidPhoneCode = (phoneCode: string): boolean => {
    return countries.some(country => country.countryCode === phoneCode);
}

// Formatting utilities
export const formatCountryName = (code: string, format: 'full' | 'short' = 'full'): string | undefined => {
    const country = getByCode(code);
    if (!country) return undefined;
    
    if (format === 'full') {
        return `${country.label} (${country.code})`;
    }
    return country.label;
}

export const formatPhoneNumber = (phoneNumber: string, countryCode: string): string | undefined => {
    const country = getByCode(countryCode);
    if (!country) return undefined;
    
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    return `${country.countryCode} ${cleanedNumber}`;
}

// Comparison utilities
export const compareCountries = (code1: string, code2: string): {
    sameRegion: boolean;
    sameCurrency: boolean;
    sameLanguage: boolean;
} | undefined => {
    const country1 = getByCode(code1);
    const country2 = getByCode(code2);
    
    if (!country1 || !country2) return undefined;
    
    return {
        sameRegion: country1.region === country2.region,
        sameCurrency: country1.currency.code === country2.currency.code,
        sameLanguage: country1.language?.code === country2.language?.code
    };
}

// Neighboring countries (by region)
export const getNeighboringCountries = (code: string): Country[] => {
    const country = getByCode(code);
    if (!country) return [];
    
    return countries.filter(c => 
        c.region === country.region && c.code !== country.code
    );
}

// Sort utilities
export const sortCountriesBy = (
    field: keyof Country | 'currency.code' | 'language.code',
    order: 'asc' | 'desc' = 'asc'
): Country[] => {
    const sorted = [...countries].sort((a, b) => {
        let aValue: any, bValue: any;
        
        if (field === 'currency.code') {
            aValue = a.currency.code;
            bValue = b.currency.code;
        } else if (field === 'language.code') {
            aValue = a.language?.code || '';
            bValue = b.language?.code || '';
        } else {
            aValue = a[field];
            bValue = b[field];
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return order === 'asc' 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        
        return 0;
    });
    
    return sorted;
}

// Random country selector
export const getRandomCountry = (): Country => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}

export const getRandomCountries = (count: number): Country[] => {
    const shuffled = [...countries].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, countries.length));
}

// Flag utilities
export const getFlagUrl = (code: string, size: '48x36' | '96x72' | '192x144' = '48x36'): string | undefined => {
    const country = getByCode(code);
    if (!country) return undefined;
    
    return country.flag.replace('48x36', size);
}

// Capital city utilities
export const getCapitals = (): Array<{country: string; capital: string}> => {
    return countries.map(country => ({
        country: country.label,
        capital: country.capital
    })).sort((a, b) => a.capital.localeCompare(b.capital));
}

export const getCountryByCapital = (capital: string): Country | undefined => {
    return countries.find(country => 
        country.capital.toLowerCase() === capital.toLowerCase()
    );
}

// ISO code utilities
export const getByIsoCode = (isoCode: string): Country | undefined => {
    return countries.find(country => country.isoCode === isoCode);
}

export const getIsoCodeMapping = (): { [key: string]: string } => {
    return countries.reduce((acc: { [key: string]: string }, country) => {
        acc[country.code] = country.isoCode;
        return acc;
    }, {});
}

// Advanced search with filters
export interface SearchFilters {
    regions?: string[];
    currencies?: string[];
    languages?: string[];
    minPopulation?: number;
    maxPopulation?: number;
    minArea?: number;
    maxArea?: number;
}

export const searchCountriesAdvanced = (query: string, filters?: SearchFilters): Country[] => {
    let results = searchCountries(query);
    
    if (filters) {
        if (filters.regions && filters.regions.length > 0) {
            results = results.filter(country => filters.regions!.includes(country.region));
        }
        
        if (filters.currencies && filters.currencies.length > 0) {
            results = results.filter(country => filters.currencies!.includes(country.currency.code));
        }
        
        if (filters.languages && filters.languages.length > 0) {
            results = results.filter(country => 
                country.language && filters.languages!.includes(country.language.code)
            );
        }
        
        if (filters.minPopulation !== undefined) {
            results = results.filter(country => 
                country.population && country.population >= filters.minPopulation!
            );
        }
        
        if (filters.maxPopulation !== undefined) {
            results = results.filter(country => 
                country.population && country.population <= filters.maxPopulation!
            );
        }
        
        if (filters.minArea !== undefined) {
            results = results.filter(country => 
                country.area && country.area >= filters.minArea!
            );
        }
        
        if (filters.maxArea !== undefined) {
            results = results.filter(country => 
                country.area && country.area <= filters.maxArea!
            );
        }
    }
    
    return results;
}

// Geographical utilities
export const getCountriesInTimezone = (timezone: string): Country[] => {
    return countries.filter(country => 
        country.timezone && country.timezone.includes(timezone)
    );
}

export const getCountriesByCoordinates = (
    lat: number, 
    lng: number, 
    radiusKm: number
): Country[] => {
    const earthRadiusKm = 6371;
    
    return countries.filter(country => {
        if (!country.coordinates) return false;
        
        const dLat = toRadians(country.coordinates.latitude - lat);
        const dLng = toRadians(country.coordinates.longitude - lng);
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(toRadians(lat)) * Math.cos(toRadians(country.coordinates.latitude)) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = earthRadiusKm * c;
        
        return distance <= radiusKm;
    });
}

const toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
}

export const getDistanceBetweenCountries = (code1: string, code2: string): number | undefined => {
    const country1 = getByCode(code1);
    const country2 = getByCode(code2);
    
    if (!country1?.coordinates || !country2?.coordinates) return undefined;
    
    const earthRadiusKm = 6371;
    const dLat = toRadians(country2.coordinates.latitude - country1.coordinates.latitude);
    const dLng = toRadians(country2.coordinates.longitude - country1.coordinates.longitude);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRadians(country1.coordinates.latitude)) * 
              Math.cos(toRadians(country2.coordinates.latitude)) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
}

// Border countries utilities
export const getBorderingCountries = (code: string): Country[] => {
    const country = getByCode(code);
    if (!country?.borderCountries) return [];
    
    return country.borderCountries
        .map(borderCode => getByCode(borderCode))
        .filter((c): c is Country => c !== undefined);
}

export const areBorderingCountries = (code1: string, code2: string): boolean => {
    const country1 = getByCode(code1);
    return country1?.borderCountries?.includes(code2) || false;
}

// Population and area utilities
export const getMostPopulousCountries = (limit: number = 10): Country[] => {
    return countries
        .filter(country => country.population !== undefined)
        .sort((a, b) => (b.population || 0) - (a.population || 0))
        .slice(0, limit);
}

export const getLeastPopulousCountries = (limit: number = 10): Country[] => {
    return countries
        .filter(country => country.population !== undefined)
        .sort((a, b) => (a.population || 0) - (b.population || 0))
        .slice(0, limit);
}

export const getLargestCountries = (limit: number = 10): Country[] => {
    return countries
        .filter(country => country.area !== undefined)
        .sort((a, b) => (b.area || 0) - (a.area || 0))
        .slice(0, limit);
}

export const getSmallestCountries = (limit: number = 10): Country[] => {
    return countries
        .filter(country => country.area !== undefined)
        .sort((a, b) => (a.area || 0) - (b.area || 0))
        .slice(0, limit);
}

export const getPopulationDensity = (code: string): number | undefined => {
    const country = getByCode(code);
    if (!country?.population || !country?.area || country.area === 0) return undefined;
    
    return country.population / country.area;
}

// Statistical analysis
export const getCountryStatistics = (): CountryStats => {
    const stats: CountryStats = {
        totalCountries: countries.length,
        totalRegions: getRegions().length,
        totalCurrencies: getCurrencies().length,
        totalLanguages: getLanguages().length
    };
    
    const countriesWithPopulation = countries.filter(c => c.population !== undefined);
    const countriesWithArea = countries.filter(c => c.area !== undefined);
    
    if (countriesWithPopulation.length > 0) {
        const sortedByPop = [...countriesWithPopulation].sort((a, b) => 
            (b.population || 0) - (a.population || 0)
        );
        stats.mostPopulousCountry = sortedByPop[0].label;
        stats.leastPopulousCountry = sortedByPop[sortedByPop.length - 1].label;
    }
    
    if (countriesWithArea.length > 0) {
        const sortedByArea = [...countriesWithArea].sort((a, b) => 
            (b.area || 0) - (a.area || 0)
        );
        stats.largestCountry = sortedByArea[0].label;
        stats.smallestCountry = sortedByArea[sortedByArea.length - 1].label;
    }
    
    return stats;
}

// Demonym utilities
export const getByDemonym = (demonym: string): Country | undefined => {
    return countries.find(country => 
        country.demonym?.toLowerCase() === demonym.toLowerCase()
    );
}

export const getDemonyms = (): Array<{country: string; demonym: string}> => {
    return countries
        .filter(country => country.demonym)
        .map(country => ({
            country: country.label,
            demonym: country.demonym!
        }))
        .sort((a, b) => a.demonym.localeCompare(b.demonym));
}

// Native name utilities
export const getByNativeName = (nativeName: string): Country | undefined => {
    return countries.find(country => 
        country.nativeName?.toLowerCase() === nativeName.toLowerCase()
    );
}

export const getNativeNames = (): Array<{country: string; nativeName: string}> => {
    return countries
        .filter(country => country.nativeName)
        .map(country => ({
            country: country.label,
            nativeName: country.nativeName!
        }))
        .sort((a, b) => a.nativeName.localeCompare(b.nativeName));
}

// Subregion utilities
export const getSubregions = (): string[] => {
    const subregions = new Set(
        countries
            .filter(country => country.subregion)
            .map(country => country.subregion!)
    );
    return Array.from(subregions).sort();
}

export const getCountriesBySubregion = (subregion: string): Country[] => {
    return countries.filter(country => country.subregion === subregion);
}

// Export utilities for data analysis
export const exportCountriesToCSV = (): string => {
    const headers = ['Name', 'Code', 'Capital', 'Region', 'Currency Code', 'Currency Name', 
                    'Language Code', 'Phone Code', 'ISO Code'];
    
    const rows = countries.map(country => [
        country.label,
        country.code,
        country.capital,
        country.region,
        country.currency.code,
        country.currency.label,
        country.language?.code || '',
        country.countryCode,
        country.isoCode
    ]);
    
    const csvContent = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');
    
    return csvContent;
}

export const exportCountriesToJSON = (pretty: boolean = true): string => {
    return pretty 
        ? JSON.stringify(countries, null, 2)
        : JSON.stringify(countries);
}

// Batch operations
export const getCountriesBatch = (codes: string[]): (Country | undefined)[] => {
    return codes.map(code => getByCode(code));
}

export const validateCountryCodes = (codes: string[]): { valid: string[]; invalid: string[] } => {
    const valid: string[] = [];
    const invalid: string[] = [];
    
    codes.forEach(code => {
        if (isValidCountryCode(code)) {
            valid.push(code);
        } else {
            invalid.push(code);
        }
    });
    
    return { valid, invalid };
}

// Region name mapping
const regionNames: { [key: string]: string } = {
    'AF': 'Africa',
    'AS': 'Asia',
    'EU': 'Europe',
    'NA': 'North America',
    'OC': 'Oceania',
    'SA': 'South America',
    'AN': 'Antarctica'
};

export const getRegionName = (regionCode: string): string => {
    return regionNames[regionCode] || regionCode;
}

export const getRegionsWithNames = (): RegionInfo[] => {
    return getRegions().map(regionCode => ({
        code: regionCode,
        name: getRegionName(regionCode),
        countries: getByCodeArea(regionCode).length
    }));
}

// Currency detailed information
export const getCurrencyDetails = (currencyCode: string): CurrencyInfo | undefined => {
    const countriesWithCurrency = getByCurrency(currencyCode);
    if (countriesWithCurrency.length === 0) return undefined;
    
    const currency = countriesWithCurrency[0].currency;
    return {
        code: currency.code,
        label: currency.label,
        symbol: currency.symbol,
        countries: countriesWithCurrency.map(c => c.label)
    };
}

// Language detailed information
export const getLanguageDetails = (languageCode: string): LanguageInfo | undefined => {
    const countriesWithLanguage = getByLanguage(languageCode);
    if (countriesWithLanguage.length === 0) return undefined;
    
    const language = countriesWithLanguage[0].language;
    return {
        code: language.code,
        label: language.label,
        countries: countriesWithLanguage.map(c => c.label)
    };
}

