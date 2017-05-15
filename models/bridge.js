const irc = require('irc'), Discord = require("discord.js");

class DisIRC_Bridge {
    constructor(settings) {
        this.settings = settings;
        this.discord_client = new Discord.Client();
        this.discord_client.on('ready', (this.onClientConnect_Discord).bind(this));
        this.discord_client.on('message', (this.onMessage_Discord).bind(this));
        this.discord_client.login(this.settings.Discord.token);
        this.settings.ChannelMap2 = {};
        for (let channel in this.settings.ChannelMap) {
            this.settings.ChannelMap2[this.settings.ChannelMap[channel]] = channel;
        }
    }

    onClientConnect_Discord() {
        console.log("Connected to discord!");
        this.discord_client.generateInvite(["READ_MESSAGES", "SEND_MESSAGES"]).then((link) => {
            console.log(link);
        })
        console.log(this.discord_client.user.username);
        this.irc_client = new irc.Client(this.settings.IRC.server, this.discord_client.user.username);
        this.irc_client.addListener('registered', (this.onClientConnect_IRC).bind(this));
        this.irc_client.addListener('message', (this.onMessage_IRC).bind(this));
        this.irc_client.addListener('error', function (message) {
            console.log('error: ', message);
        });
    }

    onClientConnect_IRC() {
        for (let channel in this.settings.ChannelMap) {
            console.log("Joining " + channel)
            this.irc_client.join(channel);
        }
    }

    onMessage_Discord(msg) {
        if (msg.author.id == this.discord_client.user.id) return;
        if (msg.channel.id in this.settings.ChannelMap2) {
            this.irc_client.say(this.settings.ChannelMap2[msg.channel.id], `<${msg.author.username}>: ${msg.content}`);
        }
    }

    onMessage_IRC(from, to, msg) {
        if (to in this.settings.ChannelMap) {
            this.discord_client.channels.get(this.settings.ChannelMap[to]).send(`<${from}>: ${msg}`);
        }
    }
}

module.exports = DisIRC_Bridge;