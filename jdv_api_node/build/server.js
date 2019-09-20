"use strict";
var express = require('express');
var app = express();
app.listen(process.env.PORT || 3000, function () {
    console.log('Server started');
});
app.get('/teste', function () {
    console.log('funfo karai235');
});
