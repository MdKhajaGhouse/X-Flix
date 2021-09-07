const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  app.listen(config.port, () => {
      console.log(`server started at port ${config.port}`);
  });
});