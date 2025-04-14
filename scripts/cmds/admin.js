const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
  config: {
    name: "admin",
    version: "1.7",
    author: "Modified by Boss Jihad",
    countDown: 5,
    role: 2,
    description: {
      vi: "Thêm, xóa, sửa quyền admin",
      en: "Add, remove, edit admin role"
    },
    category: "box chat",
    guide: {
      vi: '{pn} [add|-a] <uid | @tag>: Thêm quyền admin cho người dùng\n'
        + '{pn} [remove|-r] <uid | @tag>: Xóa quyền admin\n'
        + '{pn} [list|-l]: Xem danh sách admin',
      en: '{pn} [add|-a] <uid | @tag>: Add admin role\n'
        + '{pn} [remove|-r] <uid | @tag>: Remove admin role\n'
        + '{pn} [list|-l]: View admin list'
    }
  },

  langs: {
    en: {
      added: "✅ | Added admin role for %1 users:\n%2",
      alreadyAdmin: "\n⚠️ | %1 users already had admin role:\n%2",
      missingIdAdd: "⚠️ | Please provide user ID or tag to add admin role",
      removed: "✅ | Removed admin role of %1 users:\n%2",
      notAdmin: "⚠️ | %1 users were not admins:\n%2",
      missingIdRemove: "⚠️ | Please provide user ID or tag to remove admin role",
      listAdmin: ""
    }
  },

  onStart: async function ({ message, args, usersData, event, getLang }) {
    switch (args[0]) {
      case "add":
      case "-a": {
        if (!args[1]) return message.reply(getLang("missingIdAdd"));
        let uids = [];
        if (Object.keys(event.mentions).length > 0)
          uids = Object.keys(event.mentions);
        else if (event.messageReply)
          uids.push(event.messageReply.senderID);
        else
          uids = args.filter(arg => !isNaN(arg));

        const notAdminIds = [];
        const adminIds = [];

        for (const uid of uids) {
          if (config.adminBot.includes(uid)) adminIds.push(uid);
          else notAdminIds.push(uid);
        }

        config.adminBot.push(...notAdminIds);
        writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

        const getNames = await Promise.all(uids.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));

        return message.reply(
          (notAdminIds.length > 0 ? getLang("added", notAdminIds.length, getNames.filter(({ uid }) => notAdminIds.includes(uid)).map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "") +
          (adminIds.length > 0 ? getLang("alreadyAdmin", adminIds.length, adminIds.map(uid => `• ${uid}`).join("\n")) : "")
        );
      }

      case "remove":
      case "-r": {
        if (!args[1]) return message.reply(getLang("missingIdRemove"));
        let uids = [];
        if (Object.keys(event.mentions).length > 0)
          uids = Object.keys(event.mentions);
        else
          uids = args.filter(arg => !isNaN(arg));

        const notAdminIds = [];
        const adminIds = [];

        for (const uid of uids) {
          if (config.adminBot.includes(uid)) adminIds.push(uid);
          else notAdminIds.push(uid);
        }

        for (const uid of adminIds)
          config.adminBot.splice(config.adminBot.indexOf(uid), 1);

        writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

        const getNames = await Promise.all(adminIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));

        return message.reply(
          (adminIds.length > 0 ? getLang("removed", adminIds.length, getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "") +
          (notAdminIds.length > 0 ? getLang("notAdmin", notAdminIds.length, notAdminIds.map(uid => `• ${uid}`).join("\n")) : "")
        );
      }

      case "list":
      case "-l": {
        const getNames = await Promise.all(config.adminBot.map(async uid => {
          const name = await usersData.getName(uid);
          return { uid, name };
        }));

        let msg = "👑 𝙼𝙸𝙼-𝙱𝙾𝚃 𝙰𝙳𝙼𝙸𝙽 𝙻𝙸𝚂𝚃\n━━━━━━━━━━━━━━\n";
        let index = 1;

        for (const { uid, name } of getNames) {
          msg += `👤 ${index++}. ${name}\n🆔 ${uid}\n\n`;
        }

        msg += "━━━━━━━━━━━━━━";
        return message.reply(msg);
      }

      default:
        return message.SyntaxError();
    }
  }
};
