module.exports = {
	config: {
		name: "goiadminv2",
		version: "1.0",
		author: "Cliff",
		countDown: 5,
		role: 0,
		shortDescription: "sarcasm",
		longDescription: "sarcasm",
		category: "reply",
	},
	onStart: async function () {},
	onChat: async function ({ event, message, getLang, api }) {
		const msg = [
			"Mantion_দিস না _জিহাদ বস এর মন মন ভালো নেই আস্কে-!💔🥀", 
			"- আমার সাথে কেউ সেক্স করে না থুক্কু টেক্স করে নাহ🫂💔", 
			"আমার একটা প্রিয়র খুব দরকার কারন আমার চোখে পানি আসার আগে নাকে সর্দি চলে আসে🤣🤣",
			" চুম্মাইয়া ঠুটের কালার change কইরা,লামু 💋😾😾🔨",
			"জিহাদ বস এখন  বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰",
			"এতো ডাকিস নাহ  সিংগেল জিহাদ রে একটা গফ দে 😒 😏",
			" দিয়ে সিরিয়াস প্রেম করতে চাইলে ইনবক্স",
			"Zihad zihad না করে একটা গফ দে",
			"ডাক_দিস না বাঁলপাঁক্না জিহাদ প্রচুর বিজি 🥵🥀🤗",
			"আর পারলামনা bot bot করতে করতে এখন জিহাদ জিহাদ  শুরু করছে 🙂",  
			"আছি আছি এতো মেনশন দিতে হবেনা😌", 
			" দারা তোদের একটা ব্যবস্হা নিতে হবে খালি ডাকে আর ডাকে 🥲", 
			"আবে সালা তোরা নেকামি করবি আর জিহাদ কে ডাকবি কেন 😾", 
			" তুই আর কতো জালাবি একটু বলবি🥵🥰😍😏"
		];

		const CliffRegex = /^(Zihad)$/i;
		if (event.body && CliffRegex.test(event.body)) {
			api.setMessageReaction("‎🎀", event.messageID, (err) => {}, true);
			return api.sendMessage({ body: msg[Math.floor(Math.random() * msg.length)] }, event.threadID, event.messageID);
		}
	},
};
