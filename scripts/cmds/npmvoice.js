const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "multiEmojis",
    version: "1.0",
    author: "Zihad",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const emojis = {
      "🤰": {
        text: "🙂🐸",
        voiceUrl: "https://drive.google.com/uc?export=download&id=19h56odKxbP4SjBS00awbQC6erbVtRDk3",
      },
      "🥴": {
        text: "~ প্রেমে হাবুডুবু খাচ্ছো নাকি তুমি 😚🥀",
        voiceUrl: "https://drive.google.com/uc?id=19t0CoqYgHfgfsu0YUooBCN1FEOqlGlsT",
      },
   		"😛": {
        text: "~ প্রেমে হাবুডুবু খাচ্ছো নাকি তুমি 😚🥀",
        voiceUrl: "https://drive.google.com/uc?export=download&id=19fHCxwcpZv2RKtAk2m7i-lVJYyKN-mkk",
      },

      "🥰": {
        text: "🥰🥀 ~ ভালোবাসা অবিরাম কলিজা..!!",
        voiceUrl: "https://drive.google.com/uc?id=19oJiNvoHVMUgV1WYgruirDnA91m8VRsC",
      },
      "🫃": {
        text: "pregnant 😀",
        voiceUrl: "https://drive.google.com/uc?export=download&id=19h56odKxbP4SjBS00awbQC6erbVtRDk3",
      },
      "🦷": {
        text: "~ তোমার দাঁত গুলো চক চক করছে গো.. 🙈🥀",
        voiceUrl: "https://drive.google.com/uc?id=194k31hLVHcz-5WJO87G0tD4ptLYViXJ",
      },
      "🐰": {
        text: "এই খরগোশ, গাজর খাবি নি তুই..!!🥀",
        voiceUrl: "https://drive.google.com/uc?id=19UAfDbTY4gSnfiLv9q35oO_5hRzPku1C",
      },
      "💐": {
        text: "🥰🥀 ~ ভালোবাসা অবিরাম কলিজা..!!",
        voiceUrl: "https://drive.google.com/uc?id=19oJiNvoHVMUgV1WYgruirDnA91m8VRsC",
      },
      "😁": {
        text: "তোমার দাঁত গুলো চক চক করছে গো.. 🙈🥀",
        voiceUrl: "https://drive.google.com/uc?id=194k31hLVHcz-5WJO87G0tD4ptLYViXJ",
      },
      "😡": {
        text: "রাগ করো কেন গো 😨",
        voiceUrl: "https://drive.google.com/uc?export=download&id=1D9petxYMYUDl5lF9KU8z_HR6HVLKVOkB",
      },
      "😠": {
        text: "রাগ করো কেন গো 😩",
        voiceUrl: "https://drive.google.com/uc?export=download&id=1D9petxYMYUDl5lF9KU8z_HR6HVLKVOkB",
      },
      "🤬": {
        text: "রাগ করো কেন গো😩",
        voiceUrl: "https://drive.google.com/uc?export=download&id=1D9petxYMYUDl5lF9KU8z_HR6HVLKVOkB",
      },
      "🤭": {
        text: "সরম পাও কেন",
        voiceUrl: "https://drive.google.com/uc?export=download&id=19lSXsroflWkZWIGR-fb0uYo2VoTKiY8X",
      },
      "🫣": {
        text: "সরম পাও কেন",
        voiceUrl: "https://drive.google.com/uc?export=download&id=19lSXsroflWkZWIGR-fb0uYo2VoTKiY8X",
      },
      "🥺": {
        text: "",
        voiceUrl: "https://drive.google.com/uc?export=download&id=19Pq8jGF55RLQV2stDkJv8kdE8CnL__Tg",
      },
      "😭": {
        text: "🥹",
        voiceUrl: "https://drive.google.com/uc?export=download&id=19Pq8jGF55RLQV2stDkJv8kdE8CnL__Tg",
      },
      "🌶️": {
        text: "উফ!!! কি ঝাল। একটা কিস দাও না জান। অনেক ঝাল লাগছে।🥀",
        voiceUrl: "https://drive.google.com/uc?id=19HDGTVNL1yacyyyBwudfzxjCk_Mt1KZo",
      },
      "😋": {
        text: "খাইছো বাবু 😙",
        voiceUrl: "https://drive.google.com/uc?export=download&id=18NPUAISoGtBAPI8fZc02A8tveWZdy5R0",
      },
      "🤤": {
        text: "খাছো বাবু 🤤🥀",
        voiceUrl: "https://drive.google.com/uc?id=19HDGTVNL1yacyyyBwudfzxjCk_Mt1KZo",
      },
      "🌶": {
        text: "উফ!!! কি ঝাল। একটা কিস দাও না জান। অনেক ঝাল লাগছে।🥀",
        voiceUrl: "https://drive.google.com/uc?id=19HDGTVNL1yacyyyBwudfzxjCk_Mt1KZo",
      },
    };

    // Check for any emoji in the message
    for (const emoji in emojis) {
      if (event.body && event.body.trim() === emoji) {
        try {
          const fileUrl = emojis[emoji].voiceUrl; // Get voice file URL
          const filePath = path.join(__dirname, "audio.mp3");

          axios({
            method: "GET",
            url: fileUrl,
            responseType: "stream",
          }).then((response) => {
            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            writer.on("finish", () => {
              message.reply({
                body: emojis[emoji].text, // Send respective text
                attachment: fs.createReadStream(filePath), // Attach the voice file
              });
            });

            writer.on("error", (err) => {
              console.error("File write error:", err);
              message.reply("❌ | ভয়েস ফাইল ডাউনলোড করতে সমস্যা হয়েছে!");
            });
          });
        } catch (error) {
          console.error("Error:", error);
          message.reply("❌ | ভয়েস ফাইল লোড করা যাচ্ছে না!");
        }
      }
    }
  },
};
