const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const axios = require('axios')
const config = require('../config')
const fs = require('fs');
const path = require('path');
const { storenumrepdata } = require('../lib/noasitha')
const gifted = require('gifted-dls');
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 



// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

// .song command
cmd({
    pattern: "song",
    desc: "To download songs.",
    react: "🎵",
    use : ".song < Text or Link >",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { prefix, from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg
        if(!q) return reply(msr.giveme)
        //if (q.includes('https://youtu.be/')) return await reply(msr.not_fo)
    


        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
        let numrep = []

        let desc = `
*🎶𝗔𝗦𝗜𝗧𝗛𝗔-𝗠𝗗 𝗔𝗨𝗗𝗜𝗢-𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🎶*  
*|__________________________*
*|-ℹ️ 𝗧𝗶𝘁𝗹𝗲 :* ${data.title}
*|-🕘 𝗧𝗶𝗺𝗲 :* ${data.timestamp}
*|-📌 𝗔𝗴𝗼 :* ${data.ago}
*|-📉 𝗩𝗶𝗲𝘄𝘀 :* ${data.views}
*|-🔗 𝗟𝗶𝗻𝗸 :* ${data.url}
*|__________________________*

🔽 *To download send:*

1 *Audio File* 🎶
2 *Document File* 📂

> *POWERED by ASITHA-MD*

`;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let MAX_SIZE = "SIZE IS TO BIG"

numrep.push(`${prefix}ytmp3 ${data.url}`)
numrep.push(`${prefix}ytdoc ${data.url}`)


const mass = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek }); 
    



const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg)

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// .video command
cmd({
    pattern: "video",
    desc: "To download videos.",
    react: "🎥",
    use : ".video < Text or Link >",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { prefix, from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

        const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg
        if(!q) return reply(msr.giveme)
        //if (q.includes('https://youtu.be/')) return await reply(msr.not_fo)
    

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
        let numrep = []
        let desc = `
*📽️ASITHA-MD VIDEO-DOWNLOADER📽️*  
*|__________________________*
*|-ℹ️ 𝗧𝗶𝘁𝗹𝗲 :* ${data.title}
*|-🕘 𝗧𝗶𝗺𝗲 :* ${data.timestamp}
*|-📌 𝗔𝗴𝗼 :* ${data.ago}
*|-📉 𝗩𝗶𝗲𝘄𝘀 :* ${data.views}
*|-🔗 𝗟𝗶𝗻𝗸 :* ${data.url}
*|__________________________*

🔽 *To download send:*

 *Video File* 📽️
   1.1 *360*
   1.2 *480*
   1.3 *720*
   1.4 *1080*
 *Document File* 📂
   2.1 *360*
   2.2 *480*
   2.3 *720*
   2.4 *1080*

> *POWERED by ASITHA-MD*

`;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let MAX_SIZE = "SIZE IS TO BIG"




numrep.push(`1.1 ${prefix}ytmp4 ${data.url} & 2`)
numrep.push(`1.2 ${prefix}ytmp4 ${data.url} & 3`)
numrep.push(`1.3 ${prefix}ytmp4 ${data.url} & 4`)
numrep.push(`1.4 ${prefix}ytmp4 ${data.url} & 5`)
numrep.push(`2.1 ${prefix}ytvdoc ${data.url} & 2`)
numrep.push(`2.2 ${prefix}ytvdoc ${data.url} & 3`)
numrep.push(`2.3 ${prefix}ytvdoc ${data.url} & 4`)
numrep.push(`2.4 ${prefix}ytvdoc ${data.url} & 5`)


const mass = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek }); 
    



const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'decimal'
           }

await storenumrepdata(jsonmsg)

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


// .ytmp3 command
cmd({
    pattern: "ytmp3",
    react: "⬇",
    dontAddCommandList: false,
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo)

    
    
    const down = await fetchJson(`https://api-pink-venom.vercel.app/api/ytmp3?url=${q}`)
    const downloadUrl = down.result.download_url;
    //let data = await gifted.ytmp3(q)
   // const downloadUrl = data.download_url

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, {quoted:mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})
//.ytdoc command
cmd({
    pattern: "ytdoc",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo)

    const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    

    
    const down = await fetchJson(`https://api-pink-venom.vercel.app/api/ytmp3?url=${q}`)
    const downloadUrl = down.result.download_url;
//let data = await gifted.ytmp3(q)
//const downloadUrl = data.download_url
const search = await yts(q);
const data1 = search.videos[0];

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { document: { url:downloadUrl }, mimetype: "audio/mpeg", fileName: data1.title + ".mp3", caption: `${FOOTER}`}, {quoted:mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
fs.unlinkSync(imagePath);
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})
// .ytmp4 command
cmd({
    pattern: "ytmp4",
    desc: "Download YouTube videos as MP4.",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    
        const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg;

        const pm = q.split(" & ")[0];
        const rr = q.split(" & ")[1];
        if (!pm) return reply(msr.url);
        if (!pm.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo);

        const jsonResponse = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/ytmp4?url=${q}`);
        const downloadUrl = jsonResponse.result[rr].dl_link;
       //  let data = await gifted.ytvideo(pm, quality=`${rr}`)
        // const downloadUrl = data.download_url

        // Reacting with upload icon
        await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }});


        // Sending the video
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }});
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
//.ytvdoc command
cmd({
    pattern: "ytvdoc",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   

      const pm = q.split(" & ")[0];
        const rr = q.split(" & ")[1];
        if (!pm) return reply(msr.url);
        if (!pm.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo);

    const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    
const jsonResponse = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/ytmp4?url=${q}`);
const downloadUrl = jsonResponse.result[rr].dl_link;
//let data = await gifted.ytvideo(pm, quality=`${rr}`)
//const downloadUrl = data.download_url
const search = await yts(q);
const data3 = search.videos[0];

        // Reacting with upload icon
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }});

await conn.sendMessage(from, { document: { url:downloadUrl }, mimetype: "video/mp4",fileName:  data3.title+ ".mp4", caption: `${FOOTER}`}, {quoted:mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "yts",
    react: "🔎",
    alias: ["ytsearch", "ytfind"],
    desc: "Search YouTube and provide download options.",
    category: "search",
    use: '.yts <query>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, sender, reply }) => {
    try {
    
        // Ensure a search query is provided
        if (!q) return reply("Please provide a search term!");
        const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;

        // Perform YouTube search using yt-search
        const searchResults = await yts(q);
        const videos = searchResults.videos.slice(0, 5); // Limit to top 5 results

        if (!videos.length) return reply("No results found.");
        
        let numrep = [];
        let pp = ''; 

        searchResults.videos.forEach((video, htta) => {
            pp += `📌 *${formatNumber(htta + 1)} ||*  ${video.title}\n\n`;
            numrep.push(`${prefix}ytselect ${video.url}`);
        });

        let msg = `
⫷⦁[ * '-'_꩜ 𝘼𝙎𝙄𝙏𝙃𝘼 𝙈𝘿  𝙔𝙏𝙎 𝙎𝙀𝘼𝙍𝘾𝙃 ꩜_'-' * ]⦁⫸

🔎 *YouTube Search Results* for: *${q}*

*Please select a video:👇*
        
${pp}
> *POWERED by ASITHA-MD*
`;
        const mass = await conn.sendMessage(from, { image: { url: searchResults.videos[0].thumbnail }, caption: msg }, { quoted: mek });
        
        const jsonmsg = {
            key: mass.key,
            numrep,
            method: 'nondecimal'
        };

        await storenumrepdata(jsonmsg);
        // Prepare message content
        

        // Send button message with search results
        

    } catch (e) {
        console.log(e);
        reply("An error occurred while searching on YouTube.");
    }
});

// Add command to handle video selection
cmd({
    pattern: "ytselect",
    react: "🎥",
    use: ".ytselect",
    filename: __filename
},
async (conn, mek, m, { from, prefix, quoted, body, args, q, reply }) => {
    try {
    
        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
        let numrep = []


        const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let desc = `
🔽 *To send:*

*1 ||*  *Song* 🎶
*2 ||*  *Video* 🎥

> *POWERED by ASITHA-MD*`
        // Prepare buttons for downloading video or audio

numrep.push(`${prefix}song ${data.url}`)
numrep.push(`${prefix}video ${data.url}`)


const mass = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek }); 
    
const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg)



    } catch (e) {
        console.log(e);
        reply("An error occurred while processing your selection.");
    }
});
