const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "info3",
		aliases: ["admin"],
		author: "ArYan 🤡",
		role: 0,
		shortDescription: "info and my owner the cmd",
		longDescription: "",
		category: "INFO",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ArYanInfo = {
				name: 'ANIK AHMED (ˡᵃᵐᵘʳ ˣᵃᵐᵃⁱ)',
				gender: '𝐌𝐚𝐥𝐞',
				age: '21+',
				Tiktok: '𝙸𝚃𝚂_𝙰𝙽𝙸𝙺_7',
				Relationship: 'Wɪᴛʜ 𝑙𝑎𝑚𝑢 𝑏𝑏𝑦♡︎',
				religion: '𝐈𝐬𝐥𝐚𝐦',
				facebook: 'https://www.facebook.com/'
			};

			const ArYan = 'https://i.imgur.com/rtunf7P.jpeg';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const imgResponse = await axios.get(ArYan, { responseType: 'arraybuffer' });
			const imgPath = path.join(tmpFolderPath, 'owner_img.jpeg');

			fs.writeFileSync(imgPath, Buffer.from(imgResponse.data, 'binary'));

			const response = `╭─────❁
│ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢  
│
│𝐍𝐚𝐦𝐞: ${ArYanInfo.name}
│𝐆𝐞𝐧𝐝𝐞𝐫 : ${ArYanInfo.gender}
│𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 : ${ArYanInfo.Relationship}
│𝐀𝐠𝐞 : ${ArYanInfo.age}
│𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧: ${ArYanInfo.religion}
│𝐓𝐢𝐤𝐭𝐨𝐤 : ${ArYanInfo.Tiktok}
│𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 https://www.facebook.com/anik0589
╰────────────❁`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(imgPath)
			}, event.threadID, event.messageID);

			fs.unlinkSync(imgPath);

			api.setMessageReaction('🐔', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ArYaninfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	}
};
