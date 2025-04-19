const { loadImage, createCanvas } = require("canvas");
const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "hack",
    aliases: ["idhack"],
    version: "1.0",
    author: "mhm / Modified by ADIL",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "hack your friend id"
    },
    longDescription: {
      vi: "show fake fb hack pic. Just for fun",
      en: ""
    },
    category: "image",
    guide: {
      vi: "{pn}",
      en: "{pn}"
    }
  },
  wrapText: async (ctx, name, maxWidth) => {
    return new Promise((resolve) => {
      if (ctx.measureText(name).width < maxWidth) return resolve([name]);
      if (ctx.measureText("W").width > maxWidth) return resolve(null);
      const words = name.split(" ");
      const lines = [];
      let line = "";
      while (words.length > 0) {
        let split = false;
        while (ctx.measureText(words[0]).width >= maxWidth) {
          const temp = words[0];
          words[0] = temp.slice(0, -1);
          if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
          else {
            split = true;
            words.splice(1, 0, temp.slice(-1));
          }
        }
        if (ctx.measureText(`${line}${words[0]}`).width < maxWidth)
          line += `${words.shift()} `;
        else {
          lines.push(line.trim());
          line = "";
        }
        if (words.length === 0) lines.push(line.trim());
      }
      return resolve(lines);
    });
  },

  onStart: async function ({ args, usersData, threadsData, api, event }) {
    let pathImg = __dirname + "/cache/background.png";
    let pathAvt1 = __dirname + "/cache/Avtmot.png";
    var id = Object.keys(event.mentions)[0] || event.senderID;
    var name = await api.getUserInfo(id);
    name = name[id].name;

    var background = ["https://imgur.com/yHTTm3f.png"];
    var rd = background[Math.floor(Math.random() * background.length)];

    try {
      let getAvtmot = (await axios.get(
        `https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: "arraybuffer" }
      )).data;
      fs.writeFileSync(pathAvt1, Buffer.from(getAvtmot));
    } catch (error) {
      console.error("Error fetching avatar:", error);
      return;
    }

    try {
      let getbackground = (await axios.get(rd, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(pathImg, Buffer.from(getbackground));
    } catch (error) {
      console.error("Error fetching background:", error);
      return;
    }

    let baseImage = await loadImage(pathImg);
    let baseAvt1 = await loadImage(pathAvt1);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");

    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.font = "400 23px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "start";
    
    const lines = await this.wrapText(ctx, name, 1160);
    ctx.fillText(lines.join("\n"), 300, 170); // Adjust the Y position dynamically

    ctx.beginPath();
    ctx.arc(245, 450, 125, 0, Math.PI * 2, true); // Circular clipping region
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(baseAvt1, 120, 325, 250, 250);

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    fs.removeSync(pathAvt1);

    return api.sendMessage(
      { body: " ", attachment: fs.createReadStream(pathImg) },
      event.threadID,
      () => fs.unlinkSync(pathImg),
      event.messageID
    );
  }
};
