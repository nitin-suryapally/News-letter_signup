
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function(req , res){
   
    res.sendFile(__dirname + "/index.html");
})

app.post("/" , function(req , res){

    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            },

        }],

    }

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/list-id";

    const object = {
        auth: "nitin:api-key",
        method: "POST"
    }

    

    const request = https.request(url, object, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    });

 

    request.write(jsonData);
    request.end();

})

app.listen("3000" , function(){
    console.log("listening to port 3000");
})

