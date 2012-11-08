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
			if(typeOf(type) == "Function" && typeOf(arg) == nameOf(type)) {
				args[newIndex] = arg;
				if(caller) sanitized[argNames[newIndex]] = arg;
				delete order[newIndex];
				return true;
			}
		});
	});
	
	return caller ? sanitized : args;
}