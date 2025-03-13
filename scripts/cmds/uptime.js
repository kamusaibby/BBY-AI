const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
    config: {
        name: "uptime",
        aliases: ["upt", "up"],
        version: "1.0",
        author: "Anthony  // Fixed and Edited by XOS Eren",
        role: 0,
        shortDescription: {
            en: "Check system stats like uptime, memory usage, CPU load, and disk usage."
        },
        longDescription: {
            en: "Provides detailed system information including uptime, memory usage, CPU model, and disk usage."
        },
        category: "SYSTEM",
        guide: {
            en: "Type {pn} to ping the server and get stats."
        }
    },

    onStart: async function ({ message, event, api, usersData, threadsData }) {
        // Calculate uptime
        const uptime = process.uptime();
        const s = Math.floor(uptime % 60);
        const m = Math.floor((uptime / 60) % 60);
        const h = Math.floor((uptime / (60 * 60)) % 24);
        const upSt = `${h} Hours ${m} Minutes ${s} Seconds`;

        let threadInfo = await api.getThreadInfo(event.threadID);

        const genderb = [];
        const genderg = [];
        const nope = [];

        // Loop to categorize users by gender
        for (let z in threadInfo.userInfo) {
            const gender = threadInfo.userInfo[z].gender;
            const name = threadInfo.userInfo[z].name;

            if (gender === "MALE") {
                genderb.push(z + gender);
            } else if (gender === "FEMALE") {
                genderg.push(gender);
            } else {
                nope.push(name);
            }
        }

        const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        const loadingMessage = await message.reply(`${spinner[0]} Checking system stats 🔄`);
        let currentFrame = 0;
        const intervalId = setInterval(async () => {
            currentFrame = (currentFrame + 1) % spinner.length;
            await api.editMessage(`${spinner[currentFrame]} Checking system stats 🔄`, loadingMessage.messageID);
        }, 200);

        // Collecting system information
        const b = genderb.length;
        const g = genderg.length;
        const u = await usersData.getAll();
        const t = await threadsData.getAll();
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        const diskUsage = await getDiskUsage();
        const system = `${os.platform()} ${os.release()}`;
        const model = `${os.cpus()[0].model}`;
        const cores = `${os.cpus().length}`;
        const arch = `${os.arch()}`;
        const processMemory = prettyBytes(process.memoryUsage().rss);

        // Prepare the body content
        const body = `
──────────────────────
          𝗨𝗣𝗧𝗜𝗠𝗘 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘 

          🎀 𝗔𝗱𝗺𝗶𝗻 𝗜𝗻𝗳𝗼 ☮

𝗢𝗪𝗡𝗘𝗥: 𝗞𝗔𝗠𝗨 ✨
𝗣𝗥𝗘𝗙𝗜𝗫: ( ${global.GoatBot.config.prefix} )

        🎀 𝗕𝗼𝗧 𝗥𝘂𝗻 𝗧𝗶𝗺𝗲 ☮

𝗛𝗼𝘂𝗿𝘀: ${h} 
𝗠𝗶𝗻𝘂𝘁𝗲𝘀: ${m} 
𝗦𝗲𝗰𝗼𝗻𝗱𝘀: ${s}

        🎀 𝗢𝘁𝗵𝗲𝗿'𝘀 𝗜𝗻𝗳𝗼 ☮
════════════════
🙆‍♀️ 𝗚𝗶𝗿𝗹𝘀: ${g}
🙋‍♂️ 𝗕𝗼𝘆𝘀: ${b}
🖥️ 𝗖𝗣𝗨 𝗠𝗼𝗱𝗲𝗹: ${model}
🤖 𝗨𝘀𝗲𝗿: ${u.length}
════════════════
`;

        // Send the final message
        await api.editMessage(body, loadingMessage.messageID);
        clearInterval(intervalId);
    }
};

// Function to get disk usage
async function getDiskUsage() {
    const { stdout } = await exec('df -k /');
    const [_, total, used] = stdout.split('\n')[1].split(/\s+/).filter(Boolean);
    return { total: parseInt(total) * 1024, used: parseInt(used) * 1024 };
}

// Function to convert bytes into human-readable format
function prettyBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
}
