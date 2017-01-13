
var wrap = require('../../index.js');

describe('wrap', function () {

    describe('before and after', function (expect) {
        var w = wrap({
            data: { a:1, b:2 },
            before: 'before<%= a %>',
            after: '<%= b %>after'
        });
        expect(w.one(' contents ')).toBe('before1 contents 2after');
    });

    describe('external template file', function (expect) {
        var w = wrap({
            data: { a:1, b:2 },
            file: __dirname + '/../fixture/template.txt'
        });
        expect(w.one('contents')).toBe('up here 1\ncontents\ndown here 2\n');
    });

});
