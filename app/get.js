"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const airtable_1 = __importDefault(require("airtable"));
require("dotenv/config");
const environmentVariables = process.env;
const db = new airtable_1.default({
    apiKey: environmentVariables.API_KEY_AIRTABLE,
    endpointUrl: "https://api.airtable.com",
}).base(environmentVariables.AIRTABLE_BASE_ID);
const statusDb = db.table(environmentVariables.API_KEY_STATUS_DB);
const availableDb = db.table(environmentVariables.API_KEY_AVAILABLE_DB);
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    "content-type": "application/json",
};
const handler = async (event, context) => {
    // if (event.httpMethod !== "GET") {
    //   const payload = {
    //     // mfking preflight. too lazy to setup proxy
    //     statusCode: 200,
    //     headers,
    //     body: JSON.stringify({ error: "Method not allowed" }),
    //   };
    //   console.log(payload);
    //   return payload;
    // }
    // if (!("x-api-key" in event.headers) || event.headers["x-api-key"] !== environmentVariables.NUXT_ENV_API_KEY_GET!) {
    //   return {
    //     // mfking preflight. too lazy to setup proxy
    //     statusCode: 200,
    //     body: JSON.stringify({ error: "Not authorized" }),
    //     headers,
    //   };
    // }
    const endpointSplit = event.path.split("/");
    const endpoint = endpointSplit[endpointSplit.length - 1];
    switch (endpoint) {
        case "ping": {
            return {
                statusCode: 200,
                body: "OK",
                headers,
            };
        }
        case "status": {
            const statuses = [];
            (await statusDb.select().all()).forEach((stat) => statuses.push(stat.fields));
            const payload = {
                statusCode: 200,
                headers,
                body: JSON.stringify(statuses),
            };
            return payload;
        }
        case "available": {
            const available = [];
            (await availableDb.select().all()).forEach((av) => available.push(av.fields));
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(available),
            };
        }
        default: {
            return {
                statusCode: 404,
                body: "Not found",
                headers,
            };
        }
    }
};
exports.handler = handler;
