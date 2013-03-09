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






