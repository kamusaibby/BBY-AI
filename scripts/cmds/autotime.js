const moment = require('moment-timezone');

module.exports.config = {
  name: "autotime",
  version: "7.1",
  role: 0,
  author: Buffer.from("QW50aG9ueQ==", "base64").toString("utf-8"), //Editing by Bayjid
  category: "autotime",
  countDown: 3,
};

module.exports.onLoad = async ({ api }) => {
  try {
    const allowedAuthor = Buffer.from("QW50aG9ueQ==", "base64").toString("utf-8");
    if (module.exports.config.author !== allowedAuthor) {
      throw new Error("Author field has been altered! The file will not work. \n \nUse this name [Anthony] Set this author name 🎀");
    }

    const messages = {
      "00:00": "🌙 রাত ১২:০০! নতুন দিন শুরু! আজকের লক্ষ্য ঠিক করো! 💫",
      "01:00": "🌠 রাত ০১:০০! এই নিরব রাতেও কেউ স্বপ্ন গড়ছে! তুমি প্রস্তুত তো? 🚀",
      "02:00": "🌌 রাত ০২:০০! রাত যত গভীর, সাফল্যের পথ তত কঠিন! 🔥",
      "03:00": "🌙 রাত ০৩:০০! কেউ জেগে পরিকল্পনা করছে, কেউ ঘুমাচ্ছে! তুমি কোন দলে? 🤔",
      "04:00": "🌄 রাত ০৪:০০! সফল মানুষরা এখনই দিন শুরু করে! তুমি প্রস্তুত তো? ⏳",
      "05:00": "🌞 সকাল ০৫:০০! নতুন সকালের শুরু, আজকের দিনটা স্পেশাল করো! ☀️",
      "06:00": "☀️ সকাল ০৬:০০! সকালবেলা নতুন সম্ভাবনার বার্তা নিয়ে আসে! 💡",
      "07:00": "🥐 সকাল ০৭:০০! প্রাতঃরাশ করো, সুস্থ থাকো, শক্তিশালী হও! 🏋️",
      "08:00": "📚 সকাল ০৮:০০! আজকে নতুন কিছু শেখার জন্য পারফেক্ট সময়! 🎓",
      "09:00": "💻 সকাল ০৯:০০! কঠোর পরিশ্রমই সাফল্যের একমাত্র চাবিকাঠি! 🔑",
      "10:00": "📝 সকাল ১০:০০! আজকের কাজগুলোর প্রোডাক্টিভিটি সর্বোচ্চ করো! 📈",
      "11:00": "🕚 সকাল ১১:০০! আরেকটু মনোযোগ দাও, সফলতা একদম কাছে! 🔥",
      "12:00": "☀️ দুপুর ১২:০০! দুপুরের খাবার খেয়ে শরীর ও মন রিচার্জ করো! 🍛",
      "13:00": "🍽️ দুপুর ০১:০০! বিশ্রাম নাও, তারপর আবার কাজে ফিরে আসো! ⏳",
      "14:00": "📖 দুপুর ০২:০০! একটু ব্রেক নাও, ফ্রেশ হয়ে নাও! 🍃",
      "15:00": "☕ বিকাল ০৩:০০! এক কাপ চা বা কফি তোমাকে এনার্জি দিবে! 🍵",
      "16:00": "🌿 বিকাল ০৪:০০! আজকের অগ্রগতি চেক করো, আরেকটু এগিয়ে যাও! 🚀",
      "17:00": "🚶 বিকাল ০৫:০০! একটু হাঁটাহাঁটি করো, শরীরকে রিফ্রেশ করো! 🏃",
      "18:00": "🌆 সন্ধ্যা ০৬:০০! আজকের কাজের ফলাফল কেমন? রিভিউ করো! 📊",
      "19:00": "🏠 সন্ধ্যা ০৭:০০! পরিবারের সাথে সময় কাটাও, ভালোবাসা শেয়ার করো! ❤️",
      "20:00": "🎶 রাত ০৮:০০! নিজের জন্য কিছু সময় নাও, রিল্যাক্স করো! 🎬",
      "21:00": "📱 রাত ০৯:০০! আজকের শেখা ও অর্জন নিয়ে ভাবো, ফোন কম ব্যবহার করো! 📵",
      "22:00": "😴 রাত ১০:০০! কালকের জন্য প্রস্তুতি নাও, ঘুমাও! 💤"
    };

    const sendScheduledMessage = () => {
      const now = moment().tz('Asia/Dhaka');
      const currentHour = now.format('HH:00');

      if (messages[currentHour]) {
        if (global.db && global.db.allThreadData) {
          const threadIDs = global.db.allThreadData.map(i => i.threadID);
          threadIDs.forEach(async (threadID) => {
            try {
              const styledMessage = `🔥 𝗔𝗨𝗧𝗢 𝗧𝗜𝗠𝗘 𝗨𝗣𝗗𝗔𝗧𝗘 🔥\n\n` +
                `💬 ${messages[currentHour]}\n\n` +
                `⏰ 𝗧𝗶𝗺𝗲: ${currentHour} 🕒\n\n` +
                `📍 𝗧𝗶𝗺𝗲 𝗭𝗼𝗻𝗲: Asia/Dhaka 🇧🇩`;

              await api.sendMessage(styledMessage, threadID);
            } catch (error) {
              console.error("Error sending message:", error);
            }
          });
        }
      }

      const nextHour = moment().add(1, 'hour').startOf('hour');
      const delay = nextHour.diff(moment());
      setTimeout(sendScheduledMessage, delay);
    };

    sendScheduledMessage();
  } catch (error) {
    console.error("Error in onLoad:", error);
  }
};

module.exports.onStart = () => {};
