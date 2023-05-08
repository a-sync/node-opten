"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
const util = require("util");
const xml2js_1 = require("xml2js");
const xml_1 = require("./xml");
const parseXml = util.promisify(xml2js_1.parseString);
async function rapidSearch(query, token) {
    const xml = await xml_1.getXML({
        template: 'rapid-search',
        data: { token, keresett: query }
    });
    const response = await request_1.soapRequest('https://www.opten.hu/soap/cegtar/unique/uniquemin', xml, {
        headers: { 'Content-Type': 'text/xml;charset=UTF-8' }
    });
    const parsed = await parseXml(response);
    const results = parsed['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:RapidSearchResponse'][0]['ns1:Lista'][0]['ns1:RapidSearchResponseItem'].map(el => {
        return {
            name: el['ns1:Name'][0],
            address: {
                zip: el['ns1:Address'][0]['ns1:Zip'][0],
                city: el['ns1:Address'][0]['ns1:City'][0],
                street: el['ns1:Address'][0]['ns1:StreetAndNum'][0]
            },
            regNumber: el['ns1:RegNumber'][0],
            shortTaxNumber: el['ns1:ShortTaxNumber'][0]
        };
    });
    return results;
}
exports.rapidSearch = rapidSearch;
async function fragmentSearch(query, token) {
    const xml = await xml_1.getXML({
        template: 'fragment-search',
        data: { token, nev: query }
    });
    const response = await request_1.soapRequest('https://www.opten.hu/soap/cegtar/unique/uniquemin', xml, {
        headers: { 'Content-Type': 'text/xml;charset=UTF-8' }
    });
    const parsed = await parseXml(response);
    const results = parsed['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:RapidSearchResponse'][0]['ns1:Lista'][0]['ns1:RapidSearchResponseItem'].map(el => {
        return {
            name: el['ns1:Name'][0],
            address: {
                zip: el['ns1:Address'][0]['ns1:Zip'][0],
                city: el['ns1:Address'][0]['ns1:City'][0],
                street: el['ns1:Address'][0]['ns1:StreetAndNum'][0]
            },
            regNumber: el['ns1:RegNumber'][0],
            shortTaxNumber: el['ns1:ShortTaxNumber'][0]
        };
    });
    return results;
}
exports.fragmentSearch = fragmentSearch;
