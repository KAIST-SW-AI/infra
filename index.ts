import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const chatgptBot = new aws.lex.Bot("chatgpt-bot", {
  abortStatement: {
    messages: [
      {
        content: "Sorry, I am not able to assist at this time",
        contentType: "PlainText",
      },
    ],
  },
  childDirected: false,
  clarificationPrompt: {
    maxAttempts: 2,
    messages: [
      {
        content: "I didn't understand you, what would you like to do?",
        contentType: "PlainText",
      },
    ],
  },
  createVersion: false,
  description: "Bot to order flowers on the behalf of a user",
  idleSessionTtlInSeconds: 600,
  intents: [
    {
      intentName: "OrderFlowers",
      intentVersion: "1",
    },
  ],
  locale: "en-US",
  name: "OrderFlowers",
  processBehavior: "BUILD",
  voiceId: "Salli",
});

export const bot = chatgptBot.id;