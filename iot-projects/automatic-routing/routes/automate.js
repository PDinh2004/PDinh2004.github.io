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
                        var links = populateLinks(resource);
                        res.links(links);
                        req.links = links;
                        req.result = resource;
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

function populateLinks(resource){
        var linkObject = {};
        for (var key in resource){
                var value = resource[key];
                if (typeof value === "object"){
                        var subResource = value;
                        if (subResource.link){
                                linkObject[subResource.name] = subResource.link;
                        }
                }
        }
        
        return linkObject;
}

module.exports = createRouter;
