var express = require("express");
var sequelize = require("sequelize");
var bodyParser = require("body-parser");
var path = require('path');
var Tasks = require("./models/tasks.js");

var app = module.exports = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
	res.render("index", {});
});

app.get("/api/tasks", function (req, res) {
	Tasks.findAll()
		.then(function (tasks) {
		res.json(tasks);
	}).error(function (err) {
		res.json(err);
	});
});

app.get("/api/tasks/:id", function (req, res) {
	Tasks.find({
		where: {
			id: req.params.id
		}
	}).then(function (task) {
		res.json(task);
	}).error(function (err) {
		res.json(err);
	});
});

app.post("/api/tasks/", function (req, res) {
	Tasks.create({
		text: req.body.text
	}).then(function (task) {
		res.json(task, 201);
	}).error(function (err) {
		res.json(err);
	});
});

app.put("/api/tasks/:id", function (req, res) {
	Tasks.find({
		where: {
			id: req.params.id
		}
	}).then(function (task) {
		if (task) {
			task.updateAttributes({
				text: req.body.text
			}).success(function () {
				res.json(200);
			});
		}
	});
});

app.delete("/api/tasks/:id", function (req, res) {
	Tasks.find({
		where: {
			id: req.params.id
		}
	}).then(function (task) {
		if (task) {
			task.destroy().then(function () {
				res.send();
			});
		}
	});
});


console.log("server running on port 3000...");
app.listen(3000);
