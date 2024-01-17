import express  from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

let items = [];
let workItems = [];

app.get("/", (req, res) => {

    let date = new Date();

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    };

    let today = date.toLocaleDateString('en-US', options);


    res.render("index.ejs", {listTitle: today, newListItems: items} );

});


app.post("/", (req, res) => {

    let item = req.body["newItem"];

    if(req.body["list"] === "Work" ){

        workItems.push(item);
        res.redirect("/work");

    }else{

        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", (req, res) => {


    res.render("work.ejs", {listTitle: "Work List", newListItems2: workItems})
});


app.listen(port, () => {
    console.log("Listening to port " + port);
})