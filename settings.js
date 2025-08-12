const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {

SESSION_ID: process.env.SESSION_ID === undefined ? '𝐒𝐔𝐋𝐀-𝐌𝐃=hiEhRZTS#ax8k-HHON78xTDL3ppJAGSNRtgMoWs_CDml_UVHLAjk' : process.env.SESSION_ID,
PREFIX: process.env.PREFIX || '.' ,
MODE: process.env.MODE === undefined ?"groups" : process.env.MODE,
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS === undefined ?"true" : process.env.AUTO_READ_STATUS
};
