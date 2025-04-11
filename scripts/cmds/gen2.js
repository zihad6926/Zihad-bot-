const axios = require('axios');

module.exports = {
  config: {
    name: 'gen',
    version: '1.0',
    author: 'Fahim_Noob',
    countDown: 0,
    role: 0,
    longDescription: {
      en: 'Text to Image'
    },
    category: 'image',
    guide: {
      en: '{pn} prompt'
    }
  },

  onStart: async function ({ message, api, args, event }) {
    const promptText = args.join(' ').trim();

    if (!promptText) {
      return message.reply("😡 Please provide a prompt.");
    }

    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    try {
      const domain = '.xyz';
      const imageURL = `https://smfahim${domain}/creartai?prompt=${encodeURIComponent(promptText)}`;
      const attachment = await global.utils.getStreamFromURL(imageURL);

      message.reply({
        attachment
      });

      api.setMessageReaction("✅", event.messageID, () => {}, true);
    } catch (error) {
      console.error("Error generating image:", error.message);
      message.reply("😔 Something went wrong. Please try again.");
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  }
};
