const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "devil",
    aliases: ["Satan", "shoytan", "ghost"],
    version: "1.0.2",
    role: 0,
    author: "Mohammad Rana",
    description: "Send a scary devil message with horror sounds!",
    category: "fun",
    usages: "devil",
    countDowns: 5,
    dependencies: {}
};

module.exports.onStart = async ({ api, event }) => {
    try {
        // 👹 ভয়ংকর বার্তা
        const messages = [
            "👹 আমি শয়তান, তোমার আত্মা চাই! 😈",
            "☠️ রাতের বেলা আয়নায় তাকিও না! আমি তোমার পেছনে দাঁড়িয়ে আছি! 🔪",
            "🩸 তোমার ঘরের দরজা কি সত্যিই বন্ধ? একবার চেক করো... 😱",
            "👁️ কেউ তোমাকে দেখছে... কিন্তু তুমি তাকে দেখতে পাচ্ছো না! 🕷️",
            "🔪 রাতের বেলা কারো কণ্ঠ শুনলে তাকিও না... হয়তো আমি! 😨"
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        // 🔊 ভয়ংকর সাউন্ড লিংক (Scary Sounds)
        const horrorSounds = [
            "https://www.fesliyanstudios.com/play-mp3/4388", // Scary Whispering
            "https://www.fesliyanstudios.com/play-mp3/4399", // Demon Laugh
            "https://www.fesliyanstudios.com/play-mp3/4401"  // Ghost Screaming
        ];
        const randomSound = horrorSounds[Math.floor(Math.random() * horrorSounds.length)];

        // 🔽 অডিও ফাইল ডাউনলোড
        const audioPath = `scary_sound_${Date.now()}.mp3`;
        const writer = fs.createWriteStream(audioPath);

        const response = await axios({
            url: randomSound,
            method: "GET",
            responseType: "stream"
        });

        response.data.pipe(writer);

        writer.on("finish", async () => {
            // 👻 ভয়ংকর বার্তা ও সাউন্ড পাঠানো
            api.sendMessage(
                {
                    body: randomMessage,
                    attachment: fs.createReadStream(audioPath)
                },
                event.threadID,
                () => fs.unlinkSync(audioPath) // ফাইল ডিলিট
            );
        });

        writer.on("error", (err) => {
            console.error("File Write Error:", err);
            api.sendMessage("❌ অডিও পাঠাতে সমস্যা হয়েছে!", event.threadID);
        });
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage("❌ কিছু একটা সমস্যা হয়েছে!", event.threadID);
    }
};