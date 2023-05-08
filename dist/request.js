"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const xml_1 = require("./xml");
class OptenError extends Error {
    constructor(m) {
        super(m);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, OptenError.prototype);
    }
}
exports.OptenError = OptenError;
async function soapRequest(url, xml, axiosConfig) {
    try {
        const response = await axios_1.default(Object.assign({}, axiosConfig, { method: 'post', url, data: xml }));
        return response.data;
    }
    catch (err) {
        const e = err;
        if (e.response) {
            const errorResp = await xml_1.parseXml(e.response.data);
            console.error('Opten error request', JSON.stringify(xml));
            console.error('Opten error response', JSON.stringify(errorResp));
            const newErr = new OptenError(`Opten Error: ${errorResp['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['SOAP-ENV:Fault'][0].faultstring}`);
            newErr.request = xml;
            throw newErr;
        }
        else {
            console.error(`SOAP FAIL: ${e}`);
            throw e;
        }
    }
}
exports.soapRequest = soapRequest;
