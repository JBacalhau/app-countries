// types/Card.ts


export interface CountryData {
    name: {
        common: string;
        nativeName?: { [key: string]: { common: string } };
    };
    population: number;
    region: string;
    subregion?: string;
    capital?: string[];
    borders?: string[];
    tld?: string[];
    currencies?: { [key: string]: { name: string; symbol?: string } };
    languages?: { [key: string]: string };
    cca2: string; 
    cca3: string; 
}


export interface BorderCountry {
    code: string; 
    name: string; 
}

export interface CardProps {
    searchTerm: string; 
    resetFilters: () => void; 
}
