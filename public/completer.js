var COLLECTION_NAME = "test-completer";
var MAX_ROWS = 50;

function Completer(onready) {
  this._db = null;
}

Completer.prototype = {
  open: function Completer_open(callback) {
    var req = indexedDB.open(COLLECTION_NAME);

    req.onupgradeneeded = function(event) {
      var db = event.target.result;
      db.createObjectStore("terms", {keyPath: "term"});
    };

    req.onerror = function() {
      console.error(req.errorCode);
      callback(req.errorCode);
    };

    req.onsuccess = function(event) {
      this._db = req.result;
      callback(null);
    }.bind(this);
  },

  close: function Completer_close(callback) {
    this._db.close(callback);
  },

  add: function Completer_add(word) {
    if (this._db === null) return;

    word = word.trim().toLowerCase();

    var trans = this._db.transaction(["terms"], "readwrite");
    trans.onerror = function(event) { 
      console.error("Transaction error: " + event.target.error.name);
    };

    var store = trans.objectStore("terms");
    for (var i = 1; i <= word.length; ++i) {
      store.put({term: word.slice(0, i)});
    }
    store.put({term: word + "*"});
  },

  find: function Completer_find(query, callback) {
    if (this._db === null) return;

    query = query.trim().toLowerCase();
    var store = this._db.transaction("terms").objectStore("terms");
    var range = store.openCursor(IDBKeyRange.lowerBound(query));
    var found = 0;
    var results = [];

    range.onsuccess = function(event) {
      found += 1;
      var cursor = event.target.result;
      if (!cursor) {
        return callback(results);
      }

      var term = cursor.value.term;
      if ((found > MAX_ROWS) ||
          (term.slice(0, query.length) !== query)) {
        return callback(results);
      }
      if (term[term.length-1] === "*") {
        results.push(term.slice(0, term.length-1));
      }
      cursor.continue();
    };
  }
};

