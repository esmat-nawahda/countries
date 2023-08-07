export interface Country {
    label: string;
    code: string;
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
}