const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "info",
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
				name: '𝗭𝗜𝗛𝗔𝗗',
				gender: '𝐌𝐚𝐥𝐞',
				age: '21',
				Tiktok: 'zihad6926',
				Relationship: '𝐢𝐧 𝐜𝐨𝐦𝐩𝐥𝐢𝐜𝐚𝐭𝐞𝐝',
				religion: '𝐈𝐬𝐥𝐚𝐦',
				facebook: 'https://www.facebook.com/xxn.zihad'
			};

			const ArYan = 'https://i.imgur.com/8MG28O0.jpeg';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const imgResponse = await axios.get(ArYan, { responseType: 'arraybuffer' });
			const imgPath = path.join(tmpFolderPath, 'owner_img.jpeg');

			fs.writeFileSync(imgPath, Buffer.from(imgResponse.data, 'binary'));

			const response = `𝗗𝗢 𝗡𝗢𝗧 𝗧𝗥𝗨𝗦𝗧 𝗧𝗛𝗘 𝗕𝗢𝗧 𝗢𝗣𝗘𝗥𝗔 𝗧𝗢𝗥\n
------------------------------------------------\n𝗡𝗮𝗺𝗲       : 𝗠𝗼𝗵𝗮𝗺𝗺𝗮𝗱 𝗭𝗶𝗵𝗮𝗱\n𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : 一 ɀỉꫝꪖᦔ ཐི༏ཋྀ\n𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻    : (𝗜𝘀𝗹𝗮𝗺)\n𝗣𝗲𝗿𝗺𝗮𝗻𝗲𝗻𝘁 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : (𝗣𝗮𝗻𝗰𝗵𝗮𝗴𝗮𝗿𝗵 𝗗𝗵𝗮𝗸𝗮)\n𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 :(𝗕𝗵𝘂𝗮𝗽𝘂𝗿,𝗧𝗮𝗻𝗴𝗮𝗶𝗹)\n𝗚𝗲𝗻𝗱𝗲𝗿     : (𝗠𝗮𝗹𝗲)\n𝗔𝗴𝗲            :  (𝟭𝟲+)\n𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 : (𝗦𝗶𝗻𝗴𝗹𝗲)\n𝗪𝗼𝗿𝗸         : 𝗦𝘁𝘂𝗱𝗲𝗻𝘁\n𝗚𝗺𝗮𝗶𝗹        :  𝘇𝘃𝗮𝗶𝟬𝟳𝟱@gmail.𝗰𝗼𝗺\n𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 :  wa.me/+88𝟬𝟭𝟳𝟯𝟰𝟵𝟰𝟱𝟲𝟲𝟲𝟱\n𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺  : 𝗕𝗮𝗹 𝗖𝗮𝗹 𝘂𝘀𝗲 𝗸𝗼𝗿𝗶 𝗻𝗮\n𝗙𝗯 𝗹𝗶𝗻𝗸   : https://www.facebook.com/profile.php?id=100067540204855`;

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
