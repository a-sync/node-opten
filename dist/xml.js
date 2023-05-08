"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util = require("util");
const dot = require("dot");
const xml2js_1 = require("xml2js");
const readFile = util.promisify(fs.readFile);
const parseXml = util.promisify(xml2js_1.parseString);
exports.parseXml = parseXml;
async function getXML(params) {
    const template = await readFile(`${__dirname}/xml/${params.template}.xml`, {
        encoding: 'utf8'
    });
    const compileFn = dot.template(template);
    return compileFn(params.data);
}
exports.getXML = getXML;
