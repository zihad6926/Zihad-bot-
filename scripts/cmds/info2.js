const { getStreamFromURL } = global.utils;
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "owner",
    version: "1.1",
    author: "Mahi--",
    countDown: 0,
    role: 0,
    shortDescription: "Owner Info with image",
    longDescription: "Displays owner info with fixed FB image",
    category: "owner",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message, event, api }) {
    const imgURL = "https://graph.facebook.com/100078769420993/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
    
    try {
      const stream = await getStreamFromURL(imgURL);
      const threadInfo = await api.getThreadInfo(event.threadID);
      const threadName = threadInfo.threadName || "Unknown Group";
      const time = moment().tz("Asia/Dhaka").format("hh:mm A, dddd");

      const caption = `
‎╭──────────────────⊙
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
‎├──❯ 𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍 ⤵️ 
‎├‣ 🔰 𝐑𝐋𝐒𝐍 𝐒𝐓𝐓𝐒 : 𝑆𝐼𝑁𝐺𝐿𝐸 🐣
‎├‣ ⚡ 𝐂𝐑𝐔𝐒𝐇     :  𝐵𝐵𝑌 >🐥🐊
‎│  
‎├──❯ 𝗚𝗖 𝗜𝗡𝗙𝗢 
‎├‣ 🎭 𝙶𝙲 𝙽𝙰𝙼𝙴 : ${threadName}
‎├‣ ⏳ 𝚃𝙸𝙼𝙴 : ${time}
‎├──────────────────❖
‎│ 🙏 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗨𝗦𝗜𝗡𝗚  
‎╰──────────────────⊙`;

      message.reply({ body: caption, attachment: stream });
    } catch (e) {
      console.error(e);
      message.reply("Failed to load image or info.");
    }
  }
};
