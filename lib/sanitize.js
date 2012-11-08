// Module dependencies
var typechecks = require("./typechecks")
	, typeOf = typechecks.typeOf
	, nameOf = typechecks.nameOf
	, argsOf = typechecks.argsOf;

// Expose sanitize and typechecks
module.exports = exports = sanitize;
exports.typeOf = typeOf;
exports.nameOf = nameOf;
exports.argsOf = argsOf;
exports.argumentsOf = argsOf;

// Sanitize arguments
function sanitize(args, caller, order) {
	if(typeOf(caller) == "Array") {
		order = caller;
		caller = null;
	} else {
		var argNames = argsOf(caller)
			, sanitized = {};
	}
	
	Array.prototype.slice.call(args).forEach(function(arg, oldIndex) {
		order.some(function(type, newIndex) {
                        var _type = typeOf(type) == "Array" ? type[0] : type;
                        
			if(typeOf(_type) == "Function" && typeOf(arg) == nameOf(_type)) {
				args[newIndex] = arg;
				if(caller) sanitized[argNames[newIndex]] = arg;
				delete order[newIndex];
				return true;
			}
		});
	});
        
        if (order.length) {
            order.forEach(function(type, newIndex) {
                if (typeOf(type) == "Array" && type[1]) {
                    args[newIndex] = type[1];
                    if(caller) sanitized[argNames[newIndex]] = type[1];
                }
            })
        }
	
	return caller ? sanitized : args;
}