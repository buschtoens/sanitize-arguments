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
	var _args = [];
	
	if (typeOf(caller) == "Array") {
		order = caller;
		caller = null;
	} else {
		var argNames = argsOf(caller)
			, sanitized = {};
	}
	
	Array.prototype.slice.call(args).forEach(function(arg, oldIndex) {
		order.some(function(type, newIndex) {
			var found = false;
			
			if (Array.isArray(type)) {
				if (type.length == 1 && typeOf(type[0]) == typeOf(arg)) found = true;
				else {
					type.forEach(function(type) {
						if (typeOf(type) == "Function" && typeOf(arg) == nameOf(type)) found = true;
					});
				}
			} else if (typeOf(type) == "Function" && typeOf(arg) == nameOf(type)) {
				found = true;
			}
			
			if (found) {
				_args[newIndex] = arg;
				if(caller) sanitized[argNames[newIndex]] = arg;
				delete order[newIndex]; 
			}
			
			return found;
		});
		
		if (order.length) {
			order.forEach(function(type, newIndex) {
				var def;
				
				if (Array.isArray(type)) {
					def = type[type.length - 1];
					_args[newIndex] = def;
					if(caller) sanitized[argNames[newIndex]] = def;
				}
			});
		}
	});
	
	return caller ? sanitized : _args;
}