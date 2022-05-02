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

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 400,
      body: "Method not allowed",
    };
  }
  if (!("x-api-key" in event.headers) || event.headers["x-api-key"] !== environmentVariables.NUXT_ENV_API_KEY_GET!) {
    return {
      statusCode: 401,
      body: "Not authorized",
    };
  }
  const endpointSplit = event.path.split("/");
  const endpoint = endpointSplit[endpointSplit.length - 1];

  switch (endpoint) {
    case "ping": {
      return {
        statusCode: 200,
        body: "OK",
      };
    }
    case "status": {
      const statuses: FieldSet[] = [];
      (await statusDb.select().all()).forEach((stat) => statuses.push(stat.fields));
      return {
        statusCode: 200,
        body: JSON.stringify(statuses),
      };
    }
    case "available": {
      const available: FieldSet[] = [];
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

export { handler };
