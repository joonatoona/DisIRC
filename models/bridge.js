const irc = require('irc'), Discord = require("discord.js");

class DisIRC_Bridge {
    constructor(settings) {
        this.settings = settings;
        this.discord_client = new Discord.Client();
        this.discord_client.on('ready', this.onClientConnect);
        this.discord_client.on('message', this.onMessage_Discord);
        this.discord_client.login(this.settings.Discord.token)
    }

    onClientConnect() {
        console.log("Connected to discord!")
        this.irc_client = irc.Client(this.settings.IRC.server, this.discord_client.user.username);
        this.irc_client.addListener('message', this.onMessage_IRC);
        for (let channel of settings.ChannelMap) {
            console.log("Joining " + channel)
            this.irc_client.join(channel);
        }
    }

    onMessage_Discord(msg) {

    }

    onMessage_IRC(from, to, msg) {

    }
}

module.exports = DisIRC_Bridge;