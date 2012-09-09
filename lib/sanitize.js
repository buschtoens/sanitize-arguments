// Module dependencies
var typechecks = require("./typechecks")
	, typeOf = typechecks.typeOf
	, nameOf = typechecks.nameOf;

// Expose sanitize and typechecks
module.exports = exports = sanitize;
exports.typeOf = typeOf;
exports.nameOf = nameOf;

// Sanitize arguments
function sanitize(args, order) {
	Array.prototype.slice.call(args).forEach(function(arg, oldIndex) {
		order.some(function(type, newIndex) {
			if(typeOf(type) == "Function" && typeOf(arg) == nameOf(type)) {
				args[newIndex] = arg;
				delete order[newIndex];
				return true;
			}
		});
	});
	
	return args;
}