# Country Information Finder 🌎

An elegant TypeScript module to fetch information about countries from a comprehensive JSON data file. Query by various criteria including region, country code, currency, and language.

## Features 🌟

- **Rich Data Source**: Uses a structured JSON file containing detailed country data.
- **Typed with TypeScript**: Uses TypeScript for static type checking.
- **Multiple Query Options**: Find countries by different criteria.

## Installation 📦

```bash
# if your project uses npm
npm install --save countries
```

```bash
# if your project uses yarn
yarn add countries
```

## Usage 🚀
First, you'll need to import the necessary methods:
```ts
import {
  getByCodeArea,
  getByCode,
  getByCountry,
  getByCurrency,
  getByLanguage,
  getByCountryCode,
} from 'path_to_this_module';
```

## API Reference 📘
getByCodeArea(region: string): Country[]
Retrieve countries based on their region.
```ts
const europeanCountries = getByCodeArea('EU');
```

getByCode(code: string): Country | undefined
Retrieve a country by its code.
```ts
const infoAboutFrance = getByCode('FR');
```

getByCountry(countryName: string): Country | undefined
Fetch country details using its name.
```ts
const infoAboutCanada = getByCountry('Canada');
```

getByCurrency(currencyCode: string): Country[]
Find countries that use a specific currency.
```ts
const countriesUsingEuro = getByCurrency('EUR');
```

getByLanguage(languageCode: string): Country[]
Find countries where a specific language is spoken.
```ts
const englishSpeakingCountries = getByLanguage('en');
```

getByCountryCode(countryCode: string): Country | undefined
Retrieve country information using its phone code.
```ts
const infoAboutIndia = getByCountryCode('+91');
```

## Contribution 💪
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Licensing 📄
The code in this project is licensed under MIT license.

