var fs = require('fs');
var path = require('path');
var file_path = path.resolve(path.dirname(__dirname), 'data/posts.json');

module.exports = {
	getAll: function() {
		return JSON.parse(fs.readFileSync(file_path, 'utf8'));
	},
};