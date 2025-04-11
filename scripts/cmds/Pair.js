const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "pair",
    aliases: [],
    version: "1.0",
    author: "OTINXSANDIP",
    countDown: 5,
    role: 0,
    shortDescription: "Pair two users in a funny romantic way",
    longDescription: "",
    category: "love",
    guide: "{pn}"
  },

  onStart: async function({ api, event, threadsData, usersData }) {
    const { threadID, messageID, senderID } = event;
    const { participantIDs } = await api.getThreadInfo(threadID);
    var tle = Math.floor(Math.random() * 101); // Generate random "love percentage"
    var namee = (await usersData.get(senderID)).name; // Sender's name
    const botID = api.getCurrentUserID();
    const listUserID = participantIDs.filter(ID => ID != botID && ID != senderID); // Get other users in the thread
    var id = listUserID[Math.floor(Math.random() * listUserID.length)]; // Pick a random user
    var name = (await usersData.get(id)).name; // Name of the other user
    var arraytag = [];
    arraytag.push({ id: senderID, tag: namee });
    arraytag.push({ id: id, tag: name });

    // Get sender's profile picture
    let Avatar1 = (await axios.get(`https://graph.facebook.com/${senderID}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/avt1.png", Buffer.from(Avatar1, "utf-8"));

    // Get love gif
    let gifLove = (await axios.get(`https://i.ibb.co/y4dWfQq/image.gif`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/giflove.png", Buffer.from(gifLove, "utf-8"));

    // Get receiver's profile picture
    let Avatar2 = (await axios.get(`https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8"));

    var imglove = [];
    imglove.push(fs.createReadStream(__dirname + "/cache/avt1.png"));
    imglove.push(fs.createReadStream(__dirname + "/cache/giflove.png"));
    imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));

    var msg = {
      body: `🥰Successful pairing!\n💌 Wish you two hundred years of happiness\n💕 Double ratio: ${tle}%\n${namee} 💓 ${name}`,
      mentions: arraytag,
      attachment: imglove
    };

    return api.sendMessage(msg, event.threadID, event.messageID);
  }
};
