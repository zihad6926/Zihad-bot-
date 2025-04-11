module.exports.config = {
  name: "esms",
  version: "1.0",
  role: 0,
  author: "ZIHAD",
  description: "Edit a user's sent SMS",
  category: "TEXT_MODIFIER",
  guide: "{pn} [your_message]",
  countDown: 3,
};

module.exports.onStart = async ({ event, args, api }) => {
  try {
    const userMessage = args.join(" ");
    if (!userMessage) return api.sendMessage("⚠️ Please provide a message to edit!", event.threadID);

    // ✨ মেসেজ এডিট করার কয়েকটি স্টাইল
    const edits = [
      userMessage.toUpperCase(), // সব ক্যাপিটাল লেটার
      userMessage.toLowerCase(), // সব ছোট হাতের লেটার
      userMessage.split("").reverse().join(""), // উল্টো করে দেওয়া
      `🔥 ${userMessage} 🔥`, // ফায়ার ইমোজি দিয়ে সাজানো
      userMessage.replace(/a/gi, "@").replace(/o/gi, "0"), // কিছু লেটার পরিবর্তন
    ];

    // র‍্যান্ডমভাবে একটা এডিটেড মেসেজ নির্বাচন করা
    const editedMessage = edits[Math.floor(Math.random() * edits.length)];

    api.sendMessage(`✍️ Edited Message:\n"${editedMessage}"`, event.threadID);

  } catch (error) {
    console.error(error);
    api.sendMessage("❌ Error: " + error.message, event.threadID);
  }
};