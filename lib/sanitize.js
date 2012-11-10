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
        args = Array.prototype.slice.call(args);
        
	if(typeOf(caller) == "Array") {
		order = caller;
		caller = null;
	} else {
		var argNames = argsOf(caller)
			, sanitized = {};
	}
	
	args.forEach(function(arg, oldIndex) {
		order.some(function(type, newIndex) {
                        var _type;
                        if (typeOf(type) == "Array") {
				if (type.length == 1) _type = typeOf(type[0]);
				if (type.length == 2) _type = type[0];
			} else {
				_type = type;
			}
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
                if (typeOf(type) == "Array") {
                    if (type.length == 1) args[newIndex] = type[0];
                    if (type.length == 2) args[newIndex] = type[1];
                    if (caller) sanitized[argNames[newIndex]] = args[newIndex];
                }
            })
        }
	
	return caller ? sanitized : args;
}