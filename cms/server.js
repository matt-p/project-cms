/*************************************************
* Title: GitHub - dlenhart/st-node-express-angular-demo: A simple CRUD app in Node.js/Express/MySQL/Angular
* Author: Lenhart, D
* Date: 2016
* Code version: Not Specified 
* Availability: https://github.com/dlenhart/st-node-express-angular-demo
*************************************************/

//REQUIRES
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var fs = require('fs');
var multer = require('multer');

//STATIC FILES

/*************************************************
* Title: How to get rid of .html extension when serving webpages with node.js? - Stack Overflow
* Author: Read, B
* Date: 2016
* Code version: Not Specified 
* Availability: https://stackoverflow.com/questions/16534545/how-to-get-rid-of-html-extension-when-serving-webpages-with-node-js
*************************************************/
app.use(express.static('public', {
    extensions: ['html', 'htm']
})); 
app.use(bodyParser.json());

//FILE SETTINGS CONFIGURATION
app.use(function(req, res, next) { 
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*************************************************
* Title: File Upload with AngularJS and NodeJS | CipherTrick source code
* Author: Shaikh, R
* Date: 2015
* Code version: Not Specified 
* Availability: https://ciphertrick.com/2015/12/07/file-upload-with-angularjs-and-nodejs/
*************************************************/
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { cb(null, './public/uploads/'); },
    filename: function (req, file, cb) { cb(null, file.originalname); }
});
var upload = multer({ storage: storage }).single('file');

var conf_host = "localhost";
var conf_user = "root";
var conf_pass = "";
var conf_db = "cms_db_ang";
var conf_port = "3306";

//DATABASE SETTINGS
var pool = mysql.createPool({
	host     : conf_host,
	user     : conf_user,
	password : conf_pass,
	database : conf_db,
	port : conf_port
});

//TEST CONNECTION
pool.getConnection(function (err, connection) {
	if (!err) {
		console.log("[DB Connected]");
		connection.release();
	} else { console.log("[DB Error]"); }
	console.log("[DB Released]");
});

//ROOT (Loads Angular App)
app.get('/', function (req, res) { res.sendFile( __dirname + "/" + "index.html" ); });

app.get('/api/sys', function (req, res) {
    var data = { 
        "host"     : conf_host,
        "user"     : conf_user,
        "database" : conf_db,
    };
    res.json(data);
});

/*** ----------------- LOGIN ----------------- ***/

app.post('/api/auth', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var data = { "error": 1, "user": "" };
	console.log('Login Requested');
    if (!!name && !!password) {
		pool.getConnection(function (err, connection) {
			connection.query("SELECT * from users WHERE name = ? and password = ?",[name, password], function (err, rows, fields) {
				if (rows.length !== 0 && !err) { 
                    data["error"] = 0;
					data["user"] = rows;                    
					console.log("'" + [name] + "' Has Logged In");
                    res.json(data);
                    
				} else {
                    data["user"] = "Error Finding data";
					console.log("Login Error :" + err);
                    res.json(data);
				}
			});
        });
    } else {
        data["user"] = "Please provide all required data";
        res.json(data);
    }
});

/*** ------------- USERS --------------------- ***/

//GET USERS
app.get('/api/list', function (req, res) {
	console.log("Retrieving All Users");
	var data = { "error": 1, "users": "" };
	pool.getConnection(function (err, connection) {
        connection.query('SELECT * from users', function (err, rows, fields) {
            connection.release();
            if (rows.length !== 0 && !err) {
                data["error"] = 0;
                data["users"] = rows;
                res.json(data);
            } else if (rows.length === 0) {
                data["error"] = 2;
                data["users"] = 'No users Found..';
                res.json(data);
            } else {
                data["users"] = 'error while performing query';
                res.json(data);
                console.log('Error while performing Query: ' + err);
            }
        });
	});
});

//EDIT USER
app.put('/api/update', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var password = req.body.password;
    var type = req.body.type;
    var data = { "error": 1, "user": "" };
	console.log('Edit Requested On User (' + id + ')');
    if (!!id && !!name && !!password && !!type) {
		pool.getConnection(function (err, connection) {
			connection.query("UPDATE users SET name = ?, password = ?, type = ? WHERE id=?",[name, password, type, id], function (err, rows, fields) {
				if (!!err) {
					data["user"] = "Error Updating data";
					console.log(err);
				} else {
					data["error"] = 0;
					data["user"] = "Updated user Successfully";
					console.log("Updated User (" + id + ")");
				} res.json(data);
			});
		});
    } else {
        data["user"] = "Please provide all required data";
        res.json(data);
    }
});

//GET USER DETAILS
app.get('/api/list/:id', function (req, res) {
	var id = req.params.id;
	var data = { "error": 1, "user": "" };
	console.log("Retrieving Data On User (" + id  + ")");
	pool.getConnection(function (err, connection) {
		connection.query('SELECT * from users WHERE id = ?', id, function (err, rows, fields) {
			connection.release();
			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["user"] = rows;
				res.json(data);
			} else {
				data["user"] = 'No user Found..';
				res.json(data);
				console.log('Error while performing Query: ' + err);
			}
		});
	});
});

//ADD USER
app.post('/api/insert', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var type = req.body.type;
    var data = { "error": 1, "users": "" };
	console.log('Add User Requested');
    if (!!name && !!password && !!type) {
		pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO users SET name = ?, password = ?, type = ?",[name, password, type], function (err, rows, fields) {
				if (!!err) {
					data["users"] = "Error Adding data";
					console.log(err);
				} else {
					data["error"] = 0;
					data["users"] = "User Added Successfully";
					console.log("Added User (" + name + ")");
				} res.json(data);
			});
        });
    } else {
        data["users"] = "Please provide all required data";
        res.json(data);
    }
});

//DELETE USER
app.post('/api/delete', function (req, res) {
    var id = req.body.id;
    var data = { "error": 1, "user": "" };
	console.log('Removing User On (' + id + ')');
    if (!!id) {
		pool.getConnection(function (err, connection) {
			connection.query("DELETE FROM users WHERE id=?",[id],function (err, rows, fields) {
				if (!!err) {
					data["user"] = "Error deleting data";
					console.log(err);
				} else {
					data["user"] = 0;
					data["user"] = "Delete user Successfully";
					console.log("Deleted User (" + id + ")");
				} res.json(data);
			});
		});
    } else {
        data["user"] = "Please provide all required data (i.e : id ) & must be a integer";
        res.json(data);
    }
});

/*** ------------- FIELDS --------------------- ***/

//GET FIELDS
app.get('/api/fieldlist', function (req, res) {
	console.log("Retrieving All Fields");
	var data = { "error": 1, "fields": "" };
	pool.getConnection(function (err, connection) {
        connection.query('SELECT * from fields', function (err, rows, fields) {
            connection.release();
            if (rows.length !== 0 && !err) {
                data["error"] = 0;
                data["fields"] = rows;
                res.json(data);
            } else if (rows.length === 0) {
                data["error"] = 2;
                data["fields"] = 'No fields Found..';
                res.json(data);
            } else {
                data["fields"] = 'error while performing query';
                res.json(data);
                console.log('Error while performing Query: ' + err);
            }
        });
	});
});

//EDIT FIELD
app.put('/api/fieldupdate', function (req, res) {
    var id = req.body.id;
    var field_name = req.body.field_name;
    var field_type = req.body.field_type;
    var field_value = req.body.field_value;
    var old_value = req.body.old_value;
    var data = { "error": 1, "field": "" };
	console.log('Edit Requested On Field (' + id + ')');
    if (!!id && !!field_name && !!field_type && !!field_value) {
		pool.getConnection(function (err, connection) {
			connection.query("UPDATE fields SET field_name = ?, field_type = ?, field_value = ? WHERE id=?",[field_name, field_type, field_value, id], function (err, rows, fields) {
				if (!!err) { console.log(err); } else {
                    if(field_type == 'Image') { fs.unlinkSync(__dirname + "\\public\\uploads\\" + old_value); } 
                    else if(field_type == 'Audio') { fs.unlinkSync(__dirname + "\\public\\uploads\\" + old_value); }
                    else if(field_type == 'Video') { fs.unlinkSync(__dirname + "\\public\\uploads\\" + old_value); }
                    data["error"] = 0;
                    console.log("Field Updated On (" + id + ")");
				} res.json(data);
			});
		});
    } else {
        data["field"] = "Please provide all required data";
        res.json(data);
    }
});

//GET FIELD DETAILS
app.get('/api/fieldlist/:id', function (req, res) {
	var id = req.params.id;
	var data = { "error": 1, "field": "" };
	console.log("Retrieving Data On User (" + id  + ")");
	pool.getConnection(function (err, connection) {
		connection.query('SELECT * from fields WHERE id = ?', id, function (err, rows, fields) {
			connection.release();
			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["field"] = rows;
			} else {
				data["field"] = 'No field Found..';
				console.log('Error while performing Query: ' + err);
			} res.json(data);
		});
	});
});

//ADD FIELD
app.post('/api/fieldinsert', function (req, res) {
    var field_name = req.body.field_name;
    var field_type = req.body.field_type;
    var field_value = req.body.field_value;
    var data = { "error": 1, "fields": "" };
    console.log("Add Field Requested");
    if (!!field_name && !!field_type) {
		pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO fields SET field_name = ?, field_type = ?, field_value = ?",[field_name, field_type, field_value], function (err, rows, fields) {
				if (!!err) { console.log(err); } else {
					data["error"] = 0;
					console.log("Added Field (" + field_name + ")");
				} res.json(data);
			});
        });
    } else { res.json(data); }
});

//ADD FILE
app.post('/upload', function(req, res) {
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
            console.log("Added File");
        } res.json({error_code:0,err_desc:null});
    });
});

//DELETE FIELD
app.post('/api/fielddelete', function (req, res) {
    var id = req.body.id;
    var field_type = req.body.field_type;
    var field_value = req.body.field_value;
    var data = { "error": 1, "field": "" };
	console.log('Removing User On (' + id + ')');
    if (!!id) {
		pool.getConnection(function (err, connection) {
			connection.query("DELETE FROM fields WHERE id=?",[id],function (err, rows, fields) {
				if (!!err) { console.log(err); } else {
                    if(field_type == 'Image') { fs.unlinkSync(__dirname + "\\public\\uploads\\" + field_value); } 
                    else if(field_type == 'Audio') { fs.unlinkSync(__dirname + "\\public\\uploads\\" + field_value); } 
                    else if(field_type == 'Video') { fs.unlinkSync(__dirname + "\\public\\uploads\\" + field_value); } 
                    data["error"] = 0;
                    console.log("Deletion Successful");
				} res.json(data);
			});
		});
    } else { res.json(data); }
});

/*** ------------- PAGES --------------------- ***/

//GET PAGES
app.get('/api/pagelist', function (req, res) {
	console.log("Retrieving All Pages");
	var data = { "error": 1, "pages": "" };
	pool.getConnection(function (err, connection) {
        connection.query('SELECT * from pages', function (err, rows, fields) {
            connection.release();
            if (rows.length !== 0 && !err) {
                data["error"] = 0;
                data["pages"] = rows;
            } else if (rows.length === 0) {
                data["error"] = 2;
                data["pages"] = 'No fields Found..';
            } else {
                data["pages"] = 'error while performing query';
                console.log('Error while performing Query: ' + err);
            } res.json(data);
        });
	});
});

//EDIT PAGE
app.put('/api/pageupdate', function (req, res) {
    var id = req.body.id;
    var page_name = req.body.page_name;
    var page_file = req.body.page_file;
    var file_content = req.body.file_content;
    var data = { "error": 1, "page": "" };        
	console.log('Edit Requested On Page (' + id + ')');
    if (!!id && !!page_name) {
		pool.getConnection(function (err, connection) {
			connection.query("UPDATE pages SET page_name = ?, page_file = ? WHERE id=?",[page_name, page_name + ".html", id], function (err, rows, fields) {
				if (!!err) {
					data["page"] = "Error Updating data";
					console.log(err);
				} else {
					data["error"] = 0;
					data["page"] = "Updated page Successfully";
                    fs.writeFile('../cms/public/' + page_name + '.html', file_content, function (err) {
                        if (err) { return console.log(err); }
                        console.log('Replacement Successful (' + page_name + '.html)');
                    });        
					console.log("Update Successful");
				} res.json(data);
			});
		});
    } else {
        data["page"] = "Please provide all required data";
        res.json(data);
    }
});

//GET PAGE DETAILS
app.get('/api/pagelist/:id', function (req, res) {
	var id = req.params.id;
	var data = { "error": 1, "page": "" };
	var file_data = { "file": "" }
	console.log("Retrieving Data On Page (" + id  + ")");
	pool.getConnection(function (err, connection) {
		connection.query('SELECT * from pages WHERE id = ?', id, function (err, rows, fields) {
			connection.release();
			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["page"] = rows;
                fs.readFile('../cms/public/' + data.page[0].page_name + '.html', 'utf8', function (err,content) {
                    if (err) { return console.log(err); }
                    file_data["file"] = content;
                    res.json({ data: data, file_data : file_data });
                });				
			} else {
				data["page"] = 'No page Found..';
				res.json(data);
				console.log('Error while performing Query: ' + err);
			}
		});
	});
});

//ADD PAGE
app.post('/api/pageinsert', function (req, res) {
    var page_name = req.body.page_name;
    var page_file = req.body.page_file;
    var data = { "error": 1, "pages": "" };
	console.log("Add Page Requested");
    if (!!page_name) {
		pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO pages SET page_name = ?, page_file = ?",[page_name, page_name + ".html"], function (err, rows, fields) {
				if (!!err) {
					data["pages"] = "Error Adding data";
					console.log(err);
				} else {
					data["error"] = 0;
					data["pages"] = "User Added Successfully";
					console.log("Added: " + [page_name, page_name] + ".html");
				} res.json(data);
			});          
            fs.writeFile('../cms/public/' + page_name + '.html', '<!DOCTYPE html><html><head></head><body></body></html>', (err) => {
                if (err) {
                    console.error(err)
                    return
                } console.log("Added Field (" + page_name + ".html)");
            })
        });
    } else {
        data["pages"] = "Please provide all required data";
        res.json(data);
    }
});

//DELETE 
app.post('/api/pagedelete', function (req, res) {
    var id = req.body.id;
    var page_name = req.body.page_name;
    var data = { "error": 1, "page": "" };
	console.log('Removing Page On (' + id + ')');
    if (!!id) {
		pool.getConnection(function (err, connection) {
			connection.query("DELETE FROM pages WHERE id=?",[id],function (err, rows, fields) {
				if (!!err) {
					data["page"] = "Error deleting data";
					console.log(err);
				} else {
					data["page"] = 0;
					data["page"] = "Deletion Successfull";
					console.log("Deleted: " + id);
				} res.json(data);
			});
            fs.unlink('../cms/public/' + page_name + '.html', function (err) {
                if (err) { 
                    console.error(err) 
                    return 
                }
            });
		});
    } else {
        data["page"] = "Please provide all required data (i.e : id ) & must be a integer";
        res.json(data);
    }
});

/*** ------- END ------------ ***/
var server = app.listen(8081, function () { console.log("App @: " + server.address().address + " (" + server.address().port + ")"); })