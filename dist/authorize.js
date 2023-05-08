"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
const util = require("util");
const xml2js_1 = require("xml2js");
const xml_1 = require("./xml");
const parseXml = util.promisify(xml2js_1.parseString);
async function authorize({ username, password }) {
    const xml = await xml_1.getXML({
        template: 'authorize',
        data: { username, password }
    });
    const response = await request_1.soapRequest('https://www.opten.hu/soap/authorize', xml, {
        headers: { 'Content-Type': 'text/xml;charset=UTF-8' }
    });
    const parsed = await parseXml(response);
    return parsed['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:AuthorizationResponse'][0]['ns1:Token'][0];
}
exports.authorize = authorize;
