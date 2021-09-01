const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const jsforce = require("jsforce");
const cors = require("cors");
const app = express();

admin.initializeApp();

const {salesforce, mailgun} = functions.config()

const mg = require ("mailgun-js")({apiKey:mailgun.api_key, domain: mailgun.domain});

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 


const cn = new jsforce.Connection({
  loginURL: salesforce.login,
});

cn.login(salesforce.email, salesforce.password+salesforce.token, (err, userInfo) => {
  if(err){
    return console.error(err);
  }

});

app.use(cors({origin: true}));

app.post('/saveUser',(req, res) => {

  console.log(req.body)

  const {FirstName, LastName, Phone, Email} = req.body

  cn.login(salesforce.email, salesforce.password+salesforce.token, (err, userInfo) => {
    if(err){
      return console.error(err);
    }

    cn.sobject("Contact").create({ 
      FirstName : FirstName,
      LastName : LastName,
      Phone : Phone,
      Email : Email,
      AccountId : salesforce.account_id,
      }, function(err, ret) {
      if (err || !ret.success) { 
        return res.send(err) 
      }

      var data = {
        from: mailgun.name + ' <' + mailgun.email + '>',
        to: Email,
        subject: 'Bienvenido',
        template: 'enlabe-dev-firebase',
        'h:X-Mailgun-Variables': JSON.stringify({
          FirstName: FirstName
        })
      };
      
      

      mg.messages().send(data, (error, body) => {
        console.log(body)
        console.log(error)
      })

      res.send(ret);
    });

  });
 
});


exports.app = functions.https.onRequest(app);