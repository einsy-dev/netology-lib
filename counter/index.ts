const express = require("express");
const app = express();
const fs = require("fs");

const databasePath = "./src/db.json";
const PORT = 3000;

app.get("/api/:id", (req: any, res: any) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(databasePath, "utf-8"));

  if (!data[id]) {
    data[id] = 0;
    fs.writeFileSync(databasePath, JSON.stringify(data));
    res.status(200).send({ data: 0 });
  } else {
    res.status(200).send({ data: data[id] });
  }
});

app.post("/api/:id/inc", (req: any, res: any) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(databasePath, "utf-8"));

  data[id]++;
  fs.writeFileSync(databasePath, JSON.stringify(data));

  res.status(200).send({ data: "Ok" });
});

try {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
