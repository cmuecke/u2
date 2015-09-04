/* eslint-env: node */

var _ = require('lodash'),
    router = require('express').Router(),
    shopData = require('../mock-data/shop'),
    productData = {
        'jack-wolfskin-jacket': require('../mock-data/products/jack-wolfskin-jacket'),
        'leatherman-tool': require('../mock-data/products/leatherman-tool'),
        'eureka-el-capitan': require('../mock-data/products/eureka-el-capitan')
    };

module.exports = (function () {
    'use strict';

    router.get('/:name', function (req, res) {
        res.render('product', _.extend(shopData, productData[req.params.name]));
    });

    return router;
}());
