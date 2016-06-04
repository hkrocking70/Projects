var crypto = require('crypto');

var secret = 'abcdefg';

module.exports = function (request) {
    return {
        result: crypto.createHmac('sha256', secret).update(request).digest('hex')
    }
}