const { GoatWrapper } = require("fca-liane-utils");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
 
function apply(text, fontMap) {
  return text.replace(/[a-zA-Z0-9]/g, (char) => fontMap[char] || char);
}
 
const sans = {
a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑",
  i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙",
  q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡",
  y: "𝚢", z: "𝚣", A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵",
  G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽",
  O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅",
  W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉", "0": "𝟶", "1": "𝟷", "2": "𝟸", "3": "𝟹",
  "4": "𝟺", "5": "𝟻", "6": "𝟼", "7": "𝟽", "8": "𝟾", "9": "𝟿",
};
 
const bold = {
  a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵",
  i: "𝗶", j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽",
  q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅",
  y: "𝘆", z: "𝘇", A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙",
  G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡",
  O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩",
  W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭", "0": "𝟬", "1": "𝟭", "2": "𝟮", "3": "𝟯",
  "4": "𝟰", "5": "𝟱", "6": "𝟲", "7": "𝟳", "8": "𝟴", "9": "𝟵",
};
 
module.exports = {
  config: {
    name: "help",
    version: "1.18",
    author: "𝖠𝗋𝖸𝖺𝗇 🐔",
    countDown: 5,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{p}help cmdName ",
    },
    priority: 1,
  },
  onStart: async function ({ message, args, event, threadsData }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);
 
    if (args.length === 0) {
      const categories = {};
      let msg = "";
 
      for (const [name, value] of commands) {
        const category = value.config.category || "Uncategorized";
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(name);
      }
 
      for (const [category, commandsList] of Object.entries(categories)) {
        if (category !== "info") {
          const boldCategory = apply(category.toUpperCase(), bold);
          let section = `\n╭───[ ${boldCategory} ]`;
 
          for (let i = 0; i < commandsList.length; i += 2) {
            const sansCommands = commandsList
              .slice(i, i + 2)
              .map((command) => `➜ ${apply(command, sans)}`)
              .join(" ");
            section += `\n│${sansCommands}`;
          }
          section += `\n╰────────────◊`;
          msg += section;
        }
      }
 
      await message.reply({ body: msg });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));
 
      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const author = configCommand.author || "Unknown";
 
        const longDescription = configCommand.longDescription
          ? configCommand.longDescription.en || "No description"
          : "No description";
 
        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);
 
        const formattedDescription = apply(longDescription, sans);
        const formattedUsage = apply(usage, sans);
        const formattedCommandName = apply(configCommand.name, bold);
 
        const response = `
╭───⊙
  │ 🔶 ${formattedCommandName}
  ├── INFO
  │ 📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${formattedDescription}
  │ 👑 𝗔𝘂𝘁𝗵𝗼𝗿: ${author}
  │ ⚙ 𝗚𝘂𝗶𝗱𝗲: ${formattedUsage}
  ╰────────────⊙`;
 
        await message.reply(response);
      }
    }
  },
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
