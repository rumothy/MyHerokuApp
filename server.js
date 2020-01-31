const express = require("express");
const app = express();
const exphbs = require("express-handlebars")
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: "mainLayout"}));
app.set("view engine", "handlebars");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let dbItems = [ { id: 1, name: "shiny item"} ];

app.get("/", function(req, res){
    res.render('indexView', {
        items: dbItems
    });
});

app.post("/api/items", function(req, res){
    let item = { id: dbItems.length + 1, name: req.body.itemName };
    dbItems.push(item);
    res.render('indexView', {
        items: dbItems
    });
});

app.delete("/api/items/:id", function(req, res){
    dbItems = dbItems.filter( x=> x.id !== parseInt(req.params.id));
    res.render('indexView', {
        items: dbItems
    });
});

app.listen(PORT, () => console.log(`Server listening http://localhost:${PORT}`));

