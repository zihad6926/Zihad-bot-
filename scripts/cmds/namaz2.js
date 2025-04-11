module.exports = {
	config: {
		name: "namaz",
		aliases: ["salat"],
		version: "1.0",
		author: "kshitiz (Modified by Ullash)",
		countDown: 60,
		role: 2,
		shortDescription: "get hentai video",
		longDescription: "it will send hentai video",
		category: "𝗜𝗦𝗟𝗔𝗠",
		guide: "{p}{n}hvdo",
	},

	sentVideos: [],

	onStart: async function ({ api, event, message }) {
		// Check if the author is modified
		const originalAuthor = "kshitiz (Modified by Ullash)";
		if (this.config.author !== originalAuthor) {
			return message.reply("❌ Unauthorized change detected in the author field. Please revert it back to the original author.");
		}

		const senderID = event.senderID;

		const loadingMessage = await message.reply({
			body: "-𝗔𝘀𝘀𝗮𝗹𝗮𝗺𝘂𝗮𝗹𝗶𝗸𝘂𝗺♡<💚🌻\n\nআপনি যেই কমান্ড পাঠিয়েন, তা নামাজ শিক্ষার ভিডিও।\nএই ভিডিও গুলো স্যোশাল মিড়িয়া থেকে নেওয়া হয়েছে\n যদি এখানে কিছু ভুল হয়ে থাকে তা ক্ষমা সুন্দর দৃষ্টিতে দেখবেন এবং বট এড়মিন কে এ বিষয়ে জানাতে ভুলবেন না।\n\nধন্যবাদ",
		});

		const link = [
				"https://i.imgur.com/5NkSbJD.mp4",
				"https://i.imgur.com/sOrJ2TI.mp4",
				"https://i.imgur.com/X9b9LSh.mp4",
				"https://i.imgur.com/IdbKBlk.mp4",
				"https://i.imgur.com/9k8nSEf.mp4",
				"https://i.imgur.com/7P2XM82.mp4",
				"https://i.imgur.com/ky3QPff.mp4",
				"https://i.imgur.com/p3HP4gO.mp4",
				"https://i.imgur.com/PDrToVG.mp4",
				"https://i.imgur.com/wWa1EvC.mp4",
				"https://i.imgur.com/VqbHlAm.mp4",
				"https://i.imgur.com/iv10WCZ.mp4",
				"https://i.imgur.com/21e7XOb.mp4",
				"https://i.imgur.com/a0pANNw.mp4",
				"https://i.imgur.com/ldl11nV.mp4",
				"https://i.imgur.com/euyZ74o.mp4",
				"https://i.imgur.com/NrvJxY3.mp4",
				"https://i.imgur.com/sMnOUgS.mp4",
				"https://i.imgur.com/pHABII6.mp4",
				"https://i.imgur.com/5yrP6kK.mp4",
				"https://i.imgur.com/eMWg3YO.mp4",
				"https://i.imgur.com/S7qsBtl.mp4",
				"",
		];

		const availableVideos = link.filter(video => !this.sentVideos.includes(video));

		if (availableVideos.length === 0) {
			this.sentVideos = [];
		}

		const randomIndex = Math.floor(Math.random() * availableVideos.length);
		const randomVideo = availableVideos[randomIndex];

		this.sentVideos.push(randomVideo);

		if (senderID !== null) {
			message.reply({
				body: 'যদি আপনার মনে হয় ভিডিও দেখানো পদ্ধতি ভুল, তাহলে অবশ্যই বট এড়মিনকে জানাতে ভুলবেন না \n\n\nVIDEO CREDIT:-—͟͟͞͞𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️',
				attachment: await global.utils.getStreamFromURL(randomVideo),
			});

			setTimeout(() => {
				api.unsendMessage(loadingMessage.messageID);
			}, 5000);
		}
	},
};
