const badWords = [
  "xhudanir pot", "xoda", "magi", "bessa", "খানকি মাগি", "চুদানি", "চুদা", "চুদ",
  "ভুদা", "buda", "gali", "galibaz", "সাওয়া", "khanki", "maderxud", "xud", "xuda",
  "xudi", "cuda", "cudi", "mgi", "nodi", "নডি", "মাগি", "মাদারচুদ", "চুদি", "ষুদা",
  "tuy", "cdi", "খাংকির পোলা", "খানকি মাকি", "boda", "sawya", "tor mare xudi", "kp",
  "mc", "bap", "গান্ডু", "গাঁড", "গাধা", "madarc", "chod", "jodu", "harkiri", "gaand",
  "gandu", "chodna", "randi", "রেন্ডি", "রেন্ডিপানা", "rendi", "bokachoda", "ভুসি",
  "ভোঁদা", "thanda gand", "choda chudi", "মাদারচোদ", "bitch", "slut", "whore"
];

module.exports.config = {
  name: "spamban",
  version: "1.0.2",
  permission: 0,
  credits: "Fike x Zihad",
  description: "Detects and warns on bad language",
  prefix: true,
  category: "moderation",
  usages: "",
  cooldowns: 1
};

module.exports.handleEvent = async ({ event, api, Users, Threads }) => {
  if (!event.body) return;
  const message = event.body.toLowerCase();
  const senderID = event.senderID;
  const threadID = event.threadID;

  // Check for bad words
  const foundWord = badWords.find(word => message.includes(word));
  if (!foundWord) return;

  // Get sender name
  const userName = await Users.getNameUser(senderID);

  // Get thread info to find admins
  const threadInfo = await api.getThreadInfo(threadID);
  const adminIDs = threadInfo.adminIDs.map(e => e.id);
  const mentions = adminIDs.map(id => ({
    tag: threadInfo.userInfo.find(u => u.id == id)?.name || "Admin",
    id
  }));

  // Construct warning message
  const warnMessage = {
    body: `⚠️ 𝐖𝐀𝐑𝐍𝐈𝐍𝐆 ⚠️

⛔ ইউজার: ${userName}
⛔ আইডি: ${senderID}
⛔ খারাপ শব্দ: "${foundWord}"

আপনার গ্রুপে কেউ খারাপ ভাষা ব্যবহার করছে!
সতর্ক করুন প্রিয় অ্যাডমিনগণ:
${mentions.map(m => m.tag).join(' ')}`,
    mentions
  };

  return api.sendMessage(warnMessage, threadID);
};

module.exports.run = () => {};
