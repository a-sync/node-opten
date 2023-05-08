"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
const util = require("util");
const xml2js_1 = require("xml2js");
const xml_1 = require("./xml");
const parseXml = util.promisify(xml2js_1.parseString);
async function multiInfo(firmTaxNo, token) {
    const xml = await xml_1.getXML({
        template: 'multi-info',
        data: { token, firmTaxNo }
    });
    const response = await request_1.soapRequest('https://www.opten.hu/soap/cegtar/unique/uniquemin', xml, {
        headers: { 'Content-Type': 'text/xml;charset=UTF-8' }
    });
    const parsed = await parseXml(response);
    return parsed;
}
exports.multiInfo = multiInfo;
