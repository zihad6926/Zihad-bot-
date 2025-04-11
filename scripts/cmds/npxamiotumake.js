const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "love",
    version: "1.0",
    author: "Zihad",
    countDown: 5,
    role: 2,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const loveEmojis = [
      "❤️‍🩹", "❤️", "🧡", "💛", "💚", "💙", "💖", "💗", "💓", "💞", "💕", "💟", 
      "❣️", "💔", "❤️‍🔥", "💝", "💘", "💌"
    ]; // এই ইমোজিগুলোর যেকোনো একটিতে ট্রিগার হবে

    if (event.body && loveEmojis.includes(event.body.trim())) {
      try {
        const fileUrl =
          "https://drive.google.com/uc?export=download&id=184ECBHC-H2cm4trz_T0Yy9Z7MwTyvaWZ"; // গুগল ড্রাইভ ভয়েস ফাইল লিংক

        const filePath = path.join(__dirname, "love_audio.mp3");

        axios({
          method: "GET",
          url: fileUrl,
          responseType: "stream",
        }).then((response) => {
          const writer = fs.createWriteStream(filePath);
          response.data.pipe(writer);

          writer.on("finish", () => {
            message.reply({
              body: "😍🥰 আমি ও তোমাকে ভালোবাসি! ❤️",
              attachment: fs.createReadStream(filePath),
            });
          });

          writer.on("error", (err) => {
            console.error("File write error:", err);
            message.reply("❌ | ভয়েস ফাইল ডাউনলোড করতে সমস্যা হয়েছে!");
          });
        });
      } catch (error) {
        console.error("Google Drive file error:", error);
        message.reply("❌ | ভয়েস ফাইল লোড করা যাচ্ছে না!");
      }
    }
  },
};