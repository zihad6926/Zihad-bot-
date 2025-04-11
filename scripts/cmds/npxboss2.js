 fs = require("fs");
module.exports.config = {
  name: "Zihad",
  version: "2.0.0",
  permission: 0,
  credits: "nayon",
  description: "",
  prefix: false,
  category: "user",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
var { threadID, messageID } = event;
	if (event.body.indexOf("সাকিন")==0 || (event.body.indexOf("sakin")==0 || (event.body.indexOf("xakin")==0 ||
(event.body.indexOf("xaki")==0)))) {
		var msg = {
				body: "হুম আমি সাকিনএর বট বলছি কি হইছে বলো 😊"
    }
      api.sendMessage(msg, threadID, messageID);
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

}
