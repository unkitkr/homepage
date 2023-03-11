import { Handler } from "@netlify/functions";
import airtable, { FieldSet, Record } from "airtable";
import "dotenv/config";

const environmentVariables = process.env;

const db = new airtable({
  apiKey: environmentVariables.API_KEY_AIRTABLE,
  endpointUrl: "https://api.airtable.com",
}).base(environmentVariables.AIRTABLE_BASE_ID!);

const statusDb = db.table(environmentVariables.API_KEY_STATUS_DB!);
const availableDb = db.table(environmentVariables.API_KEY_AVAILABLE_DB!);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "*",
  "content-type": "application/json",
};

const handler: Handler = async (event, context) => {
  console.log(event.path.split("/"));
  console.log("x-api-key" in event.headers);
  if (event.httpMethod !== "GET") {
    const payload = {
      // mfking preflight. too lazy to setup proxy
      statusCode: 200,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
    console.log(payload);
    return payload;
  }
  if (!("x-api-key" in event.headers) || event.headers["x-api-key"] !== environmentVariables.NUXT_ENV_API_KEY_GET!) {
    return {
      // mfking preflight. too lazy to setup proxy
      statusCode: 200,
      body: JSON.stringify({ error: "Not authorized" }),
      headers,
    };
  }
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
      const statuses: FieldSet[] = [];
      (await statusDb.select().all()).forEach((stat) => statuses.push(stat.fields));
      const payload = {
        statusCode: 200,
        headers,
        body: JSON.stringify(statuses),
      };
      return payload;
    }
    case "available": {
      const available: FieldSet[] = [];
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

export { handler };
