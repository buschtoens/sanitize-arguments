// Require the lib
var sanitize = require("../"),
    assert   = require('assert');

describe('Sanitize', function() {
    describe('Without Function Reference', function() {
        it('should return an array', function() {
            var foo = function(a, b, c) {
                var params = sanitize(arguments, [String, String, String]);
                
                assert(Array.isArray(params));
            }
            
            foo();
        })
        
        it('should return an array with the same amount of arguments as it was called with', function() {
            var foo = function(num, b, c) {
                var params = sanitize(arguments, [Number, String, String]);
                
                assert(num === params.length);
            }
            
            foo(1);
            foo(2, 'b');
            foo(3, 'b', 'c');
        })
        
        it('should handle arguments that are out of order', function() {
            var foo = function(a, b, c, r) {
                var params = sanitize(arguments, [String, Function, Number]);
                
                assert(typeof params[0] == 'string');
                assert(typeof params[1] == 'function');
                assert(typeof params[2] == 'number');
            }
            
            foo('a', function() {}, 1);
            foo(1, 'a', function() {});
            foo(function() {}, 1, 'a');
        })
        
        it('should handle default values', function() {
            var foo = function(a, b, c, d) {
                var params = sanitize(arguments, [String, [Function, function defaultFunction() {} ], [1], [String, false] ]);
                
                return params;
            },
               params;
               
            params = foo('test');
            
            assert(params[0] === 'test');
            assert(typeof params[1] == 'function' && params[1].name == 'defaultFunction');
            assert(params[2] === 1);
            assert(params[3] === false);
            
            params = foo('again', function notDefaultFunction() {}, 333, 'testing');
            
            assert(params[0] === 'again');
            assert(typeof params[1] == 'function' && params[1].name == 'notDefaultFunction');
            assert(params[2] === 333);
            assert(params[3] === 'testing');
            
            params = foo('again', 'testing', function notDefaultFunction() {}, 333);
            
            assert(params[0] === 'again');
            assert(typeof params[1] == 'function' && params[1].name == 'notDefaultFunction');
            assert(params[2] === 333);
            assert(params[3] === 'testing');
        })
    })
    
    describe('With Function Reference', function() {
        it('should return an object', function() {
            var foo = function(a, b, c) {
                var params = sanitize(arguments, foo, [String, String, String]);
                
                assert(typeof params == 'object');
            }
            
            foo();
        })
        
        it('should return an array with the same amount of arguments as it was called with', function() {
            var foo = function(a, b, c) {
                var params = sanitize(arguments, foo, [String, String, String]);
                
                assert(params.a == 'a');    
                assert(params.b == 'b');
                assert(params.c == 'c');
            }
            
            foo('a', 'b', 'c');
        })
        
        it('should handle arguments that are out of order', function() {
            var foo = function(a, b, c) {
                var params = sanitize(arguments, foo, [String, Function, Number]);
                
                assert(typeof params.a == 'string');
                assert(typeof params.b == 'function');
                assert(typeof params.c == 'number');
            }
            
            foo('a', function() {}, 1);
            foo(1, 'a', function() {});
            foo(function() {}, 1, 'a');
        })
        
        it('should handle default values', function() {
            var foo = function(a, b, c, d) {
                var params = sanitize(arguments, foo, [String, [Function, function defaultFunction() {} ], [1], [String, false]]);
                
                return params;
            },
               params;
               
            params = foo('test');
            
            assert(params.a === 'test');
            assert(typeof params.b == 'function' && params.b.name == 'defaultFunction');
            assert(params.c === 1);
            assert(params.d === false);
            
            params = foo('again', function notDefaultFunction() {}, 333, 'testing');
            
            assert(params.a === 'again');
            assert(typeof params.b == 'function' && params.b.name == 'notDefaultFunction');
            assert(params.c === 333);
            assert(params.d === 'testing');
            
            params = foo('again', 'testing', function notDefaultFunction() {}, 333);
            
            assert(params.a === 'again');
            assert(typeof params.b == 'function' && params.b.name == 'notDefaultFunction');
            assert(params.c === 333);
            assert(params.d === 'testing');
        })
    })
})