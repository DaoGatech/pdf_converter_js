//Download whole page
$('#whole-page-btn').click(function() {
    convertToPdf('body-element').download()
})

//Download just table element
$('#table-btn').click(function() {
    convertToPdf('table-element').download()
})

