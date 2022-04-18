"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const airtable_1 = __importDefault(require("airtable"));
const qs_1 = __importDefault(require("qs"));
const lodash_1 = require("lodash");
require("dotenv/config");
const environmentVariables = process.env;
class commandProcessor {
    constructor({ parsedMessage, rawData }) {
        this.isAuthencated = false;
        //keep action as a parameter to have felxibility of the function later
        this.sendMessage = async (action, params) => {
            const paramString = qs_1.default.stringify(params);
            const urlEndpoint = `https://api.telegram.org/bot${environmentVariables.TELEGRAM_BOT_ID}/${action}?${paramString}`;
            const res = await node_fetch_1.default(urlEndpoint, {
                method: "GET",
            });
            console.log(urlEndpoint, res);
        };
        this.db = new airtable_1.default({
            apiKey: environmentVariables.API_KEY_AIRTABLE,
            endpointUrl: "https://api.airtable.com",
        }).base(environmentVariables.AIRTABLE_BASE_ID);
        this.statusDb = this.db.table(environmentVariables.API_KEY_STATUS_DB);
        this.subscribersDb = this.db.table(environmentVariables.API_KEY_SUBSCRIBERS_DB);
        this.availableDb = this.db.table(environmentVariables.API_KEY_AVAILABLE_DB);
        this.newStatus = async () => {
            const messageRecieved = this.parsedMessage.message.split(" ");
            if (messageRecieved && messageRecieved.length !== 2) {
                this.sendMessage("sendMessage", {
                    text: `The format to send new status is : category1,cattegory2.. <space> status`,
                    reply_to_message_id: this.processedData.messageId,
                    chat_id: this.processedData.chatId,
                });
                return;
            }
            const cat = messageRecieved[0].split(",");
            const msg = messageRecieved[1];
            const status = await this.statusDb.create([
                {
                    fields: {
                        status: msg,
                        category: cat,
                    },
                },
            ], {
                typecast: true,
            });
            const id = status[0].getId();
            console.log(id);
            if (status.length && status.length > 0) {
                this.sendMessage("sendMessage", {
                    text: `status sent with id ${id}`,
                    reply_to_message_id: this.processedData.messageId,
                    chat_id: this.processedData.chatId,
                });
            }
        };
        this.deletestatus = async () => {
            const deleted = await this.statusDb.destroy([this.parsedMessage.message]);
            if (deleted && deleted.length > 0) {
                this.sendMessage("sendMessage", {
                    text: `status sent with id ${deleted[0].id}`,
                    reply_to_message_id: this.processedData.messageId,
                    chat_id: this.processedData.chatId,
                });
            }
            else {
                this.sendMessage("sendMessage", {
                    text: `Deletion failed. Check if id ${this.parsedMessage.message} exist.`,
                    reply_to_message_id: this.processedData.messageId,
                    chat_id: this.processedData.chatId,
                });
            }
        };
        this.subscribeUser = async () => {
            const alreadySubscribed = await this.subscribersDb.select({ filterByFormula: `{user_id} = ${this.processedData.userId}` }).all();
            if (alreadySubscribed && alreadySubscribed.length > 0) {
                this.sendMessage("sendMessage", {
                    text: `Hey ${lodash_1.capitalize(this.processedData.firstName)} you're already subscribed 😄`,
                    reply_to_message_id: this.processedData.messageId,
                    chat_id: this.processedData.chatId,
                });
            }
            else {
                const subscribedUser = await this.subscribersDb.create([
                    {
                        fields: {
                            first_name: this.processedData.firstName,
                            last_name: this.processedData.lastName,
                            chat_id: String(this.processedData.chatId),
                            user_id: String(this.processedData.userId),
                        },
                    },
                ]);
                if (subscribedUser && subscribedUser.length > 0) {
                    this.sendMessage("sendMessage", {
                        text: `Thanks for subscribing ${lodash_1.capitalize(this.processedData.firstName)}`,
                        reply_to_message_id: this.processedData.messageId,
                        chat_id: this.processedData.chatId,
                    });
                }
                else {
                    this.sendMessage("sendMessage", {
                        text: `Hey ${lodash_1.capitalize(this.processedData.firstName)} we encountered an error on our side`,
                        reply_to_message_id: this.processedData.messageId,
                        chat_id: this.processedData.chatId,
                    });
                }
            }
        };
        this.unsubscribeUser = async () => {
            const userExist = await this.subscribersDb.select({ filterByFormula: `{user_id} = ${this.processedData.userId}` }).all();
            if (!userExist) {
                this.sendMessage("sendMessage", {
                    text: `Hey ${lodash_1.capitalize(this.processedData.firstName)} you're not subscribed 😄`,
                    reply_to_message_id: this.processedData.messageId,
                    chat_id: this.processedData.chatId,
                });
            }
            else {
                const deleted = await this.subscribersDb.destroy([userExist[0].getId()]);
                if (deleted && deleted.length > 0) {
                    this.sendMessage("sendMessage", {
                        text: `Outch! But the good thing is you're unsubscribed 😄`,
                        reply_to_message_id: this.processedData.messageId,
                        chat_id: this.processedData.chatId,
                    });
                }
            }
        };
        this.updateStatus = async () => {
            const parsed = this.parsedMessage.message.split(" ");
            const id = parsed[0];
            const message = parsed[1];
            const update = await this.statusDb.update([
                {
                    id,
                    fields: {
                        status: message,
                    },
                },
            ]);
            if (update && update.length > 0) {
                this.sendMessage("sendMessage", {
                    text: `status updated with id ${update[0].id}`,
                    reply_to_message_id: this.processedData.messageId,
                    chat_id: this.processedData.chatId,
                });
            }
            else {
                this.sendMessage("sendMessage", {
                    text: `updation failed check if id ${id} exist`,
                    reply_to_message_id: this.processedData.messageId,
                    chat_id: this.processedData.chatId,
                });
            }
        };
        this.start = async () => {
            this.sendMessage("sendMessage", {
                text: encodeURIComponent(`Hello there use command: \n /subscribe to subscribe to my updates \n /unsubscribe to stop getting updates`),
                chat_id: this.processedData.chatId,
            });
        };
        this.available = async () => {
            const availableStatusStrings = new Set(["avl", "lavl", "navl", "onph", "onem"]);
            const status = this.parsedMessage.message;
            if (availableStatusStrings.has(status)) {
                const updated = await this.availableDb.update([
                    {
                        id: "recWGSWBplYEA2f7B",
                        fields: {
                            currentstatus: status,
                        },
                    },
                ]);
                console.log(updated);
                if (updated && updated.length > 0) {
                    this.sendMessage("sendMessage", {
                        text: `Availability updated with ${status}`,
                        reply_to_message_id: this.processedData.messageId,
                        chat_id: this.processedData.chatId,
                    });
                }
            }
            else {
                this.sendMessage("sendMessage", {
                    text: `I didn't quiet understood that your status must be one of the ${Array.from(availableStatusStrings).join(", ")}`,
                    reply_to_message_id: this.processedData.messageId,
                    chat_id: this.processedData.chatId,
                });
            }
        };
        this.commandDispatcher = new Map([
            ["/newstatus", this.newStatus],
            ["/deletestatus", this.deletestatus],
            ["/subscribe", this.subscribeUser],
            ["/unsubscribe", this.unsubscribeUser],
            ["/updatestatus", this.updateStatus],
            ["/available", this.available],
            ["/start", this.start],
        ]);
        this.needsAuth = new Set(["/newstatus", "/deletestatus", "/updatestatus", "/available"]);
        this.authentication = () => {
            String(this.processedData.messengerId) === environmentVariables.TELEGRAM_ACCOUNT_ID ? (this.isAuthencated = true) : false;
        };
        this.commandNeedsAuth = (command) => {
            return this.needsAuth.has(command);
        };
        this.commandValidiator = (command) => {
            return this.commandDispatcher.has(command);
        };
        this.messageDispatcher = async () => {
            this.authentication();
            const commandRecieved = this.parsedMessage.command;
            const commandIsValid = this.commandValidiator(commandRecieved);
            if (commandIsValid) {
                let res;
                const functionToExec = this.commandDispatcher.get(commandRecieved);
                const commanNeedsAuth = commandIsValid && this.commandNeedsAuth(commandRecieved);
                if (commanNeedsAuth) {
                    res = await this.commandRunner(functionToExec, true);
                }
                else {
                    res = await this.commandRunner(functionToExec, false);
                }
                return res;
            }
            else {
                return 404;
            }
        };
        this.commandRunner = async (fn, needAuth) => {
            const runner = fn;
            const authRequired = Boolean(needAuth);
            if (authRequired) {
                if (this.isAuthencated) {
                    const res = await runner();
                    return res;
                }
                else {
                    return 401;
                }
            }
            else {
                const res = await runner();
                return res;
            }
        };
        this.process = () => {
            this.messageDispatcher().then((data) => console.log(data));
        };
        this.parsedMessage = parsedMessage;
        this.processedData = rawData;
    }
}
const messageParser = (message) => {
    const rMessage = String(message);
    const isCommand = rMessage.charAt(0) === "/" ? true : false;
    if (isCommand) {
        const parsed = rMessage.split(" ");
        const command = parsed[0];
        return { command: command, message: parsed.slice(1).join(" ") };
    }
    return undefined;
};
const bodyParser = (obj) => {
    const parsed = JSON.parse(obj);
    const messageId = parsed.message.message_id;
    const chatId = parsed.message.chat.id;
    const senderDetails = parsed.message.from;
    const message = parsed.message.text;
    const date = parsed.message.date;
    const userId = parsed.message.from.id;
    return {
        messageId,
        messengerId: senderDetails.id,
        firstName: senderDetails.first_name,
        lastName: senderDetails.last_name,
        rawMessage: message,
        chatId,
        date,
        userId,
    };
};
const handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 400,
            body: "Method not allowed",
        };
    }
    console.log(event.body);
    const recievedDetails = bodyParser(event.body);
    const parsedMessage = messageParser(recievedDetails.rawMessage);
    if (parsedMessage) {
        const processor = new commandProcessor({ parsedMessage, rawData: recievedDetails });
        processor.process();
    }
    return {
        statusCode: 200,
    };
};
exports.handler = handler;
