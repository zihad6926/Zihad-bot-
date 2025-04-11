module.exports = {
 config: {
	 name: "half girlfriend",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "half girlfriend") {
 return message.reply({
 body: "    「🌻༉༊___Dear bestu❤️‍🩹••!!😊🙂ღ༊🥀🥰\n মনটা আমার হলেও মনের ভিতরের জায়গাটায়\n\n🖤🌸༊__শুধু তোর রাজত্ব চলে..!!😅🖤༊ღ࿐😽\n\n••\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥\nU L L A S H」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/Dhd76kB.mp4")
 });
 }
 }
}
