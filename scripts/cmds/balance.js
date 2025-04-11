module.exports = {
	config: {
		name: "balance",
		aliases: ["bal"],
		version: "1.3",
		author: "NTKhang + Modified by You",
		countDown: 5,
		role: 0,
		description: {
			vi: "xem số tiền hiện có của bạn hoặc người được tag",
			en: "view your money or the money of the tagged person"
		},
		category: "economy",
		guide: {
			vi: "   {pn}: xem số tiền của bạn\n   {pn} <@tag>: xem số tiền của người được tag",
			en: "   {pn}: view your money\n   {pn} <@tag>: view the money of the tagged person"
		}
	},

	langs: {
		en: {
			self: "💸 𝐘𝐨𝐮𝐫 𝐜𝐮𝐫𝐫𝐞𝐧𝐭 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 𝐢𝐬 : %1",
			other: "💸 𝐁𝐚𝐥𝐚𝐧𝐜𝐞 𝐨𝐟 %1 𝐢𝐬 %2"
		},
		vi: {
			self: "💸 𝐒𝐨̂́ 𝐝𝐮 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐥𝐚̀ %1",
			other: "💸 %1 đang có %2"
		}
	},

	onStart: async function ({ message, usersData, event, getLang }) {
		// Formatter
		function formatMoney(amount) {
			const units = [
				{ power: 303, suffix: 'C', emoji: '🏛️' },
				{ power: 63, suffix: 'V', emoji: '🚀' },
				{ power: 60, suffix: 'NvD', emoji: '🌌' },
				{ power: 57, suffix: 'OcD', emoji: '🌀' },
				{ power: 54, suffix: 'SeD', emoji: '✨' },
				{ power: 51, suffix: 'SxD', emoji: '🪐' },
				{ power: 48, suffix: 'QiD', emoji: '⚡' },
				{ power: 45, suffix: 'QTD', emoji: '🎇' },
				{ power: 42, suffix: 'TDc', emoji: '🔮' },
				{ power: 39, suffix: 'DDc', emoji: '🧿' },
				{ power: 36, suffix: 'UDc', emoji: '💫' },
				{ power: 33, suffix: 'Dc', emoji: '🌟' },
				{ power: 30, suffix: 'Nn', emoji: '🔥' },
				{ power: 27, suffix: 'Oc', emoji: '⚜️' },
				{ power: 24, suffix: 'Sp', emoji: '🧠' },
				{ power: 21, suffix: 'Sx', emoji: '💥' },
				{ power: 18, suffix: 'Qt', emoji: '👑' },
				{ power: 15, suffix: 'Qd', emoji: '💎' },
				{ power: 12, suffix: 'T', emoji: '🏦' },
				{ power: 9, suffix: 'B', emoji: '💵' },
				{ power: 6, suffix: 'M', emoji: '🔥' },
				{ power: 3, suffix: 'K', emoji: '💰' }
			];
			for (const unit of units) {
				if (amount >= 10 ** unit.power) {
					const val = (amount / 10 ** unit.power).toFixed(2).replace(/\.00$/, '');
					return `${unit.emoji} ${val}${unit.suffix}`;
				}
			}
			return `🧾 ${amount}`;
		}

		if (Object.keys(event.mentions).length > 0) {
			const uids = Object.keys(event.mentions);
			let msg = "";
			for (const uid of uids) {
				const money = await usersData.get(uid, "money");
				const formatted = formatMoney(money);
				const name = event.mentions[uid].replace("@", "");
				msg += getLang("other", name, formatted) + "\n";
			}
			return message.reply(msg.trim());
		}

		const data = await usersData.get(event.senderID);
		const formatted = formatMoney(data.money);
		return message.reply(getLang("self", formatted));
	}
};
