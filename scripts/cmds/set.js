module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "1.0",
    author: "Loid Butter",
    role: 0,
    shortDescription: {
      en: "Set coins and experience points for a user"
    },
    longDescription: {
      en: "Set coins and experience points for a user as desired"
    },
    category: "economy",
    guide: {
      en: "{pn}set [money|exp] [amount] (@mention or reply)"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = ["100067540204855"];
    if (!permission.includes(event.senderID)) {
      api.sendMessage("You don't have enough permission to use this command. Only My Lord Can Use It.", event.threadID, event.messageID);
      return;
    }

    const query = args[0];
    const amount = parseInt(args[1]);

    if (!query || isNaN(amount)) {
      return api.sendMessage("Invalid command arguments. Usage: set [money|exp] [amount] (@mention or reply)", event.threadID);
    }

    const { senderID, threadID } = event;

    if (senderID === api.getCurrentUserID()) return;

    let targetUser;
    let name;

    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
      name = await usersData.getName(targetUser);
    } else {
      const mention = Object.keys(event.mentions);
      targetUser = mention[0] || senderID;
      name = mention.length > 0 ? event.mentions[mention[0]].replace(/@/g, "") : await usersData.getName(targetUser);
    }

    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage("User not found.", threadID);
    }

    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data
      });

      return api.sendMessage(`Set experience points to ${amount} for ${name}.`, threadID);
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data
      });

      return api.sendMessage(`Set coins to ${amount} for ${name}.`, threadID);
    } else {
      return api.sendMessage("Invalid query. Use 'exp' to set experience points or 'money' to set coins.", threadID);
    }
  }
};
