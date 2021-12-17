const express = require('express');

function createRouter(root){
        route = express.Router();
        console.log("Automate is closer to working!");
        generateRoute(route, root);
        return route;
};

function generateRoute(router, resource){
        if (resource.link){
                router.route(resource.link).get(function (req, res, next){
                        var links = {};
                        res.links(links);
                        req.links = links;
                        req.result = links;
                        next();
                });
                
                for (var key in resource){
                        var value = resource[key];
                        if (typeof value === "object"){
                                generateRoute(router, value);
                        }
                }
        }
       
};

module.exports = createRouter;
