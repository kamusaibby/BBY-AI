const axios = require('axios');
const baseApiUrl = "https://www.noobs-api.rf.gd/dipto";

  const config = {
    name: "dalle",
    aliases: ["bing", "create", "imagine2"],
    version: "1.1",
    author: "Dipto",
    credits: "Dipto",
    cooldowns: 15,
    countDown: 15,
    role: 0,
    usePrefix: true,
    prefix: true,
    description: "Generate images by Unofficial Dalle3",
    category: "Image Generator",
    commandCategory: "Image Generator",
    guide: { en: "{pn} prompt" },
    usages: "/dalle cat"
  };
 const onStart = async({ api, event, args }) => {
    const prompt = (event.messageReply?.body.split("dalle")[1] || args.join(" ")).trim();
    if (!prompt) return api.sendMessage("❌| Wrong Format. ✅ | Use: 17/18 years old boy/girl watching football match on TV with 'Dipto' and '69' written on the back of their dress, 4k", event.threadID, event.messageID);
    try {
      const wait = api.sendMessage("Wait koro baby 😽", event.threadID);
      const response = await axios.get(`${baseApiUrl}/dalle?prompt=${prompt}&key=dipto008`);
const imageUrls = response.data.imgUrls || [];
      if (!imageUrls.length) return api.sendMessage("Empty response or no images generated.", event.threadID, event.messageID);
      const images = await Promise.all(imageUrls.map(url => axios.get(url, { responseType: 'stream' }).then(res => res.data)));
    api.unsendMessage(wait.messageID);
   api.sendMessage({ body: `✅ | Here's Your Generated Photo 😘`, attachment: images }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage(`Generation failed!\nError: ${error.message}`, event.threadID, event.messageID);
    }
  };

module.exports = { config, onStart, run: onStart };
