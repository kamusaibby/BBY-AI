const fs = require("fs-extra");
const { utils } = global;

module.exports = {
config: {
name: "prefix",
version: "1.3",
author: "xos Eren",
countDown: 5,
role: 2,
shortDescription: "Thay đổi prefix của bot",
longDescription: "Thay đổi dấu lệnh của bot trong box chat của bạn hoặc cả hệ thống bot (chỉ admin bot)",
category: "config",
guide: {
vi: "   {pn} <new prefix>: thay đổi prefix mới trong box chat của bạn"
+ "\n   Ví dụ:"
+ "\n    {pn} #"
+ "\n\n   {pn} <new prefix> -g: thay đổi prefix mới trong hệ thống bot (chỉ admin bot)"
+ "\n   Ví dụ:"
+ "\n    {pn} # -g"
+ "\n\n   {pn} reset: thay đổi prefix trong box chat của bạn về mặc định",
en: "   {pn} <new prefix>: change new prefix in your box chat"
+ "\n   Example:"
+ "\n    {pn} #"
+ "\n\n   {pn} <new prefix> -g: change new prefix in system bot (only admin bot)"
+ "\n   Example:"
+ "\n    {pn} # -g"
+ "\n\n   {pn} reset: change prefix in your box chat to default"
}
},

langs: {
vi: {
reset: " 🌍Prefix Has been reset to Defult: %1",
onlyAdmin: "Chỉ admin mới có thể thay đổi prefix hệ thống bot",
confirmGlobal: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix của toàn bộ hệ thống bot",
confirmThisThread: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix trong nhóm chat của bạn",
successGlobal: "Đã thay đổi prefix hệ thống bot thành: %1",
successThisThread: "Đã thay đổi prefix trong nhóm chat của bạn thành: %1",
myPrefix: "🌐 Prefix của hệ thống: %1\n🛸 Prefix của nhóm bạn: %2"
},
en: {
reset: "✅ 𝐩𝐫𝐞𝐟𝐢𝐱 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐫𝐞𝐬𝐞𝐭 𝐭𝐨 𝐝𝐞𝐟𝐚𝐮𝐥𝐭: %1",
onlyAdmin: "❌ 𝐨𝐧𝐥𝐲 𝐚𝐝𝐦𝐢𝐧 𝐜𝐚𝐧 𝐜𝐡𝐚𝐧𝐠𝐞 𝐭𝐡𝐢𝐬 𝐩𝐫𝐞𝐟𝐢𝐱 ",
confirmGlobal: "𝐏𝐥𝐞𝐚𝐜𝐞 𝐫𝐞𝐚𝐜𝐭 𝐭𝐨 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞 𝐜𝐡𝐚𝐧𝐠𝐢𝐧𝐠 𝐘𝐨𝐮𝐫 𝐠𝐥𝐨𝐛𝐚𝐥 𝐩𝐫𝐞𝐟𝐢𝐱",
confirmThisThread: "𝐏𝐥𝐞𝐚𝐜𝐞 𝐫𝐞𝐚𝐜𝐭 𝐭𝐨 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞 𝐜𝐡𝐚𝐧𝐠𝐢𝐧𝐠 𝐘𝐨𝐮𝐫 𝐛𝐨𝐱 𝐩𝐫𝐞𝐟𝐢𝐱",
successGlobal: "𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐟𝐥𝐲 𝐜𝐡𝐚𝐧𝐠𝐞𝐝 𝐘𝐨𝐮𝐫 𝐩𝐫𝐞𝐟𝐢𝐱 𝐭𝐨: %1",
successThisThread: "Changed prefix in your box chat to: %1",
myPrefix: "‣ 𝐆𝐥𝐨𝐛𝐚𝐥 𝐩𝐫𝐞𝐟𝐢𝐱: %1\n‣𝐘𝐨𝐮𝐫 𝐠𝐫𝐨𝐮𝐩 𝐩𝐫𝐞𝐟𝐢𝐱:  %2\n\n‣ 𝐀𝐝𝐦𝐢𝐧n\n‣𝗞𝗔𝗠𝗨 /𝗦𝗔𝗠𝗨\n\n‣𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 ⓕ\n‣𝗙𝗨𝗖𝗞 𝗜𝗗 𝗡𝗔𝗜"
}
},

onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0]) return message.SyntaxError();

    if (args[0] === 'reset') {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply({
        body: getLang("reset", global.GoatBot.config.prefix),
        attachment: await utils.getStreamFromURL("https://i.imgur.com/UChLWIl.jpeg") // Change Imgur link
      });
    }

    const newPrefix = args[0];
    const formSet = { commandName, author: event.senderID, newPrefix };

    if (args[1] === "-g") {
      if (role < 2) return message.reply(getLang("onlyAdmin"));
      formSet.setGlobal = true;
    } else {
      formSet.setGlobal = false;
    }

    return message.reply({
      body: args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"),
      attachment: await utils.getStreamFromURL("https://i.imgur.com/UChLWIl.jpeg") // Change Imgur link
    }, (err, info) => {
      formSet.messageID = info.messageID;
      global.GoatBot.onReaction.set(info.messageID, formSet);
    });
  },

  onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;
    if (event.userID !== author) return;

    if (setGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply({
        body: getLang("successGlobal", newPrefix),
        attachment: await utils.getStreamFromURL("https://i.imgur.com/UChLWIl.jpeg") // Change Imgur link
      });
    } else {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      return message.reply({
        body: getLang("successThisThread", newPrefix),
        attachment: await utils.getStreamFromURL("https://i.imgur.com/UChLWIl.jpeg") // Change Imgur link
      });
    }
  },

  onChat: async function ({ event, message, usersData, getLang, threadsData }) {
    const globalPrefix = global.GoatBot.config.prefix;
    const threadPrefix = await threadsData.get(event.threadID, "data.prefix") || globalPrefix;

    if (event.body && event.body.toLowerCase() === "prefix") {
      return message.reply({
        body: getLang("myPrefix", globalPrefix, threadPrefix),
        attachment: await utils.getStreamFromURL("https://i.imgur.com/UChLWIl.jpeg") // Change Imgur link
      });
    }
  }
};
