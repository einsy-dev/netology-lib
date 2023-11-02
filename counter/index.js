var express = require("express");
var app = express();
var fs = require("fs");
var databasePath = "./src/db.json";
var PORT = 3000;
app.get("/api/:id", function (req, res) {
    var id = req.params.id;
    var data = JSON.parse(fs.readFileSync(databasePath, "utf-8"));
    if (!data[id]) {
        data[id] = 0;
        fs.writeFileSync(databasePath, JSON.stringify(data));
        res.status(200).send({ data: 0 });
    }
    else {
        res.status(200).send({ data: data[id] });
    }
});
app.post("/api/:id/inc", function (req, res) {
    var id = req.params.id;
    var data = JSON.parse(fs.readFileSync(databasePath, "utf-8"));
    data[id]++;
    fs.writeFileSync(databasePath, JSON.stringify(data));
    res.status(200).send({ data: "Ok" });
});
try {
    app.listen(PORT, function () {
        console.log("Server started on port ".concat(PORT));
    });
}
catch (error) {
    console.log(error);
}
