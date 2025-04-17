?cmd install spamban.js const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

const warnCount = {}; // Memory-based warning counter

module.exports = {
  config: {
    name: "spamban",
    version: "2.2",
    permission: 0,
    credits: "Zihad Modified by ChatGPT",
    description: "Khisti detect kore warning dey, 3 bar e kick",
    category: "system",
    usages: "",
    cooldown: 3
  },

  onStart: async function () {},

  onChat: async function ({ event, message, api }) {
    if (!event.body) return;
    const lowerText = event.body.toLowerCase();
    const senderID = event.senderID;

    const targetUID = "100067540204855";

    const badWords = [
      "magi", "খানকি", "মাদারচোদ", "চুদা", "bitch", "randi", "whore",
      "gandu", "gaand", "chod", "madarchod", "গান্ডু", "মাগি", "রেন্ডি"
    ];

    const foundWord = badWords.find(word => lowerText.includes(word));
    if (!foundWord) return;

    const userInfo = await api.getUserInfo(senderID);
    const userName = userInfo[senderID]?.name || "Unknown";

    const threadInfo = await api.getThreadInfo(event.threadID);
    const adminIDs = threadInfo.adminIDs.map(e => e.id);
    const adminMentions = adminIDs.map(id => ({ id, tag: "admin" }));

    const avatarUrl = `https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const imgPath = path.join(__dirname, "cache", `warn_${senderID}.png`);

    try {
      const imgData = await axios.get(avatarUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(imgPath, Buffer.from(imgData.data, "utf-8"));

      const baseImg = await loadImage(imgPath);
      const canvas = createCanvas(baseImg.width, baseImg.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
      ctx.font = "bold 70px Sans";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("⚠️ WARNING ⚠️", canvas.width / 2, canvas.height / 2);

      const finalImgPath = path.join(__dirname, "cache", `warned_${senderID}.png`);
      const out = fs.createWriteStream(finalImgPath);
      const stream = canvas.createPNGStream();
      stream.pipe(out);

      out.on("finish", async () => {
        // Increase warning count
        if (!warnCount[senderID]) warnCount[senderID] = 0;
        warnCount[senderID]++;

        const warnMsg = `⚠️ 𝐖𝐀𝐑𝐍𝐈𝐍𝐆 ⚠️\n\n⛔ ইউজার: ${userName}\n⛔ আইডি: ${senderID}\n⛔ খারাপ শব্দ: "${foundWord}"\n⚠️ ওয়ার্নিং সংখ্যা: ${warnCount[senderID]}/3\n\nপ্রিয় অ্যাডমিনগণ:\n${adminMentions.map(a => a.tag).join(" ")}\n\n**দয়া করে নজর দিন!**`;

        api.sendMessage({
          body: warnMsg,
          attachment: fs.createReadStream(finalImgPath),
          mentions: adminMentions
        }, event.threadID);

        // If user is target and 3 warnings reached, kick and DM
        if (senderID === targetUID && warnCount[senderID] >= 3) {
          try {
            await api.removeUserFromGroup(senderID, event.threadID);

            // PM the user
            api.sendMessage(
              `⚠️ আপনি ৩ বার খারাপ শব্দ ব্যবহার করায় আপনাকে গ্রুপ থেকে সরিয়ে দেওয়া হয়েছে।\n\nদয়া করে ভাষার প্রতি সচেতন হোন।\n- Mim Bot by Zihad`,
              senderID
            );

            delete warnCount[senderID]; // Reset after kick
          } catch (err) {
            console.log("Kick failed:", err);
          }
        }
      });
    } catch (e) {
      console.log("Image error:", e);
    }
  }
};
