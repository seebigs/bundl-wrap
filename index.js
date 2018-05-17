/**
 * Wrap extension for Bundl
 */

var easybars = require('easybars');
var fs = require('fs');

function readFile (filepath, bundl) {
    try {
        return fs.readFileSync(filepath, 'utf8');

    } catch (err) {
        var logError = bundl.log ? bundl.log.error : console.log;
        if (err.code === 'ENOENT') {
            logError('Target file not found at ' + filepath, err.stack);
        } else {
            logError(err);
        }

        return '';
    }
}


module.exports = function (opt, _data) {
    var options = {};

    if (typeof opt === 'string') {
        options.template = opt;
    } else {
        Object.assign(options, opt);
    }

    function wrap (r) {
        var bundl = this;

        var data = _data || options.data || {};
        var str = r.contents.getString();
        data.___ = str;

        var before = options.before ? easybars(options.before, data) : '';
        var after = options.after ? easybars(options.after, data) : '';

        if (options.file) {
            options.template = readFile(options.file, bundl);
        }

        if (options.template) {
            str = easybars(options.template, data);
        }

        r.contents.set(before + str + after);

        return r;
    }

    return {
        name: 'wrap',
        stage: 'stringy',
        exec: wrap,
    };

};
