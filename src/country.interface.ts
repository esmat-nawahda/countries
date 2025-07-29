export interface Country {
    label: string;
    code: string;
    alpha2?: string;
    alpha3?: string;
    capital: string;
    region: string;
    currency: {
        code: string;
        label: string;
        symbol: string | null;
    };
    language: any;
    flag: string;
    countryCode: string;
    isoCode: string;
    demonym?: string;
    timezone?: string[];
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    area?: number;
    population?: number;
    borderCountries?: string[];
    nativeName?: string;
    subregion?: string;
}

export interface RegionInfo {
    code: string;
    name: string;
    countries: number;
}

export interface CurrencyInfo {
    code: string;
    label: string;
    symbol: string | null;
    countries: string[];
}

export interface LanguageInfo {
    code: string;
    label: string;
    countries: string[];
    nativeName?: string;
}

export interface CountryStats {
    totalCountries: number;
    totalRegions: number;
    totalCurrencies: number;
    totalLanguages: number;
    largestCountry?: string;
    smallestCountry?: string;
    mostPopulousCountry?: string;
    leastPopulousCountry?: string;
}