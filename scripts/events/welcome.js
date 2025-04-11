const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

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
			welcomeBot: `‎╔✦✦✦✦❖❖❖✦✦✦✦╗\n             ✨ ﷽ ✨\n🌸 আসসালামু আলাইকুম.!🥰\n╚✦✦✦✦❖❖❖✦✦✦✦╝\n\n💝 আপনাদের গ্রুপে আমাকে যুক্ত করার জন্য অসংখ্য ধন্যবাদ! 😍🎉\n\n📢 🔹 বট প্রিফিক্স: %1 \n📢🔹 বটের সকল কমান্ড দেখতে টাইপ করুন: %1help 📜\n\n💫🌷 আপনাদের বিনোদন দেওয়ার জন্যই আমাকে তৈরি করা হয়েছে..! 😃🔥\n💫🌷 তাই মজা করুন, {session} উপভোগ করুন, আর দারুণ সময় কাটান..! 🥳🎊\n\n😕📢 তবে যদি কখনো আমার কথায় কষ্ট পান, দয়া করে ক্ষমাসুন্দর দৃষ্টিতে দেখবেন..! 😊🙏\n\n💖 ধন্যবাদ! ভালো থাকুন, সুস্থ থাকুন! 💖`,
			welcomeUser: `👋 Hello {userNameTag}
Welcome to the group: {boxName}

➤ Added by: {authorName}
➤ New member: {userName}
➤ Total members: {memberCount}

Have a nice {session} (◍•ᴗ•◍) ♡`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
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
			};
	}
};

function getSession(hour) {
	return hour <= 10 ? "সকাল 🌄" : hour <= 12 ? "দুপুর 🌞" : hour <= 18 ? "বিকাল 🏙️" : "সন্ধ্যা 🌃";
}
