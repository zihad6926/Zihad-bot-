'const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "finger",
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
    const fingerEmojis = [
      "🖕", "👆", "👇", "☝️", "👍", "👎", "👉", "👈", "🤟", "🤘", "🫰"
    ]; // এই ইমোজিগুলোর যেকোনো একটিতে ট্রিগার হবে

    // যদি ইমোজি যেকোনো একটির সাথে মিলে যায়
    if (event.body && fingerEmojis.includes(event.body.trim())) {
      try {
        let messageText = "😾 আঙ্গুল দেখাও, আঙ্গুল তোমার পেছন দিয়ে ভরে দেব..!!";
        let fileUrl = "https://drive.google.com/uc?export=download&id=187QDqdV_Fxs6-HumyEZvJ7nqEvBEFYST";
        let filePath = path.join(__dirname, "finger_audio.mp3");

        // ভয়েস ফাইল ডাউনলোড এবং রিপ্লাই পাঠানো
        axios({
          method: "GET",
          url: fileUrl,
          responseType: "stream",
        }).then((response) => {
          const writer = fs.createWriteStream(filePath);
          response.data.pipe(writer);

          writer.on("finish", () => {
            message.reply({
              body: messageText,
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