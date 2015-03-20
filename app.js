var express = require('express');
var multer = require('multer');

var app = express();
var completed = false;

app.use(multer({ dest: './uploads',

	rename: function(fieldname, filename) {
		return filename + Date.now();
	},

	onFileUploadStart: function(file) {
		console.log(file.originalname + '正在上傳…')
	},

	onFileUploadComplete: function(file) {
		console.log(file.originalname + '已上傳至' + file.path);
		completed = true;
	}

}));

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/api/files', function (req, res) {
	if (completed === true) {
		console.log(req.files);
		res.end('File uploaded. Step back to upload more.');
	}
});

app.listen(3000, function() {
	console.log("Magic happens on port 3000");
});