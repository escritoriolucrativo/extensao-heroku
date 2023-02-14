const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

var DB = {
    games:
        {
            "status":200,
            "message":"OK",
            "data":{
               "validate":{
                   "is_trial":true ,
                  "is_pro":true ,
                  "end_date":"2030-10-10T00:00:00",
                  "day_remaining":518400,
                  "life_time":false
               },
               "access_modules":{
                  "message":{
                     "access":  true ,
                     "attachment":true ,
                     "delay":true ,
                     "attachmentlimit":4,
                     "delayvalue":5,
                     "personalize":true ,
                     "product":true ,
                     "label":true 
                  },
                  "exportcontact":{
                     "access":true 
                  },
                  "sequence":{
                     "access":true ,
                     "max":500
                  },
                  "linkgenrator":{
                     "access":true 
                  },
                  "blurinfo":{
                     "access":true 
                  },
                  "customtab":{
                     "access":true ,
                     "custom":true ,
                     "max":500
                  },
                  "messagetemplate":{
                     "access":true ,
                     "max":500
                  },
                  "smartreply":{
                     "access":true ,
                     "max":500
                  },
                  "campaign":{
                     "access":true ,
                     "max":500
                  },
                  "webhook":{
                     "access":false,
                     "maxincoming":500,
                     "maxoutgoing":500,
                     "support":[
                        "heroku"
                     ]
                  },
                  "integrations":{
                     "access":false,
                     "support":[
                        "pabblyconnect",
                        "zapier",
                        "integrately"
                     ]
                  },
                  "customtag":{
                     "access":true ,
                     "max":100
                  },
                  "customfield":{
                     "access":true ,
                     "custom":true ,
                     "max":100
                  },
                  "inject":{
                     "add_event":true ,
                     "schedule_message":true ,
                     "copy_translate":true ,
                     "reminder":true ,
                     "notes":true ,
                     "quick_reply":true ,
                     "thumb_up":true ,
                     "profile":true ,
                     "recurrence":true 
                  },
                  "extra":{
                     "import_export":true ,
                     "global_actions":true ,
                     "delete_all":true ,
                     "pr_button":true ,
                     "group_action":true ,
                     "wa_utility":true ,
                     "recurring":true ,
                     "recurrence":true ,
                     "sequence":true 
                  }
               },
               "plan_type":"pro-plus",
               "device_data":null,
               "is_user_blocked":false ,
               "is_user_blocked_config":null,
               "check_number_type":"both",
               "check_number_type_v2":"both",
               "wa_keys":{
                  "2.2226.3":{
                     "check_pr_number":"window.PR.checkPRNumber = function (id){ return { isLid : function() { return false }, toString : function() { return id } } }",
                     "override_check_type":true
                  },
                  "all":{
                     "check_pr_number":"window.PR.checkPRNumber = function (id){ return { isLid : function() { return false }, toString : function() { return id } } }",
                     "override_check_type":true
                  }
               },
              "usst_trial_start":true,
               "usst_trial_about_end":true,
               "usst_trial_end":false
            }
         }
    
}

app.post("/games",(req, res) => {
    if(req.params.id){
        res.statusCode = 200;
        res.json(DB.games);
        }else{
            res.statusCode = 200;
            res.json(DB.games);
        }
});


app.get("games/user/open-extention",(req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id",(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

app.post("/ext",(req, res) => { 
    var {title, price, year} = req.body;
    DB.games.push({
        id: 2323,
        title,
        price,
        year
    });
    res.sendStatus(200);
})

app.delete("/ext/:id",(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
});

app.put("/ext/:id",(req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){

            var {title, price, year} = req.body;

            
            if(title != undefined){
                game.title = title;
            }

            if(price != undefined){
                game.price = price;
            }

            if(year != undefined){
                game.year = year;
            }
            
            res.sendStatus(200);

        }else{
            res.sendStatus(404);
        }
    }

});

app.listen(8080,() => {
    console.log("API RODANDO!");
});