sanitize-arguments
==================

Sanitize function arguments the easy way!

```javascript
var sanitize = require("sanitize-arguments");

function Person(name, birthdate, size, pets, ability) {
  sanitize(arguments, [String, Date, Number, Array, Function]);
  
  // Now we can be sure that all arguments are in the right order
  this.properties = { name: name, birthdate: birthdate, size: size, pets: pets, ability: ability };
  
  console.log(this.properties);
}

// Even if someone totally fucks up the order and leaves out some arguments
new Person("silvinci", 180, ["dog", "cat"]);
// we still get the right order:
// { name: "silvinci", size: 180, pets: ["dog", "cat"], birthdate: undefined, ability: undefined }
```

Usage
=====

Very simple. The first argument is your `arguments` object.
The seccond an array of data types showing the desired order.

```javascript
function test(a, b, c, d, e)
  sanitize(arguments, [String, Date, Number, Array, Function]);
  console.log(a, b, c, d, e);
}
```

`sanitize` effectively changes the `arguments` object, since objects are passed as references.
This means, that the function arguments `(a, b, c, d, e)` are effectively changed, too!
That works, because they are linked to the `arguments` object. Pretty awesome, huh?

But there's a downside, you'll have to deal with, when using very loose structure. Consider the following.

```javascript
function test(a, b, c, d, e)
  sanitize(arguments, [String, Date, Number, Array, Function]);
  console.log(a, b, c, d, e);
}
test(42);
```

Here we only pass the parameter `c`. But as it turns out, `c` is `undefined`. Why's that?
Only arguments that were provided when calling the function are linked to the `arguments` object.
And here we only provide the first argument `a`, so we can't effect `c`.

How can we cope with that? `sanitize` not only changes the `arguments` object, but also returns an object like
`{ a: undefined, b: undefined, c: 42, d: undefined, e: undefined }`. And here we have our precious `c`.

Using `sanitize` this non-magic way isn't that ... magic. I know. But there are only two cases in which you have to.

1.  Using a very loose argument structure in which every argument is optional.
2.  "use strict"; Yep. Strict mode disables the link of the `arguments` object and the corresponding arguments.

Installation
============

Just grab it with the awesome npm.

    $ npm install sanitize-arguments

Or clone the repository.

    $ git clone git://github.com/silvinci/sanitize-arguments

Contributing
============

I happily accept pull requests and work on issues!

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