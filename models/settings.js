const fs = require('fs');

class DisIRC_Settings {

    constructor(filepath) {
        this.filepath = filepath;
        this.settings = fs.readFileSync(filepath);
        this.settings = JSON.parse(this.settings);
    }

    static generateSettings() {
        let settings = {
            "Discord": {
                "token": "<YOUR BOT TOKEN HERE>"
            },
            "IRC": {
                "server": "irc.freenode.net"
            },
            "ChannelMap": {
                "#cookieeaters_random": "300368017655857172",
                "#cookieeaters_memes": "299781511643922436"
            }
        }
        return JSON.stringify(settings, null, 2);
    }
}

module.exports = DisIRC_Settings;