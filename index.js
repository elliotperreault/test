const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const fs = require("fs");
const { getToken, getBannedWord, getCharWizard, setDatabase } = require("./admin/utils");
setDatabase("admin/backend/database.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
  console.log("Bot node is started");
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
  let bannedWords = await getBannedWord();
  let charWizard = await getCharWizard();

  let cleanedContent = msg.content;

  for (let [char, replacement] of Object.entries(charWizard)) {
    let regex = new RegExp(char, "g");
    cleanedContent = cleanedContent.replace(regex, replacement);
  }

  cleanedContent = cleanedContent
    .replace(/[^a-zA-Z]/g, "") // Remove non-alphabet characters
    .toLowerCase();

  cleanedContent = cleanedContent.replace(/([a-z])\1+/g, "$1"); //remove consecutive

  for (let word of bannedWords) {
    let cleanedWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    cleanedWord = cleanedWord.replace(/([a-z])\1+/g, "$1"); //remove consecutive

    if (cleanedContent.includes(cleanedWord)) {
      msg.delete();
      msg.author.send(
        `** Please, my very gentle gentleman, I need to ask you to stop sending this type of message because it contain the word:  *${word}***`
      );
      break;
    }
  }
});

(async () => {
  client.login(await getToken());
})();
