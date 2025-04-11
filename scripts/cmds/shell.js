const { exec } = require('child_process');

module.exports = {
  config: {
    name: "shell",
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "Execute shell commands",
    longDescription: "",
    category: "shell",
    guide: {
      vi: "{p}{n} <command>",
      en: "{p}{n} <command>"
    }
  },

  onStart: async function ({ args, message, event }) {
    const allowedUIDs = ["100087187345465", "100067540204855"];
    const senderUID = event.senderID;

    if (!allowedUIDs.includes(senderUID)) {
      return message.reply("বেবি তোমার এই কমান্ড ব্যবহারের অনুমতি নাই। 🙁");
    }

    const command = args.join(" ");

    if (!command) {
      return message.reply("Please provide a command to execute.");
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return message.reply(`Error: ${error.message}`);
      }

      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return message.reply(`Stderr: ${stderr}`);
      }

      message.reply(`Output:\n${stdout}`);
    });
  }
};
