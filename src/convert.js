/*
    Helper Functions to convert html elements to pdf
 */

'use strict'

//Define global functions
var parseElement, parseContainer, computeStyle, parseHTML, createParagraph, fixTables, fixRowSpan, fixColSpan, dfs_table,
    convertToPdf

parseElement =  function(cnt, e, p, styles) {
    if (!styles) {
        styles = []
    }
    var k
    if (e.getAttribute) {
        var nodeStyle = e.getAttribute('style')
        if (nodeStyle) {
            var ns = nodeStyle.split(';')
            for (k = 0; k < ns.length; k++) {
                styles.push(ns[k])
            }
        }
    }
    switch (e.nodeName.toLowerCase()) {
        case '#text':
            var t = {
                text: e.textContent.replace(/\n/g, '')
            }
            if (styles) {
                computeStyle(t, styles)
            }
            p.text.push(t)
            break
        case 'b':
        case 'strong':
            parseContainer(cnt, e, p, styles.concat(['font-weight:bold']))
            break
        case 'u':
            parseContainer(cnt, e, p, styles.concat(['text-decoration:underline']))
            break
        case 'i':
            parseContainer(cnt, e, p, styles.concat(['font-style:italic']))
            break
        case 'span':
            parseContainer(cnt, e, p, styles)
            break
        case 'br':
            p = createParagraph()
            cnt.push(p)
            break
        case 'table':
            t = {
                table: {
                    widths: [],
                    body: []
                }
            }
            parseContainer(t.table.body, e, p, styles)
            for (k = 0; k < 3; k++) {
                t.table.widths.push('*')
            }
            cnt.push(t)
            break
        case 'tbody':
            parseContainer(cnt, e, p, styles)
            break
        case 'tr':
            var row = [];
            parseContainer(row, e, p, styles)
            cnt.push(row)
            break
        case 'td':
            p = createParagraph()
            var st = {
                stack: []
            }
            st.stack.push(p)
            var rspan = e.getAttribute('rowspan')
            if (rspan) {
                st.rowSpan = parseInt(rspan)
            }
            var cspan = e.getAttribute('colspan')
            if (cspan) {
                st.colSpan = parseInt(cspan)
            }
            st.alignment = 'center'
            parseContainer(st.stack, e, p, styles)
            cnt.push(st)
            break
        case 'div':
        case 'p':
            p = createParagraph()
            st = {
                stack: [],
                alignment:'justify',
                margin: [0,12,0,0]
            }
            st.stack.push(p)
            computeStyle(st, styles)
            parseContainer(st.stack, e, p)
            cnt.push(st)
            break
        default:
            break
    }
    return p
}


parseContainer = function(cnt, e, p, styles) {
    var elements = []
    var children = e.childNodes
    var i
    if (children.length !== 0) {
        for (i = 0; i < children.length; i++) {
            p = parseElement(elements, children[i], p, styles)
        }
    }
    if (elements.length !== 0) {
        for (i = 0; i < elements.length; i++) {
            cnt.push(elements[i])
        }
    }
    return p
}

computeStyle = function(o, styles) {
    for (var i = 0; i < styles.length; i++) {
        var st = styles[i].trim().toLowerCase().split(':')
        if (st.length === 2) {
            switch (st[0]) {
                case 'font-size':
                    o.fontSize = 12
                    break
                case 'text-align':
                    switch (st[1]) {
                        case 'right':
                            o.alignment = 'right'
                            break
                        case 'center':
                            o.alignment = 'center'
                            break
                    }
                    break
                case 'font-weight':
                    switch (st[1]) {
                        case 'bold':
                            o.bold = true
                            break
                    }
                    break
                case 'text-decoration':
                    switch (st[1]) {
                        case 'underline':
                            o.decoration = 'underline'
                            break
                    }
                    break
                case 'font-style':
                    switch (st[1]) {
                        case 'italic':
                            o.italics = true
                            break
                    }
                    break
            }
        }
    }
}

convertToPdf = function(id) {
    var content = []
    parseHTML(content, document.getElementById(id).outerHTML)
    fixTables(content)
    return pdfMake.createPdf({
        content: content,
        pageSize: 'LETTER',
        pageMargins: [ 20, 40, 20, 20 ],
        styles: {
            header: {
                fontSize: 22,
                bold: true,
            }
        }
    })
}

parseHTML = function(cnt, htmlText) {
    var html = $(htmlText.replace(/\t/g, '').replace(/\n/g, '').replace(/\s\s+/g, ' '))
    var p = createParagraph()
    for (var i = 0; i < html.length; i++) {
        parseElement(cnt, html.get(i), p)
    }
}

createParagraph = function() {
    var p = {
        text: []
    }
    return p
}

fixTables = function(data) {
    var table_objects = []
    dfs_table(table_objects, data)
    for(var i = 0; i < table_objects.length; i++) {
        fixColSpan(table_objects[i])
        fixRowSpan((table_objects[i]))
    }
}

dfs_table = function(table_objects, data) {
    for(var i = 0; i < data.length; i++) {
        if(data[i].table !== undefined) {
            table_objects.push(data[i].table)
        }
        if(data[i].stack !== undefined) {
            dfs_table(table_objects,data[i].stack)
        }
    }
}

fixRowSpan = function(table) {
    var i,j,t
    for(i = 0; i < table.body.length; i++) {
        for(j = 0; j < table.body[i].length; j++) {
            if(table.body[i][j].rowSpan !== undefined && table.body[i][j].rowSpan > 1) {
                for(t = 0; t < table.body[i][j].rowSpan - 1; t++) {
                    table.body[i+t+1].splice(j, 0, {})
                }
            }
        }
    }
}

fixColSpan = function(table) {
    var i,j,t
    for(i = 0; i < table.body.length; i++) {
        for(j = 0; j < table.body[i].length; j++) {
            if(table.body[i][j].colSpan !== undefined && table.body[i][j].colSpan > 1) {
                if(j === table.body[i].length - 1) {
                    for(t = 0; t < table.body[i][j].colSpan - 1; t++) {
                        table.body[i].push({})
                    }
                } else {
                    for(t = 0; t < table.body[i][j].colSpan - 1; t++) {
                        table.body[i].splice(j+1, 0, {})
                    }
                }
            }
        }
    }
}



