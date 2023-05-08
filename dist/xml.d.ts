declare const parseXml: any;
export { parseXml };
export interface BaseXML {
    template: string;
    data: any;
}
export declare function getXML<T extends BaseXML>(params: T): Promise<string>;
