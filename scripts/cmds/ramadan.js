const dep = {
  axios: require('axios'),
  fs: require('fs'),
  path: require('path'),
};

const xyz = 'xyz';

module.exports = {
  config: {
    name: "ramadan",
    aliases: ["iftar", "sehri"],
    version: "1.0",
    author: "Team Calyx | S M Fahim",
    role: 0,
    shortDescription: {
      en: "Fetch Ramadan times and banner for a specified city"
    },
    longDescription: {
      en: "Fetches Ramadan times and a banner for a specified city and sends it to the user."
    },
    category: "islamic",
    guide: {
      en: "Type {pn} ramadan <city_name> to fetch the Ramadan times and banner for that city."
    }
  },
  onStart: async function ({ api, event, args }) {
    const cityName = args.join(" ");
    if (!cityName) {
      return api.sendMessage("Please specify a city name.", event.threadID, event.messageID);
    }

    async function downloadImage(url, filepath) {
      try {
        const response = await dep.axios({
          url,
          responseType: 'stream'
        });
        return new Promise((resolve, reject) => {
          const stream = response.data.pipe(dep.fs.createWriteStream(filepath));
          stream.on('finish', () => resolve(filepath));
          stream.on('error', (e) => reject(e));
        });
      } catch (error) {
        console.error("Error downloading image:", error);
        throw new Error('Could not download image.');
      }
    }

    try {
      const dataUrl = `https://smfahim.${xyz}/ramadan?city=${cityName}`;
      const response = await dep.axios.get(dataUrl);
      const data = response.data;

      if (!data || !data.city) {
        return api.sendMessage("No Ramadan data available for this city.", event.threadID, event.messageID);
      }

      const imageUrl = `https://smfahim.${xyz}/ramadan/banner?city=${cityName}`;
      const filepath = dep.path.join(__dirname, `${cityName}_ramadan.png`);
      await downloadImage(imageUrl, filepath);

      const { sehriTime, iftarTime, ramadanDay } = data;
      const todayDate = data.date;

      const bodyMessage = `🌈 Ramadan Times for ${data.city} ✨\n\n` +
        `📅 Date: ${todayDate}\n\n` +
        `🕋 Ramadan Day: ${ramadanDay}\n` +
        `🕋 Sehri Time: ${sehriTime}\n` +
        `🕋 Iftar Time: ${iftarTime}`;

      api.sendMessage({
        body: bodyMessage,
        attachment: dep.fs.createReadStream(filepath)
      }, event.threadID, () => {
        dep.fs.unlinkSync(filepath);
      }, event.messageID);

    } catch (error) {
      console.error("Error fetching Ramadan data or image:", error);
      api.sendMessage("Sorry, I could not fetch the Ramadan times or image at this moment.", event.threadID, event.messageID);
    }
  }
};
