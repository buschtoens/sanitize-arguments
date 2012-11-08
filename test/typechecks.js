// Require the lib
var sanitize = require("../")
	, typeOf = sanitize.typeOf
	, nameOf = sanitize.nameOf
	, argsOf = sanitize.argsOf
	, argumentsOf = sanitize.argumentsOf;

describe("typeOf(obj)", function() {
	describe("String", function() {
		it("should return 'String' when obj is a String", function() {
			typeOf("").should.eql("String");
		});
	});
	
	describe("Number", function() {
		it("should return 'Number' when obj is a Number", function() {
			typeOf(0).should.eql("Number");
			typeOf(1).should.eql("Number");
			typeOf(-1).should.eql("Number");
			typeOf(1.5).should.eql("Number");
			typeOf(0xFF).should.eql("Number");
			typeOf(3.45e2).should.eql("Number");
			typeOf(NaN).should.eql("Number");
			typeOf(Infinity).should.eql("Number");
		});
	});
	
	describe("Boolean", function() {
		it("should return 'Boolean' when obj is a Boolean", function() {
			typeOf(false).should.eql("Boolean");
			typeOf(true).should.eql("Boolean");
		});
	});
	
	describe("Object", function() {
		it("should return 'Object' when obj is an Object", function() {
			typeOf({}).should.eql("Object");
		});
	});
	
	describe("Array", function() {
		it("should return 'Array' when obj is an Array", function() {
			typeOf([]).should.eql("Array");
		});
	});
	
	describe("Null", function() {
		it("should return 'Null' when obj is a Null", function() {
			typeOf(null).should.eql("Null");
		});
	});
	
	describe("Undefined", function() {
		it("should return 'Undefined' when obj is undefined", function() {
			typeOf(undefined).should.eql("Undefined");
			typeOf().should.eql("Undefined");
		});
	});
	
	describe("RegExp", function() {
		it("should return 'RegExp' when obj is a regular expression", function() {
			typeOf(/.+/).should.eql("RegExp");
		});
	});
	
	describe("Date", function() {
		it("should return 'Date' when obj is a Date", function() {
			typeOf(new Date).should.eql("Date");
		});
	});
});

describe("nameOf(fun)", function() {
	it("should return the name of the function fun or false", function() {
		nameOf(function test(a, b, c) {}).should.eql("test");
		nameOf(function test() { return 0; }).should.eql("test");
		nameOf(function (a, b, c) {}).should.eql("");
		nameOf(function() {}).should.eql("");
		nameOf(1337).should.eql(false);
	});
});

describe("argsOf(fun)", function() {
	it("should return an array of the expected arguments of function fun or false", function() {
		argsOf(function test(a, b, c) {}).should.eql(["a", "b", "c"]);
		argsOf(function test() { return 0; }).should.eql([]);
		argsOf(function (a, b, c) {}).should.eql(["a", "b", "c"]);
		argsOf(function() {}).should.eql([]);
		argsOf(1337).should.eql(false);
	});
});