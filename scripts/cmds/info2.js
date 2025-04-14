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
;‎╭──────────────────⊙
‎│  𝗔𝗦𝗦𝗔𝗟𝗔𝗠𝗨 𝗪𝗔𝗟𝗔𝗜𝗞𝗨𝗠🖤
‎├──────────────────❖
‎├──❯  ☠︎︎_ 𝐀𝐃𝐌𝐈𝐍 𝐈𝐍𝐅𝐎 _☠︎︎
‎├‣ 𝐍𝐀𝐌𝐄 : AɴIᴋ AʜMᴇD >♡︎
‎├‣ 𝐁𝐀𝐒𝐀  : PᴀBɴA,Bʜᴀɴɢᴜʀᴀ 
‎├‣ 𝐒𝐓𝐃𝐘  : HᴏNᴜRᴜS 2ɴD YᴇAʀ >
‎├──❯ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧  🔗 
‎├‣ 🏷️ 𝙵,𝙱  : AɴIᴋ 0589 >(ᵘˢʳ ⁿᵐ)
‎├‣ 📢 𝙸,𝙶  : AɴɪK_0171 >(ᵘˢʳ ⁿᵐ)
‎├‣ ▶️ 𝚃,𝚃  : 𝙸𝚃𝚂_𝙰𝙽𝙸𝙺_69
‎│
‎├──❯         𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍 ⤵️ 
‎├‣ 🔰 𝐑𝐋𝐒𝐍 𝐒𝐓𝐓𝐒 : 𝑆𝐼𝑁𝐺𝐿𝐸 🐣
‎├‣ ⚡ 𝐂𝐑𝐔𝐒𝐇      : 𝑅𝑈𝑀𝑈 𝐵𝐵𝑌 
‎│  
‎├──❯ 𝗚𝗖 𝗜𝗡𝗙𝗢 
‎├──────────────────❖
‎│ 🙏 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗨𝗦𝗜𝗡𝗚  
‎╰──────────────────⊙

      message.reply({ body: caption, attachment: stream });
    } catch (e) {
      message.reply("Failed to fetch image or send info.");
    }
  }
};
