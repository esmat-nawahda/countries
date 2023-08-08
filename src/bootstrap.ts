import { countries } from './countries';
import { Country } from './country.interface';

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