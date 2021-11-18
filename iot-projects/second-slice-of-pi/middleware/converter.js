const json2html = require('node-json2html');

module.exports = function() {
	return function (req, res, next) {
		// TODO 2: Create the converter function
		if (req.result) { 
		        res.send(req.result); 
		};
		
		next();
		
		if (req.accepts('html')){
		        let transform = {'<>': 'div', 'html': [
                            {'<>': 'p', 'html': [
                                {'<>': 'b', 'html': 'Name: '},
                                {'<>': 'p', 'html': '${name}'}
                            ]},
                            {'<>': 'p', 'html': [
                                {'<>': 'b', 'html': 'Description: '},
                                {'<>': 'p', 'html': '${description}'}
                            ]},
                            {'<>': 'p', 'html': [
                                {'<>': 'b', 'html': 'Value: '},
                                {'<>': 'p', 'html': '${value}'}
                            ]}
                        ]};
                        res.send(json2html.transform(req.result, transform));
		}
	};
};
