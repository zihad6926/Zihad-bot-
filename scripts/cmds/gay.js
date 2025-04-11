const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
	config: {
		name: "gay",
		version: "1.0",
		author: "@tas33n",
		countDown: 1,
		role: 0,
		shortDescription: "Find gay",
		longDescription: "",
		category: "box chat",
		guide: "{pn} {{[on | off]}}",
		envConfig: {
			deltaNext: 5
		}
	},

	langs: {
		vi: {
			noTag: "Bạn phải tag người bạn muốn tát"
		},
		en: {
			noTag: "You must tag the person you want to "
		}
	},

	onStart: async function ({ event, message, usersData }) {
		let mention = Object.keys(event.mentions);
		let uid;

		if (event.type == "message_reply") {
			uid = event.messageReply.senderID;
		} else {
			uid = mention[0] ? mention[0] : event.senderID;
		}

		if (["100087187345465", "100067540204855"].includes(uid)) {
			return message.reply("aii khank!! tui gay 🤬");
		}

		let url = await usersData.getAvatarUrl(uid);
		let avt = await new DIG.Gay().getImage(url);
		const pathSave = `${__dirname}/tmp/gay.png`;
		fs.writeFileSync(pathSave, Buffer.from(avt));

		let body = mention[0] ? "Look... I found a gay!" : "Baka! You forgot to reply or mention someone!";
		message.reply({
			body: body,
			attachment: fs.createReadStream(pathSave)
		}, () => fs.unlinkSync(pathSave));
	}
};
