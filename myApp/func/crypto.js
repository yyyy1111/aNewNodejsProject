var crypto = require('crypto');
var funoBbj = {
    md5:function(text){
        var md5 = crypto.createHash('md5');
        md5.update(text);
        return md5.digest('hex');
    }
}
module.exports = funoBbj;