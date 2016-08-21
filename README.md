# pdf_converter_js

## Description
* Author: Thong Dao
* This javascript helps convert any html element to pdf.

## Installation
* Install pdfmake via bower

```
bower install pdfmake --save
```

## Usage
Set onclick function to a button or an input with this line
```
convertToPdf(id).download()
```
* Where **id** is the id of HTML element.

See Examples for more details

##Examples
To run the example, clone the project and **cd** to example folder. Then run:

```
python -m SimpleHTTPServer 8000
```

Open any browser and run ***localost:8000*** to see the example

##Tests

```
grunt test
```
* **grunt-test** will execute jshint to check style and karma to run the unit tests

```
grunt unit-test
```

* **grunt unit-test** will only execute the unit tests


