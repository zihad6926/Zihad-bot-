module.exports = {
	config: {
		name: "welcome",
		version: "2.0",
		author: "Customized by You",
		category: "events"
	},

	langs: {
		en: {
			session1: "সকাল 🌄",
			session2: "দুপুর 🌞",
			session3: "বিকাল 🏙️",
			session4: "সন্ধ্যা 🌃",
			welcomeBot: `╔✦✦✦✦❖❖❖✦✦✦✦╗
             ✨ ﷽ ✨
🌸 আসসালামু আলাইকুম.!🥰
╚✦✦✦✦❖❖❖✦✦✦✦╝

💝 আপনাদের গ্রুপে আমাকে যুক্ত করার জন্য অসংখ্য ধন্যবাদ! 😍🎉

📢 🔹 বট প্রিফিক্স: %1 
📢🔹 বটের সকল কমান্ড দেখতে টাইপ করুন: %1help 📜

💫🌷 আপনাদের বিনোদন দেওয়ার জন্যই আমাকে তৈরি করা হয়েছে..! 😃🔥
💫🌷 তাই মজা করুন, {session} উপভোগ করুন, আর দারুণ সময় কাটান..! 🥳🎊

😕📢 তবে যদি কখনো আমার কথায় কষ্ট পান, দয়া করে ক্ষমাসুন্দর দৃষ্টিতে দেখবেন..! 😊🙏

🗣️🔮 যে-কোনো হেল্প লাগলে অথবা কিছু না বুঝলে আমাদের Support Group এ অ্যাড হতেপারেনlink🔗 https://m.me/j/AbbCHFbFIqSOgimi/ 

 🖇️%1supportgc
🖇️%1botgc

💖 ধন্যবাদ! ভালো থাকুন, সুস্থ থাকুন! 💖`,

			welcomeUser: `╭─────╮  
     ‎✨ আ̐স̐সা̐লা̐মু̐ আ̐লা̐ই̐কু̐ম̐ ✨  
╰─────╯

 ╓┈♔◦☓◦☙◦♔◦☙◦☓◦♔┈╖ 
  𝐍𝐄𝐖 𝐌𝐄𝐌𝐁𝐄𝐑       
  {userNameTag}
╙┈♔◦☓◦☙◦♔◦☙◦☓◦♔┈╜
━━━━━━━━━━━━━━━━━━━━━━━━━━
┃➥ গ্রুপের নাম: “{boxName}”  
┃➥ মেম্বার নম্বর: {memberCount} জন  
┃➥ সময়: {session}
━━━━━━━━━━━━━━━━━━━━━━━━━━
╭────────────────────╮  
	⧼ ‎‎‎‎‎‎ 𝐎𝐖𝐍𝐄𝐑  ⧽
	⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎
   ⦅↻ 𝒁𝑰𝑯𝑨𝑫 𝑰𝑺𝑳𝑨𝑴 ↺⦆
╰────────────────────╯`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (!global.temp) global.temp = {};
		if (!global.temp.welcomeEvent) global.temp.welcomeEvent = {};

		if (event.logMessageType == "log:subscribe") {
			const hours = new Date().getHours();
			const { threadID, logMessageData } = event;
			const { nickNameBot } = global.GoatBot.config;
			const prefix = global.utils.getPrefix(threadID);
			const dataAddedParticipants = logMessageData.addedParticipants;

			// If bot was added
			if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
				if (nickNameBot)
					api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
				return message.send(getLang("welcomeBot", prefix).replace("{session}", getSession(hours)));
			}

			// Handle regular member(s) join
			if (!global.temp.welcomeEvent[threadID])
				global.temp.welcomeEvent[threadID] = { joinTimeout: null, dataAddedParticipants: [] };

			global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
			clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

			global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
				const threadData = await threadsData.get(threadID);
				if (threadData.settings.sendWelcomeMessage === false) return;

				const newUsers = global.temp.welcomeEvent[threadID].dataAddedParticipants;
				const dataBanned = threadData.data.banned_ban || [];
				const threadName = threadData.threadName;
				const memberCount = (await api.getThreadInfo(threadID)).participantIDs.length;
				const authorID = logMessageData?.author || "unknown";
				let authorName = "Unknown";

				try {
					const authorInfo = await api.getUserInfo(authorID);
					authorName = authorInfo[authorID]?.name || "Unknown";
				} catch {}

				const userName = [], mentions = [];

				for (const user of newUsers) {
					if (dataBanned.some((item) => item.id == user.userFbId)) continue;
					userName.push(user.fullName);
					mentions.push({ tag: user.fullName, id: user.userFbId });
				}
				if (userName.length === 0) return;

				let welcomeMessage = getLang("welcomeUser");
				const form = {
					body: welcomeMessage
						.replace(/\{userNameTag\}/g, mentions.map(m => m.tag).join(", "))
						.replace(/\{userName\}/g, userName.join(", "))
						.replace(/\{boxName\}/g, threadName)
						.replace(/\{authorName\}/g, authorName)
						.replace(/\{authorMention\}/g, authorName)
						.replace(/\{memberCount\}/g, memberCount)
						.replace(/\{session\}/g, getSession(hours)),
					mentions
				};

				if (threadData.data.welcomeAttachment) {
					const attachments = threadData.data.welcomeAttachment.map(file => drive.getFile(file, "stream"));
					const results = await Promise.allSettled(attachments);
					form.attachment = results.filter(r => r.status === "fulfilled").map(r => r.value);
				}

				message.send(form);
				delete global.temp.welcomeEvent[threadID];
			}, 1500);
		}
	}
};

function getSession(hour) {
	if (hour < 11) return "সকাল 🌄";
	else if (hour < 13) return "দুপুর 🌞";
	else if (hour < 18) return "বিকাল 🏙️";
	else return "সন্ধ্যা 🌃";
}
