module.exports = {
  config: {
    name: "love",
    version: "1.0",
    author: "RANA", // Don't change the credit because I made it. Any problems to contact me: https://facebook.com/100063487970328
    description: {
      en: "Check love percentage between two users"
    },
    category: "love",
    guide: {
      en: "{pn} @User1 @User2 or {pn} Name1 Name2"
    }
  },

  onStart: async function ({ message, args, event, usersData }) {
    let [uid1, uid2] = Object.keys(event.mentions);
    let name1, name2;

    if (uid1 && uid2) {
      name1 = await usersData.getName(uid1);
      name2 = await usersData.getName(uid2);
    } else if (args.length >= 2) {
      name1 = args[0];
      name2 = args[1];
    } else {
      return message.reply("❌ Please mention two users or provide two names.\n\nExample:\nlove @Zihad Ahmed @mia khalifa\nor\nlove Zihad Ahmed - mia khalifa");
    }

    const lovePercent = Math.floor(Math.random() * 101);
    let comment = "Hmm... could work!";
    if (lovePercent >= 80) comment = "Perfect Couple! You're meant to be!";
    else if (lovePercent >= 60) comment = "You're a great match! Keep it up!";
    else if (lovePercent >= 40) comment = "There’s some spark… needs more love!";
    else if (lovePercent >= 20) comment = "Just friends maybe… or maybe more?";
    else comment = "Umm... love needs a miracle here.";

    const loveMessage = 
`╔═══════════════╗
     💖 LOVE CALCULATOR 💖
╚═══════════════╝

➤  Couple: ${name1} ❤️ ${name2}
➤  Compatibility: ${lovePercent}%
➤  Status: ${comment}

✨ Love is unpredictable... let destiny play its part!`;

    return message.reply(loveMessage);
  }
};
