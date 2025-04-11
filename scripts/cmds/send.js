module.exports = {
    config: {
        name: "rsend",
        version: "5.0",
        author: "Zihad Ahmmed",
        countDown: 1,
        role: 0,
        shortDescription: {
            en: "Enable/Disable Anti unsend mode"
        },
        longDescription: {
            en: "Anti unsend mode. Works with audio, video, and images."
        },
        category: "Admins",
        guide: {
            en: "{pn} on or off\nex: {pn} on"
        },
        envConfig: {
            deltaNext: 5
        }
    },

    onStart: async function ({ api, message, event, threadsData, args }) {
        let resend = await threadsData.get(event.threadID, "settings.reSend");

        // Initialize setting if not yet set
        if (resend === undefined) {
            await threadsData.set(event.threadID, true, "settings.reSend");
        }

        // Validate input argument
        if (!["mam", "man"].includes(args[0])) {
            return message.reply("Bad argument. Use 'mam' or 'man'.");
        }

        // Set the resend setting based on argument
        await threadsData.set(event.threadID, args[0] === "mam", "settings.reSend");

        console.log(await threadsData.get(event.threadID, "settings.reSend"));

        // Initialize global.reSend if necessary
        if (!global.reSend) {
            global.reSend = {};  // Initalize the object first
        }

        if (args[0] === "mam") {
            if (!global.reSend.hasOwnProperty(event.threadID)) {
                global.reSend[event.threadID] = [];
            }
            global.reSend[event.threadID] = await api.getThreadHistory(event.threadID, 100, undefined);
        }

        return message.reply(`${args[0] === "mam" ? "Anti unsend mode enabled." : "Anti unsend mode disabled."}`);
    },

    onChat: async function ({ api, threadsData, usersData, event, message }) {
        if (event.type !== "message_unsend") {
            let resend = await threadsData.get(event.threadID, "settings.reSend");
            if (!resend) return;

            // Initialize global.reSend if necessary
            if (!global.reSend) {
                global.reSend = {};  // Initalize the object first
            }

            if (!global.reSend.hasOwnProperty(event.threadID)) {
                global.reSend[event.threadID] = [];
            }

            // Log the unsent message
            global.reSend[event.threadID].push(event);

            // Maintain a maximum of 50 logs
            if (global.reSend[event.threadID].length > 50) {
                global.reSend[event.threadID].shift();
            }
        }
    }
};
