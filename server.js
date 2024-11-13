const express = require("express");
const app = express();
const PORT = 3000;


app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
})

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use(`/employees`, require(`./API/employees`));

app.use((req, res, next) => {
  next({status: 404, message: `Sorry, endpoint does not exist`});
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message);
})

app.listen(PORT, () => {
  `Listening on port ${PORT}...`;
});
