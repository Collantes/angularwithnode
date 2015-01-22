// app/routes.js
//require("../config/connect.js");
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var jwt      = require("jsonwebtoken");
module.exports = function(app) {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.post('/api/login', function(req, res) {
        
        var input = JSON.parse(JSON.stringify(req.body.customer));
        var email = input.email;
        var password = input.password;
//        var data = {
//            company_id: id,
//            labor_type: input.labor_type,
//            labor_name: input.labor_name,
//            labor_unit: input.labor_unit,
//            labor_rate: input.labor_rate
//
//        };
        
       // console.log(email+'======'+password);
        connection.query("SELECT * FROM admins WHERE email = '"+email+"' AND password = '"+password+"'", function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
                res.set('Content-Type','application/json');
                //rows.status= 'success';
                if(rows.length > 0){
                    rows.token = jwt.sign(rows, process.env.JWT_SECRET);
                    console.log(rows);
                    res.send(rows);
            }
            else{
                var jsonArray = {"message":"Invalid Username or password","status":"error"};
                res.send(jsonArray);
            }
                
                
             // load the index.ejs file
            // if the user is found but the password is wrong
        });
    });
    app.get('/api/laborList/:id', function(req, res) {
        var id = req.params.id;
        connection.query('SELECT * FROM  labor_prices WHERE company_id = '+id+' order by id desc limit 0,2000', function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
                res.set('Content-Type','application/json');
                res.send(rows);
                //console.log("Data List ", rows);
             // load the index.ejs file
            // if the user is found but the password is wrong
        });
    });
    app.get('/api/laborDetail/:id', function(req, res) {
        var id = req.params.id;
        connection.query('SELECT * FROM  labor_prices WHERE id = '+id+'', function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
                res.set('Content-Type','application/json');
                res.send(rows);
             // load the index.ejs file
            // if the user is found but the password is wrong
        });
    });
    app.post('/api/addlaborDetail', function(req, res){
         var input = JSON.parse(JSON.stringify(req.body));
       
        var data = {
            company_id: 1,
            labor_type: input.labor_type.id,
            labor_name: input.labor_name,
            labor_unit: input.labor_unit.id,
            labor_rate: input.labor_rate

        };
        connection.query("INSERT INTO labor_prices set ? ", data, function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
                res.set('Content-Type','application/json');
                //rows.status= 'success';
                var jsonArray = {"message":"Added Successfully","status":"success","insertedId":rows.insertId};
                res.send(jsonArray);
         });
    });
     app.post('/api/editlaborDetail', function(req, res){
         var input = JSON.parse(JSON.stringify(req.body));
        if(input.labor_type > 0){
            
            labor_type = input.labor_type;
        }
        else
        {
            labor_type = input.labor_type.id;
        }
        if(input.labor_unit > 0){
            
            labor_unit = input.labor_unit;
        }
        else
        {
            labor_unit = input.labor_unit.id;
        }
        var data = {
            company_id: 1,
            labor_type: labor_type,
            labor_name: input.labor_name,
            labor_unit: labor_unit,
            labor_rate: input.labor_rate

        };
        connection.query("UPDATE labor_prices set ? WHERE id = ? ", [data,input.id], function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
                res.set('Content-Type','application/json');
                var jsonArray = {"message":"Edit Successfully","status":"success"};
                res.send(jsonArray);
         });
    });
    app.get('/api/deletelaborDetail/:id', function(req, res){
         var id = req.params.id;
        connection.query("DELETE FROM labor_prices  WHERE id = ? ", [id], function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
                res.set('Content-Type','application/json');
                var jsonArray = {"message":"Delete Successfully","status":"success"};
                res.send(jsonArray);
         });
    });
    app.get('/api/getCompanyInfo', function(req, res) {
        var id = req.params.id;
        connection.query('SELECT * FROM  installation_companies order by id desc', function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
             res.set('Content-Type','application/json');
             res.send(rows);
            
        });
    });
};
