const crypto = require('crypto');

module.exports = function() {
    let bytes = crypto.randomBytes(8);
    return bytes.toString("hex");
}