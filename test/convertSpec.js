'use strict'

var mockDom

describe('init test', function() {
    beforeEach(function() {
        mockDom()
    })

    it('#test case 1', function() {
        convertToPdf('test_div')
    })
})

mockDom = function() {
    var test_div = document.createElement('div')
    test_div.id = 'test_div'
    test_div.appendChild(document.createElement('table'))
    document.body.appendChild(test_div)
}
