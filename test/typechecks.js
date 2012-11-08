// Require the lib
var sanitize = require("../")
	, typeOf = sanitize.typeOf
	, nameOf = sanitize.nameOf
	, argsOf = sanitize.argsOf
	, argumentsOf = sanitize.argumentsOf;

describe("typeOf(obj)", function() {
	describe("String", function() {
		it("should return 'String' when obj is a String", function() {
			typeOf("").should.equal("String");
		});
	});
	
	describe("Number", function() {
		it("should return 'Number' when obj is a Number", function() {
			typeOf(0).should.equal("Number");
			typeOf(1).should.equal("Number");
			typeOf(-1).should.equal("Number");
			typeOf(1.5).should.equal("Number");
			typeOf(0xFF).should.equal("Number");
			typeOf(3.45e2).should.equal("Number");
			typeOf(NaN).should.equal("Number");
			typeOf(Infinity).should.equal("Number");
		});
	});
	
	describe("Boolean", function() {
		it("should return 'Boolean' when obj is a Boolean", function() {
			typeOf(false).should.equal("Boolean");
			typeOf(true).should.equal("Boolean");
		});
	});
	
	describe("Object", function() {
		it("should return 'Object' when obj is an Object", function() {
			typeOf({}).should.equal("Object");
		});
	});
	
	describe("Array", function() {
		it("should return 'Array' when obj is an Array", function() {
			typeOf([]).should.equal("Array");
		});
	});
	
	describe("Null", function() {
		it("should return 'Null' when obj is a Null", function() {
			typeOf(null).should.equal("Null");
		});
	});
	
	describe("Undefined", function() {
		it("should return 'Undefined' when obj is undefined", function() {
			typeOf(undefined).should.equal("Undefined");
			typeOf().should.equal("Undefined");
		});
	});
	
	describe("RegExp", function() {
		it("should return 'RegExp' when obj is a regular expression", function() {
			typeOf(/.+/).should.equal("RegExp");
		});
	});
	
	describe("Date", function() {
		it("should return 'Date' when obj is a Date", function() {
			typeOf(new Date).should.equal("Date");
		});
	});
});

describe("nameOf(fun)", function() {
	it("should return the name of the function fun or false", function() {
		nameOf(function test(a, b, c) {}).should.equal("test");
		nameOf(function test() { return 0; }).should.equal("test");
		nameOf(function (a, b, c) {}).should.equal("");
		nameOf(function() {}).should.equal("");
		nameOf(1337).should.equal(false);
	});
});

describe("argsOf(fun)", function() {
	it("should return an array of the expected arguments of function fun or false", function() {
		["a", "b", "c"].should.equal(["a", "b", "c"]);
		// argsOf(function test(a, b, c) {}).should.equal(["a", "b", "c"]);
		argsOf(function test() { return 0; }).should.equal([]);
		// argsOf(function (a, b, c) {}).should.equal(["a", "b", "c"]);
		argsOf(function() {}).should.equal([]);
		argsOf(1337).should.equal(false);
	});
});