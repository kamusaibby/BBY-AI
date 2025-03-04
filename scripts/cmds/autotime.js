module.exports.config = {
  name: "autotimer",
  version: "2.0",
  role: 0,
  author: "ArYan",
  description: "Everyone is a autotime now ",
  category: "AutoTime",
  countDown: 3,
};

module.exports.onLoad = async ({ api }) => {
  const timerData = {
      "12:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন রাত ১২:০০ টা 🕛 বাজে সবাই কি ঘুমিয়ে পড়ছো 💫🛌 আমি রোবট তাই আমার ঘুম নাই জেগে আছি 🤖👻",
        url: null
      },
      "01:00:00 AM": {
        message: "আসসালামু আলাইকুম এখন রাত ১:০০ টা 🕐 বাজে 🌠🌟",
        url: null
      },
      "02:00:00 AM": {
        message: "আসসালামু আলাইকুম এখন রাত ২:০০ টা 🕑 বাজে 🌃🎉",
        url: null
      },
      "03:00:00 AM": {
        message: "আসসালামু আলাইকুম এখন রাত ৩:০০ টা 🕒 বাজে 🌌🌟",
        url: null
      },
      "04:00:00 AM": {
        message: "আসসালামু আলাইকুম এখন ভোর ৪:০০ টা 🕓 বাজে ফোজরের নামাজ পড়ে নাও 🕌🕋",
        url: null
      },
      "05:00:00 AM": {
        message: "আসসালামু আলাইকুম এখন ভোর ৫:০০ টা 🕔 বাজে 🌆💫",
        url: null
      },
      "06:00:00 AM": {
        message: "আসসালামু আলাইকুম এখন সকাল ৬:০০ টা 🕕 বাজে সবাই ঘুম থেকে উঠে পড়ো 🛌🥱",
        url: null
      },
      "07:00:00 AM": {
        message: "আসসালামু আলাইকুম এখন সকাল ৭:০০ টা 🕖 বাজে সবাই নাস্তা করে নাও 🥪🧈",
        url: null
      },
      "08:00:00 AM": {
        message: "আসসালামু আলাইকুম এখন সকাল ৮:০০ টা 🕗 বাজে ছোটদের স্কুলে যাওয়ার সময় হয়ে গেছে 📚🚌",
        url: null
      },
      "09:00:00 AM": {
        message: "আসসালামু আলাইকুম এখন সকাল ৯:০০ টা 🕘 বাজে 🎉💥",
        url: null
      },
      "10:00:00 AM": {
        message: "আসসালামু আলাইকুম এখন সকাল ১০:০০ টা 🕙 বাজে 💫🌟",
        url: null
      },
      "11:00:00 AM": {
        message: "আসসালামু আলাইকুম এখন সকাল ১১:০০ টা 🕚 বাজে 💫🌻",
        url: null
      },
      "12:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন দুপুর ১২:০০ টা 🕛 বাজে সবাই যোহরের নামাজ পড়ে নাও 🕌🕋",
        url: null
      },
      "01:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন বেলা ১:০০ টা 🕐 বাজে সবাই খাওয়া দাওয়া করে নাও 🍛🍚",
        url: null
      },
      "02:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন বেলা ২:০০ টা 🕑 বাজে কি করেন আপনারা 🤷‍♀️🫰",
        url: null
      },
      "03:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন বিকাল ৩:০০ টা 🕒 বাজে সবাই আপনাদের পরিবার এর সাথে থাকুন এবং বাবা, মা, কে কাজে সাহায্য করুন 🌟🎉",
        url: null
      },
      "04:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন বিকাল ৪:০০ টা 🕓 বাজে সবাই আছরের নামাজ পড়ে আসো 🕌🕋",
        url: null
      },
      "05:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন বিকাল ৫:০০ টা 🕔 বাজে 🎉🌻",
        url: null
      },
      "06:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন বিকাল ৬:০০ টা 🕕 বাজে 🎉 🌆",
        url: null
      },
      "07:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন সন্ধা ৭:০০ টা 🕖 বাজে সবাই মাগরিফ এর নামাজ পড়ে নাও 🕌🕋",
        url: null
      },
      "08:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন রাত ৮:০০ টা 🕗 বাজে সবাই এশার নামাজ পড়ে নাও 🕌🕋",
        url: null
      },
      "09:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন রাত ৯:০০ টা 🕘 বাজে সবাই  কি চিপা নিয়ে বিজি আছো 🌌🤷‍♀️",
        url: null
      },
      "10:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন রাত ১০:০০ টা 🕙 বাজে সবাই রাতের খাবার খেয়ে নাও 🌠🌟",
        url: null
      },
      "11:00:00 PM": {
        message: "আসসালামু আলাইকুম এখন রাত ১১:০০ টা 🕚 বাজে সবাই ঘুমিয়ে পড়ো 💫🛌",
        url: null
      }
  };
  if(timerData){
const checkTimeAndSendMessage = async() => { 
  const currentTime = new Date(Date.now() + 21600000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).split(',').pop().trim(); 
  // const attachment = await global.utils.getStreamFromURL(timerData[currentTime].url);
  
    if (timerData[currentTime]) global.GoatBot.config.whiteListModeThread.whiteListThreadIds.forEach(async threadID => await api.sendMessage({body: timerData[currentTime].message/*, attachment*/}, threadID)); 
    setTimeout(checkTimeAndSendMessage, 1200 - new Date().getMilliseconds()); 
   }; 
  checkTimeAndSendMessage();
 }
};

module.exports.onStart = ({}) => {};
