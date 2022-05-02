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
const handler = async (event, context) => {
    if (event.httpMethod !== "GET") {
        return {
            statusCode: 400,
            body: "Method not allowed",
        };
    }
    if (!("x-api-key" in event.headers) || event.headers["x-api-key"] !== environmentVariables.NUXT_ENV_API_KEY_GET) {
        return {
            statusCode: 401,
            body: "Not authorized",
        };
    }
    const endpointSplit = event.path.split("/");
    const endpoint = endpointSplit[endpointSplit.length - 1];
    switch (endpoint) {
        case "ping": {
            return fetch("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } })
                .then((response) => response.json())
                .then((data) => ({
                statusCode: 200,
                body: data.joke,
            }))
                .catch((error) => ({ statusCode: 422, body: String(error) }));
        }
        case "status": {
            const statuses = [];
            (await statusDb.select().all()).forEach((stat) => statuses.push(stat.fields));
            return {
                statusCode: 200,
                body: JSON.stringify(statuses),
            };
        }
        case "available": {
            const available = [];
            (await availableDb.select().all()).forEach((av) => available.push(av.fields));
            return {
                statusCode: 200,
                body: JSON.stringify(available),
            };
        }
        default: {
            return { statusCode: 404, body: "Not found" };
        }
    }
};
exports.handler = handler;
