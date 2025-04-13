const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "info2",
    version: "1.0",
    author: "Mahi--",
    countDown: 0,
    role: 0,
    shortDescription: "Owner Info with image",
    longDescription: "Displays owner info with a Pinterest image",
    category: "info2",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {
    const keywords = ["zoro", "luffy", "anik", "info2", "orsted", "yhwach"];
    const keyword = keywords[Math.floor(Math.random() * keywords.length)];
    const api = `https://mahi-apis.onrender.com/api/pin?title=${keyword}&count=5`;

    try {
      const res = await axios.get(api);
      const imgList = res.data.data;
      const imgURL = imgList[Math.floor(Math.random() * imgList.length)];

      const stream = await getStreamFromURL(imgURL);
      const caption = `
╭─────❁
│ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢  
│
│𝐍𝐚𝐦𝐞: ANIK AHMED (🐣 ˣᵃᵐᵃⁱ)
│𝐆𝐞𝐧𝐝𝐞𝐫 : 𝐌𝐚𝐥𝐞
│𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 : Wɪᴛʜ 🙂 𝑏𝑏𝑦♡︎
│𝐀𝐠𝐞 :21+
│𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧: 𝐈𝐬𝐥𝐚𝐦
│𝐓𝐢𝐤𝐭𝐨𝐤 : 𝙸𝚃𝚂_𝙰𝙽𝙸𝙺_7
│𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: 😞🫶
╰────────────❁`;

      message.reply({ body: caption, attachment: stream });
    } catch (e) {
      message.reply("Failed to fetch image or send info.");
    }
  }
};
