const getEnvFileObject = require("../scripts/getProcessedEnvVars");

const manifest = JSON.parse(JSON.stringify(require("../app.config")));
manifest.extra = Object.assign({} , manifest.extra, getEnvFileObject(".env.test"));

const constants = {
    manifest,
    deviceName: "mock-deviceName",
};
export default constants;
