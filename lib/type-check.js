// Expose typechecks
module.exports = exports;
exports.typeOf = typeOf;
exports.nameOf = nameOf;

// Return the type of an object aka safe typeof
function typeOf(o) {
	return Object.prototype.toString.call(o).match(/(\w+)\]/)[1];
}

// Return the name of a function aka class name
function nameOf(o) {
	return typeOf(o) == "Function"
		? Function.prototype.toString.call(o).match(/function (\w+)/)[1]
		: false;
}