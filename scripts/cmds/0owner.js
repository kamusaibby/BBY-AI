const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
config: {
  name: "owner",
  aurthor:"Tokodori",// Convert By Goatbot Tokodori 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event }) {
  try {
    const ownerInfo = {
      name: '𝗞𝗔𝗠𝗨',
      gender: '𝗠𝗔𝗟𝗘',
      age: '17+',
      height: '𝗨𝗡𝗞𝗡𝗢𝗪𝗡',
      choise: '𝗥𝗨𝗦𝗦𝗜𝗔𝗡',
      nick: '𝗬𝗢𝗨𝗥 𝗣𝗜𝗫𝗫𝗜 '
    };

    const bold = 'https://i.imgur.com/2DarfNC.mp4'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = ` 
╭[ .  ]•〆 𝗞𝗔𝗠𝗨 〆 ]  ─⦿
╭────────────◊
├‣ 𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 
├‣ 𝐍𝐚𝐦𝐞: ${ownerInfo.name}
├‣ 𝐆𝐞𝐧𝐝𝐞𝐫:  ${ownerInfo.gender}
├‣ 𝐀𝐠𝐞 .${ownerInfo.age}
├‣ 𝐍𝐢𝐜𝐤 : ${ownerInfo.nick}
├‣ 𝐂𝐡𝐨𝐢𝐬𝐞:  ${ownerInfo.choise}   
├‣ 𝐇𝐞𝐢𝐠𝐡𝐭 : ${ownerInfo.height}
╰────────────◊ 
`;

    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
},
};
