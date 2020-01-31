const express = require("express");
const app = express();
const exphbs = require("express-handlebars")
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const path = require('path');

app.engine('handlebars', exphbs({defaultLayout: "mainLayout"}));
app.set("view engine", "handlebars");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static("public"));
let dbItems = [ { id: 1, name: "shiny item"} ];

app.get("/", function(req, res){
    res.render('itemsView', {
        items: dbItems
    });
});

app.post("/api/items", function(req, res){
    let item = { id: dbItems.length + 1, name: req.body.itemName };
    dbItems.push(item);
    res.render('itemsView', {
        items: dbItems
    });
});

app.delete("/api/items/:id", function(req, res){
    dbItems = dbItems.filter( x=> x.id !== parseInt(req.params.id));
    res.render('itemsView', {
        items: dbItems
    });
});
function sendItemsHtml(res) {
    
    fs.readFile(path.join(__dirname, "public/index.html"), 'utf-8', function(err, data){
        if (err) throw err;
        res.end(data.replace("{{{_items}}}", createItemsHtml()));
    });
}

function createItemsHtml(){
    let itemsHtmlArry = dbItems.map(x => `<li>${x.id} ${x.name}</li>`);
    return itemsHtmlArry.join('');
}

app.listen(PORT, () => console.log(`Server listening http://localhost:${PORT}`));

