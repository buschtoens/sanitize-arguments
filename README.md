![sanitize-arguments — Order arguments with ease!](http://i.imgur.com/SAhDs.png)

[![Build Status](https://secure.travis-ci.org/silvinci/node-sanitize-arguments.png?branch=master)](https://travis-ci.org/silvinci/node-sanitize-arguments)

```javascript
var sanitize = require("sanitize-arguments");

function Person(name, birthdate, size, pets, ability) {
  var args = sanitize(arguments, Person, [String, Date, Number, Array, Function]);
  
  // Now we can be sure that all arguments are in the right order
  this.properties = {
    name: args.name,
    birthdate: args.birthdate,
    size: args.size,
    pets: args.pets,
    ability: args.ability
  };
  
  console.log(this.properties);
}

// Even if someone totally fucks up the order and leaves out some arguments
new Person("silvinci", 180, ["dog", "cat"]);
// we still get the right order:
// { name: "silvinci", size: 180, pets: ["dog", "cat"], birthdate: undefined, ability: undefined }
```

Installation
============

Just grab it with the awesome npm.

    $ npm install sanitize-arguments

Or clone the repository.

    $ git clone git://github.com/silvinci/node-sanitize-arguments

Usage
=====

There are two ways of using `sanitize`. The example above shows the first (and prefered) one.
The first argument is your `arguments` object, which contains all supplied values passed to the function.
The second one is the `Function` itself. The third one is an `Array` of `Types` or `Objects`
indicating the desired order. It's similiar to Java's `function(String name, Date birthdate, ...)`.
We just take our "strong types" out of the warehouse and put them into `sanitize`.

When giving these three `arguments` to `sanitize` it will return an object where all the values are
paired with their correct variable name and undefined values stay undefined, like so:
```javascript
{
  name: "silvinci",
  birthdate: undefined,
  size: 180,
  pets: ["dog", "cat"],
  ability: undefined
}
```
It *also* effectively changes the `arguments` object, thus altering the `function`'s variables aswell.
But this doesn't work in every case. First of all: This won't work in strict mode, because the magic link
between `arguments` and its variables is disabled. You also have to make sure that you *always* apply
the full count of arguments when calling your function, since only defined variables can be changed
via `arguments`.

Only when you can be sure, that you're code won't ever run in strict mode and your function *always*
gets called with the full count of arguments, that may be swapt, then you can use `sanitize` in
another, even more comfortable way.
```javascript
function test(a, b, c, d, e)
  sanitize(arguments, [String, Date, Number, Array, Function]);
  console.log(a, b, c, d, e);
}
```

Using the magic link the variables are changed and you don't have to use the returned object.
Please note, that `sanitize` will still return an object: the altered `arguments` so you could
acces the arguments by `returned[0]` too.

Extras
======

`sanitize` comes with some extra sugar for you. It exposes the typechecks it uses itself.
- `typeOf(object)` is a `typeof` like you would expect it to be.
  For instance `typeOf([])` returns "Array" and not "object", like 'typeof []' does.
- `nameOf(Function)` returns a function's name. Useful for passed in functions.
- `argsOf(Function)` returns an array of the expected arguments.

Contributing
============

I happily accept pull requests and work on issues!

Contributors
============

- [jbrumwell](https://github.com/jbrumwell)


---

License
=======

(The MIT License)

Copyright (c) 2012 Jan Buschtöns &lt;buschtoens@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.