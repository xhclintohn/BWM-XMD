const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUIrdEszbTAwZm8rUmUyV2s0a0taeUR1QVlCYkJEZnJUSmdlS1Z3NTdXYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEhuWmJJRlU1di9RK3A1cHk4dXAyUkZhUlhjYXhwNmVoWE9HTTRWWFVUND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrUE4vcHdQL2ttRUFjR2FRMHY0SXdrR2hsaXpncWg2V0hjUDBFVFNqaDFVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtQTE1QU9QZ0diZTAzSVRIVjRIK1BQZ1FkME1BczF6SnFXQzRXQ3NYdVM4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNKMnNsa1grMUtDWnhQc2p5ZVlpNUh4NWhsc3pDczBraWp0STVOb3R1Mm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imx6M3dIUmsyK3o2UXlvTTNhMFYwM2U2Mmw4L0pNYnFKRWdwYzFSS1k1eE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk5ya0hCWmNTdjNKNFdoWjNPYXFUdGxZWDYwcG9sSWNOb29PZ3BqTnBHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUjl1RmdVNHUxNU5MbDVGV3l1d0hjYlFxMXZJV3NOb3RidERReXI0Y1VYMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikt3dGkyOHUzMzZETEpJaWhwSGlkQlRHVTNHdXZra09ZdTYzK0dLQmRQUmlEVUxvb0FpelZmZnJYNDByc2pBQnlkd0g4VnFvZ0FtaytKUU42T3Yrc0R3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODksImFkdlNlY3JldEtleSI6IkNTWi9DY1llTHRDam9UQWZrV0VjSHlqejNxYUY5aTRETzVacHBMVHU4OVk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im1TaW56TTVtUkgyWVhaRldSUkFjTlEiLCJwaG9uZUlkIjoiYzEzMTM5NzktYThiMC00Y2E4LWI3NDAtMGQ5NGQzODA0MmJhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijd4VDU3bUFMMDd6UzJ5TDJ5UjVVSE5tS0JCVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLMTFzMFZ3RnpGSHlvQ3dGaXRSbjI0djlDMkU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQVEyS0s5WVkiLCJtZSI6eyJpZCI6IjI1NDczNTM0MjgwODozQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMeWZqZG9DRU5PTmpyWUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIzSEQremNpOGt1VkdsL2pENjFySVBrdUMvMUVwSS9mYnFxcUhpMXdqMjM4PSIsImFjY291bnRTaWduYXR1cmUiOiJROVJHSG50SXhhTVZLTkRwb2pzWVIwRncvVllFYVFtVW1iNEZJbFJhSDRJL3hrZzBOcWpzYThzTW1WMlZTTS9iUHBBQXBYbTV0Y2gxSDhYTm1NWmxEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZ0srTnZqdGhoQVA1b0IvQ2w4OWdTTDRzaDlxTlgzMkJXdEFtcThmWmFwYXRsYzNKZ1YrM2N0NlZScDU2UUE2OXRLNHBXWjhxMHM4RzlkaHQvSWFBQmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MzUzNDI4MDg6M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkeHcvczNJdkpMbFJwZjR3K3RheUQ1TGd2OVJLU1AzMjZxcWg0dGNJOXQvIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0MDkwMDgwfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "xhclinton",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254735342808",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '3',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


