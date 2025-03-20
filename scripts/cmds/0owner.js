const util = require("util");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const exec = util.promisify(require("child_process").exec);

module.exports = {
    config: {
        name: "owner",
        aliases: ["creator", "dev"],
        version: "1.0",
        author: "XOS Eren",
        role: 0,
        shortDescription: {
            en: "Show the bot owner's information."
        },
        longDescription: {
            en: "Displays details about the bot owner, including name, contact, and prefix."
        },
        category: "SYSTEM",
        guide: {
            en: "Use {pn} to see the bot owner's details."
        }
    },

    onStart: async function ({ message, event, api }) {
        try {
            const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
            let currentFrame = 0;

            // Send initial loading message
            const loadingMessage = await api.sendMessage(`${spinnerFrames[0]} Gathering owner info...`, event.threadID);
            
            // Animate the spinner for 4 seconds
            const intervalId = setInterval(async () => {
                currentFrame = (currentFrame + 1) % spinnerFrames.length;
                await api.editMessage(`${spinnerFrames[currentFrame]} Gathering owner info...`, loadingMessage.messageID);
            }, 200);

            // Wait for 4 seconds before showing the owner name
            setTimeout(async () => {
                clearInterval(intervalId);

                // Edit the message to show the owner's name after 4 seconds
                await api.editMessage("👑 𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 👑\n\n📛 𝗡𝗮𝗺𝗲: 𝗬𝗢𝗨𝗥 𝗕𝗘𝗕", loadingMessage.messageID);

                // Wait for another 2 seconds and show the rest of the info
                setTimeout(async () => {
                    const ownerInfo = `════════════════\n\n🙆‍♂️ 𝗡𝗮𝗺𝗲:      𝗧𝗢𝗠 🎀  

📞 𝗖𝗼𝗻𝗧𝗮𝗰𝘁:    [𝗛𝗜𝗗𝗗𝗘𝗡]  

🛠 𝗕𝗼𝘁 𝗩𝗲𝗿𝘀𝗶𝗼𝗻:  1.0
  
🛞 𝗣𝗿𝗲𝗳𝗶𝘅:  ( ${global.GoatBot.config.prefix} ) 

💻 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆:  𝗧𝗢𝗠 𝗕𝗕𝗬  

🚀 𝗦𝘁𝗮𝘁𝘂𝘀:𝗥𝘂𝗻𝗻𝗶𝗻𝗴 𝗦𝗺𝗼𝗼𝘁𝗵𝗹𝘆 ✅`;

                    // Online Image URL
                    const imageUrl = "https://i.imgur.com/1XOcu8A.jpeg";
                    const imagePath = path.join(__dirname, "owner.jpg");

                    // Download the image
                    const response = await axios({ url: imageUrl, responseType: "stream" });
                    const writer = fs.createWriteStream(imagePath);
                    response.data.pipe(writer);

                    writer.on("finish", async () => {
                        await api.sendMessage({ body: ownerInfo, attachment: fs.createReadStream(imagePath) }, event.threadID);
                        fs.unlinkSync(imagePath); // Delete the image after sending
                    });

                    writer.on("error", async () => {
                        await api.sendMessage(ownerInfo, event.threadID);
                    });

                    // Remove the loading spinner after the full info is displayed
                    api.unsendMessage(loadingMessage.messageID);
                }, 2000); // 2 sec delay before showing full info

            }, 4000); // 4 sec delay before showing owner name

        } catch (error) {
            console.error("Error in owner.js:", error);
            api.sendMessage(`⚠️ Error: ${error.message}`, event.threadID);
        }
    }
};
