module.exports = {
  config: {
    name: "listbox",
    aliases: [],
    author: "Zihad",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: "Show total number of group chats"
    },
    longDescription: {
      en: "Shows how many group chats the bot is currently in."
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },

  onStart: async function ({ api, event }) {
    try {
      const groupList = await api.getThreadList(100, null, ['INBOX']);
      const filteredGroups = groupList.filter(group => group.isGroup && group.threadName !== null);
      const totalGroups = filteredGroups.length;

      const message = `╭─╮\n│ 𝐁𝐨𝐭 𝐢𝐬 𝐧𝐨𝐰 𝐢𝐧 𝐭𝐨𝐭𝐚𝐥 ${totalGroups} 𝐠𝐫𝐨𝐮𝐩𝐬.\n╰───────────────ꔪ`;
      await api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error getting group list:", error);
      api.sendMessage("❌ Failed to get group count.", event.threadID, event.messageID);
    }
  },
};
