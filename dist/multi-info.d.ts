export interface MultiInfoXML {
    template: 'multi-info';
    data: {
        token: string;
        firmTaxNo: string;
    };
}
export interface ExampleMultiInfoResponse {
    'SOAP-ENV:Envelope': {
        $: $;
        'SOAP-ENV:Body': SOAPENVBodyItem[];
    };
}
interface $ {
    'xmlns:SOAP-ENV'?: string;
    'xmlns:ns1'?: string;
    id?: string;
    rovatszam?: string;
    megnevezes?: string;
    alrovatszam?: string;
    hatalyos?: string;
    tipus?: string;
    num?: string;
    subtype?: string;
}
interface SOAPENVBodyItem {
    'ns1:MultiInfoResponse': Ns1MultiInfoResponseItem[];
}
interface Ns1MultiInfoResponseItem {
    'ns1:MultiInfo': Ns1MultiInfoItem[];
}
interface Ns1MultiInfoItem {
    $: $;
    'ns1:Rovatok': Ns1RovatokItem[];
    'ns1:ScoringAdatok': Ns1ScoringAdatokItem[];
    'ns1:MerlegAdatok': string[];
    'ns1:ExtendData': Ns1ExtendDataItem[];
}
interface Ns1RovatokItem {
    'ns1:Rovat': Ns1RovatItem[];
}
interface Ns1RovatItem {
    $: $;
    'ns1:Alrovat': Ns1AlrovatItem[];
}
interface Ns1AlrovatItem {
    $: $;
    'ns1:Ertek': string[];
    'ns1:HatalyosTol': string[];
}
interface Ns1ScoringAdatokItem {
    'ns1:XData': Ns1XDataItem[];
}
interface Ns1XDataItem {
    $: $;
    'ns1:Value': Ns1ValueItem[];
}
interface Ns1ValueItem {
    _: string;
    $: $;
}
interface Ns1ExtendDataItem {
    'ns1:CEGELNEVEZESE': Ns1CEGELNEVEZESEItem[];
    'ns1:CEGSZEKHELYE': Ns1CEGSZEKHELYEItem[];
    'ns1:ADOSZAM': Ns1ADOSZAMItem[];
}
interface Ns1CEGELNEVEZESEItem {
    $: $;
    'ns1:NEVALROVAT': Ns1NEVALROVATItem[];
}
interface Ns1NEVALROVATItem {
    $: $;
    'ns1:MEGNEVEZES': Ns1MEGNEVEZESItem[];
    'ns1:HATALY': Ns1HATALYItem[];
}
interface Ns1MEGNEVEZESItem {
    'ns1:valtozas'?: Ns1ValtozasItem[];
    'ns1:bejegyzes': Ns1BejegyzesItem[];
    'ns1:nev'?: string[];
    'ns1:CIM'?: Ns1CIMItem[];
}
interface Ns1ValtozasItem {
    'ns1:kezdet': string[];
}
interface Ns1BejegyzesItem {
    'ns1:kezdet': string[];
}
interface Ns1HATALYItem {
    'ns1:KEZDETE': string[];
}
interface Ns1CEGSZEKHELYEItem {
    $: $;
    'ns1:CIMALROVAT': Ns1CIMALROVATItem[];
}
interface Ns1CIMALROVATItem {
    $: $;
    'ns1:MEGNEVEZES': Ns1MEGNEVEZESItem[];
    'ns1:HATALY': Ns1HATALYItem[];
}
interface Ns1CIMItem {
    'ns1:cim_iranyitoszam': string[];
    'ns1:cim_varos': string[];
    'ns1:cim_utca': string[];
    'ns1:cim_kterjell': string[];
    'ns1:cim_hsz': string[];
}
interface Ns1ADOSZAMItem {
    $?: $;
    'ns1:ADOSZAMALROVAT'?: Ns1ADOSZAMALROVATItem[];
    'ns1:magyar_adoszam'?: string[];
    'ns1:kozossegi_adoszam'?: string[];
    'ns1:adoszam_statusza'?: string[];
    'ns1:adoszam_statusz_kezdet'?: string[];
    'ns1:valtozas'?: Ns1ValtozasItem[];
    'ns1:bejegyzes'?: Ns1BejegyzesItem[];
}
interface Ns1ADOSZAMALROVATItem {
    $: $;
    'ns1:ADOSZAM': Ns1ADOSZAMItem[];
    'ns1:HATALY': Ns1HATALYItem[];
}
export declare function multiInfo<T>(firmTaxNo: string, token: string): Promise<T>;
export {};
