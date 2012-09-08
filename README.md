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

Installation
============
    $ npm install sanitize-arguments


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