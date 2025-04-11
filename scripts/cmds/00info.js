module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 5,
    role: 0,
    shortDescription: "Admin & Info",
    longDescription: "Bot Owner Information",
    category: "info",
  },

  onStart: async function ({ event, message, usersData, threadsData }) {
  
      // ইউজার ও থ্রেডের তথ্য সংগ্রহ
      const userData = await usersData.get(event.senderID);
      const userName = userData.name;

      const threadData = await threadsData.get(event.threadID);
      const threadName = threadData.threadName;

      // তারিখ ও সময় সংগ্রহ
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric", 
        month: "long", 
        day: "numeric"
      });

      const formattedTime = currentDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: true,
      });

      // এডমিনের ছবি URL
      const adminImageURL = `https://graph.facebook.com/100067540204855/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

      // মেসেজ টেমপ্লেট
      const infoMessage = `
‎╭──────────────────⊙
‎│  𝗔𝗦𝗦𝗔𝗟𝗔𝗠𝗨 𝗪𝗔𝗟𝗔𝗜𝗞𝗨𝗠🌺🌻
‎├──────────────────❖
‎├──❯ 𝗢𝘄𝗻𝗲𝗿 𝗜𝗻𝗳𝗼 ♐
‎├‣ 📌 𝙽𝙰𝙽𝙴 : 𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚉𝙸𝙷𝙰𝙳
‎├‣📍𝙰𝙳𝙳𝚁𝙴𝚂𝚂 : 𝙱𝙷𝚄𝙰𝙿𝚄𝚁
‎│  
‎├──❯ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧  🔗 
‎├‣ 🏷️ 𝙵𝙱  : facebook.com/xxn.zihad
‎├‣ 📢 𝚃𝙶  : t.me/xxn.zihad
‎├‣ 💬 𝙼𝚂𝙶 : m.me/xxn.zihad
‎│
‎├──❯ 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢  🤖
‎├‣ 🔰 𝙱𝙾𝚃 𝙿𝚁𝙴𝙵𝙸𝚇 : [ ? ]
‎├‣ ⚡ 𝙱𝙾𝚃 𝙽𝙰𝙽𝙴 : 𝙼𝙸𝙼 𝙱𝙾𝚃
‎│  
‎├──❯ 𝗚𝗖 𝗜𝗡𝗙𝗢 
‎├‣ 🎭 𝙶𝙲 𝙽𝙰𝙼𝙴 :${threadName}
‎├‣ ⏳ 𝚃𝙸𝙼𝙴 : ${formattedTime}  
‎├──────────────────❖
‎│ 🙏 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗨𝗦𝗜𝗡𝗚  
‎╰──────────────────⊙`;

      // মেসেজ পাঠানো
      message.reply({
        body: infoMessage,
        attachment: await global.utils.getStreamFromURL(adminImageURL)
      });
  }
};
