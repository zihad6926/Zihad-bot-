const { createReadStream, unlinkSync, createWriteStream } = require("fs-extra");
const { resolve } = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "say",
    aliases: ["বলো"],
    version: "1.1",
    author: "Zihad",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "text to speech with language",
    },
    longDescription: {
      en: "Convert text to speech in various languages.",
    },
    category: "fun",
    guide: {
      en: "/say [language] [text]: Convert text to speech. Default language is English.\nExample usages:\n/say More languages added en,es,fr,de,it,pt,ru,ko,ja,zh,hi,bn,ar,tr,tl,vi,ne,id - your sms "
    },
  },

  onStart: async function ({ api, event, args, getLang }) {
    try {
      const content = event.type === "message_reply" ? event.messageReply.body : args.join(" ");
      const supportedLanguages = [
        "en", "es", "fr", "de", "it", "pt", "ru", "ko", "ja", "zh", "hi", "bn", "ar", "tr", "tl", "vi", "ne", "id"
      ]; // More languages added
      const defaultLanguage = "en"; // Default language is English

      // Detect language from the message
      const languageToSay = supportedLanguages.some((item) => content.indexOf(item) === 0) 
        ? content.slice(0, content.indexOf(" ")) 
        : defaultLanguage;
        
      const msg = languageToSay !== defaultLanguage ? content.slice(languageToSay.length + 1) : content; // Adjust slicing logic
      const path = resolve(__dirname, "tmp", `${event.threadID}_${event.senderID}.mp3`);

      // URL for Google TTS API with dynamic language selection
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`;
      const response = await axios({
        method: "GET",
        url,
        responseType: "stream",
      });

      const writer = response.data.pipe(createWriteStream(path));
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      // Send the generated speech as an attachment
      api.sendMessage(
        { attachment: createReadStream(path) },
        event.threadID,
        () => unlinkSync(path)
      );
    } catch (error) {
      console.error("Error occurred during TTS:", error);
      // Handle error response here
    }
  },
};
