A simple auto-completion example using IndexedDB.

The algorithm makes a trie out of IndexedDB keys, relying on the fact that they
are always stored in sort order.

The algorithm was posted for redis by Sebastian Sanfilippo (antirez) in this
really neat gist: https://gist.github.com/antirez/574044

The code is in `public/completer.js`.

# Demo

To run the example node.js server, 

- `git clone` this repo 
- `cd` into it
- `npm install`
- `npm start`

Then visit http://127.0.0.1:3000/ in your browser.

# Why

My purpose for putting this together is to make a prototype of this:

[Crystal Beasley's idea for contacts and Persona](http://www.youtube.com/watch?v=2i-eMl33tew)

My intention is to bring this code together with 
[this FirefoxOS contacts change listener](https://github.com/jedp/picl-contacts), 
and try to find the right way forward with Persona and 
[Identity-attached services](https://wiki.mozilla.org/Identity/AttachedServices) 
in a FirefoxOS app.








