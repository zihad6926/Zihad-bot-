module.exports = {
	config: {
			name: "good night",
			version: "1.0",
			author: "Jaychris Garcia",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "good night") return message.reply("-ঘুমানোর আগে একবার হলেও আল্লাহর নামটি স্মরণ করার চেষ্টা করবেন🌺\nশুভ রাত্রি\n\n____Allah Hafiz 😴");
}
};
