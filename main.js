const fs = require('fs');

const DisIRCBridge = require(__dirname + '/models/bridge'), DisIRCSettings = require(__dirname + '/models/settings');

console.log(__dirname)

if (!fs.existsSync(__dirname + "/options.json")) {
    console.log("Settings file does not exist.");
    console.log("Generating settings from template.");
    fs.writeFileSync(__dirname + "/options.json", DisIRCSettings.generateSettings());
    console.log("options.json created from template.");
    process.exit(1);
}

const settings = new DisIRCSettings(__dirname + "/options.json").settings;

const bridge = new DisIRCBridge(settings);