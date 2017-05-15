const fs = require('fs'), DisIRCSettings = require(__dirname + '/models/settings');

console.log(__dirname)

if (!fs.exists(__dirname + "/options.json")) {
    console.log("Settings file does not exist.");
    console.log("Generating settings from template.");
    fs.writeFileSync(__dirname + "/options.json", DisIRCSettings.generateSettings());
    console.log("options.json created from template.");
    process.exit(1);
}

const settings = new DisIRCSettings(__dirname + "/options.json").settings;

const discordClient = new Discord.Client();
const ircClient = new irc.client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    client.generateInvite(["READ_MESSAGES", "SEND_MESSAGES"]).then((link) => {
        console.log(link);
    })
});

client.on('message', msg => {

});

client.login(fs.readFileSync('token', 'utf8'));