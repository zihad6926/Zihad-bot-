?cmd install lv.js const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "lv",
		version: "1.2",
		author: "RANA",
		description: {
			en: "দুইজনের মাঝে ভালোবাসার হার পরিমাপ করুন, ছবি সহ!"
		},
		category: "love",
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
			return message.reply("দয়া করে দুইজনকে মেনশন করুন বা দুইটি নাম লিখুন ভালোবাসার হার নির্ণয় করতে!");
		}

		const lovePercent = Math.floor(Math.random() * 101);
		const loveBar = "█".repeat(Math.floor(lovePercent / 10)) + "░".repeat(10 - Math.floor(lovePercent / 10));

		let comment = "";
		if (lovePercent >= 90) comment = "স্বর্গে তৈরি এক জুটি! অপূর্ব মিল!";
		else if (lovePercent >= 70) comment = "ভালোবাসায় ভরা, চমৎকার জুটি!";
		else if (lovePercent >= 50) comment = "ভালো সম্ভাবনা! একটু যত্ন নিলেই জমে যাবে!";
		else if (lovePercent >= 30) comment = "ভালো বন্ধু হতে পারে... বা তার বেশি?";
		else comment = "উহ... ভালোবাসার পথে কিছুটা ঝড় আছে।";

		const result = `
┏━━━━━━━━━━━━━━┓
  ❤️ 𝐋𝐎𝐕𝐄 𝐂𝐇𝐄𝐂𝐊 ❤️
┗━━━━━━━━━━━━━━┛

✨ ${name1} ❤️ ${name2}
━━━━━━━━━━━━━━━━━━
ভালোবাসার হার: ${lovePercent}%
[ ${loveBar} ]
━━━━━━━━━━━━━━━━━━
${comment}
		`;

		// Access Token
		const token = "6628568379|c1e620fa708a1d5696fb991c1bde5662";

		if (uid1 && uid2) {
			try {
				const [img1, img2] = await Promise.all([
					axios.get(`https://graph.facebook.com/${uid1}/picture?width=720&height=720&access_token=${token}`, { responseType: 'arraybuffer' }),
					axios.get(`https://graph.facebook.com/${uid2}/picture?width=720&height=720&access_token=${token}`, { responseType: 'arraybuffer' })
				]);

				const imgPath1 = path.join(__dirname, 'love1.jpg');
				const imgPath2 = path.join(__dirname, 'love2.jpg');

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
				return message.reply("ছবি আনতে সমস্যা হয়েছে, কিন্তু ভালোবাসা ঠিকই জমে গেছে!");
			}
		} else {
			message.reply(result.trim());
		}
	}
};
