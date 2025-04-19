const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "lv",
    version: "2.1",
    author: "OpenSource Edition",
    description: {
      en: "দুইজনের মাঝে ভালোবাসার হার মাপুন, ছবি সহ।"
    },
    category: "fun",
    guide: {
      en: "{pn} @User1 @User2 অথবা {pn} নাম1 নাম2"
    }
  },

  onStart: async function ({ message, args, event, usersData }) {
    let [uid1, uid2] = Object.keys(event.mentions);
    let name1, name2;

    if (uid1 && uid2) {
      name1 = await usersData.getName(uid1);
      name2 = await usersData.getName(uid2);
    } else if (args.length >= 2) {
      name1 = args[0];
      name2 = args[1];
    } else {
      return message.reply("দয়া করে দুইজনকে মেনশন করুন বা দুইটি নাম লিখুন ভালোবাসার হার জানার জন্য!");
    }

    const lovePercent = Math.floor(Math.random() * 101);
    const loveBar = "█".repeat(Math.floor(lovePercent / 10)) + "░".repeat(10 - Math.floor(lovePercent / 10));

    let comment = "";
    if (lovePercent >= 95) comment = "তোমাদের প্রেমে আকাশের তারা ঝরে পড়ে!";
    else if (lovePercent >= 80) comment = "চোখে চোখ রাখলেই প্রেম বুঝা যায়!";
    else if (lovePercent >= 60) comment = "ভালোবাসা গড়ছে ধীরে ধীরে, সাবধানে আগাও!";
    else if (lovePercent >= 40) comment = "আলো-অন্ধকারের মাঝামাঝি, বুঝে চলতে হবে!";
    else comment = "হৃদয়ের টান দুর্বল, তবে অলৌকিক কিছু ঘটতেও পারে!";

    const result = `
┏━━━━━━━━━━━━━━━━━┓
     💖 LOVE METER 💖
┗━━━━━━━━━━━━━━━━━┛

💞 ${name1} + ${name2}
━━━━━━━━━━━━━━━━━━
❤️ মিল: ${lovePercent}%
[ ${loveBar} ]
━━━━━━━━━━━━━━━━━━
💬 ${comment}
━━━━━━━━━━━━━━━━━━
`;

    const token = "6628568379|c1e620fa708a1d5696fb991c1bde5662";

    if (uid1 && uid2) {
      try {
        const [img1, img2] = await Promise.all([
          axios.get(`https://graph.facebook.com/${uid1}/picture?width=720&height=720&access_token=${token}`, { responseType: 'arraybuffer' }),
          axios.get(`https://graph.facebook.com/${uid2}/picture?width=720&height=720&access_token=${token}`, { responseType: 'arraybuffer' })
        ]);

        const imgPath1 = path.join(__dirname, 'love_user1.jpg');
        const imgPath2 = path.join(__dirname, 'love_user2.jpg');

        fs.writeFileSync(imgPath1, Buffer.from(img1.data));
        fs.writeFileSync(imgPath2, Buffer.from(img2.data));

        message.reply({
          body: result.trim(),
          attachment: [
            fs.createReadStream(imgPath1),
            fs.createReadStream(imgPath2)
          ]
        }, () => {
          fs.unlinkSync(imgPath1);
          fs.unlinkSync(imgPath2);
        });
      } catch (err) {
        console.error(err);
        return message.reply("ছবি আনতে সমস্যা হয়েছে, তবে প্রেমের টান ঠিকই জমে আছে!");
      }
    } else {
      message.reply(result.trim());
    }
  }
};
