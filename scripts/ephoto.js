const fs = require("fs");
const axios = require("axios");
const request = require("request");
const { ephoto } = require("nayan-server");

module.exports.config = {
  name: "ephoto",
  version: "2.0.0",
  role: 0,
  author: "Nayan (Converted for Goat Bot)",
  description: "Generate name effect images using Ephoto360",
  category: "IMAGE_GENERATOR",
  guide: "{pn} [no.] [text]",
  countDown: 5,
};

module.exports.onStart = async ({ event, args, api }) => {
  try {
    if (!args[0]) {
      return api.sendMessage(
        `🔰 Use: ${global.config.PREFIX}${this.config.name} [no.] [text]\n🔰 Example: ${global.config.PREFIX}${this.config.name} 1 ZIHAD\n\n🔥 Total Edit limit: 40...`,
        event.threadID
      );
    }

    const content = args.join(" ");
    const msg = content.split(" ");
    const number = msg[0].trim();
    let name = msg[1] ? msg.slice(1).join(" ").trim() : "Default Name";

    // Ephoto360 URL Mapping (All 52 links)
    const urls = {
      1: "https://ephoto360.com/hieu-ung-chu/tao-hieu-ung-chu-mam-anh-sang-74.html",
      2: "https://ephoto360.com/hieu-ung-chu/chu-kim-loai-tong-vang-ruc-215.html",
      3: "https://ephoto360.com/tao-hieu-ung-chu-neon-da-sac-truc-tuyen-985.html",
      4: "https://ephoto360.com/hieu-ung-chu-phong-cach-logo-naruto-shippuden-1001.html",
      5: "https://ephoto360.com/hieu-ung-chu/chu-kim-loai-tong-mau-tim-175.html",
      6: "https://ephoto360.com/tao-avatar-video-theo-cac-bieu-tuong-online-629.html",
      7: "https://ephoto360.com/hieu-ung-chu-neon-canh-ac-quy-online-808.html",
      8: "https://ephoto360.com/hieu-ung-viet-chu-len-cua-so-mua-truc-tuyen-806.html",
      9: "https://ephoto360.com/hieu-ung-tao-chu-ky-anh-sang-nhieu-mau-sac-686.html",
      10: "https://ephoto360.com/hieu-ung-ve/viet-chu-galaxy-bat-17.html",
      11: "https://ephoto360.com/hieu-ung-chu-anh-sang-theo-phong-cach-cong-nghe-tuong-lai-769.html",
      12: "https://ephoto360.com/tao-logo-phong-cach-pornhub-612.html",
      13: "https://ephoto360.com/tao-hinh-nen-cho-dien-thoai-theo-phong-cach-galaxy-cuc-chat-586.html",
      14: "https://ephoto360.com/tao-logo-mascot-phong-cach-galaxy-462.html",
      15: "https://ephoto360.com/hieu-ung-chu/hieu-ung-chu-galaxy-canh-thien-than-moi-289.html",
      16: "https://ephoto360.com/hieu-ung-chu/hieu-ung-chu-da-quy-hong-ngoc-3d-281.html",
      17: "https://ephoto360.com/hieu-ung-chu/hieu-ung-chu-cam-thach-hoa-van-275.html",
      18: "https://ephoto360.com/hieu-ung-chu/hieu-ung-chu-mau-sac-160.html",
      19: "https://ephoto360.com/hieu-ung-chu/hieu-ung-chu-sao-online-85.html",
      20: "https://ephoto360.com/hieu-ung-lua/hieu-ung-chu-canh-lua-372.html",
      21: "https://ephoto360.com/tao-avatar-video-theo-cac-bieu-tuong-online-629.html",
      22: "https://ephoto360.com/tao-anh-bia-7-vien-ngoc-rong-dragon-ball-online-dep-doc-chat-nhat-476.html",
      23: "https://ephoto360.com/sinh-nhat/ghi-loi-chuc-len-banh-sinh-nhat-229.html",
      24: "https://ephoto360.com/tao-anh-bia-one-piece-dao-hai-tac-truc-tuyen-cuc-dep-626.html",
      25: "https://ephoto360.com/tao-avatar-video-pubg-phong-cach-nhieu-song-glitch-627.html",
      26: "https://ephoto360.com/che-video-trung-thu-fa-voi-ten-cua-ban-700.html",
      27: "https://ephoto360.com/hieu-ung-chu/tao-chu-phong-cac-retro-67.html",
      28: "https://ephoto360.com/tao-logo-theo-ten-phong-cach-galaxy-460.html",
      29: "https://ephoto360.com/tao-logo-phong-cach-may-chieu-3d-518.html",
      30: "https://ephoto360.com/tao-logo-hoa-ma-vang-de-xay-dung-thuong-hieu-719.html",
      31: "https://ephoto360.com/tao-logo-avatar-du-lich-phong-cach-den-trang-643.html",
      32: "https://ephoto360.com/hieu-ung-chu/tao-chu-bang-tuyet-107.html",
      33: "https://ephoto360.com/tao-hieu-ung-chu-digital-glitch-truc-tuyen-941.html",
      34: "https://ephoto360.com/hieu-ung-chu/hieu-ung-chu-phao-bong-356.html",
      35: "https://ephoto360.com/hieu-ung-chu/chu-canh-thien-than-176.html",
      36: "https://ephoto360.com/hieu-ung-chu/tao-chu-duoi-nuoc-73.html",
      37: "https://ephoto360.com/hieu-ung-chu/hieu-ung-chu-giot-nuoc-106.html",
      38: "https://ephoto360.com/hieu-ung-chu/viet-chu-vang-ngoc-online-285.html",
      39: "https://ephoto360.com/hieu-ung-chu/hieu-ung-cat-giay-184.html",
      40: "https://ephoto360.com/tao-logo-phong-cach-blackpink-kem-chu-ky-cac-thanh-vien-1002.html",
    };

    if (!urls[number]) {
      return api.sendMessage("❌ Invalid number! Please use a number between 1-40.", event.threadID);
    }

    const url = urls[number];

    api.sendMessage("⏳ Generating your Ephoto image, please wait...", event.threadID);

    let data = await ephoto(url, [name]);
    let file = fs.createWriteStream(__dirname + "/cache/ephoto.jpg");

    request(encodeURI(`${data.url}`)).pipe(file);
    file.on("finish", () => {
      setTimeout(() => {
        api.sendMessage(
          {
            body: `✅ **Your Ephoto Image is Ready!**\n\n❐ **Your Input Name:** ${name}`,
            attachment: fs.createReadStream(__dirname + "/cache/ephoto.jpg"),
          },
          event.threadID
        );
      }, 3000);
    });
  } catch (error) {
    console.error(error);
    api.sendMessage("❌ Error generating image!", event.threadID);
  }
};