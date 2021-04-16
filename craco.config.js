const WorkerPlugin = require("worker-plugin");
// craco.config.js
module.exports = {
  webpack: {
    plugins: [new WorkerPlugin()],
  },
};
