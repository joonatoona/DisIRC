const irc = require('irc'), Discord = require("discord.js");

class DisIRC_Bridge {
    constructor(settings) {
        this.discord_client = new Discord.Client();
        this.irc_client = new irc.Client(settings.IRC.server);
    }
}

module.exports = DisIRC_Bridge;