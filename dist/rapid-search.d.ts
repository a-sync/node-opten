export interface RapidSearchXML {
    template: 'rapid-search';
    data: {
        token: string;
        keresett: string;
    };
}
export interface FragmentSearchXML {
    template: 'fragment-search';
    data: {
        token: string;
        nev: string;
    };
}
interface RapidSearchRetItem {
    name: string;
    address: {
        zip: string;
        city: string;
        street: string;
    };
    regNumber: string;
    shortTaxNumber: string;
}
export declare type RapidSearchRet = RapidSearchRetItem[];
export declare function rapidSearch(query: string, token?: string): Promise<RapidSearchRet>;
export declare function fragmentSearch(query: string, token?: string): Promise<RapidSearchRet>;
export {};
