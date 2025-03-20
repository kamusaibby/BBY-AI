const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
global.temp.welcomeEvent = {};

module.exports = {
config: {
name: "welcome",
version: "1.7",
author: "NTKhang",
category: "events"
},

langs: {
vi: {
session1: "sáng",
session2: "trưa",
session3: "chiều",
session4: "tối",
welcomeMessage: "Cảm ơn bạn đã mời tôi vào nhóm!\nPrefix bot: %1\nĐể xem danh sách lệnh hãy nhập: %1help",
multiple1: "bạn",
multiple2: "các bạn",
defaultWelcomeMessage: "Xin chào {userName}.\nChào mừng bạn đến với {boxName}.\nChúc bạn có buổi {session} vui vẻ!"
},
en: {
session1: "𝐌𝐨𝐫𝐧𝐢𝐧𝐠",
session2: "𝐍𝐨𝐨𝐧",
session3: "𝐀𝐟𝐭𝐞𝐫𝐧𝐨𝐨𝐧",
session4: "𝐄𝐯𝐞𝐧𝐢𝐧𝐠",
welcomeMessage: "–  𝐓𝐎𝐌 𝐁𝐁𝐘 🎀 ▬▬▬▬▬▬▬▬▬▬▬▬▬ \n\n ʏᴏᴏ ɢᴜʏs ɪ'ᴀᴍ ʙᴀᴄᴋ ʏᴏᴜʀ ғᴀᴠᴏᴜʀɪᴛᴇ ʙᴏᴛ ✨ ʙᴀʙʏ ᴀɪ 🍭\n ʙᴏᴛ ᴘʀᴇғɪx ( %1 )\n ᴛʜᴀɴᴋs ᴀᴅᴍɪɴ ғᴏʀ ᴀᴅᴅ ᴍᴇ ɪɴ ʏᴏᴜ'ʀ Gc\n\n ⚠️ ᴀᴍɪ GC ᴇʀ sᴏʙ ʀᴜʟᴇs ғᴏʟʟᴏᴡ ᴋᴏʀᴀʀ ᴛʀʏ ᴋᴏʀʙᴏ - ɪɴs-sʜᴀ-ᴀʟʟᴀʜ \n  - 𝐇𝐚𝐯𝐞 𝐚 𝐧𝐢𝐜𝐞 Day                               - ꔫ  ๋࣭  BA'BY くめ ✰👀🌊`",
multiple1: "𝐘𝐨𝐮",
multiple2: "𝐘𝐨𝐮 𝐆𝐮𝐲𝐬",
defaultWelcomeMessage: `- 𝐓𝐎𝐌 𝐁𝐁𝐘 🎀▬▬▬▬▬▬▬▬▬▬▬▬▬ \n\n \𝐃𝐞𝐚𝐫 {userName}\ 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐓𝐨: {boxName}.\n ▬▬▬▬▬▬▬▬▬▬▬▬ 𝐄𝐱𝐜𝐢𝐭𝐞𝐝 𝐭𝐨 𝐡𝐚𝐯𝐞 𝐲𝐨𝐮 𝐣𝐨𝐢𝐧 𝐮𝐬! 𝐋𝐞𝐭'𝐬 𝐬𝐡𝐚𝐫𝐞 𝐢𝐝𝐞𝐚𝐬 𝐚𝐧𝐝 𝐜𝐨𝐧𝐧𝐞𝐜𝐭.  \n\. 𝐅𝐞𝐞𝐥 𝐟𝐫𝐞𝐞 𝐭𝐨 𝐣𝐮𝐦𝐩 𝐢𝐧 𝐚𝐧𝐲𝐭𝐢𝐦𝐞.
𝐈 𝐡𝐨𝐩𝐞 𝐲𝐨𝐮 𝐰𝐢𝐥𝐥 𝐅𝐨𝐥𝐥𝐨𝐰 𝐨𝐮𝐫 𝐠𝐫𝐨𝐮𝐩 𝐫𝐮𝐥𝐞𝐬 𝐩𝐫𝐨𝐩𝐞𝐫𝐥𝐲\n\n-  𝐇𝐚𝐯𝐞 𝐚 𝐧𝐢𝐜𝐞{session}
-    ꔫ  ๋࣭    BA'BY くめ✰👀🌊`
}
},

onStart: async ({ threadsData, message, event, api, getLang }) => {
if (event.logMessageType == "log:subscribe")
return async function () {
const hours = getTime("HH");
const { threadID } = event;
const { nickNameBot } = global.GoatBot.config;
const prefix = global.utils.getPrefix(threadID);
const dataAddedParticipants = event.logMessageData.addedParticipants;
// if new member is bot
if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
if (nickNameBot)
api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
return message.send(getLang("welcomeMessage", prefix));
}
// if new member:
if (!global.temp.welcomeEvent[threadID])
global.temp.welcomeEvent[threadID] = {
joinTimeout: null,
dataAddedParticipants: []
};

// push new member to array
global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
// if timeout is set, clear it
clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

// set new timeout
global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
const threadData = await threadsData.get(threadID);
if (threadData.settings.sendWelcomeMessage == false)
return;
const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
const dataBanned = threadData.data.banned_ban || [];
const threadName = threadData.threadName;
const userName = [],
mentions = [];
let multiple = false;

if (dataAddedParticipants.length > 1)
multiple = true;

for (const user of dataAddedParticipants) {
if (dataBanned.some((item) => item.id == user.userFbId))
continue;
userName.push(user.fullName);
mentions.push({
tag: user.fullName,
id: user.userFbId
});
}
// {userName}:   name of new member
// {multiple}:
// {boxName}:    name of group
// {threadName}: name of group
// {session}:    session of day
if (userName.length == 0) return;
let { welcomeMessage = getLang("defaultWelcomeMessage") } =
threadData.data;
const form = {
mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
};
welcomeMessage = welcomeMessage
.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
.replace(/\{boxName\}|\{threadName\}/g, threadName)
.replace(
/\{multiple\}/g,
multiple ? getLang("multiple2") : getLang("multiple1")
)
.replace(
/\{session\}/g,
hours <= 10
? getLang("session1")
: hours <= 12
? getLang("session2")
: hours <= 18
? getLang("session3")
: getLang("session4")
);

form.body = welcomeMessage;

if (threadData.data.welcomeAttachment) {
const files = threadData.data.welcomeAttachment;
const attachments = files.reduce((acc, file) => {
acc.push(drive.getFile(file, "stream"));
return acc;
}, []);
form.attachment = (await Promise.allSettled(attachments))
.filter(({ status }) => status == "fulfilled")
.map(({ value }) => value);
}
message.send(form);
delete global.temp.welcomeEvent[threadID];
}, 1500);
};
}
};
