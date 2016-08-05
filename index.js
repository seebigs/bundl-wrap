/**
 * Wrap extension for Bundl
 */

var _template = require('lodash.template');
var fs = require('fs');

function readFile (filepath, bundl) {
    try {
        return fs.readFileSync(filepath);

    } catch (err) {
        if (err.code === 'ENOENT') {
            bundl.log.error('Target file not found at ' + filepath, err.stack);
        } else {
            bundl.log.error(err);
        }

        return '';
    }
}


module.exports = function (options) {
    options = options || {};

    function wrapEach (contents, r) {
        var bundl = this;

        var data = options.data || {};
        data.contents = contents;

        var before = options.before ? _template(options.before)(data) : '';
        var after = options.after ? _template(options.after)(data) : '';

        if (options.file) {
            contents = _template(readFile(options.file, bundl))(data);
        }

        return before + contents + after;
    }

    return {
        each: wrapEach
    };

};
