module.exports = {
	config: {
			name: "kamon aco",
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
	if (event.body && event.body.toLowerCase() == "kamon aco") return message.reply("-আলহামদুলিল্লাহ \nআমি ভালো আছি🙂\n\n তুমি কেমন আছো...?");
}
};
