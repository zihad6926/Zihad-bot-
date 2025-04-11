const fs = require("fs");

module.exports = {
  config: {
    name: "🤝",
    version: "1.0",
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "voice",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    if (event.body) {
      const body = event.body.toLowerCase();
      const keywords = ["🤝", "👐", "hat"]; 

      if (keywords.includes(body)) {
        return message.reply({
          body: " ~ ব্যাঙ দেখাও! আমি তো ব্যাঙ দেখে ভয় পাই না, বরং ওদের সাথে সেলফি তুলতে চাই! 🐸📸😆🔥",
          attachment: fs.createReadStream("./scripts/cmds/RANA/celepotaboaro.mp3"),
        });
      }
    }
  },
};