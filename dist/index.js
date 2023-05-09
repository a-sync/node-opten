"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rapid_search_1 = require("./rapid-search");
const authorize_1 = require("./authorize");
const multi_info_1 = require("./multi-info");
const entities_1 = require("entities");
const dayjs = require("dayjs");
class Opten {
    constructor(options) {
        this.token = null;
        this.options = options;
    }
    async getToken() {
        if (this.token) {
            if (dayjs().isBefore(this.tokenExpiresAt))
                return this.token;
        }
        const token = await authorize_1.authorize({
            username: this.options.username,
            password: this.options.password
        });
        this.token = token;
        this.tokenExpiresAt = dayjs().add(175, 'minute'); // token expires in 3 hours
        return token;
    }
    async rapidSearch(query, isRetry = false) {
        const token = await this.getToken();
        try {
            return rapid_search_1.rapidSearch(entities_1.encodeXML(query), token);
        }
        catch (err) {
            if (!isRetry) {
                delete this.token;
                return this.rapidSearch(query, true);
            }
            else {
                throw err;
            }
        }
    }
    async fragmentSearch(query, isRetry = false) {
        const token = await this.getToken();
        try {
            return rapid_search_1.fragmentSearch(entities_1.encodeXML(query), token);
        }
        catch (err) {
            if (!isRetry) {
                delete this.token;
                return this.fragmentSearch(query, true);
            }
            else {
                throw err;
            }
        }
    }
    async multiInfo(firmTaxNo, isRetry = false) {
        const token = await this.getToken();
        try {
            return multi_info_1.multiInfo(firmTaxNo, token);
        }
        catch (err) {
            if (!isRetry) {
                delete this.token;
                return this.multiInfo(firmTaxNo, true);
            }
            else {
                throw err;
            }
        }
    }
}
exports.Opten = Opten;
