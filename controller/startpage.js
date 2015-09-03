/* eslint-env: node */
var _ = require('lodash'),
    router = require('express').Router(),
    shopData = require('../mock-data/shop'),
    startpageData = require('../mock-data/startpage'),
    productData = [
        require('../mock-data/products/jack-wolfskin-jacket'),
        require('../mock-data/products/leatherman-tool'),
        require('../mock-data/products/eureka-el-capitan')
    ];

module.exports = (function () {
    'use strict';

    router.get('/', function (req, res) {
        res.render('index', _.extend(shopData, startpageData, {'products': productData}));
    });

    return router;
}());
