var wrap = require('../../index.js');

function mockContents(c) {
    var _c = c;
    return {
        getHash: function () {
            return void 0;
        },
        getString: function () {
            return _c;
        },
        set: function (newC) {
            _c = newC;
        },
    };
}

describe('wrap', function () {

    describe('before and after', function (expect) {
        var w = wrap({
            data: { a:1, b:2 },
            before: 'before{{a}}',
            after: '{{b}}after',
        });
        var r = { contents: mockContents(' contents ') };
        w.exec(r);
        expect(r.contents.getString()).toBe('before1 contents 2after');
    });

    describe('external template file', function (expect) {
        var w = wrap({
            data: { a:1, b:2 },
            file: __dirname + '/../fixture/template.txt',
        });
        var r = { contents: mockContents('contents') };
        w.exec(r);
        expect(r.contents.getString()).toBe('up here 1\ncontents\ndown here 2\n');
    });

});
