const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`Server started ${process.env.PORT}`);
});
