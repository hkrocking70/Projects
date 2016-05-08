var url = require('url');

module.exports = function (request) {
	return {
		query : url.parse(request, true).query.folder,
		ytd: url.parse(request, true).query.v
	}
}