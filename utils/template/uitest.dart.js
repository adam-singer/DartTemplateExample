//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
$defProp(Object.prototype, '$index', function(i) {
  $throw(new NoSuchMethodException(this, "operator []", [i]));
});
$defProp(Array.prototype, '$index', function(index) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i];
});
$defProp(String.prototype, '$index', function(i) {
  return this[i];
});
$defProp(Object.prototype, '$setindex', function(i, value) {
  $throw(new NoSuchMethodException(this, "operator []=", [i, value]));
});
$defProp(Array.prototype, '$setindex', function(index, value) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i] = value;
});
function $add$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'string') {
    var str = (y == null) ? 'null' : y.toString();
    if (typeof(str) != 'string') {
      throw new Error("calling toString() on right hand operand of operator " +
      "+ did not return a String");
    }
    return x + str;
  } else if (typeof(x) == 'object') {
    return x.$add(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator +", [y]));
  }
}

function $add$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x + y;
  return $add$complex$(x, y);
}
function $eq$(x, y) {
  if (x == null) return y == null;
  return (typeof(x) != 'object') ? x === y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
$defProp(Object.prototype, '$eq', function(other) {
  return this === other;
});
function $gt$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$gt(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator >", [y]));
  }
}
function $gt$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x > y;
  return $gt$complex$(x, y);
}
function $gte$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$gte(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator >=", [y]));
  }
}
function $gte$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x >= y;
  return $gte$complex$(x, y);
}
function $lt$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$lt(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator <", [y]));
  }
}
function $lt$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x < y;
  return $lt$complex$(x, y);
}
function $lte$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$lte(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator <=", [y]));
  }
}
function $lte$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x <= y;
  return $lte$complex$(x, y);
}
function $mod$(x, y) {
  if (typeof(x) == 'number') {
    if (typeof(y) == 'number') {
      var result = x % y;
      if (result == 0) {
        return 0;  // Make sure we don't return -0.0.
      } else if (result < 0) {
        if (y < 0) {
          return result - y;
        } else {
          return result + y;
        }
      }
      return result;
    } else {
      $throw(new IllegalArgumentException(y));
    }
  } else if (typeof(x) == 'object') {
    return x.$mod(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator %", [y]));
  }
}
function $ne$(x, y) {
  if (x == null) return y != null;
  return (typeof(x) != 'object') ? x !== y : !x.$eq(y);
}
function $shl$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$shl(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator <<", [y]));
  }
}
function $shl$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x << y;
  return $shl$complex$(x, y);
}
function $sub$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$sub(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator -", [y]));
  }
}
function $sub$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x - y;
  return $sub$complex$(x, y);
}
function $truncdiv$(x, y) {
  if (typeof(x) == 'number') {
    if (typeof(y) == 'number') {
      if (y == 0) $throw(new IntegerDivisionByZeroException());
      var tmp = x / y;
      return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
    } else {
      $throw(new IllegalArgumentException(y));
    }
  } else if (typeof(x) == 'object') {
    return x.$truncdiv(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator ~/", [y]));
  }
}
// ********** Code for Object **************
$defProp(Object.prototype, "get$dynamic", function() {
  "use strict"; return this;
});
$defProp(Object.prototype, "noSuchMethod", function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
});
$defProp(Object.prototype, "add$1", function($0) {
  return this.noSuchMethod("add", [$0]);
});
$defProp(Object.prototype, "clear$0", function() {
  return this.noSuchMethod("clear", []);
});
$defProp(Object.prototype, "end$0", function() {
  return this.noSuchMethod("end", []);
});
$defProp(Object.prototype, "heading$2", function($0, $1) {
  return this.noSuchMethod("heading", [$0, $1]);
});
$defProp(Object.prototype, "indexOf$1", function($0) {
  return this.noSuchMethod("indexOf", [$0]);
});
$defProp(Object.prototype, "is$Collection", function() {
  return false;
});
$defProp(Object.prototype, "is$List", function() {
  return false;
});
$defProp(Object.prototype, "is$Map", function() {
  return false;
});
$defProp(Object.prototype, "is$RegExp", function() {
  return false;
});
$defProp(Object.prototype, "is$html_Element", function() {
  return false;
});
$defProp(Object.prototype, "next$0", function() {
  return this.noSuchMethod("next", []);
});
$defProp(Object.prototype, "remove$0", function() {
  return this.noSuchMethod("remove", []);
});
$defProp(Object.prototype, "start$0", function() {
  return this.noSuchMethod("start", []);
});
$defProp(Object.prototype, "substring$1", function($0) {
  return this.noSuchMethod("substring", [$0]);
});
// ********** Code for IndexOutOfRangeException **************
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.is$IndexOutOfRangeException = function(){return true};
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
// ********** Code for IllegalAccessException **************
function IllegalAccessException() {

}
IllegalAccessException.prototype.toString = function() {
  return "Attempt to modify an immutable object";
}
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments, _existingArgumentNames) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
  this._existingArgumentNames = _existingArgumentNames;
}
NoSuchMethodException.prototype.is$NoSuchMethodException = function(){return true};
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  if (null == this._existingArgumentNames) {
    return $add$($add$(("NoSuchMethodException : method not found: '" + this._functionName + "'\n"), ("Receiver: " + this._receiver + "\n")), ("Arguments: [" + sb + "]"));
  }
  else {
    var actualParameters = sb.toString();
    sb = new StringBufferImpl("");
    for (var i = (0);
     i < this._existingArgumentNames.get$length(); i++) {
      if (i > (0)) {
        sb.add(", ");
      }
      sb.add(this._existingArgumentNames.$index(i));
    }
    var formalParameters = sb.toString();
    return $add$($add$($add$("NoSuchMethodException: incorrect number of arguments passed to ", ("method named '" + this._functionName + "'\nReceiver: " + this._receiver + "\n")), ("Tried calling: " + this._functionName + "(" + actualParameters + ")\n")), ("Found: " + this._functionName + "(" + formalParameters + ")"));
  }
}
// ********** Code for ClosureArgumentMismatchException **************
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
// ********** Code for ObjectNotClosureException **************
function ObjectNotClosureException() {

}
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(arg) {
  this._arg = arg;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._arg);
}
// ********** Code for StackOverflowException **************
function StackOverflowException() {

}
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
// ********** Code for BadNumberFormatException **************
function BadNumberFormatException(_s) {
  this._s = _s;
}
BadNumberFormatException.prototype.toString = function() {
  return ("BadNumberFormatException: '" + this._s + "'");
}
// ********** Code for NullPointerException **************
function NullPointerException() {

}
NullPointerException.prototype.toString = function() {
  return "NullPointerException";
}
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
// ********** Code for EmptyQueueException **************
function EmptyQueueException() {

}
EmptyQueueException.prototype.toString = function() {
  return "EmptyQueueException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for IntegerDivisionByZeroException **************
function IntegerDivisionByZeroException() {

}
IntegerDivisionByZeroException.prototype.is$IntegerDivisionByZeroException = function(){return true};
IntegerDivisionByZeroException.prototype.toString = function() {
  return "IntegerDivisionByZeroException";
}
// ********** Code for dart_core_Function **************
Function.prototype.to$call$0 = function() {
  this.call$0 = this._genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this._genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
Function.prototype.to$call$2 = function() {
  this.call$2 = this._genStub(2);
  this.to$call$2 = function() { return this.call$2; };
  return this.call$2;
};
Function.prototype.call$2 = function($0, $1) {
  return this.to$call$2()($0, $1);
};
function to$call$2(f) { return f && f.to$call$2(); }
// ********** Code for Math **************
Math.parseInt = function(str) {
    var match = /^\s*[+-]?(?:(0[xX][abcdefABCDEF0-9]+)|\d+)\s*$/.exec(str);
    if (!match) $throw(new BadNumberFormatException(str));
    var isHex = !!match[1];
    var ret = parseInt(str, isHex ? 16 : 10);
    if (isNaN(ret)) $throw(new BadNumberFormatException(str));
    return ret;
}
Math.parseDouble = function(str) {
  var ret = parseFloat(str);
    if (isNaN(ret) && str != 'NaN') $throw(new BadNumberFormatException(str));
    return ret;
}
Math.min = function(a, b) {
  if (a == b) return a;
    if (a < b) {
      if (isNaN(b)) return b;
      else return a;
    }
    if (isNaN(a)) return a;
    else return b;
}
// ********** Code for Strings **************
function Strings() {}
Strings.String$fromCharCodes$factory = function(charCodes) {
  return StringBase.createFromCharCodes(charCodes);
}
// ********** Code for top level **************
function print$(obj) {
  return _print(obj);
}
function _print(obj) {
  if (typeof console == 'object') {
    if (obj) obj = obj.toString();
    console.log(obj);
  } else if (typeof write === 'function') {
    write(obj);
    write('\n');
  }
}
function _toDartException(e) {
  function attachStack(dartEx) {
    // TODO(jmesserly): setting the stack property is not a long term solution.
    var stack = e.stack;
    // The stack contains the error message, and the stack is all that is
    // printed (the exception's toString() is never called).  Make the Dart
    // exception's toString() be the dominant message.
    if (typeof stack == 'string') {
      var message = dartEx.toString();
      if (/^(Type|Range)Error:/.test(stack)) {
        // Indent JS message (it can be helpful) so new message stands out.
        stack = '    (' + stack.substring(0, stack.indexOf('\n')) + ')\n' +
                stack.substring(stack.indexOf('\n') + 1);
      }
      stack = message + '\n' + stack;
    }
    dartEx.stack = stack;
    return dartEx;
  }

  if (e instanceof TypeError) {
    switch(e.type) {
      case 'property_not_function':
      case 'called_non_callable':
        if (e.arguments[0] == null) {
          return attachStack(new NullPointerException());
        } else {
          return attachStack(new ObjectNotClosureException());
        }
        break;
      case 'non_object_property_call':
      case 'non_object_property_load':
        return attachStack(new NullPointerException());
        break;
      case 'undefined_method':
        var mname = e.arguments[0];
        if (typeof(mname) == 'string' && (mname.indexOf('call$') == 0
            || mname == 'call' || mname == 'apply')) {
          return attachStack(new ObjectNotClosureException());
        } else {
          // TODO(jmesserly): fix noSuchMethod on operators so we don't hit this
          return attachStack(new NoSuchMethodException('', e.arguments[0], []));
        }
        break;
    }
  } else if (e instanceof RangeError) {
    if (e.message.indexOf('call stack') >= 0) {
      return attachStack(new StackOverflowException());
    }
  }
  return e;
}
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
$defProp(ListFactory.prototype, "is$List", function(){return true});
$defProp(ListFactory.prototype, "is$Collection", function(){return true});
ListFactory.ListFactory$from$factory = function(other) {
  var list = [];
  for (var $$i = other.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    list.add$1(e);
  }
  return list;
}
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "addAll", function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var item = $$i.next$0();
    this.add(item);
  }
});
$defProp(ListFactory.prototype, "clear", function() {
  this.set$length((0));
});
$defProp(ListFactory.prototype, "removeLast", function() {
  return this.pop();
});
$defProp(ListFactory.prototype, "last", function() {
  return this.$index(this.get$length() - (1));
});
$defProp(ListFactory.prototype, "iterator", function() {
  return new ListIterator(this);
});
$defProp(ListFactory.prototype, "toString", function() {
  return Collections.collectionToString(this);
});
$defProp(ListFactory.prototype, "add$1", ListFactory.prototype.add);
$defProp(ListFactory.prototype, "clear$0", ListFactory.prototype.clear);
$defProp(ListFactory.prototype, "indexOf$1", ListFactory.prototype.indexOf);
// ********** Code for ListIterator **************
function ListIterator(array) {
  this._array = array;
  this._pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._array.$index(this._pos++);
}
ListIterator.prototype.next$0 = ListIterator.prototype.next;
// ********** Code for ImmutableList **************
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$inherits(ImmutableList, ListFactory);
function ImmutableList(length) {
  Array.call(this, length);
}
ImmutableList.ImmutableList$from$factory = function(other) {
  return _constList(other);
}
ImmutableList.prototype.get$length = function() {
  return this.length;
}
ImmutableList.prototype.set$length = function(length) {
  $throw(const$0005);
}
ImmutableList.prototype.$setindex = function(index, value) {
  $throw(const$0005);
}
ImmutableList.prototype.add = function(element) {
  $throw(const$0005);
}
ImmutableList.prototype.addAll = function(elements) {
  $throw(const$0005);
}
ImmutableList.prototype.clear = function() {
  $throw(const$0005);
}
ImmutableList.prototype.removeLast = function() {
  $throw(const$0005);
}
ImmutableList.prototype.toString = function() {
  return Collections.collectionToString(this);
}
ImmutableList.prototype.add$1 = ImmutableList.prototype.add;
ImmutableList.prototype.clear$0 = ImmutableList.prototype.clear;
// ********** Code for ImmutableMap **************
function ImmutableMap(keyValuePairs) {
  this._internal = _map(keyValuePairs);
}
ImmutableMap.prototype.is$Map = function(){return true};
ImmutableMap.prototype.$index = function(key) {
  return this._internal.$index(key);
}
ImmutableMap.prototype.get$length = function() {
  return this._internal.get$length();
}
ImmutableMap.prototype.forEach = function(f) {
  this._internal.forEach(f);
}
ImmutableMap.prototype.getValues = function() {
  return this._internal.getValues();
}
ImmutableMap.prototype.containsKey = function(key) {
  return this._internal.containsKey(key);
}
ImmutableMap.prototype.$setindex = function(key, value) {
  $throw(const$0005);
}
ImmutableMap.prototype.clear = function() {
  $throw(const$0005);
}
ImmutableMap.prototype.remove = function(key) {
  $throw(const$0005);
}
ImmutableMap.prototype.toString = function() {
  return Maps.mapToString(this);
}
ImmutableMap.prototype.clear$0 = ImmutableMap.prototype.clear;
// ********** Code for JSSyntaxRegExp **************
function JSSyntaxRegExp(pattern, multiLine, ignoreCase) {
  JSSyntaxRegExp._create$ctor.call(this, pattern, $add$(($eq$(multiLine, true) ? "m" : ""), ($eq$(ignoreCase, true) ? "i" : "")));
}
JSSyntaxRegExp._create$ctor = function(pattern, flags) {
  this.re = new RegExp(pattern, flags);
      this.pattern = pattern;
      this.multiLine = this.re.multiline;
      this.ignoreCase = this.re.ignoreCase;
}
JSSyntaxRegExp._create$ctor.prototype = JSSyntaxRegExp.prototype;
JSSyntaxRegExp.prototype.is$RegExp = function(){return true};
JSSyntaxRegExp.prototype.firstMatch = function(str) {
  var m = this._exec(str);
  return m == null ? null : new MatchImplementation(this.pattern, str, this._matchStart(m), this.get$_lastIndex(), m);
}
JSSyntaxRegExp.prototype._exec = function(str) {
  return this.re.exec(str);
}
JSSyntaxRegExp.prototype._matchStart = function(m) {
  return m.index;
}
JSSyntaxRegExp.prototype.get$_lastIndex = function() {
  return this.re.lastIndex;
}
JSSyntaxRegExp.prototype.allMatches = function(str) {
  return new _AllMatchesIterable(this, str);
}
JSSyntaxRegExp.prototype.get$_global = function() {
  return new JSSyntaxRegExp._create$ctor(this.pattern, $add$($add$("g", (this.multiLine ? "m" : "")), (this.ignoreCase ? "i" : "")));
}
// ********** Code for MatchImplementation **************
function MatchImplementation(pattern, str, _start, _end, _groups) {
  this.pattern = pattern;
  this.str = str;
  this._start = _start;
  this._end = _end;
  this._groups = _groups;
}
MatchImplementation.prototype.start = function() {
  return this._start;
}
MatchImplementation.prototype.get$start = function() {
  return this.start.bind(this);
}
Function.prototype.bind = Function.prototype.bind ||
  function(thisObj) {
    var func = this;
    var funcLength = func.$length || func.length;
    var argsLength = arguments.length;
    if (argsLength > 1) {
      var boundArgs = Array.prototype.slice.call(arguments, 1);
      var bound = function() {
        // Prepend the bound arguments to the current arguments.
        var newArgs = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(newArgs, boundArgs);
        return func.apply(thisObj, newArgs);
      };
      bound.$length = Math.max(0, funcLength - (argsLength - 1));
      return bound;
    } else {
      var bound = function() {
        return func.apply(thisObj, arguments);
      };
      bound.$length = funcLength;
      return bound;
    }
  };
MatchImplementation.prototype.end = function() {
  return this._end;
}
MatchImplementation.prototype.$index = function(group) {
  return this._groups.$index(group);
}
MatchImplementation.prototype.end$0 = MatchImplementation.prototype.end;
MatchImplementation.prototype.start$0 = MatchImplementation.prototype.start;
// ********** Code for _AllMatchesIterable **************
function _AllMatchesIterable(_re, _str) {
  this._re = _re;
  this._str = _str;
}
_AllMatchesIterable.prototype.iterator = function() {
  return new _AllMatchesIterator(this._re, this._str);
}
// ********** Code for _AllMatchesIterator **************
function _AllMatchesIterator(re, _str) {
  this._str = _str;
  this._done = false;
  this._re = re.get$_global();
}
_AllMatchesIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  var next = this._next;
  this._next = null;
  return next;
}
_AllMatchesIterator.prototype.hasNext = function() {
  if (this._done) {
    return false;
  }
  else if (this._next != null) {
    return true;
  }
  this._next = this._re.firstMatch(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  }
  else {
    return true;
  }
}
_AllMatchesIterator.prototype.next$0 = _AllMatchesIterator.prototype.next;
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
// ********** Code for Collections **************
function Collections() {}
Collections.collectionToString = function(c) {
  var result = new StringBufferImpl("");
  Collections._emitCollection(c, result, new Array());
  return result.toString();
}
Collections._emitCollection = function(c, result, visiting) {
  visiting.add(c);
  var isList = !!(c && c.is$List());
  result.add(isList ? "[" : "{");
  var first = true;
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(e, result, visiting);
  }
  result.add(isList ? "]" : "}");
  visiting.removeLast();
}
Collections._emitObject = function(o, result, visiting) {
  if (!!(o && o.is$Collection())) {
    if (Collections._containsRef(visiting, o)) {
      result.add(!!(o && o.is$List()) ? "[...]" : "{...}");
    }
    else {
      Collections._emitCollection(o, result, visiting);
    }
  }
  else if (!!(o && o.is$Map())) {
    if (Collections._containsRef(visiting, o)) {
      result.add("{...}");
    }
    else {
      Maps._emitMap(o, result, visiting);
    }
  }
  else {
    result.add($eq$(o) ? "null" : o);
  }
}
Collections._containsRef = function(c, ref) {
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    if ((null == e ? null == (ref) : e === ref)) return true;
  }
  return false;
}
// ********** Code for HashMapImplementation **************
function HashMapImplementation() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation.prototype.is$Map = function(){return true};
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv$((capacity * (3)), (4));
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - (1));
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - (1));
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  var insertionIndex = (-1);
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) {
      if (insertionIndex < (0)) return hash;
      return insertionIndex;
    }
    else if ($eq$(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < (0)) && ((null == const$0000 ? null == (existingKey) : const$0000 === existingKey))) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) return (-1);
    if ($eq$(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + (1);
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * (2));
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - (1))) == (0));
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = (0);
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (null == key || (null == key ? null == (const$0000) : key === const$0000)) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = (0);
}
HashMapImplementation.prototype.clear = function() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    this._keys.$setindex(i);
    this._values.$setindex(i);
  }
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  var $0;
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((null == this._keys.$index(index)) || ((($0 = this._keys.$index(index)) == null ? null == (const$0000) : $0 === const$0000))) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < (0)) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.remove = function(key) {
  var index = this._probeForLookup(key);
  if (index >= (0)) {
    this._numberOfEntries--;
    var value = this._values.$index(index);
    this._values.$setindex(index);
    this._keys.$setindex(index, const$0000);
    this._numberOfDeleted++;
    return value;
  }
  return null;
}
HashMapImplementation.prototype.get$length = function() {
  return this._numberOfEntries;
}
HashMapImplementation.prototype.forEach = function(f) {
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    var key = this._keys.$index(i);
    if ((null != key) && ((null == key ? null != (const$0000) : key !== const$0000))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.getValues = function() {
  var list = new Array(this.get$length());
  var i = (0);
  this.forEach(function _(key, value) {
    list.$setindex(i++, value);
  }
  );
  return list;
}
HashMapImplementation.prototype.containsKey = function(key) {
  return (this._probeForLookup(key) != (-1));
}
HashMapImplementation.prototype.toString = function() {
  return Maps.mapToString(this);
}
HashMapImplementation.prototype.clear$0 = HashMapImplementation.prototype.clear;
// ********** Code for HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair **************
$inherits(HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair, HashMapImplementation);
function HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.is$Map = function(){return true};
// ********** Code for HashSetImplementation **************
function HashSetImplementation() {
  this._backingMap = new HashMapImplementation();
}
HashSetImplementation.prototype.is$Collection = function(){return true};
HashSetImplementation.prototype.clear = function() {
  this._backingMap.clear();
}
HashSetImplementation.prototype.add = function(value) {
  this._backingMap.$setindex(value, value);
}
HashSetImplementation.prototype.addAll = function(collection) {
  var $this = this; // closure support
  collection.forEach(function _(value) {
    $this.add(value);
  }
  );
}
HashSetImplementation.prototype.forEach = function(f) {
  this._backingMap.forEach(function _(key, value) {
    f(key);
  }
  );
}
HashSetImplementation.prototype.filter = function(f) {
  var result = new HashSetImplementation();
  this._backingMap.forEach(function _(key, value) {
    if (f(key)) result.add(key);
  }
  );
  return result;
}
HashSetImplementation.prototype.get$length = function() {
  return this._backingMap.get$length();
}
HashSetImplementation.prototype.iterator = function() {
  return new HashSetIterator(this);
}
HashSetImplementation.prototype.toString = function() {
  return Collections.collectionToString(this);
}
HashSetImplementation.prototype.add$1 = HashSetImplementation.prototype.add;
HashSetImplementation.prototype.clear$0 = HashSetImplementation.prototype.clear;
// ********** Code for HashSetIterator **************
function HashSetIterator(set_) {
  this._nextValidIndex = (-1);
  this._entries = set_._backingMap._keys;
  this._advance();
}
HashSetIterator.prototype.hasNext = function() {
  var $0;
  if (this._nextValidIndex >= this._entries.get$length()) return false;
  if ((($0 = this._entries.$index(this._nextValidIndex)) == null ? null == (const$0000) : $0 === const$0000)) {
    this._advance();
  }
  return this._nextValidIndex < this._entries.get$length();
}
HashSetIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  var res = this._entries.$index(this._nextValidIndex);
  this._advance();
  return res;
}
HashSetIterator.prototype._advance = function() {
  var length = this._entries.get$length();
  var entry;
  var deletedKey = const$0000;
  do {
    if (++this._nextValidIndex >= length) break;
    entry = this._entries.$index(this._nextValidIndex);
  }
  while ((null == entry) || ((null == entry ? null == (deletedKey) : entry === deletedKey)))
}
HashSetIterator.prototype.next$0 = HashSetIterator.prototype.next;
// ********** Code for _DeletedKeySentinel **************
function _DeletedKeySentinel() {

}
// ********** Code for KeyValuePair **************
function KeyValuePair(key, value) {
  this.key = key;
  this.value = value;
}
KeyValuePair.prototype.get$value = function() { return this.value; };
KeyValuePair.prototype.set$value = function(value) { return this.value = value; };
// ********** Code for LinkedHashMapImplementation **************
function LinkedHashMapImplementation() {
  this._map = new HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair();
  this._list = new DoubleLinkedQueue_KeyValuePair();
}
LinkedHashMapImplementation.prototype.is$Map = function(){return true};
LinkedHashMapImplementation.prototype.$setindex = function(key, value) {
  if (this._map.containsKey(key)) {
    this._map.$index(key).get$element().set$value(value);
  }
  else {
    this._list.addLast(new KeyValuePair(key, value));
    this._map.$setindex(key, this._list.lastEntry());
  }
}
LinkedHashMapImplementation.prototype.$index = function(key) {
  var entry = this._map.$index(key);
  if (null == entry) return null;
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.remove = function(key) {
  var entry = this._map.remove(key);
  if (null == entry) return null;
  entry.remove();
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.getValues = function() {
  var list = new Array(this.get$length());
  var index = (0);
  this._list.forEach(function _(entry) {
    list.$setindex(index++, entry.value);
  }
  );
  return list;
}
LinkedHashMapImplementation.prototype.forEach = function(f) {
  this._list.forEach(function _(entry) {
    f(entry.key, entry.value);
  }
  );
}
LinkedHashMapImplementation.prototype.containsKey = function(key) {
  return this._map.containsKey(key);
}
LinkedHashMapImplementation.prototype.get$length = function() {
  return this._map.get$length();
}
LinkedHashMapImplementation.prototype.clear = function() {
  this._map.clear();
  this._list.clear();
}
LinkedHashMapImplementation.prototype.toString = function() {
  return Maps.mapToString(this);
}
LinkedHashMapImplementation.prototype.clear$0 = LinkedHashMapImplementation.prototype.clear;
// ********** Code for Maps **************
function Maps() {}
Maps.mapToString = function(m) {
  var result = new StringBufferImpl("");
  Maps._emitMap(m, result, new Array());
  return result.toString();
}
Maps._emitMap = function(m, result, visiting) {
  visiting.add(m);
  result.add("{");
  var first = true;
  m.forEach((function (k, v) {
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(k, result, visiting);
    result.add(": ");
    Collections._emitObject(v, result, visiting);
  })
  );
  result.add("}");
  visiting.removeLast();
}
// ********** Code for DoubleLinkedQueueEntry **************
function DoubleLinkedQueueEntry(e) {
  this._element = e;
}
DoubleLinkedQueueEntry.prototype._link = function(p, n) {
  this._next = n;
  this._previous = p;
  p._next = this;
  n._previous = this;
}
DoubleLinkedQueueEntry.prototype.prepend = function(e) {
  new DoubleLinkedQueueEntry(e)._link(this._previous, this);
}
DoubleLinkedQueueEntry.prototype.remove = function() {
  this._previous._next = this._next;
  this._next._previous = this._previous;
  this._next = null;
  this._previous = null;
  return this._element;
}
DoubleLinkedQueueEntry.prototype._asNonSentinelEntry = function() {
  return this;
}
DoubleLinkedQueueEntry.prototype.previousEntry = function() {
  return this._previous._asNonSentinelEntry();
}
DoubleLinkedQueueEntry.prototype.get$element = function() {
  return this._element;
}
DoubleLinkedQueueEntry.prototype.remove$0 = DoubleLinkedQueueEntry.prototype.remove;
// ********** Code for DoubleLinkedQueueEntry_KeyValuePair **************
$inherits(DoubleLinkedQueueEntry_KeyValuePair, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_KeyValuePair(e) {
  this._element = e;
}
DoubleLinkedQueueEntry_KeyValuePair.prototype.remove$0 = DoubleLinkedQueueEntry_KeyValuePair.prototype.remove;
// ********** Code for _DoubleLinkedQueueEntrySentinel **************
$inherits(_DoubleLinkedQueueEntrySentinel, DoubleLinkedQueueEntry);
function _DoubleLinkedQueueEntrySentinel() {
  DoubleLinkedQueueEntry.call(this, null);
  this._link(this, this);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove = function() {
  $throw(const$0002);
}
_DoubleLinkedQueueEntrySentinel.prototype._asNonSentinelEntry = function() {
  return null;
}
_DoubleLinkedQueueEntrySentinel.prototype.get$element = function() {
  $throw(const$0002);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove$0 = _DoubleLinkedQueueEntrySentinel.prototype.remove;
// ********** Code for _DoubleLinkedQueueEntrySentinel_KeyValuePair **************
$inherits(_DoubleLinkedQueueEntrySentinel_KeyValuePair, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_KeyValuePair() {
  DoubleLinkedQueueEntry_KeyValuePair.call(this, null);
  this._link(this, this);
}
// ********** Code for DoubleLinkedQueue **************
function DoubleLinkedQueue() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel();
}
DoubleLinkedQueue.prototype.is$Collection = function(){return true};
DoubleLinkedQueue.prototype.addLast = function(value) {
  this._sentinel.prepend(value);
}
DoubleLinkedQueue.prototype.add = function(value) {
  this.addLast(value);
}
DoubleLinkedQueue.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    this.add(e);
  }
}
DoubleLinkedQueue.prototype.lastEntry = function() {
  return this._sentinel.previousEntry();
}
DoubleLinkedQueue.prototype.get$length = function() {
  var counter = (0);
  this.forEach(function _(element) {
    counter++;
  }
  );
  return counter;
}
DoubleLinkedQueue.prototype.clear = function() {
  this._sentinel._next = this._sentinel;
  this._sentinel._previous = this._sentinel;
}
DoubleLinkedQueue.prototype.forEach = function(f) {
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    f(entry._element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.filter = function(f) {
  var other = new DoubleLinkedQueue();
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    if (f(entry._element)) other.addLast(entry._element);
    entry = nextEntry;
  }
  return other;
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
DoubleLinkedQueue.prototype.toString = function() {
  return Collections.collectionToString(this);
}
DoubleLinkedQueue.prototype.add$1 = DoubleLinkedQueue.prototype.add;
DoubleLinkedQueue.prototype.clear$0 = DoubleLinkedQueue.prototype.clear;
// ********** Code for DoubleLinkedQueue_KeyValuePair **************
$inherits(DoubleLinkedQueue_KeyValuePair, DoubleLinkedQueue);
function DoubleLinkedQueue_KeyValuePair() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_KeyValuePair();
}
DoubleLinkedQueue_KeyValuePair.prototype.is$Collection = function(){return true};
DoubleLinkedQueue_KeyValuePair.prototype.clear$0 = DoubleLinkedQueue_KeyValuePair.prototype.clear;
// ********** Code for _DoubleLinkedQueueIterator **************
function _DoubleLinkedQueueIterator(_sentinel) {
  this._sentinel = _sentinel;
  this._currentEntry = this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.hasNext = function() {
  var $0;
  return (($0 = this._currentEntry._next) == null ? null != (this._sentinel) : $0 !== this._sentinel);
}
_DoubleLinkedQueueIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  this._currentEntry = this._currentEntry._next;
  return this._currentEntry.get$element();
}
_DoubleLinkedQueueIterator.prototype.next$0 = _DoubleLinkedQueueIterator.prototype.next;
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  this.clear();
  this.add(content);
}
StringBufferImpl.prototype.get$length = function() {
  return this._length;
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.addAll = function(objects) {
  for (var $$i = objects.iterator(); $$i.hasNext(); ) {
    var obj = $$i.next$0();
    this.add(obj);
  }
  return this;
}
StringBufferImpl.prototype.clear = function() {
  this._buffer = new Array();
  this._length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear();
  this._buffer.add(result);
  return result;
}
StringBufferImpl.prototype.add$1 = StringBufferImpl.prototype.add;
StringBufferImpl.prototype.clear$0 = StringBufferImpl.prototype.clear;
// ********** Code for StringBase **************
function StringBase() {}
StringBase.createFromCharCodes = function(charCodes) {
  if (Object.getPrototypeOf(charCodes) !== Array.prototype) {
    charCodes = new ListFactory.ListFactory$from$factory(charCodes);
  }
  return String.fromCharCode.apply(null, charCodes);
}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add$($add$(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.get$length = function() { return this.length; };
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype._replaceRegExp = function(from, to) {
  'use strict';return this.replace(from.re, to);
}
StringImplementation.prototype._replaceAll = function(from, to) {
  'use strict';
  from = new RegExp(from.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'g');
  to = to.replace(/\$/g, '$$$$'); // Escape sequences are fun!
  return this.replace(from, to);
}
StringImplementation.prototype.replaceAll = function(from, to) {
  if ((typeof(from) == 'string')) return this._replaceAll(from, to);
  if (!!(from && from.is$RegExp())) return this._replaceRegExp(from.get$dynamic().get$_global(), to);
  var buffer = new StringBufferImpl("");
  var lastMatchEnd = (0);
  var $$list = from.allMatches(this);
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var match = $$i.next$0();
    buffer.add$1(this.substring(lastMatchEnd, match.start$0()));
    buffer.add$1(to);
    lastMatchEnd = match.end$0();
  }
  buffer.add$1(this.substring(lastMatchEnd));
}
StringImplementation.prototype.split_ = function(pattern) {
  if ((typeof(pattern) == 'string')) return this._split(pattern);
  if (!!(pattern && pattern.is$RegExp())) return this._splitRegExp(pattern);
  $throw("String.split(Pattern) unimplemented.");
}
StringImplementation.prototype._split = function(pattern) {
  'use strict'; return this.split(pattern);
}
StringImplementation.prototype._splitRegExp = function(pattern) {
  'use strict'; return this.split(pattern.re);
}
StringImplementation.prototype.hashCode = function() {
      'use strict';
      var hash = 0;
      for (var i = 0; i < this.length; i++) {
        hash = 0x1fffffff & (hash + this.charCodeAt(i));
        hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
        hash ^= hash >> 6;
      }

      hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
      hash ^= hash >> 11;
      return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}
StringImplementation.prototype.indexOf$1 = StringImplementation.prototype.indexOf;
StringImplementation.prototype.substring$1 = StringImplementation.prototype.substring;
// ********** Code for _ArgumentMismatchException **************
$inherits(_ArgumentMismatchException, ClosureArgumentMismatchException);
function _ArgumentMismatchException(_message) {
  this._dart_coreimpl_message = _message;
  ClosureArgumentMismatchException.call(this);
}
_ArgumentMismatchException.prototype.toString = function() {
  return ("Closure argument mismatch: " + this._dart_coreimpl_message);
}
// ********** Code for _FunctionImplementation **************
_FunctionImplementation = Function;
_FunctionImplementation.prototype._genStub = function(argsLength, names) {
      // Fast path #1: if no named arguments and arg count matches.
      var thisLength = this.$length || this.length;
      if (thisLength == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = thisLength - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > thisLength ||
          argsNamed > paramsNamed) {
        return function() {
          $throw(new _ArgumentMismatchException(
            'Wrong number of arguments to function. Expected ' + paramsBare +
            ' positional arguments and at most ' + paramsNamed +
            ' named arguments, but got ' + argsBare +
            ' positional arguments and ' + argsNamed + ' named arguments.'));
        };
      }

      // First, fill in all of the default values
      var p = new Array(paramsBare);
      if (paramsNamed) {
        p = p.concat(this.$optional.slice(paramsNamed));
      }
      // Fill in positional args
      var a = new Array(argsLength);
      for (var i = 0; i < argsBare; i++) {
        p[i] = a[i] = '$' + i;
      }
      // Then overwrite with supplied values for optional args
      var lastParameterIndex;
      var namesInOrder = true;
      for (var i = 0; i < argsNamed; i++) {
        var name = names[i];
        a[i + argsBare] = name;
        var j = this.$optional.indexOf(name);
        if (j < 0 || j >= paramsNamed) {
          return function() {
            $throw(new _ArgumentMismatchException(
              'Named argument "' + name + '" was not expected by function.' +
              ' Did you forget to mark the function parameter [optional]?'));
          };
        } else if (lastParameterIndex && lastParameterIndex > j) {
          namesInOrder = false;
        }
        p[j + paramsBare] = name;
        lastParameterIndex = j;
      }

      if (thisLength == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
// ********** Code for top level **************
function _constList(other) {
    other.__proto__ = ImmutableList.prototype;
    return other;
}
function _map(itemsAndKeys) {
  var ret = new LinkedHashMapImplementation();
  for (var i = (0);
   i < itemsAndKeys.get$length(); ) {
    ret.$setindex(itemsAndKeys.$index(i++), itemsAndKeys.$index(i++));
  }
  return ret;
}
function _constMap(itemsAndKeys) {
  return new ImmutableMap(itemsAndKeys);
}
//  ********** Library html **************
// ********** Code for _EventTargetImpl **************
$defProp(Object.prototype, '$typeNameOf', (function() {
  function constructorNameWithFallback(obj) {
    var constructor = obj.constructor;
    if (typeof(constructor) == 'function') {
      // The constructor isn't null or undefined at this point. Try
      // to grab hold of its name.
      var name = constructor.name;
      // If the name is a non-empty string, we use that as the type
      // name of this object. On Firefox, we often get 'Object' as
      // the constructor name even for more specialized objects so
      // we have to fall through to the toString() based implementation
      // below in that case.
      if (typeof(name) == 'string' && name && name != 'Object') return name;
    }
    var string = Object.prototype.toString.call(obj);
    return string.substring(8, string.length - 1);
  }

  function chrome$typeNameOf() {
    var name = this.constructor.name;
    if (name == 'Window') return 'DOMWindow';
    return name;
  }

  function firefox$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    if (name == 'Document') return 'HTMLDocument';
    if (name == 'XMLDocument') return 'Document';
    return name;
  }

  function ie$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    // IE calls both HTML and XML documents 'Document', so we check for the
    // xmlVersion property, which is the empty string on HTML documents.
    if (name == 'Document' && this.xmlVersion) return 'Document';
    if (name == 'Document') return 'HTMLDocument';
    return name;
  }

  // If we're not in the browser, we're almost certainly running on v8.
  if (typeof(navigator) != 'object') return chrome$typeNameOf;

  var userAgent = navigator.userAgent;
  if (/Chrome|DumpRenderTree/.test(userAgent)) return chrome$typeNameOf;
  if (/Firefox/.test(userAgent)) return firefox$typeNameOf;
  if (/MSIE/.test(userAgent)) return ie$typeNameOf;
  return function() { return constructorNameWithFallback(this); };
})());
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;
    var proto = Object.getPrototypeOf(obj);
    if (!proto.hasOwnProperty(name)) {
      $defProp(proto, name, method);
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  $defProp(Object.prototype, name, $dynamicBind);
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];
$dynamic("_addEventListener").EventTarget = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _NodeImpl **************
$dynamic("get$nodes").Node = function() {
  var list = this.get$_childNodes();
  list.set$_parent(this);
  return list;
}
$dynamic("remove").Node = function() {
  if ($ne$(this.get$parent())) {
    var parent = this.get$parent();
    parent._removeChild(this);
  }
  return this;
}
$dynamic("replaceWith").Node = function(otherNode) {
  try {
    var parent = this.get$parent();
    parent._replaceChild(otherNode, this);
  } catch (e) {
    e = _toDartException(e);
  }
  ;
  return this;
}
$dynamic("get$_childNodes").Node = function() {
  return this.childNodes;
}
$dynamic("get$parent").Node = function() {
  return this.parentNode;
}
$dynamic("get$text").Node = function() {
  return this.textContent;
}
$dynamic("set$text").Node = function(value) {
  this.textContent = value;
}
$dynamic("_appendChild").Node = function(newChild) {
  return this.appendChild(newChild);
}
$dynamic("_removeChild").Node = function(oldChild) {
  return this.removeChild(oldChild);
}
$dynamic("_replaceChild").Node = function(newChild, oldChild) {
  return this.replaceChild(newChild, oldChild);
}
$dynamic("remove$0").Node = function() {
  return this.remove();
};
// ********** Code for _ElementImpl **************
$dynamic("is$html_Element").Element = function(){return true};
$dynamic("get$elements").Element = function() {
  return new _ChildrenElementList._wrap$ctor(this);
}
$dynamic("get$on").Element = function() {
  return new _ElementEventsImpl(this);
}
$dynamic("get$_children").Element = function() {
  return this.children;
}
$dynamic("get$_firstElementChild").Element = function() {
  return this.firstElementChild;
}
$dynamic("set$innerHTML").Element = function(value) { return this.innerHTML = value; };
$dynamic("get$tagName").Element = function() { return this.tagName; };
$dynamic("get$click").Element = function() {
  return this.click.bind(this);
}
$dynamic("query").Element = function(selectors) {
  return this.querySelector(selectors);
}
// ********** Code for _HTMLElementImpl **************
// ********** Code for _AbstractWorkerImpl **************
$dynamic("_addEventListener").AbstractWorker = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _AnchorElementImpl **************
$dynamic("is$html_Element").HTMLAnchorElement = function(){return true};
$dynamic("get$name").HTMLAnchorElement = function() { return this.name; };
// ********** Code for _AnimationImpl **************
$dynamic("get$name").WebKitAnimation = function() { return this.name; };
// ********** Code for _EventImpl **************
// ********** Code for _AnimationEventImpl **************
// ********** Code for _AnimationListImpl **************
$dynamic("get$length").WebKitAnimationList = function() { return this.length; };
// ********** Code for _AppletElementImpl **************
$dynamic("is$html_Element").HTMLAppletElement = function(){return true};
$dynamic("get$name").HTMLAppletElement = function() { return this.name; };
// ********** Code for _AreaElementImpl **************
$dynamic("is$html_Element").HTMLAreaElement = function(){return true};
// ********** Code for _ArrayBufferImpl **************
// ********** Code for _ArrayBufferViewImpl **************
// ********** Code for _AttrImpl **************
$dynamic("get$name").Attr = function() { return this.name; };
$dynamic("get$value").Attr = function() { return this.value; };
$dynamic("set$value").Attr = function(value) { return this.value = value; };
// ********** Code for _AudioBufferImpl **************
$dynamic("get$length").AudioBuffer = function() { return this.length; };
// ********** Code for _AudioNodeImpl **************
// ********** Code for _AudioSourceNodeImpl **************
// ********** Code for _AudioBufferSourceNodeImpl **************
// ********** Code for _AudioChannelMergerImpl **************
// ********** Code for _AudioChannelSplitterImpl **************
// ********** Code for _AudioContextImpl **************
// ********** Code for _AudioDestinationNodeImpl **************
// ********** Code for _MediaElementImpl **************
$dynamic("is$html_Element").HTMLMediaElement = function(){return true};
// ********** Code for _AudioElementImpl **************
$dynamic("is$html_Element").HTMLAudioElement = function(){return true};
// ********** Code for _AudioParamImpl **************
$dynamic("get$name").AudioParam = function() { return this.name; };
$dynamic("get$value").AudioParam = function() { return this.value; };
$dynamic("set$value").AudioParam = function(value) { return this.value = value; };
// ********** Code for _AudioGainImpl **************
// ********** Code for _AudioGainNodeImpl **************
// ********** Code for _AudioListenerImpl **************
// ********** Code for _AudioPannerNodeImpl **************
// ********** Code for _AudioProcessingEventImpl **************
// ********** Code for _BRElementImpl **************
$dynamic("is$html_Element").HTMLBRElement = function(){return true};
// ********** Code for _BarInfoImpl **************
// ********** Code for _BaseElementImpl **************
$dynamic("is$html_Element").HTMLBaseElement = function(){return true};
// ********** Code for _BaseFontElementImpl **************
$dynamic("is$html_Element").HTMLBaseFontElement = function(){return true};
// ********** Code for _BeforeLoadEventImpl **************
// ********** Code for _BiquadFilterNodeImpl **************
// ********** Code for _BlobImpl **************
// ********** Code for _BlobBuilderImpl **************
// ********** Code for _BodyElementImpl **************
$dynamic("is$html_Element").HTMLBodyElement = function(){return true};
$dynamic("get$on").HTMLBodyElement = function() {
  return new _BodyElementEventsImpl(this);
}
// ********** Code for _EventsImpl **************
function _EventsImpl(_ptr) {
  this._ptr = _ptr;
}
_EventsImpl.prototype.$index = function(type) {
  return this._get(type.toLowerCase());
}
_EventsImpl.prototype._get = function(type) {
  return new _EventListenerListImpl(this._ptr, type);
}
// ********** Code for _ElementEventsImpl **************
$inherits(_ElementEventsImpl, _EventsImpl);
function _ElementEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_ElementEventsImpl.prototype.get$change = function() {
  return this._get("change");
}
_ElementEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
// ********** Code for _BodyElementEventsImpl **************
$inherits(_BodyElementEventsImpl, _ElementEventsImpl);
function _BodyElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
// ********** Code for _ButtonElementImpl **************
$dynamic("is$html_Element").HTMLButtonElement = function(){return true};
$dynamic("get$name").HTMLButtonElement = function() { return this.name; };
$dynamic("get$value").HTMLButtonElement = function() { return this.value; };
$dynamic("set$value").HTMLButtonElement = function(value) { return this.value = value; };
// ********** Code for _CharacterDataImpl **************
$dynamic("get$length").CharacterData = function() { return this.length; };
// ********** Code for _TextImpl **************
// ********** Code for _CDATASectionImpl **************
// ********** Code for _CSSRuleImpl **************
// ********** Code for _CSSCharsetRuleImpl **************
// ********** Code for _CSSFontFaceRuleImpl **************
// ********** Code for _CSSImportRuleImpl **************
$dynamic("get$styleSheet").CSSImportRule = function() { return this.styleSheet; };
// ********** Code for _CSSKeyframeRuleImpl **************
// ********** Code for _CSSKeyframesRuleImpl **************
$dynamic("get$name").WebKitCSSKeyframesRule = function() { return this.name; };
// ********** Code for _CSSMatrixImpl **************
// ********** Code for _CSSMediaRuleImpl **************
// ********** Code for _CSSPageRuleImpl **************
// ********** Code for _CSSValueImpl **************
// ********** Code for _CSSPrimitiveValueImpl **************
// ********** Code for _CSSRuleListImpl **************
$dynamic("get$length").CSSRuleList = function() { return this.length; };
// ********** Code for _CSSStyleDeclarationImpl **************
$dynamic("get$length").CSSStyleDeclaration = function() { return this.length; };
$dynamic("get$content").CSSStyleDeclaration = function() {
  return this.getPropertyValue("content");
}
// ********** Code for _CSSStyleRuleImpl **************
// ********** Code for _StyleSheetImpl **************
// ********** Code for _CSSStyleSheetImpl **************
// ********** Code for _CSSValueListImpl **************
$dynamic("get$length").CSSValueList = function() { return this.length; };
// ********** Code for _CSSTransformValueImpl **************
// ********** Code for _CSSUnknownRuleImpl **************
// ********** Code for _CanvasElementImpl **************
$dynamic("is$html_Element").HTMLCanvasElement = function(){return true};
// ********** Code for _CanvasGradientImpl **************
// ********** Code for _CanvasPatternImpl **************
// ********** Code for _CanvasPixelArrayImpl **************
$dynamic("is$List").CanvasPixelArray = function(){return true};
$dynamic("is$Collection").CanvasPixelArray = function(){return true};
$dynamic("get$length").CanvasPixelArray = function() { return this.length; };
$dynamic("$index").CanvasPixelArray = function(index) {
  return this[index];
}
$dynamic("$setindex").CanvasPixelArray = function(index, value) {
  this[index] = value
}
$dynamic("iterator").CanvasPixelArray = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").CanvasPixelArray = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").CanvasPixelArray = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").CanvasPixelArray = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").CanvasPixelArray = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").CanvasPixelArray = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").CanvasPixelArray = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").CanvasPixelArray = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").CanvasPixelArray = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _CanvasRenderingContextImpl **************
// ********** Code for _CanvasRenderingContext2DImpl **************
// ********** Code for _ClientRectImpl **************
// ********** Code for _ClientRectListImpl **************
$dynamic("get$length").ClientRectList = function() { return this.length; };
// ********** Code for _ClipboardImpl **************
// ********** Code for _CloseEventImpl **************
// ********** Code for _CommentImpl **************
// ********** Code for _UIEventImpl **************
// ********** Code for _CompositionEventImpl **************
// ********** Code for _ConsoleImpl **************
_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
// ********** Code for _ContentElementImpl **************
$dynamic("is$html_Element").HTMLContentElement = function(){return true};
// ********** Code for _ConvolverNodeImpl **************
// ********** Code for _CoordinatesImpl **************
// ********** Code for _CounterImpl **************
// ********** Code for _CryptoImpl **************
// ********** Code for _CustomEventImpl **************
// ********** Code for _DListElementImpl **************
$dynamic("is$html_Element").HTMLDListElement = function(){return true};
// ********** Code for _DOMApplicationCacheImpl **************
$dynamic("_addEventListener").DOMApplicationCache = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _DOMExceptionImpl **************
$dynamic("get$name").DOMException = function() { return this.name; };
// ********** Code for _DOMFileSystemImpl **************
$dynamic("get$name").DOMFileSystem = function() { return this.name; };
// ********** Code for _DOMFileSystemSyncImpl **************
$dynamic("get$name").DOMFileSystemSync = function() { return this.name; };
// ********** Code for _DOMFormDataImpl **************
// ********** Code for _DOMImplementationImpl **************
// ********** Code for _DOMMimeTypeImpl **************
// ********** Code for _DOMMimeTypeArrayImpl **************
$dynamic("get$length").DOMMimeTypeArray = function() { return this.length; };
// ********** Code for _DOMParserImpl **************
// ********** Code for _DOMPluginImpl **************
$dynamic("get$length").DOMPlugin = function() { return this.length; };
$dynamic("get$name").DOMPlugin = function() { return this.name; };
// ********** Code for _DOMPluginArrayImpl **************
$dynamic("get$length").DOMPluginArray = function() { return this.length; };
// ********** Code for _DOMSelectionImpl **************
// ********** Code for _DOMTokenListImpl **************
$dynamic("get$length").DOMTokenList = function() { return this.length; };
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
// ********** Code for _DOMSettableTokenListImpl **************
$dynamic("get$value").DOMSettableTokenList = function() { return this.value; };
$dynamic("set$value").DOMSettableTokenList = function(value) { return this.value = value; };
// ********** Code for _DOMURLImpl **************
// ********** Code for _DataTransferItemImpl **************
$dynamic("get$kind").DataTransferItem = function() { return this.kind; };
// ********** Code for _DataTransferItemListImpl **************
$dynamic("get$length").DataTransferItemList = function() { return this.length; };
$dynamic("add$1").DataTransferItemList = function($0) {
  return this.add($0);
};
$dynamic("clear$0").DataTransferItemList = function() {
  return this.clear();
};
// ********** Code for _DataViewImpl **************
// ********** Code for _DatabaseImpl **************
// ********** Code for _DatabaseSyncImpl **************
// ********** Code for _WorkerContextImpl **************
// ********** Code for _DedicatedWorkerContextImpl **************
// ********** Code for _DelayNodeImpl **************
// ********** Code for _DeprecatedPeerConnectionImpl **************
// ********** Code for _DetailsElementImpl **************
$dynamic("is$html_Element").HTMLDetailsElement = function(){return true};
// ********** Code for _DeviceMotionEventImpl **************
// ********** Code for _DeviceOrientationEventImpl **************
// ********** Code for _DirectoryElementImpl **************
$dynamic("is$html_Element").HTMLDirectoryElement = function(){return true};
// ********** Code for _EntryImpl **************
$dynamic("get$name").Entry = function() { return this.name; };
// ********** Code for _DirectoryEntryImpl **************
// ********** Code for _EntrySyncImpl **************
$dynamic("get$name").EntrySync = function() { return this.name; };
$dynamic("remove$0").EntrySync = function() {
  return this.remove();
};
// ********** Code for _DirectoryEntrySyncImpl **************
// ********** Code for _DirectoryReaderImpl **************
// ********** Code for _DirectoryReaderSyncImpl **************
// ********** Code for _DivElementImpl **************
$dynamic("is$html_Element").HTMLDivElement = function(){return true};
// ********** Code for _DocumentImpl **************
$dynamic("is$html_Element").HTMLHtmlElement = function(){return true};
$dynamic("get$on").HTMLHtmlElement = function() {
  return new _DocumentEventsImpl(this.get$_jsDocument());
}
$dynamic("get$body").HTMLHtmlElement = function() {
  return this.parentNode.body;
}
$dynamic("_createElement").HTMLHtmlElement = function(tagName) {
  return this.parentNode.createElement(tagName);
}
$dynamic("get$_jsDocument").HTMLHtmlElement = function() {
  return this.parentNode;
}
$dynamic("get$parent").HTMLHtmlElement = function() {
  return null;
}
// ********** Code for _SecretHtmlDocumentImpl **************
// ********** Code for _DocumentEventsImpl **************
$inherits(_DocumentEventsImpl, _ElementEventsImpl);
function _DocumentEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
_DocumentEventsImpl.prototype.get$change = function() {
  return this._get("change");
}
_DocumentEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
// ********** Code for FilteredElementList **************
function FilteredElementList(node) {
  this._childNodes = node.get$nodes();
  this._node = node;
}
FilteredElementList.prototype.is$List = function(){return true};
FilteredElementList.prototype.is$Collection = function(){return true};
FilteredElementList.prototype.get$_filtered = function() {
  return ListFactory.ListFactory$from$factory(this._childNodes.filter((function (n) {
    return !!(n && n.is$html_Element());
  })
  ));
}
FilteredElementList.prototype.get$first = function() {
  var $$list = this._childNodes;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var node = $$i.next$0();
    if (!!(node && node.is$html_Element())) {
      return node;
    }
  }
  return null;
}
FilteredElementList.prototype.forEach = function(f) {
  this.get$_filtered().forEach(f);
}
FilteredElementList.prototype.$setindex = function(index, value) {
  this.$index(index).replaceWith(value);
}
FilteredElementList.prototype.add = function(value) {
  this._childNodes.add(value);
}
FilteredElementList.prototype.get$add = function() {
  return this.add.bind(this);
}
FilteredElementList.prototype.addAll = function(collection) {
  collection.forEach(this.get$add());
}
FilteredElementList.prototype.clear = function() {
  this._childNodes.clear();
}
FilteredElementList.prototype.removeLast = function() {
  var last = this.last();
  if ($ne$(last)) {
    last.remove$0();
  }
  return last;
}
FilteredElementList.prototype.filter = function(f) {
  return this.get$_filtered().filter(f);
}
FilteredElementList.prototype.get$length = function() {
  return this.get$_filtered().get$length();
}
FilteredElementList.prototype.$index = function(index) {
  return this.get$_filtered().$index(index);
}
FilteredElementList.prototype.iterator = function() {
  return this.get$_filtered().iterator();
}
FilteredElementList.prototype.indexOf = function(element, start) {
  return this.get$_filtered().indexOf(element, start);
}
FilteredElementList.prototype.last = function() {
  return this.get$_filtered().last();
}
FilteredElementList.prototype.add$1 = FilteredElementList.prototype.add;
FilteredElementList.prototype.clear$0 = FilteredElementList.prototype.clear;
FilteredElementList.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _DocumentFragmentImpl **************
$dynamic("is$html_Element").DocumentFragment = function(){return true};
$dynamic("get$elements").DocumentFragment = function() {
  if (this._elements == null) {
    this._elements = new FilteredElementList(this);
  }
  return this._elements;
}
$dynamic("set$innerHTML").DocumentFragment = function(value) {
  this.get$nodes().clear();
  var e = _ElementFactoryProvider.Element$tag$factory("div");
  e.set$innerHTML(value);
  var nodes = ListFactory.ListFactory$from$factory(e.get$nodes());
  this.get$nodes().addAll(nodes);
}
$dynamic("get$tagName").DocumentFragment = function() {
  return "";
}
$dynamic("get$parent").DocumentFragment = function() {
  return null;
}
$dynamic("click").DocumentFragment = function() {

}
$dynamic("get$click").DocumentFragment = function() {
  return this.click.bind(this);
}
$dynamic("get$on").DocumentFragment = function() {
  return new _ElementEventsImpl(this);
}
$dynamic("query").DocumentFragment = function(selectors) {
  return this.querySelector(selectors);
}
// ********** Code for _DocumentTypeImpl **************
$dynamic("get$name").DocumentType = function() { return this.name; };
// ********** Code for _DynamicsCompressorNodeImpl **************
// ********** Code for _EXTTextureFilterAnisotropicImpl **************
// ********** Code for _ChildrenElementList **************
_ChildrenElementList._wrap$ctor = function(element) {
  this._childElements = element.get$_children();
  this._html_element = element;
}
_ChildrenElementList._wrap$ctor.prototype = _ChildrenElementList.prototype;
function _ChildrenElementList() {}
_ChildrenElementList.prototype.is$List = function(){return true};
_ChildrenElementList.prototype.is$Collection = function(){return true};
_ChildrenElementList.prototype._toList = function() {
  var output = new Array(this._childElements.get$length());
  for (var i = (0), len = this._childElements.get$length();
   i < len; i++) {
    output.$setindex(i, this._childElements.$index(i));
  }
  return output;
}
_ChildrenElementList.prototype.get$first = function() {
  return this._html_element.get$_firstElementChild();
}
_ChildrenElementList.prototype.forEach = function(f) {
  var $$list = this._childElements;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    f(element);
  }
}
_ChildrenElementList.prototype.filter = function(f) {
  var output = [];
  this.forEach((function (element) {
    if (f(element)) {
      output.add$1(element);
    }
  })
  );
  return new _FrozenElementList._wrap$ctor(output);
}
_ChildrenElementList.prototype.get$length = function() {
  return this._childElements.get$length();
}
_ChildrenElementList.prototype.$index = function(index) {
  return this._childElements.$index(index);
}
_ChildrenElementList.prototype.$setindex = function(index, value) {
  this._html_element._replaceChild(value, this._childElements.$index(index));
}
_ChildrenElementList.prototype.add = function(value) {
  this._html_element._appendChild(value);
  return value;
}
_ChildrenElementList.prototype.iterator = function() {
  return this._toList().iterator();
}
_ChildrenElementList.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var element = $$i.next$0();
    this._html_element._appendChild(element);
  }
}
_ChildrenElementList.prototype.indexOf = function(element, start) {
  return _Lists.indexOf(this, element, start, this.get$length());
}
_ChildrenElementList.prototype.clear = function() {
  this._html_element.set$text("");
}
_ChildrenElementList.prototype.removeLast = function() {
  var last = this.last();
  if ($ne$(last)) {
    this._html_element._removeChild(last);
  }
  return last;
}
_ChildrenElementList.prototype.last = function() {
  return this._html_element.lastElementChild;
}
_ChildrenElementList.prototype.add$1 = _ChildrenElementList.prototype.add;
_ChildrenElementList.prototype.clear$0 = _ChildrenElementList.prototype.clear;
_ChildrenElementList.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _FrozenElementList **************
_FrozenElementList._wrap$ctor = function(_nodeList) {
  this._nodeList = _nodeList;
}
_FrozenElementList._wrap$ctor.prototype = _FrozenElementList.prototype;
function _FrozenElementList() {}
_FrozenElementList.prototype.is$List = function(){return true};
_FrozenElementList.prototype.is$Collection = function(){return true};
_FrozenElementList.prototype.get$first = function() {
  return this._nodeList.$index((0));
}
_FrozenElementList.prototype.forEach = function(f) {
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    f(el);
  }
}
_FrozenElementList.prototype.filter = function(f) {
  var out = new _ElementList([]);
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    if (f(el)) out.add$1(el);
  }
  return out;
}
_FrozenElementList.prototype.get$length = function() {
  return this._nodeList.get$length();
}
_FrozenElementList.prototype.$index = function(index) {
  return this._nodeList.$index(index);
}
_FrozenElementList.prototype.$setindex = function(index, value) {
  $throw(const$0003);
}
_FrozenElementList.prototype.add = function(value) {
  $throw(const$0003);
}
_FrozenElementList.prototype.iterator = function() {
  return new _FrozenElementListIterator(this);
}
_FrozenElementList.prototype.addAll = function(collection) {
  $throw(const$0003);
}
_FrozenElementList.prototype.indexOf = function(element, start) {
  return this._nodeList.indexOf(element, start);
}
_FrozenElementList.prototype.clear = function() {
  $throw(const$0003);
}
_FrozenElementList.prototype.removeLast = function() {
  $throw(const$0003);
}
_FrozenElementList.prototype.last = function() {
  return this._nodeList.last();
}
_FrozenElementList.prototype.add$1 = _FrozenElementList.prototype.add;
_FrozenElementList.prototype.clear$0 = _FrozenElementList.prototype.clear;
_FrozenElementList.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _FrozenElementListIterator **************
function _FrozenElementListIterator(_list) {
  this._html_index = (0);
  this._html_list = _list;
}
_FrozenElementListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._html_list.$index(this._html_index++);
}
_FrozenElementListIterator.prototype.hasNext = function() {
  return this._html_index < this._html_list.get$length();
}
_FrozenElementListIterator.prototype.next$0 = _FrozenElementListIterator.prototype.next;
// ********** Code for _ListWrapper **************
function _ListWrapper() {}
_ListWrapper.prototype.is$List = function(){return true};
_ListWrapper.prototype.is$Collection = function(){return true};
_ListWrapper.prototype.iterator = function() {
  return this._html_list.iterator();
}
_ListWrapper.prototype.forEach = function(f) {
  return this._html_list.forEach(f);
}
_ListWrapper.prototype.filter = function(f) {
  return this._html_list.filter(f);
}
_ListWrapper.prototype.get$length = function() {
  return this._html_list.get$length();
}
_ListWrapper.prototype.$index = function(index) {
  return this._html_list.$index(index);
}
_ListWrapper.prototype.$setindex = function(index, value) {
  this._html_list.$setindex(index, value);
}
_ListWrapper.prototype.add = function(value) {
  return this._html_list.add(value);
}
_ListWrapper.prototype.addAll = function(collection) {
  return this._html_list.addAll(collection);
}
_ListWrapper.prototype.indexOf = function(element, start) {
  return this._html_list.indexOf(element, start);
}
_ListWrapper.prototype.clear = function() {
  return this._html_list.clear();
}
_ListWrapper.prototype.removeLast = function() {
  return this._html_list.removeLast();
}
_ListWrapper.prototype.last = function() {
  return this._html_list.last();
}
_ListWrapper.prototype.get$first = function() {
  return this._html_list.$index((0));
}
_ListWrapper.prototype.add$1 = _ListWrapper.prototype.add;
_ListWrapper.prototype.clear$0 = _ListWrapper.prototype.clear;
_ListWrapper.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _ListWrapper_Element **************
$inherits(_ListWrapper_Element, _ListWrapper);
function _ListWrapper_Element(_list) {
  this._html_list = _list;
}
_ListWrapper_Element.prototype.is$List = function(){return true};
_ListWrapper_Element.prototype.is$Collection = function(){return true};
_ListWrapper_Element.prototype.add$1 = _ListWrapper_Element.prototype.add;
_ListWrapper_Element.prototype.clear$0 = _ListWrapper_Element.prototype.clear;
_ListWrapper_Element.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _ElementList **************
$inherits(_ElementList, _ListWrapper_Element);
function _ElementList(list) {
  _ListWrapper_Element.call(this, list);
}
_ElementList.prototype.is$List = function(){return true};
_ElementList.prototype.is$Collection = function(){return true};
_ElementList.prototype.filter = function(f) {
  return new _ElementList(_ListWrapper_Element.prototype.filter.call(this, f));
}
// ********** Code for _ElementTimeControlImpl **************
// ********** Code for _ElementTraversalImpl **************
// ********** Code for _EmbedElementImpl **************
$dynamic("is$html_Element").HTMLEmbedElement = function(){return true};
$dynamic("get$name").HTMLEmbedElement = function() { return this.name; };
// ********** Code for _EntityImpl **************
// ********** Code for _EntityReferenceImpl **************
// ********** Code for _EntryArrayImpl **************
$dynamic("get$length").EntryArray = function() { return this.length; };
// ********** Code for _EntryArraySyncImpl **************
$dynamic("get$length").EntryArraySync = function() { return this.length; };
// ********** Code for _ErrorEventImpl **************
// ********** Code for _EventExceptionImpl **************
$dynamic("get$name").EventException = function() { return this.name; };
// ********** Code for _EventSourceImpl **************
$dynamic("_addEventListener").EventSource = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _EventListenerListImpl **************
function _EventListenerListImpl(_ptr, _type) {
  this._ptr = _ptr;
  this._type = _type;
}
_EventListenerListImpl.prototype.add = function(listener, useCapture) {
  this._add(listener, useCapture);
  return this;
}
_EventListenerListImpl.prototype._add = function(listener, useCapture) {
  this._ptr._addEventListener(this._type, listener, useCapture);
}
_EventListenerListImpl.prototype.add$1 = function($0) {
  return this.add(to$call$1($0), false);
};
// ********** Code for _FieldSetElementImpl **************
$dynamic("is$html_Element").HTMLFieldSetElement = function(){return true};
$dynamic("get$name").HTMLFieldSetElement = function() { return this.name; };
// ********** Code for _FileImpl **************
$dynamic("get$name").File = function() { return this.name; };
// ********** Code for _FileEntryImpl **************
// ********** Code for _FileEntrySyncImpl **************
// ********** Code for _FileErrorImpl **************
// ********** Code for _FileExceptionImpl **************
$dynamic("get$name").FileException = function() { return this.name; };
// ********** Code for _FileListImpl **************
$dynamic("get$length").FileList = function() { return this.length; };
// ********** Code for _FileReaderImpl **************
// ********** Code for _FileReaderSyncImpl **************
// ********** Code for _FileWriterImpl **************
$dynamic("get$length").FileWriter = function() { return this.length; };
// ********** Code for _FileWriterSyncImpl **************
$dynamic("get$length").FileWriterSync = function() { return this.length; };
// ********** Code for _Float32ArrayImpl **************
var _Float32ArrayImpl = {};
$dynamic("is$List").Float32Array = function(){return true};
$dynamic("is$Collection").Float32Array = function(){return true};
$dynamic("get$length").Float32Array = function() { return this.length; };
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float32Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Float32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").Float32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Float32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Float32Array = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").Float32Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Float64ArrayImpl **************
var _Float64ArrayImpl = {};
$dynamic("is$List").Float64Array = function(){return true};
$dynamic("is$Collection").Float64Array = function(){return true};
$dynamic("get$length").Float64Array = function() { return this.length; };
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float64Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float64Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float64Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float64Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float64Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Float64Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").Float64Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Float64Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Float64Array = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").Float64Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _FontElementImpl **************
$dynamic("is$html_Element").HTMLFontElement = function(){return true};
// ********** Code for _FormElementImpl **************
$dynamic("is$html_Element").HTMLFormElement = function(){return true};
$dynamic("get$length").HTMLFormElement = function() { return this.length; };
$dynamic("get$name").HTMLFormElement = function() { return this.name; };
// ********** Code for _FrameElementImpl **************
$dynamic("is$html_Element").HTMLFrameElement = function(){return true};
$dynamic("get$name").HTMLFrameElement = function() { return this.name; };
// ********** Code for _FrameSetElementImpl **************
$dynamic("is$html_Element").HTMLFrameSetElement = function(){return true};
$dynamic("get$on").HTMLFrameSetElement = function() {
  return new _FrameSetElementEventsImpl(this);
}
// ********** Code for _FrameSetElementEventsImpl **************
$inherits(_FrameSetElementEventsImpl, _ElementEventsImpl);
function _FrameSetElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
// ********** Code for _GeolocationImpl **************
// ********** Code for _GeopositionImpl **************
// ********** Code for _HRElementImpl **************
$dynamic("is$html_Element").HTMLHRElement = function(){return true};
// ********** Code for _HTMLAllCollectionImpl **************
$dynamic("get$length").HTMLAllCollection = function() { return this.length; };
// ********** Code for _HTMLCollectionImpl **************
$dynamic("is$List").HTMLCollection = function(){return true};
$dynamic("is$Collection").HTMLCollection = function(){return true};
$dynamic("get$length").HTMLCollection = function() { return this.length; };
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
$dynamic("$setindex").HTMLCollection = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").HTMLCollection = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").HTMLCollection = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").HTMLCollection = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").HTMLCollection = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").HTMLCollection = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").HTMLCollection = function(element, start) {
  return _Lists.indexOf(this, element, start, this.get$length());
}
$dynamic("last").HTMLCollection = function() {
  return this.$index(this.get$length() - (1));
}
$dynamic("add$1").HTMLCollection = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").HTMLCollection = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _HTMLOptionsCollectionImpl **************
$dynamic("is$List").HTMLOptionsCollection = function(){return true};
$dynamic("is$Collection").HTMLOptionsCollection = function(){return true};
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
// ********** Code for _HashChangeEventImpl **************
// ********** Code for _HeadElementImpl **************
$dynamic("is$html_Element").HTMLHeadElement = function(){return true};
// ********** Code for _HeadingElementImpl **************
$dynamic("is$html_Element").HTMLHeadingElement = function(){return true};
// ********** Code for _HighPass2FilterNodeImpl **************
// ********** Code for _HistoryImpl **************
$dynamic("get$length").History = function() { return this.length; };
// ********** Code for _HtmlElementImpl **************
$dynamic("is$html_Element").IntentionallyInvalid = function(){return true};
// ********** Code for _IDBAnyImpl **************
// ********** Code for _IDBCursorImpl **************
// ********** Code for _IDBCursorWithValueImpl **************
$dynamic("get$value").IDBCursorWithValue = function() { return this.value; };
// ********** Code for _IDBDatabaseImpl **************
$dynamic("get$name").IDBDatabase = function() { return this.name; };
// ********** Code for _IDBDatabaseErrorImpl **************
// ********** Code for _IDBDatabaseExceptionImpl **************
$dynamic("get$name").IDBDatabaseException = function() { return this.name; };
// ********** Code for _IDBFactoryImpl **************
// ********** Code for _IDBIndexImpl **************
$dynamic("get$name").IDBIndex = function() { return this.name; };
// ********** Code for _IDBKeyImpl **************
// ********** Code for _IDBKeyRangeImpl **************
// ********** Code for _IDBObjectStoreImpl **************
$dynamic("get$name").IDBObjectStore = function() { return this.name; };
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
$dynamic("clear$0").IDBObjectStore = function() {
  return this.clear();
};
// ********** Code for _IDBRequestImpl **************
// ********** Code for _IDBTransactionImpl **************
// ********** Code for _IDBVersionChangeEventImpl **************
// ********** Code for _IDBVersionChangeRequestImpl **************
// ********** Code for _IFrameElementImpl **************
$dynamic("is$html_Element").HTMLIFrameElement = function(){return true};
$dynamic("get$name").HTMLIFrameElement = function() { return this.name; };
// ********** Code for _ImageDataImpl **************
// ********** Code for _ImageElementImpl **************
$dynamic("is$html_Element").HTMLImageElement = function(){return true};
$dynamic("get$name").HTMLImageElement = function() { return this.name; };
// ********** Code for _InputElementImpl **************
$dynamic("is$html_Element").HTMLInputElement = function(){return true};
$dynamic("get$on").HTMLInputElement = function() {
  return new _InputElementEventsImpl(this);
}
$dynamic("get$name").HTMLInputElement = function() { return this.name; };
$dynamic("get$value").HTMLInputElement = function() { return this.value; };
$dynamic("set$value").HTMLInputElement = function(value) { return this.value = value; };
// ********** Code for _InputElementEventsImpl **************
$inherits(_InputElementEventsImpl, _ElementEventsImpl);
function _InputElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
// ********** Code for _Int16ArrayImpl **************
var _Int16ArrayImpl = {};
$dynamic("is$List").Int16Array = function(){return true};
$dynamic("is$Collection").Int16Array = function(){return true};
$dynamic("get$length").Int16Array = function() { return this.length; };
$dynamic("$index").Int16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int16Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").Int16Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int16Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Int16Array = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").Int16Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Int32ArrayImpl **************
var _Int32ArrayImpl = {};
$dynamic("is$List").Int32Array = function(){return true};
$dynamic("is$Collection").Int32Array = function(){return true};
$dynamic("get$length").Int32Array = function() { return this.length; };
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").Int32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Int32Array = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").Int32Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Int8ArrayImpl **************
var _Int8ArrayImpl = {};
$dynamic("is$List").Int8Array = function(){return true};
$dynamic("is$Collection").Int8Array = function(){return true};
$dynamic("get$length").Int8Array = function() { return this.length; };
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int8Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").Int8Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int8Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Int8Array = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").Int8Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _JavaScriptAudioNodeImpl **************
// ********** Code for _JavaScriptCallFrameImpl **************
// ********** Code for _KeyboardEventImpl **************
// ********** Code for _KeygenElementImpl **************
$dynamic("is$html_Element").HTMLKeygenElement = function(){return true};
$dynamic("get$name").HTMLKeygenElement = function() { return this.name; };
// ********** Code for _LIElementImpl **************
$dynamic("is$html_Element").HTMLLIElement = function(){return true};
$dynamic("get$value").HTMLLIElement = function() { return this.value; };
$dynamic("set$value").HTMLLIElement = function(value) { return this.value = value; };
// ********** Code for _LabelElementImpl **************
$dynamic("is$html_Element").HTMLLabelElement = function(){return true};
// ********** Code for _LegendElementImpl **************
$dynamic("is$html_Element").HTMLLegendElement = function(){return true};
// ********** Code for _LinkElementImpl **************
$dynamic("is$html_Element").HTMLLinkElement = function(){return true};
// ********** Code for _MediaStreamImpl **************
// ********** Code for _LocalMediaStreamImpl **************
// ********** Code for _LocationImpl **************
// ********** Code for _LowPass2FilterNodeImpl **************
// ********** Code for _MapElementImpl **************
$dynamic("is$html_Element").HTMLMapElement = function(){return true};
$dynamic("get$name").HTMLMapElement = function() { return this.name; };
// ********** Code for _MarqueeElementImpl **************
$dynamic("is$html_Element").HTMLMarqueeElement = function(){return true};
$dynamic("get$start").HTMLMarqueeElement = function() {
  return this.start.bind(this);
}
$dynamic("start$0").HTMLMarqueeElement = function() {
  return this.start();
};
// ********** Code for _MediaControllerImpl **************
// ********** Code for _MediaElementAudioSourceNodeImpl **************
// ********** Code for _MediaErrorImpl **************
// ********** Code for _MediaListImpl **************
$dynamic("is$List").MediaList = function(){return true};
$dynamic("is$Collection").MediaList = function(){return true};
$dynamic("get$length").MediaList = function() { return this.length; };
$dynamic("$index").MediaList = function(index) {
  return this[index];
}
$dynamic("$setindex").MediaList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").MediaList = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").MediaList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").MediaList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").MediaList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").MediaList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").MediaList = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").MediaList = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").MediaList = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _MediaQueryListImpl **************
// ********** Code for _MediaQueryListListenerImpl **************
// ********** Code for _MediaStreamEventImpl **************
// ********** Code for _MediaStreamListImpl **************
$dynamic("get$length").MediaStreamList = function() { return this.length; };
// ********** Code for _MediaStreamTrackImpl **************
$dynamic("get$kind").MediaStreamTrack = function() { return this.kind; };
// ********** Code for _MediaStreamTrackListImpl **************
$dynamic("get$length").MediaStreamTrackList = function() { return this.length; };
// ********** Code for _MemoryInfoImpl **************
// ********** Code for _MenuElementImpl **************
$dynamic("is$html_Element").HTMLMenuElement = function(){return true};
// ********** Code for _MessageChannelImpl **************
// ********** Code for _MessageEventImpl **************
// ********** Code for _MessagePortImpl **************
$dynamic("_addEventListener").MessagePort = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
$dynamic("get$start").MessagePort = function() {
  return this.start.bind(this);
}
$dynamic("start$0").MessagePort = function() {
  return this.start();
};
// ********** Code for _MetaElementImpl **************
$dynamic("is$html_Element").HTMLMetaElement = function(){return true};
$dynamic("get$content").HTMLMetaElement = function() { return this.content; };
$dynamic("get$name").HTMLMetaElement = function() { return this.name; };
// ********** Code for _MetadataImpl **************
// ********** Code for _MeterElementImpl **************
$dynamic("is$html_Element").HTMLMeterElement = function(){return true};
$dynamic("get$value").HTMLMeterElement = function() { return this.value; };
$dynamic("set$value").HTMLMeterElement = function(value) { return this.value = value; };
// ********** Code for _ModElementImpl **************
$dynamic("is$html_Element").HTMLModElement = function(){return true};
// ********** Code for _MouseEventImpl **************
// ********** Code for _MutationEventImpl **************
// ********** Code for _NamedNodeMapImpl **************
$dynamic("is$List").NamedNodeMap = function(){return true};
$dynamic("is$Collection").NamedNodeMap = function(){return true};
$dynamic("get$length").NamedNodeMap = function() { return this.length; };
$dynamic("$index").NamedNodeMap = function(index) {
  return this[index];
}
$dynamic("$setindex").NamedNodeMap = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NamedNodeMap = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").NamedNodeMap = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").NamedNodeMap = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NamedNodeMap = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").NamedNodeMap = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").NamedNodeMap = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").NamedNodeMap = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").NamedNodeMap = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").NamedNodeMap = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _NavigatorImpl **************
// ********** Code for _NavigatorUserMediaErrorImpl **************
// ********** Code for _NodeFilterImpl **************
// ********** Code for _NodeIteratorImpl **************
// ********** Code for _ListWrapper_Node **************
$inherits(_ListWrapper_Node, _ListWrapper);
function _ListWrapper_Node(_list) {
  this._html_list = _list;
}
_ListWrapper_Node.prototype.is$List = function(){return true};
_ListWrapper_Node.prototype.is$Collection = function(){return true};
_ListWrapper_Node.prototype.add$1 = _ListWrapper_Node.prototype.add;
_ListWrapper_Node.prototype.clear$0 = _ListWrapper_Node.prototype.clear;
_ListWrapper_Node.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _NodeListWrapper **************
$inherits(_NodeListWrapper, _ListWrapper_Node);
function _NodeListWrapper(list) {
  _ListWrapper_Node.call(this, list);
}
_NodeListWrapper.prototype.is$List = function(){return true};
_NodeListWrapper.prototype.is$Collection = function(){return true};
_NodeListWrapper.prototype.filter = function(f) {
  return new _NodeListWrapper(this._html_list.filter(f));
}
// ********** Code for _NodeListImpl **************
$dynamic("is$List").NodeList = function(){return true};
$dynamic("is$Collection").NodeList = function(){return true};
$dynamic("set$_parent").NodeList = function(value) { return this._parent = value; };
$dynamic("iterator").NodeList = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").NodeList = function(value) {
  this._parent._appendChild(value);
}
$dynamic("addAll").NodeList = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var node = $$i.next$0();
    this._parent._appendChild(node);
  }
}
$dynamic("removeLast").NodeList = function() {
  var last = this.last();
  if ($ne$(last)) {
    this._parent._removeChild(last);
  }
  return last;
}
$dynamic("clear").NodeList = function() {
  this._parent.set$text("");
}
$dynamic("$setindex").NodeList = function(index, value) {
  this._parent._replaceChild(value, this.$index(index));
}
$dynamic("forEach").NodeList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").NodeList = function(f) {
  return new _NodeListWrapper(_Collections.filter(this, [], f));
}
$dynamic("indexOf").NodeList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").NodeList = function() {
  return this.$index(this.length - (1));
}
$dynamic("get$length").NodeList = function() { return this.length; };
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
$dynamic("add$1").NodeList = function($0) {
  return this.add($0);
};
$dynamic("clear$0").NodeList = function() {
  return this.clear();
};
$dynamic("indexOf$1").NodeList = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _NodeSelectorImpl **************
// ********** Code for _NotationImpl **************
// ********** Code for _NotificationImpl **************
// ********** Code for _NotificationCenterImpl **************
// ********** Code for _OESStandardDerivativesImpl **************
// ********** Code for _OESTextureFloatImpl **************
// ********** Code for _OESVertexArrayObjectImpl **************
// ********** Code for _OListElementImpl **************
$dynamic("is$html_Element").HTMLOListElement = function(){return true};
$dynamic("get$start").HTMLOListElement = function() { return this.start; };
// ********** Code for _ObjectElementImpl **************
$dynamic("is$html_Element").HTMLObjectElement = function(){return true};
$dynamic("get$name").HTMLObjectElement = function() { return this.name; };
// ********** Code for _OfflineAudioCompletionEventImpl **************
// ********** Code for _OperationNotAllowedExceptionImpl **************
$dynamic("get$name").OperationNotAllowedException = function() { return this.name; };
// ********** Code for _OptGroupElementImpl **************
$dynamic("is$html_Element").HTMLOptGroupElement = function(){return true};
// ********** Code for _OptionElementImpl **************
$dynamic("is$html_Element").HTMLOptionElement = function(){return true};
$dynamic("get$value").HTMLOptionElement = function() { return this.value; };
$dynamic("set$value").HTMLOptionElement = function(value) { return this.value = value; };
// ********** Code for _OutputElementImpl **************
$dynamic("is$html_Element").HTMLOutputElement = function(){return true};
$dynamic("get$name").HTMLOutputElement = function() { return this.name; };
$dynamic("get$value").HTMLOutputElement = function() { return this.value; };
$dynamic("set$value").HTMLOutputElement = function(value) { return this.value = value; };
// ********** Code for _OverflowEventImpl **************
// ********** Code for _PageTransitionEventImpl **************
// ********** Code for _ParagraphElementImpl **************
$dynamic("is$html_Element").HTMLParagraphElement = function(){return true};
// ********** Code for _ParamElementImpl **************
$dynamic("is$html_Element").HTMLParamElement = function(){return true};
$dynamic("get$name").HTMLParamElement = function() { return this.name; };
$dynamic("get$value").HTMLParamElement = function() { return this.value; };
$dynamic("set$value").HTMLParamElement = function(value) { return this.value = value; };
// ********** Code for _PerformanceImpl **************
// ********** Code for _PerformanceNavigationImpl **************
// ********** Code for _PerformanceTimingImpl **************
// ********** Code for _PointImpl **************
// ********** Code for _PopStateEventImpl **************
// ********** Code for _PositionErrorImpl **************
// ********** Code for _PreElementImpl **************
$dynamic("is$html_Element").HTMLPreElement = function(){return true};
// ********** Code for _ProcessingInstructionImpl **************
// ********** Code for _ProgressElementImpl **************
$dynamic("is$html_Element").HTMLProgressElement = function(){return true};
$dynamic("get$value").HTMLProgressElement = function() { return this.value; };
$dynamic("set$value").HTMLProgressElement = function(value) { return this.value = value; };
// ********** Code for _ProgressEventImpl **************
// ********** Code for _QuoteElementImpl **************
$dynamic("is$html_Element").HTMLQuoteElement = function(){return true};
// ********** Code for _RGBColorImpl **************
// ********** Code for _RangeImpl **************
// ********** Code for _RangeExceptionImpl **************
$dynamic("get$name").RangeException = function() { return this.name; };
// ********** Code for _RealtimeAnalyserNodeImpl **************
// ********** Code for _RectImpl **************
// ********** Code for _SQLErrorImpl **************
// ********** Code for _SQLExceptionImpl **************
// ********** Code for _SQLResultSetImpl **************
// ********** Code for _SQLResultSetRowListImpl **************
$dynamic("get$length").SQLResultSetRowList = function() { return this.length; };
// ********** Code for _SQLTransactionImpl **************
// ********** Code for _SQLTransactionSyncImpl **************
// ********** Code for _SVGElementImpl **************
$dynamic("is$html_Element").SVGElement = function(){return true};
$dynamic("get$elements").SVGElement = function() {
  return new FilteredElementList(this);
}
$dynamic("set$elements").SVGElement = function(value) {
  var elements = this.get$elements();
  elements.clear$0();
  elements.addAll(value);
}
$dynamic("set$innerHTML").SVGElement = function(svg) {
  var container = _ElementFactoryProvider.Element$tag$factory("div");
  container.set$innerHTML(("<svg version=\"1.1\">" + svg + "</svg>"));
  this.set$elements(container.get$elements().get$first().get$elements());
}
// ********** Code for _SVGAElementImpl **************
$dynamic("is$html_Element").SVGAElement = function(){return true};
// ********** Code for _SVGAltGlyphDefElementImpl **************
$dynamic("is$html_Element").SVGAltGlyphDefElement = function(){return true};
// ********** Code for _SVGTextContentElementImpl **************
$dynamic("is$html_Element").SVGTextContentElement = function(){return true};
// ********** Code for _SVGTextPositioningElementImpl **************
$dynamic("is$html_Element").SVGTextPositioningElement = function(){return true};
// ********** Code for _SVGAltGlyphElementImpl **************
$dynamic("is$html_Element").SVGAltGlyphElement = function(){return true};
// ********** Code for _SVGAltGlyphItemElementImpl **************
$dynamic("is$html_Element").SVGAltGlyphItemElement = function(){return true};
// ********** Code for _SVGAngleImpl **************
$dynamic("get$value").SVGAngle = function() { return this.value; };
$dynamic("set$value").SVGAngle = function(value) { return this.value = value; };
// ********** Code for _SVGAnimationElementImpl **************
$dynamic("is$html_Element").SVGAnimationElement = function(){return true};
// ********** Code for _SVGAnimateColorElementImpl **************
$dynamic("is$html_Element").SVGAnimateColorElement = function(){return true};
// ********** Code for _SVGAnimateElementImpl **************
$dynamic("is$html_Element").SVGAnimateElement = function(){return true};
// ********** Code for _SVGAnimateMotionElementImpl **************
$dynamic("is$html_Element").SVGAnimateMotionElement = function(){return true};
// ********** Code for _SVGAnimateTransformElementImpl **************
$dynamic("is$html_Element").SVGAnimateTransformElement = function(){return true};
// ********** Code for _SVGAnimatedAngleImpl **************
// ********** Code for _SVGAnimatedBooleanImpl **************
// ********** Code for _SVGAnimatedEnumerationImpl **************
// ********** Code for _SVGAnimatedIntegerImpl **************
// ********** Code for _SVGAnimatedLengthImpl **************
// ********** Code for _SVGAnimatedLengthListImpl **************
// ********** Code for _SVGAnimatedNumberImpl **************
// ********** Code for _SVGAnimatedNumberListImpl **************
// ********** Code for _SVGAnimatedPreserveAspectRatioImpl **************
// ********** Code for _SVGAnimatedRectImpl **************
// ********** Code for _SVGAnimatedStringImpl **************
// ********** Code for _SVGAnimatedTransformListImpl **************
// ********** Code for _SVGCircleElementImpl **************
$dynamic("is$html_Element").SVGCircleElement = function(){return true};
// ********** Code for _SVGClipPathElementImpl **************
$dynamic("is$html_Element").SVGClipPathElement = function(){return true};
// ********** Code for _SVGColorImpl **************
// ********** Code for _SVGComponentTransferFunctionElementImpl **************
$dynamic("is$html_Element").SVGComponentTransferFunctionElement = function(){return true};
// ********** Code for _SVGCursorElementImpl **************
$dynamic("is$html_Element").SVGCursorElement = function(){return true};
// ********** Code for _SVGDefsElementImpl **************
$dynamic("is$html_Element").SVGDefsElement = function(){return true};
// ********** Code for _SVGDescElementImpl **************
$dynamic("is$html_Element").SVGDescElement = function(){return true};
// ********** Code for _SVGDocumentImpl **************
$dynamic("is$html_Element").SVGDocument = function(){return true};
// ********** Code for _SVGElementInstanceImpl **************
$dynamic("_addEventListener").SVGElementInstance = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _SVGElementInstanceListImpl **************
$dynamic("get$length").SVGElementInstanceList = function() { return this.length; };
// ********** Code for _SVGEllipseElementImpl **************
$dynamic("is$html_Element").SVGEllipseElement = function(){return true};
// ********** Code for _SVGExceptionImpl **************
$dynamic("get$name").SVGException = function() { return this.name; };
// ********** Code for _SVGExternalResourcesRequiredImpl **************
// ********** Code for _SVGFEBlendElementImpl **************
$dynamic("is$html_Element").SVGFEBlendElement = function(){return true};
// ********** Code for _SVGFEColorMatrixElementImpl **************
$dynamic("is$html_Element").SVGFEColorMatrixElement = function(){return true};
// ********** Code for _SVGFEComponentTransferElementImpl **************
$dynamic("is$html_Element").SVGFEComponentTransferElement = function(){return true};
// ********** Code for _SVGFECompositeElementImpl **************
$dynamic("is$html_Element").SVGFECompositeElement = function(){return true};
// ********** Code for _SVGFEConvolveMatrixElementImpl **************
$dynamic("is$html_Element").SVGFEConvolveMatrixElement = function(){return true};
// ********** Code for _SVGFEDiffuseLightingElementImpl **************
$dynamic("is$html_Element").SVGFEDiffuseLightingElement = function(){return true};
// ********** Code for _SVGFEDisplacementMapElementImpl **************
$dynamic("is$html_Element").SVGFEDisplacementMapElement = function(){return true};
// ********** Code for _SVGFEDistantLightElementImpl **************
$dynamic("is$html_Element").SVGFEDistantLightElement = function(){return true};
// ********** Code for _SVGFEDropShadowElementImpl **************
$dynamic("is$html_Element").SVGFEDropShadowElement = function(){return true};
// ********** Code for _SVGFEFloodElementImpl **************
$dynamic("is$html_Element").SVGFEFloodElement = function(){return true};
// ********** Code for _SVGFEFuncAElementImpl **************
$dynamic("is$html_Element").SVGFEFuncAElement = function(){return true};
// ********** Code for _SVGFEFuncBElementImpl **************
$dynamic("is$html_Element").SVGFEFuncBElement = function(){return true};
// ********** Code for _SVGFEFuncGElementImpl **************
$dynamic("is$html_Element").SVGFEFuncGElement = function(){return true};
// ********** Code for _SVGFEFuncRElementImpl **************
$dynamic("is$html_Element").SVGFEFuncRElement = function(){return true};
// ********** Code for _SVGFEGaussianBlurElementImpl **************
$dynamic("is$html_Element").SVGFEGaussianBlurElement = function(){return true};
// ********** Code for _SVGFEImageElementImpl **************
$dynamic("is$html_Element").SVGFEImageElement = function(){return true};
// ********** Code for _SVGFEMergeElementImpl **************
$dynamic("is$html_Element").SVGFEMergeElement = function(){return true};
// ********** Code for _SVGFEMergeNodeElementImpl **************
$dynamic("is$html_Element").SVGFEMergeNodeElement = function(){return true};
// ********** Code for _SVGFEMorphologyElementImpl **************
$dynamic("is$html_Element").SVGFEMorphologyElement = function(){return true};
// ********** Code for _SVGFEOffsetElementImpl **************
$dynamic("is$html_Element").SVGFEOffsetElement = function(){return true};
// ********** Code for _SVGFEPointLightElementImpl **************
$dynamic("is$html_Element").SVGFEPointLightElement = function(){return true};
// ********** Code for _SVGFESpecularLightingElementImpl **************
$dynamic("is$html_Element").SVGFESpecularLightingElement = function(){return true};
// ********** Code for _SVGFESpotLightElementImpl **************
$dynamic("is$html_Element").SVGFESpotLightElement = function(){return true};
// ********** Code for _SVGFETileElementImpl **************
$dynamic("is$html_Element").SVGFETileElement = function(){return true};
// ********** Code for _SVGFETurbulenceElementImpl **************
$dynamic("is$html_Element").SVGFETurbulenceElement = function(){return true};
// ********** Code for _SVGFilterElementImpl **************
$dynamic("is$html_Element").SVGFilterElement = function(){return true};
// ********** Code for _SVGStylableImpl **************
// ********** Code for _SVGFilterPrimitiveStandardAttributesImpl **************
// ********** Code for _SVGFitToViewBoxImpl **************
// ********** Code for _SVGFontElementImpl **************
$dynamic("is$html_Element").SVGFontElement = function(){return true};
// ********** Code for _SVGFontFaceElementImpl **************
$dynamic("is$html_Element").SVGFontFaceElement = function(){return true};
// ********** Code for _SVGFontFaceFormatElementImpl **************
$dynamic("is$html_Element").SVGFontFaceFormatElement = function(){return true};
// ********** Code for _SVGFontFaceNameElementImpl **************
$dynamic("is$html_Element").SVGFontFaceNameElement = function(){return true};
// ********** Code for _SVGFontFaceSrcElementImpl **************
$dynamic("is$html_Element").SVGFontFaceSrcElement = function(){return true};
// ********** Code for _SVGFontFaceUriElementImpl **************
$dynamic("is$html_Element").SVGFontFaceUriElement = function(){return true};
// ********** Code for _SVGForeignObjectElementImpl **************
$dynamic("is$html_Element").SVGForeignObjectElement = function(){return true};
// ********** Code for _SVGGElementImpl **************
$dynamic("is$html_Element").SVGGElement = function(){return true};
// ********** Code for _SVGGlyphElementImpl **************
$dynamic("is$html_Element").SVGGlyphElement = function(){return true};
// ********** Code for _SVGGlyphRefElementImpl **************
$dynamic("is$html_Element").SVGGlyphRefElement = function(){return true};
// ********** Code for _SVGGradientElementImpl **************
$dynamic("is$html_Element").SVGGradientElement = function(){return true};
// ********** Code for _SVGHKernElementImpl **************
$dynamic("is$html_Element").SVGHKernElement = function(){return true};
// ********** Code for _SVGImageElementImpl **************
$dynamic("is$html_Element").SVGImageElement = function(){return true};
// ********** Code for _SVGLangSpaceImpl **************
// ********** Code for _SVGLengthImpl **************
$dynamic("get$value").SVGLength = function() { return this.value; };
$dynamic("set$value").SVGLength = function(value) { return this.value = value; };
// ********** Code for _SVGLengthListImpl **************
$dynamic("clear$0").SVGLengthList = function() {
  return this.clear();
};
// ********** Code for _SVGLineElementImpl **************
$dynamic("is$html_Element").SVGLineElement = function(){return true};
// ********** Code for _SVGLinearGradientElementImpl **************
$dynamic("is$html_Element").SVGLinearGradientElement = function(){return true};
// ********** Code for _SVGLocatableImpl **************
// ********** Code for _SVGMPathElementImpl **************
$dynamic("is$html_Element").SVGMPathElement = function(){return true};
// ********** Code for _SVGMarkerElementImpl **************
$dynamic("is$html_Element").SVGMarkerElement = function(){return true};
// ********** Code for _SVGMaskElementImpl **************
$dynamic("is$html_Element").SVGMaskElement = function(){return true};
// ********** Code for _SVGMatrixImpl **************
// ********** Code for _SVGMetadataElementImpl **************
$dynamic("is$html_Element").SVGMetadataElement = function(){return true};
// ********** Code for _SVGMissingGlyphElementImpl **************
$dynamic("is$html_Element").SVGMissingGlyphElement = function(){return true};
// ********** Code for _SVGNumberImpl **************
$dynamic("get$value").SVGNumber = function() { return this.value; };
$dynamic("set$value").SVGNumber = function(value) { return this.value = value; };
// ********** Code for _SVGNumberListImpl **************
$dynamic("clear$0").SVGNumberList = function() {
  return this.clear();
};
// ********** Code for _SVGPaintImpl **************
// ********** Code for _SVGPathElementImpl **************
$dynamic("is$html_Element").SVGPathElement = function(){return true};
// ********** Code for _SVGPathSegImpl **************
// ********** Code for _SVGPathSegArcAbsImpl **************
// ********** Code for _SVGPathSegArcRelImpl **************
// ********** Code for _SVGPathSegClosePathImpl **************
// ********** Code for _SVGPathSegCurvetoCubicAbsImpl **************
// ********** Code for _SVGPathSegCurvetoCubicRelImpl **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothAbsImpl **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothRelImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticAbsImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticRelImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothAbsImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothRelImpl **************
// ********** Code for _SVGPathSegLinetoAbsImpl **************
// ********** Code for _SVGPathSegLinetoHorizontalAbsImpl **************
// ********** Code for _SVGPathSegLinetoHorizontalRelImpl **************
// ********** Code for _SVGPathSegLinetoRelImpl **************
// ********** Code for _SVGPathSegLinetoVerticalAbsImpl **************
// ********** Code for _SVGPathSegLinetoVerticalRelImpl **************
// ********** Code for _SVGPathSegListImpl **************
$dynamic("clear$0").SVGPathSegList = function() {
  return this.clear();
};
// ********** Code for _SVGPathSegMovetoAbsImpl **************
// ********** Code for _SVGPathSegMovetoRelImpl **************
// ********** Code for _SVGPatternElementImpl **************
$dynamic("is$html_Element").SVGPatternElement = function(){return true};
// ********** Code for _SVGPointImpl **************
// ********** Code for _SVGPointListImpl **************
$dynamic("clear$0").SVGPointList = function() {
  return this.clear();
};
// ********** Code for _SVGPolygonElementImpl **************
$dynamic("is$html_Element").SVGPolygonElement = function(){return true};
// ********** Code for _SVGPolylineElementImpl **************
$dynamic("is$html_Element").SVGPolylineElement = function(){return true};
// ********** Code for _SVGPreserveAspectRatioImpl **************
// ********** Code for _SVGRadialGradientElementImpl **************
$dynamic("is$html_Element").SVGRadialGradientElement = function(){return true};
// ********** Code for _SVGRectImpl **************
// ********** Code for _SVGRectElementImpl **************
$dynamic("is$html_Element").SVGRectElement = function(){return true};
// ********** Code for _SVGRenderingIntentImpl **************
// ********** Code for _SVGSVGElementImpl **************
$dynamic("is$html_Element").SVGSVGElement = function(){return true};
// ********** Code for _SVGScriptElementImpl **************
$dynamic("is$html_Element").SVGScriptElement = function(){return true};
// ********** Code for _SVGSetElementImpl **************
$dynamic("is$html_Element").SVGSetElement = function(){return true};
// ********** Code for _SVGStopElementImpl **************
$dynamic("is$html_Element").SVGStopElement = function(){return true};
// ********** Code for _SVGStringListImpl **************
$dynamic("clear$0").SVGStringList = function() {
  return this.clear();
};
// ********** Code for _SVGStyleElementImpl **************
$dynamic("is$html_Element").SVGStyleElement = function(){return true};
// ********** Code for _SVGSwitchElementImpl **************
$dynamic("is$html_Element").SVGSwitchElement = function(){return true};
// ********** Code for _SVGSymbolElementImpl **************
$dynamic("is$html_Element").SVGSymbolElement = function(){return true};
// ********** Code for _SVGTRefElementImpl **************
$dynamic("is$html_Element").SVGTRefElement = function(){return true};
// ********** Code for _SVGTSpanElementImpl **************
$dynamic("is$html_Element").SVGTSpanElement = function(){return true};
// ********** Code for _SVGTestsImpl **************
// ********** Code for _SVGTextElementImpl **************
$dynamic("is$html_Element").SVGTextElement = function(){return true};
// ********** Code for _SVGTextPathElementImpl **************
$dynamic("is$html_Element").SVGTextPathElement = function(){return true};
// ********** Code for _SVGTitleElementImpl **************
$dynamic("is$html_Element").SVGTitleElement = function(){return true};
// ********** Code for _SVGTransformImpl **************
// ********** Code for _SVGTransformListImpl **************
$dynamic("clear$0").SVGTransformList = function() {
  return this.clear();
};
// ********** Code for _SVGTransformableImpl **************
// ********** Code for _SVGURIReferenceImpl **************
// ********** Code for _SVGUnitTypesImpl **************
// ********** Code for _SVGUseElementImpl **************
$dynamic("is$html_Element").SVGUseElement = function(){return true};
// ********** Code for _SVGVKernElementImpl **************
$dynamic("is$html_Element").SVGVKernElement = function(){return true};
// ********** Code for _SVGViewElementImpl **************
$dynamic("is$html_Element").SVGViewElement = function(){return true};
// ********** Code for _SVGZoomAndPanImpl **************
// ********** Code for _SVGViewSpecImpl **************
// ********** Code for _SVGZoomEventImpl **************
// ********** Code for _ScreenImpl **************
// ********** Code for _ScriptElementImpl **************
$dynamic("is$html_Element").HTMLScriptElement = function(){return true};
// ********** Code for _ScriptProfileImpl **************
// ********** Code for _ScriptProfileNodeImpl **************
$dynamic("get$children").ScriptProfileNode = function() { return this.children; };
// ********** Code for _SelectElementImpl **************
$dynamic("is$html_Element").HTMLSelectElement = function(){return true};
$dynamic("get$length").HTMLSelectElement = function() { return this.length; };
$dynamic("get$name").HTMLSelectElement = function() { return this.name; };
$dynamic("get$value").HTMLSelectElement = function() { return this.value; };
$dynamic("set$value").HTMLSelectElement = function(value) { return this.value = value; };
// ********** Code for _ShadowElementImpl **************
$dynamic("is$html_Element").HTMLShadowElement = function(){return true};
// ********** Code for _ShadowRootImpl **************
$dynamic("is$html_Element").ShadowRoot = function(){return true};
$dynamic("set$innerHTML").ShadowRoot = function(value) { return this.innerHTML = value; };
// ********** Code for _SharedWorkerImpl **************
// ********** Code for _SharedWorkerContextImpl **************
$dynamic("get$name").SharedWorkerContext = function() { return this.name; };
// ********** Code for _SourceElementImpl **************
$dynamic("is$html_Element").HTMLSourceElement = function(){return true};
// ********** Code for _SpanElementImpl **************
$dynamic("is$html_Element").HTMLSpanElement = function(){return true};
// ********** Code for _SpeechGrammarImpl **************
// ********** Code for _SpeechGrammarListImpl **************
$dynamic("get$length").SpeechGrammarList = function() { return this.length; };
// ********** Code for _SpeechInputEventImpl **************
// ********** Code for _SpeechInputResultImpl **************
// ********** Code for _SpeechInputResultListImpl **************
$dynamic("get$length").SpeechInputResultList = function() { return this.length; };
// ********** Code for _SpeechRecognitionAlternativeImpl **************
// ********** Code for _SpeechRecognitionErrorImpl **************
// ********** Code for _SpeechRecognitionEventImpl **************
// ********** Code for _SpeechRecognitionResultImpl **************
$dynamic("get$length").SpeechRecognitionResult = function() { return this.length; };
// ********** Code for _SpeechRecognitionResultListImpl **************
$dynamic("get$length").SpeechRecognitionResultList = function() { return this.length; };
// ********** Code for _StorageImpl **************
$dynamic("get$length").Storage = function() { return this.length; };
$dynamic("clear$0").Storage = function() {
  return this.clear();
};
// ********** Code for _StorageEventImpl **************
// ********** Code for _StorageInfoImpl **************
// ********** Code for _StyleElementImpl **************
$dynamic("is$html_Element").HTMLStyleElement = function(){return true};
// ********** Code for _StyleMediaImpl **************
// ********** Code for _StyleSheetListImpl **************
$dynamic("is$List").StyleSheetList = function(){return true};
$dynamic("is$Collection").StyleSheetList = function(){return true};
$dynamic("get$length").StyleSheetList = function() { return this.length; };
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
$dynamic("$setindex").StyleSheetList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").StyleSheetList = function() {
  return new _FixedSizeListIterator_html_StyleSheet(this);
}
$dynamic("add").StyleSheetList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").StyleSheetList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").StyleSheetList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").StyleSheetList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").StyleSheetList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").StyleSheetList = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").StyleSheetList = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").StyleSheetList = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _TableCaptionElementImpl **************
$dynamic("is$html_Element").HTMLTableCaptionElement = function(){return true};
// ********** Code for _TableCellElementImpl **************
$dynamic("is$html_Element").HTMLTableCellElement = function(){return true};
// ********** Code for _TableColElementImpl **************
$dynamic("is$html_Element").HTMLTableColElement = function(){return true};
$dynamic("get$span").HTMLTableColElement = function() { return this.span; };
// ********** Code for _TableElementImpl **************
$dynamic("is$html_Element").HTMLTableElement = function(){return true};
// ********** Code for _TableRowElementImpl **************
$dynamic("is$html_Element").HTMLTableRowElement = function(){return true};
// ********** Code for _TableSectionElementImpl **************
$dynamic("is$html_Element").HTMLTableSectionElement = function(){return true};
// ********** Code for _TextAreaElementImpl **************
$dynamic("is$html_Element").HTMLTextAreaElement = function(){return true};
$dynamic("get$name").HTMLTextAreaElement = function() { return this.name; };
$dynamic("get$value").HTMLTextAreaElement = function() { return this.value; };
$dynamic("set$value").HTMLTextAreaElement = function(value) { return this.value = value; };
// ********** Code for _TextEventImpl **************
// ********** Code for _TextMetricsImpl **************
// ********** Code for _TextTrackImpl **************
$dynamic("get$kind").TextTrack = function() { return this.kind; };
// ********** Code for _TextTrackCueImpl **************
$dynamic("get$text").TextTrackCue = function() { return this.text; };
// ********** Code for _TextTrackCueListImpl **************
$dynamic("get$length").TextTrackCueList = function() { return this.length; };
// ********** Code for _TextTrackListImpl **************
$dynamic("get$length").TextTrackList = function() { return this.length; };
// ********** Code for _TimeRangesImpl **************
$dynamic("get$length").TimeRanges = function() { return this.length; };
$dynamic("get$start").TimeRanges = function() {
  return this.start.bind(this);
}
// ********** Code for _TitleElementImpl **************
$dynamic("is$html_Element").HTMLTitleElement = function(){return true};
// ********** Code for _TouchImpl **************
// ********** Code for _TouchEventImpl **************
// ********** Code for _TouchListImpl **************
$dynamic("is$List").TouchList = function(){return true};
$dynamic("is$Collection").TouchList = function(){return true};
$dynamic("get$length").TouchList = function() { return this.length; };
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
$dynamic("$setindex").TouchList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").TouchList = function() {
  return new _FixedSizeListIterator_html_Touch(this);
}
$dynamic("add").TouchList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").TouchList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").TouchList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").TouchList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").TouchList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").TouchList = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").TouchList = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").TouchList = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _TrackElementImpl **************
$dynamic("is$html_Element").HTMLTrackElement = function(){return true};
$dynamic("get$kind").HTMLTrackElement = function() { return this.kind; };
// ********** Code for _TrackEventImpl **************
// ********** Code for _TransitionEventImpl **************
// ********** Code for _TreeWalkerImpl **************
// ********** Code for _UListElementImpl **************
$dynamic("is$html_Element").HTMLUListElement = function(){return true};
// ********** Code for _Uint16ArrayImpl **************
var _Uint16ArrayImpl = {};
$dynamic("is$List").Uint16Array = function(){return true};
$dynamic("is$Collection").Uint16Array = function(){return true};
$dynamic("get$length").Uint16Array = function() { return this.length; };
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint16Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").Uint16Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint16Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Uint16Array = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").Uint16Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Uint32ArrayImpl **************
var _Uint32ArrayImpl = {};
$dynamic("is$List").Uint32Array = function(){return true};
$dynamic("is$Collection").Uint32Array = function(){return true};
$dynamic("get$length").Uint32Array = function() { return this.length; };
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").Uint32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Uint32Array = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").Uint32Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Uint8ArrayImpl **************
var _Uint8ArrayImpl = {};
$dynamic("is$List").Uint8Array = function(){return true};
$dynamic("is$Collection").Uint8Array = function(){return true};
$dynamic("get$length").Uint8Array = function() { return this.length; };
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint8Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("indexOf").Uint8Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint8Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Uint8Array = function($0) {
  return this.add($0);
};
$dynamic("indexOf$1").Uint8Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Uint8ClampedArrayImpl **************
var _Uint8ClampedArrayImpl = {};
$dynamic("is$List").Uint8ClampedArray = function(){return true};
$dynamic("is$Collection").Uint8ClampedArray = function(){return true};
// ********** Code for _UnknownElementImpl **************
$dynamic("is$html_Element").HTMLUnknownElement = function(){return true};
// ********** Code for _ValidityStateImpl **************
// ********** Code for _VideoElementImpl **************
$dynamic("is$html_Element").HTMLVideoElement = function(){return true};
// ********** Code for _WaveShaperNodeImpl **************
// ********** Code for _WebGLActiveInfoImpl **************
$dynamic("get$name").WebGLActiveInfo = function() { return this.name; };
// ********** Code for _WebGLBufferImpl **************
// ********** Code for _WebGLCompressedTextureS3TCImpl **************
// ********** Code for _WebGLContextAttributesImpl **************
$dynamic("get$depth").WebGLContextAttributes = function() { return this.depth; };
$dynamic("set$depth").WebGLContextAttributes = function(value) { return this.depth = value; };
// ********** Code for _WebGLContextEventImpl **************
// ********** Code for _WebGLDebugRendererInfoImpl **************
// ********** Code for _WebGLDebugShadersImpl **************
// ********** Code for _WebGLFramebufferImpl **************
// ********** Code for _WebGLLoseContextImpl **************
// ********** Code for _WebGLProgramImpl **************
// ********** Code for _WebGLRenderbufferImpl **************
// ********** Code for _WebGLRenderingContextImpl **************
// ********** Code for _WebGLShaderImpl **************
// ********** Code for _WebGLTextureImpl **************
// ********** Code for _WebGLUniformLocationImpl **************
// ********** Code for _WebGLVertexArrayObjectOESImpl **************
// ********** Code for _WebKitCSSRegionRuleImpl **************
// ********** Code for _WebKitNamedFlowImpl **************
// ********** Code for _WebSocketImpl **************
$dynamic("_addEventListener").WebSocket = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _WheelEventImpl **************
// ********** Code for _WindowImpl **************
$dynamic("get$document").DOMWindow = function() {
  return this.document.documentElement;
}
$dynamic("get$length").DOMWindow = function() { return this.length; };
$dynamic("get$name").DOMWindow = function() { return this.name; };
$dynamic("_addEventListener").DOMWindow = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _WorkerImpl **************
// ********** Code for _WorkerLocationImpl **************
// ********** Code for _WorkerNavigatorImpl **************
// ********** Code for _XMLHttpRequestImpl **************
$dynamic("_addEventListener").XMLHttpRequest = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _XMLHttpRequestExceptionImpl **************
$dynamic("get$name").XMLHttpRequestException = function() { return this.name; };
// ********** Code for _XMLHttpRequestProgressEventImpl **************
// ********** Code for _XMLHttpRequestUploadImpl **************
$dynamic("_addEventListener").XMLHttpRequestUpload = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _XMLSerializerImpl **************
// ********** Code for _XPathEvaluatorImpl **************
// ********** Code for _XPathExceptionImpl **************
$dynamic("get$name").XPathException = function() { return this.name; };
// ********** Code for _XPathExpressionImpl **************
// ********** Code for _XPathNSResolverImpl **************
// ********** Code for _XPathResultImpl **************
// ********** Code for _XSLTProcessorImpl **************
// ********** Code for _Collections **************
function _Collections() {}
_Collections.forEach = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    f(e);
  }
}
_Collections.filter = function(source, destination, f) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    if (f(e)) destination.add(e);
  }
  return destination;
}
// ********** Code for _ElementFactoryProvider **************
function _ElementFactoryProvider() {}
_ElementFactoryProvider.Element$tag$factory = function(tag) {
  return get$$_document()._createElement(tag);
}
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._html_array.get$length() > this._html_pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._html_array.$index(this._html_pos++);
}
_VariableSizeListIterator.prototype.next$0 = _VariableSizeListIterator.prototype.next;
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._html_length > this._html_pos;
}
// ********** Code for _VariableSizeListIterator_dart_core_String **************
$inherits(_VariableSizeListIterator_dart_core_String, _VariableSizeListIterator);
function _VariableSizeListIterator_dart_core_String(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dart_core_String **************
$inherits(_FixedSizeListIterator_dart_core_String, _FixedSizeListIterator);
function _FixedSizeListIterator_dart_core_String(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_dart_core_String.call(this, array);
}
// ********** Code for _VariableSizeListIterator_int **************
$inherits(_VariableSizeListIterator_int, _VariableSizeListIterator);
function _VariableSizeListIterator_int(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_int **************
$inherits(_FixedSizeListIterator_int, _FixedSizeListIterator);
function _FixedSizeListIterator_int(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_int.call(this, array);
}
// ********** Code for _VariableSizeListIterator_num **************
$inherits(_VariableSizeListIterator_num, _VariableSizeListIterator);
function _VariableSizeListIterator_num(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_num **************
$inherits(_FixedSizeListIterator_num, _FixedSizeListIterator);
function _FixedSizeListIterator_num(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_num.call(this, array);
}
// ********** Code for _VariableSizeListIterator_html_Node **************
$inherits(_VariableSizeListIterator_html_Node, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Node(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_Node **************
$inherits(_FixedSizeListIterator_html_Node, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Node(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_Node.call(this, array);
}
// ********** Code for _VariableSizeListIterator_html_StyleSheet **************
$inherits(_VariableSizeListIterator_html_StyleSheet, _VariableSizeListIterator);
function _VariableSizeListIterator_html_StyleSheet(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_StyleSheet **************
$inherits(_FixedSizeListIterator_html_StyleSheet, _FixedSizeListIterator);
function _FixedSizeListIterator_html_StyleSheet(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_StyleSheet.call(this, array);
}
// ********** Code for _VariableSizeListIterator_html_Touch **************
$inherits(_VariableSizeListIterator_html_Touch, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Touch(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_Touch **************
$inherits(_FixedSizeListIterator_html_Touch, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Touch(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_Touch.call(this, array);
}
// ********** Code for _Lists **************
function _Lists() {}
_Lists.indexOf = function(a, element, startIndex, endIndex) {
  if (startIndex >= a.get$length()) {
    return (-1);
  }
  if (startIndex < (0)) {
    startIndex = (0);
  }
  for (var i = startIndex;
   i < endIndex; i++) {
    if ($eq$(a.$index(i), element)) {
      return i;
    }
  }
  return (-1);
}
// ********** Code for top level **************
var _cachedWindow;
var _cachedDocument;
function _init() {
  $globals._cachedDocument = get$$_document();
  $globals._cachedWindow = get$$_window();
  var element = _ElementFactoryProvider.Element$tag$factory("body");
  element.set$innerHTML("f");
  if (element.get$text() == "") {
    $globals._cachedWindow.console.error("Cannot import dart:html and dart:dom within the same application.");
    $throw(new UnsupportedOperationException("Cannot import dart:html and dart:dom within the same application."));
  }
}
function get$$window() {
  if ($globals._cachedWindow == null) {
    _init();
  }
  return $globals._cachedWindow;
}
function get$$_window() {
  return window;
}
function get$$document() {
  if ($globals._cachedDocument == null) {
    _init();
  }
  return $globals._cachedDocument;
}
function get$$_document() {
  return window.document.documentElement;
}
var _cachedBrowserPrefix;
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
//  ********** Library file_system **************
// ********** Code for top level **************
//  ********** Library file_system_memory **************
// ********** Code for MemoryFileSystem **************
function MemoryFileSystem() {
  this.buffer = new StringBufferImpl("");
}
MemoryFileSystem.prototype.readAll = function(filename) {
  return this.buffer.toString();
}
MemoryFileSystem.prototype.fileExists = function(filename) {
  return true;
}
// ********** Code for top level **************
//  ********** Library css **************
// ********** Code for css_SourceFile **************
function css_SourceFile(filename, _text) {
  this.filename = filename;
  this._css_text = _text;
}
css_SourceFile.prototype.get$text = function() {
  return this._css_text;
}
css_SourceFile.prototype.get$lineStarts = function() {
  if (this._css_lineStarts == null) {
    var starts = [(0)];
    var index = (0);
    while ($lt$(index, this.get$text().length)) {
      index = this.get$text().indexOf("\n", index) + (1);
      if ($lte$(index, (0))) break;
      starts.add$1(index);
    }
    starts.add$1(this.get$text().length + (1));
    this._css_lineStarts = starts;
  }
  return this._css_lineStarts;
}
css_SourceFile.prototype.getLine = function(position) {
  var starts = this.get$lineStarts();
  for (var i = (0);
   i < starts.get$length(); i++) {
    if ($gt$(starts.$index(i), position)) return i - (1);
  }
  $globals.css_world.internalError("bad position");
}
css_SourceFile.prototype.getColumn = function(line, position) {
  return $sub$(position, this.get$lineStarts().$index(line));
}
css_SourceFile.prototype.getLocationMessage = function(message, start, end, includeText) {
  var line = this.getLine(start);
  var column = this.getColumn(line, start);
  var buf = new StringBufferImpl(("" + this.filename + ":" + ($add$(line, (1))) + ":" + ($add$(column, (1))) + ": " + message));
  if (includeText) {
    buf.add$1("\n");
    var textLine;
    if ($lt$(($add$(line, (2))), this._css_lineStarts.get$length())) {
      textLine = this.get$text().substring(this._css_lineStarts.$index(line), this._css_lineStarts.$index($add$(line, (1))));
    }
    else {
      textLine = $add$(this.get$text().substring(this._css_lineStarts.$index(line)), "\n");
    }
    var toColumn = Math.min($add$(column, (end - start)), textLine.get$length());
    if ($globals.css_options.useColors) {
      buf.add$1(textLine.substring((0), column));
      buf.add$1($globals.css__RED_COLOR);
      buf.add$1(textLine.substring(column, toColumn));
      buf.add$1($globals.css__NO_COLOR);
      buf.add$1(textLine.substring$1(toColumn));
    }
    else {
      buf.add$1(textLine);
    }
    var i = (0);
    for (; $lt$(i, column); i++) {
      buf.add$1(" ");
    }
    if ($globals.css_options.useColors) buf.add$1($globals.css__RED_COLOR);
    for (; i < toColumn; i++) {
      buf.add$1("^");
    }
    if ($globals.css_options.useColors) buf.add$1($globals.css__NO_COLOR);
  }
  return buf.toString();
}
// ********** Code for css_SourceSpan **************
function css_SourceSpan(file, start, end) {
  this.file = file;
  this.start = start;
  this.end = end;
}
css_SourceSpan.prototype.get$start = function() { return this.start; };
css_SourceSpan.prototype.get$text = function() {
  return this.file.get$text().substring(this.start, this.end);
}
css_SourceSpan.prototype.toMessageString = function(message) {
  return this.file.getLocationMessage(message, this.start, this.end, true);
}
css_SourceSpan.prototype.get$locationText = function() {
  var line = this.file.getLine(this.start);
  var column = this.file.getColumn(line, this.start);
  return ("" + this.file.filename + ":" + ($add$(line, (1))) + ":" + ($add$(column, (1))));
}
// ********** Code for css_TokenKind **************
function css_TokenKind() {
  this.tokens = [];
  this.tokens.add((-1));
  this.tokens.add((0));
  this.tokens.add(css_TokenKind.kindToString((2)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((3)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((4)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((5)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((6)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((7)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((8)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((9)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((10)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((11)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((12)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((13)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((14)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((15)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((16)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((17)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((18)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((19)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((20)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((21)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((22)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((23)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((24)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((25)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((26)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((27)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((28)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((29)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((30)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((31)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((32)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((33)).charCodeAt((0)));
  this.tokens.add(css_TokenKind.kindToString((34)).charCodeAt((0)));
}
css_TokenKind.matchList = function(identList, tokenField, text, offset, length) {
  for (var $$i = identList.iterator(); $$i.hasNext(); ) {
    var entry = $$i.next$0();
    var ident = entry.$index("value");
    if (length == ident.length) {
      var idx = offset;
      var match = true;
      for (var identIdx = (0);
       identIdx < ident.length; identIdx++) {
        var identChar = ident.charCodeAt(identIdx);
        var char = text.charCodeAt(idx++);
        match = match && (char == identChar || ((char >= (65) && char <= (90)) && (char + (32)) == identChar));
        if (!match) {
          break;
        }
      }
      if (match) {
        return entry.$index(tokenField);
      }
    }
  }
  return (-1);
}
css_TokenKind.matchUnits = function(text, offset, length) {
  return css_TokenKind.matchList(const$0116, "unit", text, offset, length);
}
css_TokenKind.matchDirectives = function(text, offset, length) {
  return css_TokenKind.matchList(const$0124, "type", text, offset, length);
}
css_TokenKind.unitToString = function(unitTokenToFind) {
  if (unitTokenToFind == (24)) {
    return "%";
  }
  else {
    for (var $$i = const$0116.iterator(); $$i.hasNext(); ) {
      var entry = $$i.next$0();
      var unit = entry.$index("unit");
      if (unit == unitTokenToFind) {
        return entry.$index("value");
      }
    }
  }
  return "<BAD UNIT>";
}
css_TokenKind.matchColorName = function(text) {
  var length = text.length;
  for (var $$i = const$0272.iterator(); $$i.hasNext(); ) {
    var entry = $$i.next$0();
    var ident = entry.$index("name");
    if (length == ident.length) {
      var idx = (0);
      var match = true;
      for (var identIdx = (0);
       identIdx < ident.length; identIdx++) {
        var identChar = ident.charCodeAt(identIdx);
        var char = text.charCodeAt(idx++);
        match = match && (char == identChar || ((char >= (65) && char <= (90)) && (char + (32)) == identChar));
        if (!match) {
          break;
        }
      }
      if (match) {
        return entry.$index("value");
      }
    }
  }
  $throw(new NoColorMatchException(text));
}
css_TokenKind.decimalToHex = function(num) {
  var _HEX_DIGITS = "0123456789abcdef";
  var result = new Array();
  var dividend = num >> (4);
  var remain = $mod$(num, (16));
  result.add(_HEX_DIGITS[remain]);
  while (dividend != (0)) {
    remain = $mod$(dividend, (16));
    dividend >>= (4);
    result.add(_HEX_DIGITS[remain]);
  }
  var invertResult = new StringBufferImpl("");
  for (var idx = result.get$length() - (1);
   idx >= (0); idx--) {
    invertResult.add(result.$index(idx));
  }
  return invertResult.toString();
}
css_TokenKind.kindToString = function(kind) {
  switch (kind) {
    case (0):

      return "ERROR";

    case (1):

      return "end of file";

    case (2):

      return "(";

    case (3):

      return ")";

    case (4):

      return "[";

    case (5):

      return "]";

    case (6):

      return "{";

    case (7):

      return "}";

    case (8):

      return ".";

    case (9):

      return ";";

    case (10):

      return "@";

    case (11):

      return "#";

    case (12):

      return "+";

    case (13):

      return ">";

    case (14):

      return "~";

    case (15):

      return "*";

    case (16):

      return "|";

    case (17):

      return ":";

    case (18):

      return "_";

    case (19):

      return ",";

    case (20):

      return " ";

    case (21):

      return "\t";

    case (22):

      return "\n";

    case (23):

      return "\r";

    case (24):

      return "%";

    case (25):

      return "'";

    case (26):

      return "\"";

    case (27):

      return "/";

    case (28):

      return "=";

    case (29):

      return "|";

    case (30):

      return "^";

    case (31):

      return "$";

    case (32):

      return "<";

    case (33):

      return "!";

    case (34):

      return "-";

    default:

      $throw("Unknown TOKEN");

  }
}
css_TokenKind.isIdentifier = function(kind) {
  return kind == (511);
}
// ********** Code for NoColorMatchException **************
function NoColorMatchException(_colorName) {
  this._colorName = _colorName;
}
NoColorMatchException.prototype.get$name = function() {
  return this._colorName;
}
// ********** Code for css_Token **************
function css_Token(kind, source, start, end) {
  this.kind = kind;
  this.source = source;
  this.start = start;
  this.end = end;
}
css_Token.prototype.get$kind = function() { return this.kind; };
css_Token.prototype.get$start = function() { return this.start; };
css_Token.prototype.get$text = function() {
  return this.source.get$text().substring(this.start, this.end);
}
css_Token.prototype.toString = function() {
  var kindText = css_TokenKind.kindToString(this.kind);
  var actualText = this.get$text();
  if ($ne$(kindText, actualText)) {
    if (actualText.get$length() > (10)) {
      actualText = $add$(actualText.substring((0), (8)), "...");
    }
    return ("" + kindText + "(" + actualText + ")");
  }
  else {
    return kindText;
  }
}
css_Token.prototype.get$span = function() {
  return new css_SourceSpan(this.source, this.start, this.end);
}
// ********** Code for css_TokenizerHelpers **************
function css_TokenizerHelpers() {

}
css_TokenizerHelpers.isIdentifierStart = function(c) {
  return ((c >= (97) && c <= (122)) || (c >= (65) && c <= (90)) || c == (95) || c == (45));
}
css_TokenizerHelpers.isDigit = function(c) {
  return (c >= (48) && c <= (57));
}
css_TokenizerHelpers.isIdentifierPart = function(c) {
  return (css_TokenizerHelpers.isIdentifierStart(c) || css_TokenizerHelpers.isDigit(c) || c == (45));
}
// ********** Code for CSSTokenizerBase **************
$inherits(CSSTokenizerBase, css_TokenizerHelpers);
function CSSTokenizerBase(_source, _skipWhitespace, index) {
  this._css_source = _source;
  this._css_skipWhitespace = _skipWhitespace;
  this._css_index = index;
  css_TokenizerHelpers.call(this);
  this._css_text = this._css_source.get$text();
}
CSSTokenizerBase.prototype._css_nextChar = function() {
  if (this._css_index < this._css_text.length) {
    return this._css_text.charCodeAt(this._css_index++);
  }
  else {
    return (0);
  }
}
CSSTokenizerBase.prototype._css_peekChar = function() {
  if (this._css_index < this._css_text.length) {
    return this._css_text.charCodeAt(this._css_index);
  }
  else {
    return (0);
  }
}
CSSTokenizerBase.prototype._css_maybeEatChar = function(ch) {
  if (this._css_index < this._css_text.length) {
    if (this._css_text.charCodeAt(this._css_index) == ch) {
      this._css_index++;
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}
CSSTokenizerBase.prototype._css_finishToken = function(kind) {
  return new css_Token(kind, this._css_source, this._css_startIndex, this._css_index);
}
CSSTokenizerBase.prototype.finishWhitespace = function() {
  this._css_index--;
  while (this._css_index < this._css_text.length) {
    var ch = this._css_text.charCodeAt(this._css_index++);
    if ($eq$(ch, (32)) || $eq$(ch, (9)) || $eq$(ch, (13))) {
    }
    else if ($eq$(ch, (10))) {
      if (!this._css_skipWhitespace) {
        return this._css_finishToken((63));
      }
    }
    else {
      this._css_index--;
      if (this._css_skipWhitespace) {
        return this.next();
      }
      else {
        return this._css_finishToken((63));
      }
    }
  }
  return this._css_finishToken((1));
}
CSSTokenizerBase.prototype.eatDigits = function() {
  while (this._css_index < this._css_text.length) {
    if (css_TokenizerHelpers.isDigit(this._css_text.charCodeAt(this._css_index))) {
      this._css_index++;
    }
    else {
      return;
    }
  }
}
CSSTokenizerBase.prototype.next$0 = CSSTokenizerBase.prototype.next;
// ********** Code for css_Tokenizer **************
$inherits(css_Tokenizer, CSSTokenizerBase);
function css_Tokenizer(source, skipWhitespace, index) {
  this._css_selectorParsing = false;
  CSSTokenizerBase.call(this, source, skipWhitespace, index);
  this.cssTokens = new css_TokenKind();
}
css_Tokenizer.prototype.get$startIndex = function() {
  return this._css_startIndex;
}
css_Tokenizer.prototype.next = function() {
  this._css_startIndex = this._css_index;
  if (this._css_interpStack != null && this._css_interpStack.depth == (0)) {
    var istack = this._css_interpStack;
    this._css_interpStack = this._css_interpStack.pop();
  }
  var ch;
  ch = this._css_nextChar();
  switch (ch) {
    case (0):

      return this._css_finishToken((1));

    case this.cssTokens.tokens.$index((20)):
    case this.cssTokens.tokens.$index((21)):
    case this.cssTokens.tokens.$index((22)):
    case this.cssTokens.tokens.$index((23)):

      return this.finishWhitespace();

    case this.cssTokens.tokens.$index((1)):

      return this._css_finishToken((1));

    case this.cssTokens.tokens.$index((10)):

      return this._css_finishToken((10));

    case this.cssTokens.tokens.$index((8)):

      var start = this._css_startIndex;
      if (this.maybeEatDigit()) {
        var number = this.finishNumber();
        if (number.kind == (60)) {
          this._css_startIndex = start;
          return this._css_finishToken((62));
        }
        else {
          return this._css_errorToken();
        }
      }
      else {
        return this._css_finishToken((8));
      }

    case this.cssTokens.tokens.$index((2)):

      return this._css_finishToken((2));

    case this.cssTokens.tokens.$index((3)):

      return this._css_finishToken((3));

    case this.cssTokens.tokens.$index((6)):

      return this._css_finishToken((6));

    case this.cssTokens.tokens.$index((7)):

      return this._css_finishToken((7));

    case this.cssTokens.tokens.$index((4)):

      return this._css_finishToken((4));

    case this.cssTokens.tokens.$index((5)):

      return this._css_finishToken((5));

    case this.cssTokens.tokens.$index((11)):

      return this._css_finishToken((11));

    case this.cssTokens.tokens.$index((12)):

      if (this.maybeEatDigit()) {
        return this.finishNumber();
      }
      else {
        return this._css_finishToken((12));
      }

    case this.cssTokens.tokens.$index((34)):

      if (this.maybeEatDigit()) {
        return this.finishNumber();
      }
      else if (css_TokenizerHelpers.isIdentifierStart(ch)) {
        return this.finishIdentifier(ch);
      }
      else {
        return this._css_finishToken((34));
      }

    case this.cssTokens.tokens.$index((13)):

      return this._css_finishToken((13));

    case this.cssTokens.tokens.$index((14)):

      if (this._css_maybeEatChar(this.cssTokens.tokens.$index((28)))) {
        return this._css_finishToken((530));
      }
      else {
        return this._css_finishToken((14));
      }

    case this.cssTokens.tokens.$index((15)):

      if (this._css_maybeEatChar(this.cssTokens.tokens.$index((28)))) {
        return this._css_finishToken((534));
      }
      else {
        return this._css_finishToken((15));
      }

    case this.cssTokens.tokens.$index((16)):

      return this._css_finishToken((16));

    case this.cssTokens.tokens.$index((17)):

      return this._css_finishToken((17));

    case this.cssTokens.tokens.$index((19)):

      return this._css_finishToken((19));

    case this.cssTokens.tokens.$index((9)):

      return this._css_finishToken((9));

    case this.cssTokens.tokens.$index((24)):

      return this._css_finishToken((24));

    case this.cssTokens.tokens.$index((25)):

      return this._css_finishToken((25));

    case this.cssTokens.tokens.$index((26)):

      return this._css_finishToken((26));

    case this.cssTokens.tokens.$index((27)):

      if (this._css_maybeEatChar(this.cssTokens.tokens.$index((15)))) {
        return this.finishMultiLineComment();
      }
      else {
        return this._css_finishToken((27));
      }

    case this.cssTokens.tokens.$index((32)):

      if (this._css_maybeEatChar(this.cssTokens.tokens.$index((33))) && this._css_maybeEatChar(this.cssTokens.tokens.$index((34))) && this._css_maybeEatChar(this.cssTokens.tokens.$index((34)))) {
        return this.finishMultiLineComment();
      }
      else {
        return this._css_finishToken((32));
      }

    case this.cssTokens.tokens.$index((28)):

      return this._css_finishToken((28));

    case this.cssTokens.tokens.$index((29)):

      if (this._css_maybeEatChar(this.cssTokens.tokens.$index((28)))) {
        return this._css_finishToken((531));
      }
      else {
        return this._css_finishToken((29));
      }

    case this.cssTokens.tokens.$index((30)):

      if (this._css_maybeEatChar(this.cssTokens.tokens.$index((28)))) {
        return this._css_finishToken((532));
      }
      else {
        return this._css_finishToken((30));
      }

    case this.cssTokens.tokens.$index((31)):

      if (this._css_maybeEatChar(this.cssTokens.tokens.$index((28)))) {
        return this._css_finishToken((533));
      }
      else {
        return this._css_finishToken((31));
      }

    case this.cssTokens.tokens.$index((33)):

      var tok = this.finishIdentifier(ch);
      return (tok == null) ? this._css_finishToken((33)) : tok;

    default:

      if (css_TokenizerHelpers.isIdentifierStart(ch)) {
        return this.finishIdentifier(ch);
      }
      else if (css_TokenizerHelpers.isDigit(ch)) {
        return this.finishNumber();
      }
      else {
        return this._css_errorToken();
      }

  }
}
css_Tokenizer.prototype._css_errorToken = function(message) {
  return this._css_finishToken((65));
}
css_Tokenizer.prototype.getIdentifierKind = function() {
  var tokId = css_TokenKind.matchUnits(this._css_text, this._css_startIndex, this._css_index - this._css_startIndex);
  if (tokId == (-1)) {
    tokId = css_TokenKind.matchDirectives(this._css_text, this._css_startIndex, this._css_index - this._css_startIndex);
  }
  if (tokId == (-1)) {
    tokId = (this._css_text.substring(this._css_startIndex, this._css_index) == "!important") ? (505) : (-1);
  }
  return tokId >= (0) ? tokId : (511);
}
css_Tokenizer.prototype.finishIdentifier = function(ch) {
  while (this._css_index < this._css_text.length) {
    if (!css_TokenizerHelpers.isIdentifierPart(this._css_text.charCodeAt(this._css_index))) {
      break;
    }
    else {
      this._css_index = this._css_index + (1);
    }
  }
  if (this._css_interpStack != null && this._css_interpStack.depth == (-1)) {
    this._css_interpStack.depth = (0);
  }
  var kind = this.getIdentifierKind();
  if (kind == (511)) {
    return this._css_finishToken((511));
  }
  else {
    return this._css_finishToken(kind);
  }
}
css_Tokenizer.prototype.finishNumber = function() {
  this.eatDigits();
  if (this._css_peekChar() == (46)) {
    this._css_nextChar();
    if (css_TokenizerHelpers.isDigit(this._css_peekChar())) {
      this.eatDigits();
      return this._css_finishToken((62));
    }
    else {
      this._css_index = this._css_index - (1);
    }
  }
  return this._css_finishToken((60));
}
css_Tokenizer.prototype.maybeEatDigit = function() {
  if (this._css_index < this._css_text.length && css_TokenizerHelpers.isDigit(this._css_text.charCodeAt(this._css_index))) {
    this._css_index = this._css_index + (1);
    return true;
  }
  return false;
}
css_Tokenizer.prototype.finishMultiLineComment = function() {
  while (true) {
    var ch = this._css_nextChar();
    if (ch == (0)) {
      return this._css_finishToken((67));
    }
    else if (ch == (42)) {
      if (this._css_maybeEatChar((47))) {
        if (this._css_skipWhitespace) {
          return this.next();
        }
        else {
          return this._css_finishToken((64));
        }
      }
    }
    else if (ch == this.cssTokens.tokens.$index((34))) {
      if (this._css_maybeEatChar(this.cssTokens.tokens.$index((34)))) {
        if (this._css_maybeEatChar(this.cssTokens.tokens.$index((13)))) {
          if (this._css_skipWhitespace) {
            return this.next();
          }
          else {
            return this._css_finishToken((504));
          }
        }
      }
    }
  }
  return this._css_errorToken();
}
css_Tokenizer.prototype.next$0 = css_Tokenizer.prototype.next;
// ********** Code for css_ASTNode **************
function css_ASTNode(span) {
  this.span = span;
}
css_ASTNode.prototype.get$span = function() { return this.span; };
css_ASTNode.prototype.toDebugString = function() {
  var to = new css_TreeOutput();
  var tp = new css_TreePrinter(to);
  this.visit(tp);
  return to.get$buf().toString();
}
// ********** Code for Expression **************
$inherits(Expression, css_ASTNode);
function Expression(span) {
  css_ASTNode.call(this, span);
}
Expression.prototype.visit = function(visitor) {

}
// ********** Code for css_TreeOutput **************
function css_TreeOutput() {
  this.depth = (0);
  this.buf = new StringBufferImpl("");
}
css_TreeOutput.prototype.get$depth = function() { return this.depth; };
css_TreeOutput.prototype.set$depth = function(value) { return this.depth = value; };
css_TreeOutput.prototype.get$buf = function() { return this.buf; };
css_TreeOutput.prototype.set$printer = function(value) { return this.printer = value; };
css_TreeOutput.prototype.write = function(s) {
  for (var i = (0);
   i < this.depth; i++) {
    this.buf.add(" ");
  }
  this.buf.add(s);
}
css_TreeOutput.prototype.writeln = function(s) {
  this.write(s);
  this.buf.add("\n");
}
css_TreeOutput.prototype.heading = function(name, span) {
  this.write(name);
  this.buf.add(("  (" + span.get$locationText() + ")"));
  this.buf.add("\n");
}
css_TreeOutput.prototype.toValue = function(value) {
  if ($eq$(value)) return "null";
  else if ((value instanceof css_Identifier)) return value.get$name();
  else return value.toString();
}
css_TreeOutput.prototype.writeNode = function(label, node) {
  this.write($add$(label, ": "));
  this.depth = this.depth + (1);
  if (node != null) node.visit(this.printer);
  else this.writeln("null");
  this.depth = this.depth - (1);
}
css_TreeOutput.prototype.writeValue = function(label, value) {
  var v = this.toValue(value);
  this.writeln(("" + label + ": " + v));
}
css_TreeOutput.prototype.writeNodeList = function(label, list) {
  this.writeln(("" + label + " ["));
  if (list != null) {
    this.depth = this.depth + (1);
    for (var $$i = list.iterator(); $$i.hasNext(); ) {
      var node = $$i.next$0();
      if ($ne$(node)) {
        node.visit(this.printer);
      }
      else {
        this.writeln("null");
      }
    }
    this.depth = this.depth - (1);
    this.writeln("]");
  }
}
css_TreeOutput.prototype.heading$2 = css_TreeOutput.prototype.heading;
// ********** Code for css_Identifier **************
$inherits(css_Identifier, css_ASTNode);
function css_Identifier(name, span) {
  this.name = name;
  css_ASTNode.call(this, span);
}
css_Identifier.prototype.get$name = function() { return this.name; };
css_Identifier.prototype.visit = function(visitor) {
  return visitor.visitIdentifier(this);
}
css_Identifier.prototype.toString = function() {
  return this.name;
}
// ********** Code for Wildcard **************
$inherits(Wildcard, css_ASTNode);
function Wildcard(span) {
  css_ASTNode.call(this, span);
}
Wildcard.prototype.visit = function(visitor) {
  return visitor.visitWildcard(this);
}
Wildcard.prototype.toString = function() {
  return "*";
}
// ********** Code for SelectorGroup **************
$inherits(SelectorGroup, css_ASTNode);
function SelectorGroup(_selectors, span) {
  this._selectors = _selectors;
  css_ASTNode.call(this, span);
}
SelectorGroup.prototype.get$selectors = function() {
  return this._selectors;
}
SelectorGroup.prototype.visit = function(visitor) {
  return visitor.visitSelectorGroup(this);
}
SelectorGroup.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  var idx = (0);
  var $$list = this._selectors;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var selector = $$i.next$0();
    if (idx++ > (0)) {
      buff.add(", ");
    }
    buff.add(selector.toString());
  }
  return buff.toString();
}
SelectorGroup.prototype.toDebugString = function() {
  var to = new css_TreeOutput();
  var tp = new css_TreePrinter(to);
  this.visit(tp);
  return to.get$buf().toString();
}
// ********** Code for Selector **************
$inherits(Selector, css_ASTNode);
function Selector(_simpleSelectorSequences, span) {
  this._simpleSelectorSequences = _simpleSelectorSequences;
  css_ASTNode.call(this, span);
}
Selector.prototype.get$simpleSelectorSequences = function() {
  return this._simpleSelectorSequences;
}
Selector.prototype.add = function(seq) {
  return this._simpleSelectorSequences.add(seq);
}
Selector.prototype.get$length = function() {
  return this._simpleSelectorSequences.get$length();
}
Selector.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  var $$list = this._simpleSelectorSequences;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var simpleSelectorSequence = $$i.next$0();
    buff.add(simpleSelectorSequence.toString());
  }
  return buff.toString();
}
Selector.prototype.visit = function(visitor) {
  return visitor.visitSelector(this);
}
Selector.prototype.add$1 = Selector.prototype.add;
// ********** Code for SimpleSelectorSequence **************
$inherits(SimpleSelectorSequence, css_ASTNode);
function SimpleSelectorSequence(_selector, span, _combinator) {
  this._selector = _selector;
  this._combinator = _combinator;
  css_ASTNode.call(this, span);
}
SimpleSelectorSequence.prototype.get$simpleSelector = function() {
  return this._selector;
}
SimpleSelectorSequence.prototype.isCombinatorNone = function() {
  return this._combinator == (513);
}
SimpleSelectorSequence.prototype.isCombinatorPlus = function() {
  return this._combinator == (515);
}
SimpleSelectorSequence.prototype.isCombinatorGreater = function() {
  return this._combinator == (516);
}
SimpleSelectorSequence.prototype.isCombinatorTilde = function() {
  return this._combinator == (517);
}
SimpleSelectorSequence.prototype.isCombinatorDescendant = function() {
  return this._combinator == (514);
}
SimpleSelectorSequence.prototype._combinatorToString = function() {
  return this.isCombinatorDescendant() ? " " : this.isCombinatorPlus() ? "+" : this.isCombinatorGreater() ? ">" : this.isCombinatorTilde() ? "~" : "";
}
SimpleSelectorSequence.prototype.visit = function(visitor) {
  return visitor.visitSimpleSelectorSequence(this);
}
SimpleSelectorSequence.prototype.toString = function() {
  return $add$(this._combinatorToString(), this._selector.toString());
}
// ********** Code for SimpleSelector **************
$inherits(SimpleSelector, css_ASTNode);
function SimpleSelector(_name, span) {
  this._name = _name;
  css_ASTNode.call(this, span);
}
SimpleSelector.prototype.get$name = function() {
  return this.isWildcard() ? "*" : this._name.get$name();
}
SimpleSelector.prototype.isWildcard = function() {
  return (this._name instanceof Wildcard);
}
SimpleSelector.prototype.visit = function(visitor) {
  return visitor.visitSimpleSelector(this);
}
SimpleSelector.prototype.toString = function() {
  return this.get$name();
}
// ********** Code for ElementSelector **************
$inherits(ElementSelector, SimpleSelector);
function ElementSelector(name, span) {
  SimpleSelector.call(this, name, span);
}
ElementSelector.prototype.visit = function(visitor) {
  return visitor.visitElementSelector(this);
}
ElementSelector.prototype.toString = function() {
  return ("" + this.get$name());
}
ElementSelector.prototype.toDebugString = function() {
  var to = new css_TreeOutput();
  var tp = new css_TreePrinter(to);
  this.visit(tp);
  return to.get$buf().toString();
}
// ********** Code for NamespaceSelector **************
$inherits(NamespaceSelector, SimpleSelector);
function NamespaceSelector(_namespace, name, span) {
  this._namespace = _namespace;
  SimpleSelector.call(this, name, span);
}
NamespaceSelector.prototype.get$namespace = function() {
  return (this._namespace instanceof Wildcard) ? "*" : this._namespace.get$name();
}
NamespaceSelector.prototype.get$nameAsSimpleSelector = function() {
  return this._name;
}
NamespaceSelector.prototype.visit = function(visitor) {
  return visitor.visitNamespaceSelector(this);
}
NamespaceSelector.prototype.toString = function() {
  return ("" + this.get$namespace() + "|" + this.get$nameAsSimpleSelector().get$name());
}
// ********** Code for AttributeSelector **************
$inherits(AttributeSelector, SimpleSelector);
function AttributeSelector(name, _op, _value, span) {
  this._op = _op;
  this._css_value = _value;
  SimpleSelector.call(this, name, span);
}
AttributeSelector.prototype.matchOperator = function() {
  switch (this._op) {
    case (28):

      return "=";

    case (530):

      return "~=";

    case (531):

      return "|=";

    case (532):

      return "^=";

    case (533):

      return "$=";

    case (534):

      return "*=";

  }
}
AttributeSelector.prototype.matchOperatorAsTokenString = function() {
  switch (this._op) {
    case (28):

      return "EQUALS";

    case (530):

      return "INCLUDES";

    case (531):

      return "DASH_MATCH";

    case (532):

      return "PREFIX_MATCH";

    case (533):

      return "SUFFIX_MATCH";

    case (534):

      return "SUBSTRING_MATCH";

  }
}
AttributeSelector.prototype.valueToString = function() {
  if ((this._css_value instanceof css_Identifier)) {
    return this._css_value.get$name();
  }
  else {
    return ("\"" + this._css_value + "\"");
  }
}
AttributeSelector.prototype.visit = function(visitor) {
  return visitor.visitAttributeSelector(this);
}
AttributeSelector.prototype.toString = function() {
  return ("[" + this.get$name() + " " + this.matchOperator() + " " + this.valueToString() + "]");
}
// ********** Code for IdSelector **************
$inherits(IdSelector, SimpleSelector);
function IdSelector(name, span) {
  SimpleSelector.call(this, name, span);
}
IdSelector.prototype.visit = function(visitor) {
  return visitor.visitIdSelector(this);
}
IdSelector.prototype.toString = function() {
  return ("#" + this.get$name());
}
// ********** Code for ClassSelector **************
$inherits(ClassSelector, SimpleSelector);
function ClassSelector(name, span) {
  SimpleSelector.call(this, name, span);
}
ClassSelector.prototype.visit = function(visitor) {
  return visitor.visitClassSelector(this);
}
ClassSelector.prototype.toString = function() {
  return ("." + this.get$name());
}
// ********** Code for PseudoClassSelector **************
$inherits(PseudoClassSelector, SimpleSelector);
function PseudoClassSelector(name, span) {
  SimpleSelector.call(this, name, span);
}
PseudoClassSelector.prototype.visit = function(visitor) {
  return visitor.visitPseudoClassSelector(this);
}
PseudoClassSelector.prototype.toString = function() {
  return (":" + this.get$name());
}
// ********** Code for PseudoElementSelector **************
$inherits(PseudoElementSelector, SimpleSelector);
function PseudoElementSelector(name, span) {
  SimpleSelector.call(this, name, span);
}
PseudoElementSelector.prototype.visit = function(visitor) {
  return visitor.visitPseudoElementSelector(this);
}
PseudoElementSelector.prototype.toString = function() {
  return ("::" + this.get$name());
}
// ********** Code for NotSelector **************
$inherits(NotSelector, SimpleSelector);
function NotSelector() {}
NotSelector.prototype.visit = function(visitor) {
  return visitor.visitNotSelector(this);
}
// ********** Code for Stylesheet **************
$inherits(Stylesheet, css_ASTNode);
function Stylesheet(_topLevels, span) {
  this._topLevels = _topLevels;
  css_ASTNode.call(this, span);
  var $$list = this._topLevels;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var node = $$i.next$0();
  }
}
Stylesheet.prototype.visit = function(visitor) {
  return visitor.visitStylesheet(this);
}
Stylesheet.prototype.get$topLevels = function() {
  return this._topLevels;
}
Stylesheet.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  var $$list = this._topLevels;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var topLevel = $$i.next$0();
    buff.add(topLevel.toString());
  }
  return buff.toString();
}
Stylesheet.prototype.toDebugString = function() {
  var to = new css_TreeOutput();
  var tp = new css_TreePrinter(to);
  this.visit(tp);
  return to.get$buf().toString();
}
// ********** Code for TopLevelProduction **************
$inherits(TopLevelProduction, css_ASTNode);
function TopLevelProduction(span) {
  css_ASTNode.call(this, span);
}
TopLevelProduction.prototype.visit = function(visitor) {
  return visitor.visitTopLevelProduction(this);
}
TopLevelProduction.prototype.toString = function() {
  return "TopLevelProduction";
}
// ********** Code for RuleSet **************
$inherits(RuleSet, TopLevelProduction);
function RuleSet(_selectorGroup, _declarationGroup, span) {
  this._selectorGroup = _selectorGroup;
  this._declarationGroup = _declarationGroup;
  TopLevelProduction.call(this, span);
}
RuleSet.prototype.get$selectorGroup = function() {
  return this._selectorGroup;
}
RuleSet.prototype.visit = function(visitor) {
  return visitor.visitRuleSet(this);
}
RuleSet.prototype.toString = function() {
  return $add$(("\n" + this._selectorGroup.toString() + " {\n"), ("" + this._declarationGroup.toString() + "}\n"));
}
// ********** Code for Directive **************
$inherits(Directive, css_ASTNode);
function Directive(span) {
  css_ASTNode.call(this, span);
}
Directive.prototype.toString = function() {
  return "Directive";
}
Directive.prototype.visit = function(visitor) {
  return visitor.visitDirective(this);
}
// ********** Code for ImportDirective **************
$inherits(ImportDirective, Directive);
function ImportDirective(_import, _media, span) {
  this._import = _import;
  this._media = _media;
  Directive.call(this, span);
}
ImportDirective.prototype.visit = function(visitor) {
  return visitor.visitImportDirective(this);
}
ImportDirective.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  buff.add(("@import url(" + this._import + ")"));
  var idx = (0);
  var $$list = this._media;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var medium = $$i.next$0();
    buff.add(idx++ == (0) ? (" " + medium) : ("," + medium));
  }
  buff.add("\n");
  return buff.toString();
}
// ********** Code for MediaDirective **************
$inherits(MediaDirective, Directive);
function MediaDirective(_media, _ruleset, span) {
  this._media = _media;
  this._ruleset = _ruleset;
  Directive.call(this, span);
}
MediaDirective.prototype.visit = function(visitor) {
  return visitor.visitMediaDirective(this);
}
MediaDirective.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  buff.add("@media");
  var idx = (0);
  var $$list = this._media;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var medium = $$i.next$0();
    buff.add(idx++ == (0) ? (" " + medium) : ("," + medium));
  }
  buff.add(" {\n");
  buff.add(this._ruleset.toString());
  buff.add("\n}\n");
  return buff.toString();
}
// ********** Code for PageDirective **************
$inherits(PageDirective, Directive);
function PageDirective(_pseudoPage, _decls, span) {
  this._pseudoPage = _pseudoPage;
  this._decls = _decls;
  Directive.call(this, span);
}
PageDirective.prototype.visit = function(visitor) {
  return visitor.visitPageDirective(this);
}
PageDirective.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  buff.add("@page ");
  if (this._pseudoPage != null) {
    buff.add((": " + this._pseudoPage + " "));
  }
  buff.add(("{\n" + this._decls.toString() + "\n}\n"));
  return buff.toString();
}
// ********** Code for KeyFrameDirective **************
$inherits(KeyFrameDirective, Directive);
function KeyFrameDirective(_name, span) {
  this._name = _name;
  this._blocks = [];
  Directive.call(this, span);
}
KeyFrameDirective.prototype.add = function(block) {
  this._blocks.add(block);
}
KeyFrameDirective.prototype.get$name = function() {
  return this._name;
}
KeyFrameDirective.prototype.visit = function(visitor) {
  return visitor.visitKeyFrameDirective(this);
}
KeyFrameDirective.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  buff.add(("@-webkit-keyframes " + this._name + " {\n"));
  var $$list = this._blocks;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var block = $$i.next$0();
    buff.add(block.toString());
  }
  buff.add("}\n");
  return buff.toString();
}
KeyFrameDirective.prototype.add$1 = KeyFrameDirective.prototype.add;
// ********** Code for KeyFrameBlock **************
$inherits(KeyFrameBlock, Expression);
function KeyFrameBlock(_blockSelectors, _declarations, span) {
  this._blockSelectors = _blockSelectors;
  this._declarations = _declarations;
  Expression.call(this, span);
}
KeyFrameBlock.prototype.visit = function(visitor) {
  return visitor.visitKeyFrameBlock(this);
}
KeyFrameBlock.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  buff.add(("  " + this._blockSelectors.toString() + " {\n"));
  buff.add(this._declarations.toString());
  buff.add("  }\n");
  return buff.toString();
}
// ********** Code for FontFaceDirective **************
$inherits(FontFaceDirective, Directive);
function FontFaceDirective(_declarations, span) {
  this._declarations = _declarations;
  Directive.call(this, span);
}
FontFaceDirective.prototype.visit = function(visitor) {
  return visitor.visitFontFaceDirective(this);
}
FontFaceDirective.prototype.toString = function() {
  return "TO BE DONE";
}
// ********** Code for IncludeDirective **************
$inherits(IncludeDirective, Directive);
function IncludeDirective(_include, _stylesheet, span) {
  this._include = _include;
  this._stylesheet = _stylesheet;
  Directive.call(this, span);
}
IncludeDirective.prototype.visit = function(visitor) {
  return visitor.visitIncludeDirective(this);
}
IncludeDirective.prototype.get$styleSheet = function() {
  return this._stylesheet;
}
IncludeDirective.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  buff.add(("/****** @include " + this._include + " ******/\n"));
  buff.add(this._stylesheet != null ? this._stylesheet.toString() : "// <EMPTY>");
  buff.add(("/****** End of " + this._include + " ******/\n\n"));
  return buff.toString();
}
// ********** Code for StyletDirective **************
$inherits(StyletDirective, Directive);
function StyletDirective(_dartClassName, _rulesets, span) {
  this._dartClassName = _dartClassName;
  this._rulesets = _rulesets;
  Directive.call(this, span);
}
StyletDirective.prototype.visit = function(visitor) {
  return visitor.visitStyletDirective(this);
}
StyletDirective.prototype.toString = function() {
  return ("/* @stylet export as " + this._dartClassName + " */\n");
}
// ********** Code for Declaration **************
$inherits(Declaration, css_ASTNode);
function Declaration(_property, _expression, span) {
  this._property = _property;
  this._expression = _expression;
  this._important = false;
  css_ASTNode.call(this, span);
}
Declaration.prototype.get$important = function() {
  return this._important;
}
Declaration.prototype.set$important = function(value) {
  var $0;
  return (this._important = ($0 = value), $0);
}
Declaration.prototype.importantAsString = function() {
  return this._important ? " !important" : "";
}
Declaration.prototype.visit = function(visitor) {
  return visitor.visitDeclaration(this);
}
Declaration.prototype.toString = function() {
  return ("" + this._property.name + ": " + this._expression.toString() + this.importantAsString());
}
// ********** Code for DeclarationGroup **************
$inherits(DeclarationGroup, css_ASTNode);
function DeclarationGroup(_declarations, span) {
  this._declarations = _declarations;
  css_ASTNode.call(this, span);
}
DeclarationGroup.prototype.visit = function(visitor) {
  return visitor.visitDeclarationGroup(this);
}
DeclarationGroup.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  var idx = (0);
  var $$list = this._declarations;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var declaration = $$i.next$0();
    buff.add(("  " + declaration.toString() + ";\n"));
  }
  return buff.toString();
}
// ********** Code for OperatorSlash **************
$inherits(OperatorSlash, Expression);
function OperatorSlash(span) {
  Expression.call(this, span);
}
OperatorSlash.prototype.visit = function(visitor) {
  return visitor.visitOperatorSlash(this);
}
OperatorSlash.prototype.toString = function() {
  return " /";
}
// ********** Code for OperatorComma **************
$inherits(OperatorComma, Expression);
function OperatorComma(span) {
  Expression.call(this, span);
}
OperatorComma.prototype.visit = function(visitor) {
  return visitor.visitOperatorComma(this);
}
OperatorComma.prototype.toString = function() {
  return ",";
}
// ********** Code for LiteralTerm **************
$inherits(LiteralTerm, Expression);
function LiteralTerm(_value, _text, span) {
  this._css_value = _value;
  this._css_text = _text;
  Expression.call(this, span);
}
LiteralTerm.prototype.get$value = function() {
  return this._css_value;
}
LiteralTerm.prototype.get$text = function() {
  return this._css_text;
}
LiteralTerm.prototype.visit = function(visitor) {
  return visitor.visitLiteralTerm(this);
}
LiteralTerm.prototype.toString = function() {
  return this._css_text;
}
// ********** Code for NumberTerm **************
$inherits(NumberTerm, LiteralTerm);
function NumberTerm(value, t, span) {
  LiteralTerm.call(this, value, t, span);
}
NumberTerm.prototype.visit = function(visitor) {
  return visitor.visitNumberTerm(this);
}
// ********** Code for UnitTerm **************
$inherits(UnitTerm, LiteralTerm);
function UnitTerm(value, t, span, _unit) {
  this._unit = _unit;
  LiteralTerm.call(this, value, t, span);
}
UnitTerm.prototype.visit = function(visitor) {
  return visitor.visitUnitTerm(this);
}
UnitTerm.prototype.toString = function() {
  return ("" + this.get$text() + this.unitToString());
}
UnitTerm.prototype.unitToString = function() {
  return css_TokenKind.unitToString(this._unit);
}
// ********** Code for LengthTerm **************
$inherits(LengthTerm, UnitTerm);
function LengthTerm(value, t, span, unit) {
  UnitTerm.call(this, value, t, span, unit);
}
LengthTerm.prototype.visit = function(visitor) {
  return visitor.visitLengthTerm(this);
}
// ********** Code for PercentageTerm **************
$inherits(PercentageTerm, LiteralTerm);
function PercentageTerm(value, t, span) {
  LiteralTerm.call(this, value, t, span);
}
PercentageTerm.prototype.visit = function(visitor) {
  return visitor.visitPercentageTerm(this);
}
PercentageTerm.prototype.toString = function() {
  return ("" + this.get$text() + "%");
}
// ********** Code for EmTerm **************
$inherits(EmTerm, LiteralTerm);
function EmTerm(value, t, span) {
  LiteralTerm.call(this, value, t, span);
}
EmTerm.prototype.visit = function(visitor) {
  return visitor.visitEmTerm(this);
}
EmTerm.prototype.toString = function() {
  return ("" + this.get$text() + "em");
}
// ********** Code for ExTerm **************
$inherits(ExTerm, LiteralTerm);
function ExTerm(value, t, span) {
  LiteralTerm.call(this, value, t, span);
}
ExTerm.prototype.visit = function(visitor) {
  return visitor.visitExTerm(this);
}
ExTerm.prototype.toString = function() {
  return ("" + this.get$text() + "ex");
}
// ********** Code for AngleTerm **************
$inherits(AngleTerm, UnitTerm);
function AngleTerm(value, t, span, unit) {
  UnitTerm.call(this, value, t, span, unit);
}
AngleTerm.prototype.visit = function(visitor) {
  return visitor.visitAngleTerm(this);
}
// ********** Code for TimeTerm **************
$inherits(TimeTerm, UnitTerm);
function TimeTerm(value, t, span, unit) {
  UnitTerm.call(this, value, t, span, unit);
}
TimeTerm.prototype.visit = function(visitor) {
  return visitor.visitTimeTerm(this);
}
// ********** Code for FreqTerm **************
$inherits(FreqTerm, UnitTerm);
function FreqTerm(value, t, span, unit) {
  UnitTerm.call(this, value, t, span, unit);
}
FreqTerm.prototype.visit = function(visitor) {
  return visitor.visitFreqTerm(this);
}
// ********** Code for FractionTerm **************
$inherits(FractionTerm, LiteralTerm);
function FractionTerm(value, t, span) {
  LiteralTerm.call(this, value, t, span);
}
FractionTerm.prototype.visit = function(visitor) {
  return visitor.visitFractionTerm(this);
}
FractionTerm.prototype.toString = function() {
  return ("" + this.get$text() + "fr");
}
// ********** Code for UriTerm **************
$inherits(UriTerm, LiteralTerm);
function UriTerm(value, span) {
  LiteralTerm.call(this, value, value, span);
}
UriTerm.prototype.visit = function(visitor) {
  return visitor.visitUriTerm(this);
}
UriTerm.prototype.toString = function() {
  return ("url(" + this.get$text() + ")");
}
// ********** Code for HexColorTerm **************
$inherits(HexColorTerm, LiteralTerm);
function HexColorTerm(value, t, span) {
  LiteralTerm.call(this, value, t, span);
}
HexColorTerm.prototype.visit = function(visitor) {
  return visitor.visitHexColorTerm(this);
}
HexColorTerm.prototype.toString = function() {
  return ("#" + this.get$text());
}
// ********** Code for FunctionTerm **************
$inherits(FunctionTerm, LiteralTerm);
function FunctionTerm(value, t, _params, span) {
  this._params = _params;
  LiteralTerm.call(this, value, t, span);
}
FunctionTerm.prototype.visit = function(visitor) {
  return visitor.visitFunctionTerm(this);
}
FunctionTerm.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  buff.add(("" + this.get$text() + "("));
  buff.add(this._params.toString());
  buff.add(")");
  return buff.toString();
}
// ********** Code for GroupTerm **************
$inherits(GroupTerm, Expression);
function GroupTerm(span) {
  this._terms = [];
  Expression.call(this, span);
}
GroupTerm.prototype.add = function(term) {
  this._terms.add(term);
}
GroupTerm.prototype.visit = function(visitor) {
  return visitor.visitGroupTerm(this);
}
GroupTerm.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  buff.add("(");
  var idx = (0);
  var $$list = this._terms;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var term = $$i.next$0();
    if (idx++ > (0)) {
      buff.add(" ");
    }
    buff.add(term.toString());
  }
  buff.add(")");
  return buff.toString();
}
GroupTerm.prototype.add$1 = GroupTerm.prototype.add;
// ********** Code for ItemTerm **************
$inherits(ItemTerm, NumberTerm);
function ItemTerm(value, t, span) {
  NumberTerm.call(this, value, t, span);
}
ItemTerm.prototype.visit = function(visitor) {
  return visitor.visitItemTerm(this);
}
ItemTerm.prototype.toString = function() {
  return ("[" + this.get$text() + "]");
}
// ********** Code for Expressions **************
$inherits(Expressions, Expression);
function Expressions(span) {
  this._expressions = [];
  Expression.call(this, span);
}
Expressions.prototype.add = function(expression) {
  this._expressions.add(expression);
}
Expressions.prototype.visit = function(visitor) {
  return visitor.visitExpressions(this);
}
Expressions.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  var idx = (0);
  var $$list = this._expressions;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var expression = $$i.next$0();
    if (idx > (0) && !((expression instanceof OperatorComma) || (expression instanceof OperatorSlash))) {
      buff.add(" ");
    }
    buff.add(expression.toString());
    idx++;
  }
  return buff.toString();
}
Expressions.prototype.add$1 = Expressions.prototype.add;
// ********** Code for css_TreePrinter **************
function css_TreePrinter(output) {
  this.output = output;
  this.output.set$printer(this);
}
css_TreePrinter.prototype.visitStylesheet = function(node) {
  var $0, $1;
  this.output.heading$2("Stylesheet", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeNodeList("productions", node._topLevels);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitTopLevelProduction = function(node) {
  this.output.heading$2("TopLevelProduction", node.span);
}
css_TreePrinter.prototype.visitDirective = function(node) {
  this.output.heading$2("Directive", node.span);
}
css_TreePrinter.prototype.visitMediaDirective = function(node) {
  var $0, $1;
  this.output.heading$2("MediaDirective", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeNodeList("media", node._media);
  this.visitRuleSet(node._ruleset);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitPageDirective = function(node) {
  var $0;
  this.output.heading$2("PageDirective", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeValue("pseudo page", node._pseudoPage);
  this.visitDeclarationGroup(node._decls);
  this.output.get$depth();
}
css_TreePrinter.prototype.visitImportDirective = function(node) {
  var $0, $1;
  this.output.heading$2("ImportDirective", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeValue("import", node._import);
  this.output.writeNodeList("media", node._media);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitKeyFrameDirective = function(node) {
  var $0, $1;
  this.output.heading$2("KeyFrameDirective", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeValue("name", node._name);
  this.output.writeNodeList("blocks", node._blocks);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitKeyFrameBlock = function(node) {
  var $0, $1;
  this.output.heading$2("KeyFrameBlock", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitExpressions(node._blockSelectors);
  this.visitDeclarationGroup(node._declarations);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitFontFaceDirective = function(node) {

}
css_TreePrinter.prototype.visitIncludeDirective = function(node) {
  var $0, $1;
  this.output.heading$2("IncludeDirective", node.span);
  this.output.writeValue("include", node._include);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  if (node._stylesheet != null) {
    this.visitStylesheet(node._stylesheet);
  }
  else {
    this.output.writeValue("StyleSheet", "<EMPTY>");
  }
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitStyletDirective = function(node) {
  var $0, $1;
  this.output.heading$2("StyletDirective", node.span);
  this.output.writeValue("dartClassName", node._dartClassName);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeNodeList("rulesets", node._rulesets);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitRuleSet = function(node) {
  var $0, $1;
  this.output.heading$2("Ruleset", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitSelectorGroup(node._selectorGroup);
  this.visitDeclarationGroup(node._declarationGroup);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitDeclarationGroup = function(node) {
  var $0, $1;
  this.output.heading$2("DeclarationGroup", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeNodeList("declarations", node._declarations);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitDeclaration = function(node) {
  var $0, $1;
  this.output.heading$2("Declaration", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.write("property");
  this.visitIdentifier(node._property);
  this.output.writeNode("expression", node._expression);
  if (node.get$important()) {
    this.output.writeValue("!important", "true");
  }
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitSelectorGroup = function(node) {
  var $0, $1;
  this.output.heading$2("Selector Group", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeNodeList("selectors", node.get$selectors());
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitSelector = function(node) {
  var $0, $1;
  this.output.heading$2("Selector", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeNodeList("simpleSelectorsSequences", node._simpleSelectorSequences);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitSimpleSelectorSequence = function(node) {
  var $0, $1, $2, $3;
  this.output.heading$2("SimpleSelectorSequence", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  if (node.isCombinatorNone()) {
    this.output.writeValue("combinator", "NONE");
  }
  else if (node.isCombinatorDescendant()) {
    this.output.writeValue("combinator", "descendant");
  }
  else if (node.isCombinatorPlus()) {
    this.output.writeValue("combinator", "+");
  }
  else if (node.isCombinatorGreater()) {
    this.output.writeValue("combinator", ">");
  }
  else if (node.isCombinatorTilde()) {
    this.output.writeValue("combinator", "~");
  }
  else {
    this.output.writeValue("combinator", "ERROR UNKNOWN");
  }
  var selector = node._selector;
  if ((selector instanceof NamespaceSelector)) {
    this.visitNamespaceSelector(selector);
  }
  else if ((selector instanceof ElementSelector)) {
    this.visitElementSelector(selector);
  }
  else if ((selector instanceof IdSelector)) {
    this.visitIdSelector(selector);
  }
  else if ((selector instanceof ClassSelector)) {
    this.visitClassSelector(selector);
  }
  else if ((selector instanceof PseudoClassSelector)) {
    this.visitPseudoClassSelector(selector);
  }
  else if ((selector instanceof PseudoElementSelector)) {
    this.visitPseudoElementSelector(selector);
  }
  else if ((selector instanceof NotSelector)) {
    this.visitNotSelector(selector);
  }
  else if ((selector instanceof AttributeSelector)) {
    this.visitAttributeSelector(selector);
  }
  else {
    this.output.heading$2("SimpleSelector", selector.get$span());
    ($1 = this.output).set$depth($add$($1.get$depth(), (1)));
    this.visitSimpleSelector(selector);
    ($2 = this.output).set$depth($sub$($2.get$depth(), (1)));
  }
  ($3 = this.output).set$depth($sub$($3.get$depth(), (1)));
}
css_TreePrinter.prototype.visitSimpleSelector = function(node) {
  this.visitIdentifier(node._name);
}
css_TreePrinter.prototype.visitNamespaceSelector = function(node) {
  var $0, $1;
  this.output.heading$2("Namespace Selector", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  var namespace = node._namespace;
  if ((namespace instanceof css_Identifier)) {
    this.visitIdentifier(namespace);
  }
  else if ((namespace instanceof Wildcard)) {
    this.visitWildcard(namespace);
  }
  else {
    this.output.writeln("NULL");
  }
  this.visitSimpleSelector(node.get$nameAsSimpleSelector());
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitElementSelector = function(node) {
  var $0, $1;
  this.output.heading$2("Element Selector", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitSimpleSelector(node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitAttributeSelector = function(node) {
  var $0, $1;
  this.output.heading$2("AttributeSelector", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitSimpleSelector(node);
  var tokenStr = node.matchOperatorAsTokenString();
  this.output.writeValue("operator", ("" + node.matchOperator() + " (" + tokenStr + ")"));
  this.output.writeValue("value", node.valueToString());
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitIdSelector = function(node) {
  var $0, $1;
  this.output.heading$2("Id Selector", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitSimpleSelector(node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitClassSelector = function(node) {
  var $0, $1;
  this.output.heading$2("Class Selector", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitSimpleSelector(node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitPseudoClassSelector = function(node) {
  var $0, $1;
  this.output.heading$2("Pseudo Class Selector", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitSimpleSelector(node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitPseudoElementSelector = function(node) {
  var $0, $1;
  this.output.heading$2("Pseudo Element Selector", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitSimpleSelector(node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitNotSelector = function(node) {
  var $0, $1;
  this.visitSimpleSelector(node);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.heading$2("Not Selector", node.span);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitLiteralTerm = function(node) {
  var $0, $1;
  this.output.heading$2("LiteralTerm", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeValue("value", node.get$text());
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitHexColorTerm = function(node) {
  var $0, $1;
  this.output.heading$2("HexColorTerm", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeValue("hex value", node.get$text());
  this.output.writeValue("decimal value", node.get$value());
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitNumberTerm = function(node) {
  var $0, $1;
  this.output.heading$2("NumberTerm", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeValue("value", node.get$text());
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitUnitTerm = function(node) {
  var $0, $1;
  var unitValue;
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeValue("value", node.get$text());
  this.output.writeValue("unit", node.unitToString());
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitLengthTerm = function(node) {
  this.output.heading$2("LengthTerm", node.span);
  this.visitUnitTerm(node);
}
css_TreePrinter.prototype.visitPercentageTerm = function(node) {
  var $0, $1;
  this.output.heading$2("PercentageTerm", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitLiteralTerm(node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitEmTerm = function(node) {
  var $0, $1;
  this.output.heading$2("EmTerm", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitLiteralTerm(node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitExTerm = function(node) {
  var $0, $1;
  this.output.heading$2("ExTerm", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitLiteralTerm(node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitAngleTerm = function(node) {
  this.output.heading$2("AngleTerm", node.span);
  this.visitUnitTerm(node);
}
css_TreePrinter.prototype.visitTimeTerm = function(node) {
  this.output.heading$2("TimeTerm", node.span);
  this.visitUnitTerm(node);
}
css_TreePrinter.prototype.visitFreqTerm = function(node) {
  this.output.heading$2("FreqTerm", node.span);
  this.visitUnitTerm(node);
}
css_TreePrinter.prototype.visitFractionTerm = function(node) {
  var $0, $1;
  this.output.heading$2("FractionTerm", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitLiteralTerm(node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitUriTerm = function(node) {
  var $0, $1;
  this.output.heading$2("UriTerm", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitLiteralTerm(node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitFunctionTerm = function(node) {
  var $0, $1;
  this.output.heading$2("FunctionTerm", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitLiteralTerm(node);
  this.visitExpressions(node._params);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitGroupTerm = function(node) {
  var $0, $1;
  this.output.heading$2("GroupTerm", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeNodeList("grouped terms", node._terms);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitItemTerm = function(node) {
  this.output.heading$2("ItemTerm", node.span);
  this.visitNumberTerm(node);
}
css_TreePrinter.prototype.visitOperatorSlash = function(node) {
  this.output.heading$2("OperatorSlash", node.span);
}
css_TreePrinter.prototype.visitOperatorComma = function(node) {
  this.output.heading$2("OperatorComma", node.span);
}
css_TreePrinter.prototype.visitExpressions = function(node) {
  var $0, $1;
  this.output.heading$2("Expressions", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeNodeList("expressions", node._expressions);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
css_TreePrinter.prototype.visitIdentifier = function(node) {
  this.output.heading$2($add$($add$("Identifier(", this.output.toValue(node.name)), ")"), node.span);
}
css_TreePrinter.prototype.visitWildcard = function(node) {
  this.output.heading$2("Wildcard(*)", node.span);
}
// ********** Code for css_Parser **************
function css_Parser(source, start, _fs, _basePath) {
  this.source = source;
  this._css_fs = _fs;
  this._basePath = _basePath;
  this.tokenizer = new css_Tokenizer(this.source, true, start);
  this._css_peekToken = this.tokenizer.next();
  this._css_previousToken = null;
}
css_Parser.prototype.parse = function(nestedCSS, erroMsgRedirector) {
  this._erroMsgRedirector = erroMsgRedirector;
  var productions = [];
  var start = this._css_peekToken.start;
  while (!this._css_maybeEat((1)) && (!nestedCSS && !this._css_peekKind((7)))) {
    var directive = this.processDirective();
    if ($ne$(directive)) {
      productions.add(directive);
    }
    else {
      var ruleset = this.processRuleSet();
      if (ruleset != null) {
        productions.add(ruleset);
      }
      else {
        break;
      }
    }
  }
  return new Stylesheet(productions, this._css_makeSpan(start));
}
css_Parser.prototype._css_peek = function() {
  return this._css_peekToken.kind;
}
css_Parser.prototype._css_next = function() {
  this._css_previousToken = this._css_peekToken;
  this._css_peekToken = this.tokenizer.next();
  return this._css_previousToken;
}
css_Parser.prototype._css_peekKind = function(kind) {
  return this._css_peekToken.kind == kind;
}
css_Parser.prototype._css_peekIdentifier = function() {
  return css_TokenKind.isIdentifier(this._css_peekToken.kind);
}
css_Parser.prototype._css_maybeEat = function(kind) {
  if (this._css_peekToken.kind == kind) {
    this._css_previousToken = this._css_peekToken;
    this._css_peekToken = this.tokenizer.next();
    return true;
  }
  else {
    return false;
  }
}
css_Parser.prototype._css_eat = function(kind) {
  if (!this._css_maybeEat(kind)) {
    this._css_errorExpected(css_TokenKind.kindToString(kind));
  }
}
css_Parser.prototype._css_errorExpected = function(expected) {
  var tok = this._css_next();
  var message;
  try {
    message = ("expected " + expected + ", but found " + tok);
  } catch (e) {
    e = _toDartException(e);
    message = ("parsing error expected " + expected);
  }
  this._css_error(message, tok.get$span());
}
css_Parser.prototype._css_error = function(message, location) {
  if (null == location) {
    location = this._css_peekToken.get$span();
  }
  if ($eq$(this._erroMsgRedirector)) {
    $globals.css_world.fatal(message, location);
  }
  else {
    var text = "";
    if (location != null) {
      text = location.toMessageString("");
    }
    this._erroMsgRedirector.displayError(("CSS error: \r" + text + "\r" + message));
  }
}
css_Parser.prototype._css_makeSpan = function(start) {
  return new css_SourceSpan(this.source, start, this._css_previousToken.end);
}
css_Parser.prototype.processMedia = function(oneRequired) {
  var media = [];
  while (this._css_peekIdentifier()) {
    var medium = this.identifier();
    media.add(medium);
    if (!this._css_maybeEat((19))) {
      break;
    }
  }
  if (oneRequired && media.get$length() == (0)) {
    this._css_error("at least one media type required", this._css_peekToken.get$span());
  }
  return media;
}
css_Parser.prototype.processDirective = function() {
  var start = this._css_peekToken.start;
  if (this._css_maybeEat((10))) {
    switch (this._css_peek()) {
      case (651):

        this._css_next();
        var importStr;
        if (this._css_peekIdentifier()) {
          var func = this.processFunction(this.identifier());
          if ((func instanceof UriTerm)) {
            importStr = func.get$text();
          }
        }
        else {
          importStr = this.processQuotedString(false);
        }
        var medias = this.processMedia(false);
        if (importStr == null) {
          this._css_error("missing import string", this._css_peekToken.get$span());
        }
        return new ImportDirective(importStr, medias, this._css_makeSpan(start));

      case (652):

        this._css_next();
        var media = this.processMedia(true);
        var ruleset;
        if (this._css_maybeEat((6))) {
          ruleset = this.processRuleSet();
          if (!this._css_maybeEat((7))) {
            this._css_error("expected } after ruleset for @media", this._css_peekToken.get$span());
          }
        }
        else {
          this._css_error("expected { after media before ruleset", this._css_peekToken.get$span());
        }
        return new MediaDirective(media, ruleset, this._css_makeSpan(start));

      case (653):

        this._css_next();
        var pseudoPage;
        if (this._css_maybeEat((17))) {
          if (this._css_peekIdentifier()) {
            pseudoPage = this.identifier();
          }
        }
        return new PageDirective(pseudoPage, this.processDeclarations(), this._css_makeSpan(start));

      case (656):

        this._css_next();
        var name;
        if (this._css_peekIdentifier()) {
          name = this.identifier();
        }
        this._css_eat((6));
        var kf = new KeyFrameDirective(name, this._css_makeSpan(start));
        do {
          var selectors = new Expressions(this._css_makeSpan(start));
          do {
            var term = this.processTerm();
            selectors.add(term);
          }
          while (this._css_maybeEat((19)))
          kf.add(new KeyFrameBlock(selectors, this.processDeclarations(), this._css_makeSpan(start)));
        }
        while (!this._css_maybeEat((7)))
        return kf;

      case (657):

        this._css_next();
        var decls = [];
        return new FontFaceDirective(decls, this._css_makeSpan(start));

      case (654):

        this._css_next();
        var filename = this.processQuotedString(false);
        if ($ne$(this._css_fs)) {
          if (this._css_fs.fileExists(("" + this._basePath + filename))) {
            var basePath = "";
            var idx = filename.lastIndexOf("/");
            if (idx >= (0)) {
              basePath = filename.substring((0), idx + (1));
            }
            basePath = ("" + this._basePath + basePath);
            var fullFN = ("" + basePath + filename);
            var contents = this._css_fs.readAll(fullFN);
            var parser = new css_Parser(new css_SourceFile(fullFN, contents), (0), this._css_fs, basePath);
            var stylesheet = parser.parse(false);
            return new IncludeDirective(filename, stylesheet, this._css_makeSpan(start));
          }
          this._css_error(("file doesn't exist " + filename), this._css_peekToken.get$span());
        }
        print$("WARNING: @include doesn't work for uitest");
        return new IncludeDirective(filename, null, this._css_makeSpan(start));

      case (655):

        this._css_next();
        var name;
        if (this._css_peekIdentifier()) {
          name = this.identifier();
        }
        this._css_eat((6));
        var productions = [];
        start = this._css_peekToken.start;
        while (!this._css_maybeEat((1))) {
          var ruleset = this.processRuleSet();
          if (ruleset == null) {
            break;
          }
          productions.add(ruleset);
        }
        this._css_eat((7));
        return new StyletDirective(name, productions, this._css_makeSpan(start));

      default:

        this._css_error(("unknown directive, found " + this._css_peekToken), this._css_peekToken.get$span());

    }
  }
}
css_Parser.prototype.processRuleSet = function() {
  var start = this._css_peekToken.start;
  var selGroup = this.processSelectorGroup();
  if (selGroup != null) {
    return new RuleSet(selGroup, this.processDeclarations(), this._css_makeSpan(start));
  }
}
css_Parser.prototype.processDeclarations = function() {
  var start = this._css_peekToken.start;
  this._css_eat((6));
  var decls = [];
  do {
    var decl = this.processDeclaration();
    if (decl != null) {
      decls.add(decl);
    }
  }
  while (this._css_maybeEat((9)))
  this._css_eat((7));
  return new DeclarationGroup(decls, this._css_makeSpan(start));
}
css_Parser.prototype.processSelectorGroup = function() {
  var selectors = [];
  var start = this._css_peekToken.start;
  do {
    var selector = this.processSelector();
    if (selector != null) {
      selectors.add(selector);
    }
  }
  while (this._css_maybeEat((19)))
  if (selectors.get$length() > (0)) {
    return new SelectorGroup(selectors, this._css_makeSpan(start));
  }
}
css_Parser.prototype.processSelector = function() {
  var simpleSequences = [];
  var start = this._css_peekToken.start;
  while (true) {
    var selectorItem = this.simpleSelectorSequence(simpleSequences.get$length() == (0));
    if ($ne$(selectorItem)) {
      simpleSequences.add(selectorItem);
    }
    else {
      break;
    }
  }
  if (simpleSequences.get$length() > (0)) {
    return new Selector(simpleSequences, this._css_makeSpan(start));
  }
}
css_Parser.prototype.simpleSelectorSequence = function(forceCombinatorNone) {
  var start = this._css_peekToken.start;
  var combinatorType = (513);
  switch (this._css_peek()) {
    case (12):

      this._css_eat((12));
      combinatorType = (515);
      break;

    case (13):

      this._css_eat((13));
      combinatorType = (516);
      break;

    case (14):

      this._css_eat((14));
      combinatorType = (517);
      break;

  }
  if (combinatorType == (513) && !forceCombinatorNone) {
    if (this._css_previousToken != null && this._css_previousToken.end != this._css_peekToken.start) {
      combinatorType = (514);
    }
  }
  var simpleSel = this.simpleSelector();
  if ($ne$(simpleSel)) {
    return new SimpleSelectorSequence(simpleSel, this._css_makeSpan(start), combinatorType);
  }
}
css_Parser.prototype.simpleSelector = function() {
  var first;
  var start = this._css_peekToken.start;
  switch (this._css_peek()) {
    case (15):

      var tok = this._css_next();
      first = new Wildcard(this._css_makeSpan(tok.get$start()));
      break;

    case (511):

      var startIdent = this._css_peekToken.start;
      first = this.identifier();
      break;

  }
  if (this._css_maybeEat((16))) {
    var element;
    switch (this._css_peek()) {
      case (15):

        var tok = this._css_next();
        element = new Wildcard(this._css_makeSpan(tok.get$start()));
        break;

      case (511):

        element = this.identifier();
        break;

      default:

        this._css_error(("expected element name or universal(*), but found " + this._css_peekToken), this._css_peekToken.get$span());

    }
    return new NamespaceSelector(first, new ElementSelector(element, element.get$span()), this._css_makeSpan(start));
  }
  else if ($ne$(first)) {
    return new ElementSelector(first, this._css_makeSpan(start));
  }
  else {
    return this.simpleSelectorTail();
  }
}
css_Parser.prototype.get$simpleSelector = function() {
  return this.simpleSelector.bind(this);
}
css_Parser.prototype.simpleSelectorTail = function() {
  var start = this._css_peekToken.start;
  switch (this._css_peek()) {
    case (11):

      this._css_eat((11));
      return new IdSelector(this.identifier(), this._css_makeSpan(start));

    case (8):

      this._css_eat((8));
      return new ClassSelector(this.identifier(), this._css_makeSpan(start));

    case (17):

      this._css_eat((17));
      var pseudoClass = this._css_peek() != (17);
      var name = this.identifier();
      return pseudoClass ? new PseudoClassSelector(name, this._css_makeSpan(start)) : new PseudoElementSelector(name, this._css_makeSpan(start));

    case (4):

      return this.processAttribute();

  }
}
css_Parser.prototype.processAttribute = function() {
  var start = this._css_peekToken.start;
  if (this._css_maybeEat((4))) {
    var attrName = this.identifier();
    var op = (535);
    switch (this._css_peek()) {
      case (28):
      case (530):
      case (531):
      case (532):
      case (533):
      case (534):

        op = this._css_peek();
        this._css_next();
        break;

    }
    var value;
    if (op != (535)) {
      if (this._css_peekIdentifier()) {
        value = this.identifier();
      }
      else {
        value = this.processQuotedString(false);
      }
      if (value == null) {
        this._css_error("expected attribute value string or ident", this._css_peekToken.get$span());
      }
    }
    this._css_eat((5));
    return new AttributeSelector(attrName, op, value, this._css_makeSpan(start));
  }
}
css_Parser.prototype.processDeclaration = function() {
  var decl;
  var start = this._css_peekToken.start;
  if (css_TokenKind.isIdentifier(this._css_peekToken.kind)) {
    var propertyIdent = this.identifier();
    this._css_eat((17));
    decl = new Declaration(propertyIdent, this.processExpr(), this._css_makeSpan(start));
    decl.set$important(this._css_maybeEat((505)));
  }
  return decl;
}
css_Parser.prototype.processExpr = function() {
  var start = this._css_peekToken.start;
  var expressions = new Expressions(this._css_makeSpan(start));
  var keepGoing = true;
  var expr;
  while (keepGoing && $ne$((expr = this.processTerm()))) {
    var op = null;
    var opStart = this._css_peekToken.start;
    switch (this._css_peek()) {
      case (27):

        op = new OperatorSlash(this._css_makeSpan(opStart));
        break;

      case (19):

        op = new OperatorComma(this._css_makeSpan(opStart));
        break;

    }
    if ($ne$(expr)) {
      expressions.add(expr);
    }
    else {
      keepGoing = false;
    }
    if ($ne$(op)) {
      expressions.add(op);
      this._css_next();
    }
  }
  return expressions;
}
css_Parser.prototype.processTerm = function() {
  var start = this._css_peekToken.start;
  var t;
  var value;
  var unary = "";
  switch (this._css_peek()) {
    case (11):

      this._css_eat((11));
      var hexText;
      if (this._css_peekKind((60))) {
        var hexText1 = this._css_peekToken.get$text();
        this._css_next();
        if (this._css_peekIdentifier()) {
          hexText = ("" + hexText1 + this.identifier().get$name());
        }
        else {
          hexText = hexText1;
        }
      }
      else if (this._css_peekIdentifier()) {
        hexText = this.identifier().get$name();
      }
      else {
        this._css_errorExpected("hex number");
      }
      try {
        var hexValue = css_Parser.parseHex(hexText);
        return new HexColorTerm(hexValue, hexText, this._css_makeSpan(start));
      } catch (hne) {
        hne = _toDartException(hne);
        if (!(hne instanceof HexNumberException)) throw hne;
        this._css_error("Bad hex number", this._css_makeSpan(start));
      }
      break;

    case (60):

      t = this._css_next();
      value = Math.parseInt(("" + unary + t.get$text()));
      break;

    case (62):

      t = this._css_next();
      value = Math.parseDouble(("" + unary + t.get$text()));
      break;

    case (25):
    case (26):

      value = this.processQuotedString(false);
      value = ("\"" + value + "\"");
      return new LiteralTerm(value, value, this._css_makeSpan(start));

    case (2):

      this._css_next();
      var group = new GroupTerm(this._css_makeSpan(start));
      do {
        var term = this.processTerm();
        if ($ne$(term) && (term instanceof LiteralTerm)) {
          group.add(term);
        }
      }
      while (!this._css_maybeEat((3)))
      return group;

    case (4):

      this._css_next();
      var term = this.processTerm();
      if (!((term instanceof NumberTerm))) {
        this._css_error("Expecting a positive number", this._css_makeSpan(start));
      }
      this._css_eat((5));
      return new ItemTerm(term.get$value(), term.get$text(), this._css_makeSpan(start));

    case (511):

      var nameValue = this.identifier();
      if (this._css_maybeEat((2))) {
        return this.processFunction(nameValue);
      }
      else {
        if (nameValue.get$name() == "from") {
          return new LiteralTerm(nameValue, nameValue.get$name(), this._css_makeSpan(start));
        }
        try {
          var colorValue = css_TokenKind.matchColorName(nameValue.get$name());
          var rgbColor = css_TokenKind.decimalToHex(colorValue);
          try {
            colorValue = css_Parser.parseHex(rgbColor);
          } catch (hne) {
            hne = _toDartException(hne);
            if (!(hne instanceof HexNumberException)) throw hne;
            this._css_error("Bad hex number", this._css_makeSpan(start));
          }
          return new HexColorTerm(colorValue, rgbColor, this._css_makeSpan(start));
        } catch (error) {
          error = _toDartException(error);
          if ((error instanceof NoColorMatchException)) {
            return new LiteralTerm(nameValue, nameValue.get$name(), this._css_makeSpan(start));
          }
        }
      }

  }
  var term;
  var unitType = this._css_peek();
  switch (unitType) {
    case (600):

      term = new EmTerm(value, t.get$text(), this._css_makeSpan(start));
      this._css_next();
      break;

    case (601):

      term = new ExTerm(value, t.get$text(), this._css_makeSpan(start));
      this._css_next();
      break;

    case (602):
    case (603):
    case (604):
    case (605):
    case (606):
    case (607):

      term = new LengthTerm(value, t.get$text(), this._css_makeSpan(start), unitType);
      this._css_next();
      break;

    case (608):
    case (609):
    case (610):

      term = new AngleTerm(value, t.get$text(), this._css_makeSpan(start), unitType);
      this._css_next();
      break;

    case (611):
    case (612):

      term = new TimeTerm(value, t.get$text(), this._css_makeSpan(start), unitType);
      this._css_next();
      break;

    case (613):
    case (614):

      term = new FreqTerm(value, t.get$text(), this._css_makeSpan(start), unitType);
      this._css_next();
      break;

    case (24):

      term = new PercentageTerm(value, t.get$text(), this._css_makeSpan(start));
      this._css_next();
      break;

    case (616):

      term = new FractionTerm(value, t.get$text(), this._css_makeSpan(start));
      this._css_next();
      break;

    default:

      if ($ne$(value)) {
        term = new NumberTerm(value, t.get$text(), this._css_makeSpan(start));
      }

  }
  return term;
}
css_Parser.prototype.processQuotedString = function(urlString) {
  var start = this._css_peekToken.start;
  var stopToken = urlString ? (3) : (-1);
  switch (this._css_peek()) {
    case (25):

      stopToken = (25);
      this._css_next();
      break;

    case (26):

      stopToken = (26);
      this._css_next();
      break;

    default:

      if (urlString) {
        if (this._css_peek() == (2)) {
          this._css_next();
        }
        stopToken = (3);
      }
      else {
        this._css_error("unexpected string", this._css_makeSpan(start));
      }

  }
  var stringValue = new StringBufferImpl("");
  var runningStart = this._css_peekToken.start;
  while (this._css_peek() != stopToken && this._css_peek() != (1)) {
    var tok = this._css_next();
    stringValue.add(tok.get$text());
  }
  if (stopToken != (3)) {
    this._css_next();
  }
  return stringValue.toString();
}
css_Parser.prototype.processFunction = function(func) {
  var start = this._css_peekToken.start;
  var name = func.name;
  switch (name) {
    case "url":

      var urlParam = this.processQuotedString(true);
      if (this._css_peek() == (1)) {
        this._css_error("problem parsing URI", this._css_peekToken.get$span());
      }
      if (this._css_peek() == (3)) {
        this._css_next();
      }
      return new UriTerm(urlParam, this._css_makeSpan(start));

    case "calc":

      break;

    default:

      var expr = this.processExpr();
      if (!this._css_maybeEat((3))) {
        this._css_error("problem parsing function expected ), ", this._css_peekToken.get$span());
      }
      return new FunctionTerm(name, name, expr, this._css_makeSpan(start));

  }
  return null;
}
css_Parser.prototype.identifier = function() {
  var tok = this._css_next();
  if (!css_TokenKind.isIdentifier(tok.get$kind())) {
    this._css_error(("expected identifier, but found " + tok), tok.get$span());
  }
  return new css_Identifier(tok.get$text(), this._css_makeSpan(tok.get$start()));
}
css_Parser._hexDigit = function(c) {
  if (c >= (48) && c <= (57)) {
    return c - (48);
  }
  else if (c >= (97) && c <= (102)) {
    return c - (87);
  }
  else if (c >= (65) && c <= (70)) {
    return c - (55);
  }
  else {
    return (-1);
  }
}
css_Parser.parseHex = function(hex) {
  var result = (0);
  for (var i = (0);
   i < hex.length; i++) {
    var digit = css_Parser._hexDigit(hex.charCodeAt(i));
    if ($lt$(digit, (0))) {
      $throw(new HexNumberException());
    }
    result = $add$(($shl$(result, (4))), digit);
  }
  return result;
}
// ********** Code for HexNumberException **************
function HexNumberException() {

}
// ********** Code for Generate **************
function Generate() {}
Generate.computeClassSelectors = function(ruleset, classes) {
  var $$list = ruleset.get$selectorGroup().get$selectors();
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var selector = $$i.next$0();
    var selSeqs = selector.get$simpleSelectorSequences();
    for (var $i0 = selSeqs.iterator(); $i0.hasNext(); ) {
      var selSeq = $i0.next$0();
      var simpleSelector = selSeq.get$simpleSelector();
      if ((simpleSelector instanceof ClassSelector)) {
        var className = simpleSelector.get$name();
        if ($eq$(classes.indexOf$1(className), (-1))) {
          classes.add$1(className);
        }
      }
    }
  }
  return classes;
}
// ********** Code for top level **************
var css_options;
var css_world;
//  ********** Library template **************
// ********** Code for TokenKind **************
function TokenKind() {
  this.tokens = [];
  this.tokens.add((-1));
  this.tokens.add((0));
  this.tokens.add(TokenKind.kindToString((2)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((3)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((4)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((5)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((6)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((7)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((8)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((9)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((10)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((11)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((12)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((13)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((14)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((15)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((16)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((17)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((18)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((19)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((20)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((21)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((22)).charCodeAt((0)));
  this.tokens.add(TokenKind.kindToString((23)).charCodeAt((0)));
}
TokenKind.validTagName = function(tokId) {
  return tokId >= (600) && tokId <= (690);
}
TokenKind.matchList = function(identList, tokenField, text, offset, length) {
  for (var $$i = identList.iterator(); $$i.hasNext(); ) {
    var entry = $$i.next$0();
    var ident = entry.$index("value");
    if (length == ident.length) {
      var idx = offset;
      var match = true;
      for (var identIdx = (0);
       identIdx < ident.length; identIdx++) {
        var identChar = ident.charCodeAt(identIdx);
        var char = text.charCodeAt(idx++);
        match = match && (char == identChar || ((char >= (65) && char <= (90)) && (char + (32)) == identChar));
        if (!match) {
          break;
        }
      }
      if (match) {
        return entry.$index(tokenField);
      }
    }
  }
  return (-1);
}
TokenKind.elementsToName = function(kind) {
  for (var $$i = const$0097.iterator(); $$i.hasNext(); ) {
    var entry = $$i.next$0();
    if (kind == entry.$index("type")) {
      return entry.$index("value");
    }
  }
}
TokenKind.matchElements = function(text, offset, length) {
  return TokenKind.matchList(const$0097, "type", text, offset, length);
}
TokenKind.tagNameFromTokenId = function(tagTokenId) {
  if (tagTokenId >= (600) && tagTokenId <= (690)) {
    for (var $$i = const$0097.iterator(); $$i.hasNext(); ) {
      var tag = $$i.next$0();
      if ($eq$(tag.$index("type"), tagTokenId)) {
        return tag.$index("value");
      }
    }
  }
}
TokenKind.matchKeywords = function(text, offset, length) {
  return TokenKind.matchList(const$0099, "type", text, offset, length);
}
TokenKind.kindToString = function(kind) {
  switch (kind) {
    case (0):

      return "ERROR";

    case (1):

      return "end of file";

    case (2):

      return "(";

    case (3):

      return ")";

    case (4):

      return "[";

    case (5):

      return "]";

    case (6):

      return "{";

    case (7):

      return "}";

    case (8):

      return ".";

    case (9):

      return ";";

    case (10):

      return " ";

    case (11):

      return "\t";

    case (12):

      return "\n";

    case (13):

      return "\r";

    case (14):

      return ",";

    case (15):

      return "<";

    case (16):

      return ">";

    case (17):

      return "/";

    case (18):

      return "$";

    case (19):

      return "#";

    case (20):

      return "-";

    case (21):

      return "=";

    case (22):

      return "\"";

    case (23):

      return "'";

    case (50):

      return "/>";

    case (51):

      return "${";

    case (52):

      return "${#";

    case (53):

      return "${/";

    case (53):

      return "${#each list}";

    case (54):

      return "${with object}";

    case (55):

      return "${#if (expression)}";

    case (56):

      return "${#end}";

    case (60):

      return "integer";

    case (62):

      return "double";

    case (63):

      return "whitespace";

    case (64):

      return "comment";

    case (65):

      return "error";

    case (66):

      return "incomplete string";

    case (67):

      return "incomplete comment";

    case (500):

      return "attribute value";

    case (502):

      return "number";

    case (503):

      return "hex number";

    case (504):

      return "HTML comment <!-- -->";

    case (511):

      return "identifier";

    case (512):

      return "string";

    case (513):

      return "string part";

    case (595):

      return "template";

    default:

      $throw("Unknown TOKEN");

  }
}
TokenKind.isIdentifier = function(kind) {
  return kind == (511);
}
// ********** Code for Token **************
function Token(kind, source, start, end) {
  this.kind = kind;
  this.source = source;
  this.start = start;
  this.end = end;
}
Token.prototype.get$kind = function() { return this.kind; };
Token.prototype.get$start = function() { return this.start; };
Token.prototype.get$text = function() {
  return this.source.get$text().substring(this.start, this.end);
}
Token.prototype.toString = function() {
  var kindText = TokenKind.kindToString(this.kind);
  var actualText = this.get$text();
  if ($ne$(kindText, actualText)) {
    if (actualText.get$length() > (10)) {
      actualText = $add$(actualText.substring((0), (8)), "...");
    }
    return ("" + kindText + "(" + actualText + ")");
  }
  else {
    return kindText;
  }
}
Token.prototype.get$span = function() {
  return new SourceSpan(this.source, this.start, this.end);
}
// ********** Code for LiteralToken **************
$inherits(LiteralToken, Token);
function LiteralToken(kind, source, start, end, value) {
  this.value = value;
  Token.call(this, kind, source, start, end);
}
LiteralToken.prototype.get$value = function() { return this.value; };
LiteralToken.prototype.set$value = function(value) { return this.value = value; };
// ********** Code for SourceFile **************
function SourceFile(filename, _text) {
  this.filename = filename;
  this._text = _text;
}
SourceFile.prototype.get$text = function() {
  return this._text;
}
SourceFile.prototype.get$lineStarts = function() {
  if (this._lineStarts == null) {
    var starts = [(0)];
    var index = (0);
    while ($lt$(index, this.get$text().length)) {
      index = this.get$text().indexOf("\n", index) + (1);
      if ($lte$(index, (0))) break;
      starts.add$1(index);
    }
    starts.add$1(this.get$text().length + (1));
    this._lineStarts = starts;
  }
  return this._lineStarts;
}
SourceFile.prototype.getLine = function(position) {
  var starts = this.get$lineStarts();
  for (var i = (0);
   i < starts.get$length(); i++) {
    if ($gt$(starts.$index(i), position)) return i - (1);
  }
  $globals.world.internalError("bad position");
}
SourceFile.prototype.getColumn = function(line, position) {
  return $sub$(position, this.get$lineStarts().$index(line));
}
SourceFile.prototype.getLocationMessage = function(message, start, end, includeText) {
  var line = this.getLine(start);
  var column = this.getColumn(line, start);
  var buf = new StringBufferImpl(("" + this.filename + ":" + ($add$(line, (1))) + ":" + ($add$(column, (1))) + ": " + message));
  if (includeText) {
    buf.add$1("\n");
    var textLine;
    if ($lt$(($add$(line, (2))), this._lineStarts.get$length())) {
      textLine = this.get$text().substring(this._lineStarts.$index(line), this._lineStarts.$index($add$(line, (1))));
    }
    else {
      textLine = $add$(this.get$text().substring(this._lineStarts.$index(line)), "\n");
    }
    var toColumn = Math.min($add$(column, (end - start)), textLine.get$length());
    if ($globals.options.useColors) {
      buf.add$1(textLine.substring((0), column));
      buf.add$1($globals._RED_COLOR);
      buf.add$1(textLine.substring(column, toColumn));
      buf.add$1($globals._NO_COLOR);
      buf.add$1(textLine.substring$1(toColumn));
    }
    else {
      buf.add$1(textLine);
    }
    var i = (0);
    for (; $lt$(i, column); i++) {
      buf.add$1(" ");
    }
    if ($globals.options.useColors) buf.add$1($globals._RED_COLOR);
    for (; i < toColumn; i++) {
      buf.add$1("^");
    }
    if ($globals.options.useColors) buf.add$1($globals._NO_COLOR);
  }
  return buf.toString();
}
// ********** Code for SourceSpan **************
function SourceSpan(file, start, end) {
  this.file = file;
  this.start = start;
  this.end = end;
}
SourceSpan.prototype.get$start = function() { return this.start; };
SourceSpan.prototype.get$text = function() {
  return this.file.get$text().substring(this.start, this.end);
}
SourceSpan.prototype.toMessageString = function(message) {
  return this.file.getLocationMessage(message, this.start, this.end, true);
}
SourceSpan.prototype.get$locationText = function() {
  var line = this.file.getLine(this.start);
  var column = this.file.getColumn(line, this.start);
  return ("" + this.file.filename + ":" + ($add$(line, (1))) + ":" + ($add$(column, (1))));
}
// ********** Code for TokenizerHelpers **************
function TokenizerHelpers() {

}
TokenizerHelpers.isIdentifierStart = function(c) {
  return ((c >= (97) && c <= (122)) || (c >= (65) && c <= (90)) || c == (95));
}
TokenizerHelpers.isDigit = function(c) {
  return (c >= (48) && c <= (57));
}
TokenizerHelpers.isWhitespace = function(c) {
  return (c == (32) || c == (9) || c == (10) || c == (13));
}
TokenizerHelpers.isIdentifierPart = function(c) {
  return (TokenizerHelpers.isIdentifierStart(c) || TokenizerHelpers.isDigit(c) || c == (45) || c == (58) || c == (46));
}
TokenizerHelpers.isAttributeValueStart = function(c) {
  return !TokenizerHelpers.isWhitespace(c) && !TokenizerHelpers.isSlash(c) && !TokenizerHelpers.isCloseTag(c);
}
TokenizerHelpers.isSlash = function(c) {
  return (c == (47));
}
TokenizerHelpers.isCloseTag = function(c) {
  return (c == (62));
}
// ********** Code for TokenizerBase **************
$inherits(TokenizerBase, TokenizerHelpers);
function TokenizerBase(_source, _skipWhitespace, index) {
  this._source = _source;
  this._skipWhitespace = _skipWhitespace;
  this._template_index = index;
  TokenizerHelpers.call(this);
  this._text = this._source.get$text();
}
TokenizerBase.prototype._nextChar = function() {
  if (this._template_index < this._text.length) {
    return this._text.charCodeAt(this._template_index++);
  }
  else {
    return (0);
  }
}
TokenizerBase.prototype._peekChar = function() {
  if (this._template_index < this._text.length) {
    return this._text.charCodeAt(this._template_index);
  }
  else {
    return (0);
  }
}
TokenizerBase.prototype._maybeEatChar = function(ch) {
  if (this._template_index < this._text.length) {
    if (this._text.charCodeAt(this._template_index) == ch) {
      this._template_index++;
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}
TokenizerBase.prototype._finishToken = function(kind) {
  return new Token(kind, this._source, this._startIndex, this._template_index);
}
TokenizerBase.prototype.finishWhitespace = function() {
  this._template_index--;
  while (this._template_index < this._text.length) {
    var ch = this._text.charCodeAt(this._template_index++);
    if ($eq$(ch, (32)) || $eq$(ch, (9)) || $eq$(ch, (13))) {
    }
    else if ($eq$(ch, (10))) {
      if (!this._skipWhitespace) {
        return this._finishToken((63));
      }
    }
    else {
      this._template_index--;
      if (this._skipWhitespace) {
        return this.next$0();
      }
      else {
        return this._finishToken((63));
      }
    }
  }
  return this._finishToken((1));
}
TokenizerBase.prototype.eatDigits = function() {
  while (this._template_index < this._text.length) {
    if (TokenizerHelpers.isDigit(this._text.charCodeAt(this._template_index))) {
      this._template_index++;
    }
    else {
      return;
    }
  }
}
TokenizerBase.prototype.next$0 = TokenizerBase.prototype.next;
// ********** Code for Tokenizer **************
$inherits(Tokenizer, TokenizerBase);
function Tokenizer(source, skipWhitespace, index) {
  this._selectorParsing = false;
  TokenizerBase.call(this, source, skipWhitespace, index);
  this.tmplTokens = new TokenKind();
}
Tokenizer.prototype.get$startIndex = function() {
  return this._startIndex;
}
Tokenizer.prototype.next = function(inTag) {
  this._startIndex = this._template_index;
  if (this._interpStack != null && this._interpStack.depth == (0)) {
    var istack = this._interpStack;
    this._interpStack = this._interpStack.pop();
  }
  var ch;
  ch = this._nextChar();
  switch (ch) {
    case (0):

      return this._finishToken((1));

    case this.tmplTokens.tokens.$index((10)):
    case this.tmplTokens.tokens.$index((11)):
    case this.tmplTokens.tokens.$index((12)):
    case this.tmplTokens.tokens.$index((13)):

      if (inTag) {
        return this.finishWhitespace();
      }
      else {
        return this._finishToken((63));
      }

    case this.tmplTokens.tokens.$index((1)):

      return this._finishToken((1));

    case this.tmplTokens.tokens.$index((2)):

      return this._finishToken((2));

    case this.tmplTokens.tokens.$index((3)):

      return this._finishToken((3));

    case this.tmplTokens.tokens.$index((14)):

      return this._finishToken((14));

    case this.tmplTokens.tokens.$index((6)):

      return this._finishToken((6));

    case this.tmplTokens.tokens.$index((7)):

      return this._finishToken((7));

    case this.tmplTokens.tokens.$index((15)):

      return this._finishToken((15));

    case this.tmplTokens.tokens.$index((16)):

      return this._finishToken((16));

    case this.tmplTokens.tokens.$index((21)):

      if (inTag) {
        if (this._maybeEatChar(this.tmplTokens.tokens.$index((23)))) {
          return this.finishQuotedAttrValue(this.tmplTokens.tokens.$index((23)));
        }
        else if (this._maybeEatChar(this.tmplTokens.tokens.$index((22)))) {
          return this.finishQuotedAttrValue(this.tmplTokens.tokens.$index((22)));
        }
        else if (TokenizerHelpers.isAttributeValueStart(this._peekChar())) {
          return this.finishAttrValue();
        }
      }
      return this._finishToken((21));

    case this.tmplTokens.tokens.$index((17)):

      if (this._maybeEatChar(this.tmplTokens.tokens.$index((16)))) {
        return this._finishToken((50));
      }
      else {
        return this._finishToken((17));
      }

    case this.tmplTokens.tokens.$index((18)):

      if (this._maybeEatChar(this.tmplTokens.tokens.$index((6)))) {
        if (this._maybeEatChar(this.tmplTokens.tokens.$index((19)))) {
          return this._finishToken((52));
        }
        else if (this._maybeEatChar(this.tmplTokens.tokens.$index((17)))) {
          return this._finishToken((53));
        }
        else {
          return this._finishToken((51));
        }
      }
      else {
        return this._finishToken((18));
      }

    default:

      if (TokenizerHelpers.isIdentifierStart(ch)) {
        return this.finishIdentifier();
      }
      else if (TokenizerHelpers.isDigit(ch)) {
        return this.finishNumber();
      }
      else {
        return this._errorToken();
      }

  }
}
Tokenizer.prototype._errorToken = function(message) {
  return this._finishToken((65));
}
Tokenizer.prototype.getIdentifierKind = function() {
  var tokId = TokenKind.matchElements(this._text, this._startIndex, this._template_index - this._startIndex);
  if (tokId == (-1)) {
  }
  if (tokId == (-1)) {
    tokId = TokenKind.matchKeywords(this._text, this._startIndex, this._template_index - this._startIndex);
  }
  return tokId >= (0) ? tokId : (511);
}
Tokenizer.prototype.finishIdentifier = function() {
  while (this._template_index < this._text.length) {
    if (!TokenizerHelpers.isIdentifierPart(this._text.charCodeAt(this._template_index))) {
      break;
    }
    else {
      this._template_index = this._template_index + (1);
    }
  }
  if (this._interpStack != null && this._interpStack.depth == (-1)) {
    this._interpStack.depth = (0);
  }
  var kind = this.getIdentifierKind();
  if (kind == (511)) {
    return this._finishToken((511));
  }
  else {
    return this._finishToken(kind);
  }
}
Tokenizer.prototype._makeAttributeValueToken = function(buf) {
  var s = Strings.String$fromCharCodes$factory(buf);
  return new LiteralToken((500), this._source, this._startIndex, this._template_index, s);
}
Tokenizer.prototype.finishQuotedAttrValue = function(quote) {
  var buf = new Array();
  while (true) {
    var ch = this._nextChar();
    if (ch == quote) {
      return this._makeAttributeValueToken(buf);
    }
    else if (ch == (0)) {
      return this._errorToken();
    }
    else {
      buf.add$1(ch);
    }
  }
}
Tokenizer.prototype.finishAttrValue = function() {
  var buf = new Array();
  while (true) {
    var ch = this._peekChar();
    if (TokenizerHelpers.isWhitespace(ch) || TokenizerHelpers.isSlash(ch) || TokenizerHelpers.isCloseTag(ch)) {
      return this._makeAttributeValueToken(buf);
    }
    else if (ch == (0)) {
      return this._errorToken();
    }
    else {
      buf.add$1(this._nextChar());
    }
  }
}
Tokenizer.prototype.finishNumber = function() {
  this.eatDigits();
  if (this._peekChar() == (46)) {
    this._nextChar();
    if (TokenizerHelpers.isDigit(this._peekChar())) {
      this.eatDigits();
      return this._finishToken((62));
    }
    else {
      this._template_index = this._template_index - (1);
    }
  }
  return this._finishToken((60));
}
Tokenizer.prototype.set$index = function(idx) {
  this._template_index = idx;
}
Tokenizer.prototype.next$0 = function() {
  return this.next(true);
};
// ********** Code for TagStack **************
function TagStack(elem) {
  this._stack = [];
  this._stack.add(elem);
}
TagStack.prototype.push = function(elem) {
  this._stack.add(elem);
}
TagStack.prototype.pop = function() {
  return this._stack.removeLast();
}
TagStack.prototype.top = function() {
  return this._stack.last();
}
// ********** Code for ErrorMsgRedirector **************
function ErrorMsgRedirector() {

}
ErrorMsgRedirector.prototype.displayError = function(msg) {
  var $0;
  if ($globals.world.printHandler != null) {
    $globals.world.printHandler(msg);
  }
  else {
    print$(("Unhandler Error: " + msg));
  }
  ($0 = $globals.world).errors = $0.errors + (1);
}
// ********** Code for Parser **************
function Parser(source, start, _fs) {
  this.source = source;
  this._fs = _fs;
  this.tokenizer = new Tokenizer(this.source, true, start);
  this._peekToken = this.tokenizer.next(true);
  this._previousToken = null;
}
Parser.prototype.parse = function(handler) {
  this.printHandler = handler;
  var productions = [];
  var start = this._peekToken.start;
  while (!this._maybeEat((1))) {
    var template = this.processTemplate();
    if (template != null) {
      productions.add(template);
    }
  }
  return productions;
}
Parser.prototype._peek = function() {
  return this._peekToken.kind;
}
Parser.prototype._template_next = function(inTag) {
  this._previousToken = this._peekToken;
  this._peekToken = this.tokenizer.next(inTag);
  return this._previousToken;
}
Parser.prototype._peekKind = function(kind) {
  return this._peekToken.kind == kind;
}
Parser.prototype._peekIdentifier = function() {
  return TokenKind.isIdentifier(this._peekToken.kind);
}
Parser.prototype._maybeEat = function(kind) {
  if (this._peekToken.kind == kind) {
    this._previousToken = this._peekToken;
    this._peekToken = this.tokenizer.next(true);
    return true;
  }
  else {
    return false;
  }
}
Parser.prototype._eat = function(kind) {
  if (!this._maybeEat(kind)) {
    this._errorExpected(TokenKind.kindToString(kind));
  }
}
Parser.prototype._errorExpected = function(expected) {
  var tok = this._template_next(true);
  var message;
  try {
    message = ("expected " + expected + ", but found " + tok);
  } catch (e) {
    e = _toDartException(e);
    message = ("parsing error expected " + expected);
  }
  this._error(message, tok.get$span());
}
Parser.prototype._error = function(message, location) {
  if (null == location) {
    location = this._peekToken.get$span();
  }
  if (this.printHandler == null) {
    $globals.world.fatal(message, location);
  }
  else {
    this.printHandler(message);
  }
}
Parser.prototype._makeSpan = function(start) {
  return new SourceSpan(this.source, start, this._previousToken.end);
}
Parser.prototype.processTemplate = function() {
  var template;
  var start = this._peekToken.start;
  this._eat((595));
  if (this._peekIdentifier()) {
    var templateName = this.identifier();
    var params = new Array();
    this._eat((2));
    start = this._peekToken.start;
    while (true) {
      var type = this.processAsIdentifier();
      var paramName = this.processAsIdentifier();
      if ($ne$(type) && $ne$(paramName)) {
        params.add(_map(["type", type, "name", paramName]));
        if (!this._maybeEat((14))) {
          break;
        }
      }
      else {
        this._error("Template paramter missing type and name", this._makeSpan(start));
        break;
      }
    }
    this._eat((3));
    var sig = new TemplateSignature(templateName.get$name(), params, this._makeSpan(start));
    var content = this.processTemplateContent();
    template = new Template(sig, content, this._makeSpan(start));
  }
  return template;
}
Parser.prototype.processAsIdentifier = function() {
  var start = this._peekToken.start;
  if (this._peekIdentifier()) {
    return this.identifier();
  }
  else if (TokenKind.validTagName(this._peek())) {
    var tok = this._template_next(true);
    return new Identifier(TokenKind.tagNameFromTokenId(tok.get$kind()), this._makeSpan(start));
  }
}
Parser.prototype.processCSS = function() {
  if (this._peekIdentifier()) {
    var start = this._peekToken.start;
    if (this.identifier().get$name() == "css") {
      this._eat((6));
      var cssCtx = this.processCSSContent(this.source, this.tokenizer.get$startIndex());
      this.tokenizer.set$index(this.lastCSSIndexParsed);
      this._template_next(false);
      this._eat((7));
      return cssCtx;
    }
  }
}
Parser.prototype.processTemplateContent = function() {
  var stylesheet;
  this._eat((6));
  var start = this._peekToken.start;
  stylesheet = this.processCSS();
  var elems = new TemplateElement.fragment$ctor(this._makeSpan(this._peekToken.start));
  var templateDoc = this.processHTML(elems);
  this._eat((7));
  return new TemplateContent(stylesheet, templateDoc, this._makeSpan(start));
}
Parser.prototype.processCSSContent = function(cssSource, start) {
  try {
    var parser = new css_Parser(new SourceFile($globals.SourceFile_IN_MEMORY_FILE, cssSource.get$text()), start);
    var stylesheet = parser.parse(false, new ErrorMsgRedirector());
    var lastParsedChar = parser.tokenizer.get$startIndex();
    this.lastCSSIndexParsed = lastParsedChar;
    return stylesheet;
  } catch (cssParseException) {
    cssParseException = _toDartException(cssParseException);
    this._error(("Unexcepted CSS error: " + cssParseException.toString()));
  }
}
Parser.prototype.processHTML = function(root) {
  var stack = new TagStack(root);
  var start = this._peekToken.start;
  var done = false;
  while (!done) {
    if (this._maybeEat((15))) {
      start = this._peekToken.start;
      if (TokenKind.validTagName(this._peek())) {
        var tagToken = this._template_next(true);
        var attrs = this.processAttributes();
        var varName = null;
        if (attrs.containsKey("var")) {
          varName = attrs.$index("var").get$value();
          attrs.remove("var");
        }
        var scopeType = null;
        if (this._maybeEat((16))) {
          scopeType = (1);
        }
        else if (this._maybeEat((50))) {
          scopeType = (2);
        }
        if (scopeType > (0)) {
          var elem = new TemplateElement.attributes$ctor(tagToken.kind, attrs.getValues(), varName, this._makeSpan(start));
          stack.top().add$1(elem);
          if (scopeType == (1)) {
            stack.push(elem);
          }
        }
      }
      else {
        this._eat((17));
        if (TokenKind.validTagName(this._peek())) {
          var tagToken = this._template_next(true);
          this._eat((16));
          var elem = stack.pop();
          if ((elem instanceof TemplateElement) && !elem.get$isFragment()) {
            if (elem.get$tagTokenId() != tagToken.kind) {
              this._error($add$(("Tag doesn't match expected </" + elem.get$tagName() + "> got "), ("</" + TokenKind.tagNameFromTokenId(tagToken.kind) + ">")));
            }
          }
          else {
            this._error($add$("Too many end tags at ", ("</" + TokenKind.tagNameFromTokenId(tagToken.kind) + ">")));
          }
        }
      }
    }
    else if (this._maybeEat((52))) {
      var commandName = this.processAsIdentifier();
      if (commandName != null) {
        switch (commandName.name) {
          case "each":
          case "with":

            var listName = this.processAsIdentifier();
            if ($ne$(listName)) {
              var loopItem = this.processAsIdentifier();
              this._eat((7));
              var frag = new TemplateElement.fragment$ctor(this._makeSpan(this._peekToken.start));
              var docFrag = this.processHTML(frag);
              if (docFrag != null) {
                var span = this._makeSpan(start);
                var cmd = null;
                if (commandName.name == "each") {
                  cmd = new TemplateEachCommand(listName, loopItem, docFrag, span);
                }
                else if (commandName.name == "with") {
                  cmd = new TemplateWithCommand(listName, loopItem, docFrag, span);
                }
                stack.top().add$1(cmd);
                stack.push(cmd);
              }
              this._eat((53));
              if (this._peekIdentifier()) {
                commandName = this.identifier();
                switch (commandName.name) {
                  case "each":
                  case "with":
                  case "if":
                  case "else":

                    break;

                  default:

                    this._error(("Unknown command ${#" + commandName + "}"));

                }
                var elem = stack.pop();
                if ((elem instanceof TemplateEachCommand) && commandName.name == "each") {
                }
                else if ((elem instanceof TemplateWithCommand) && commandName.name == "with") {
                }
                else {
                  var expectedCmd = null;
                  if ((elem instanceof TemplateEachCommand)) {
                    expectedCmd = "${/each}";
                  }
                  this._error(("mismatched command expected " + expectedCmd + " got..."));
                  return;
                }
                this._eat((7));
              }
              else {
                this._error("Missing command name ${/commandName}");
              }
            }
            else {
              this._error("Missing listname for #each command");
            }
            break;

          case "if":

            break;

          case "else":

            break;

          default:

            var startPos = this._previousToken.end;
            while (this._peek() != (7) && this._peek() != (1)) {
              this._template_next(false);
            }
            if (this._peek() == (7)) {
              var endPos = this._previousToken.end;
              var callNode = new TemplateCall(commandName.name, this.source.get$text().substring(startPos, endPos), this._makeSpan(start));
              stack.top().add$1(callNode);
              this._template_next(false);
            }
            else {
              this._error("Unknown template command");
            }

        }
      }
    }
    else if (this._peekKind((53))) {
      break;
    }
    else {
      var nodes = this.processTextNodes();
      if (nodes.get$length() > (0)) {
        for (var $$i = nodes.iterator(); $$i.hasNext(); ) {
          var node = $$i.next$0();
          stack.top().add$1(node);
        }
      }
      else {
        break;
      }
    }
  }
  var docChildren = new Array();
  docChildren.add$1(stack.pop());
  return new TemplateDocument(docChildren, this._makeSpan(start));
}
Parser.prototype.processAttributes = function() {
  var attrs = new HashMapImplementation();
  var start = this._peekToken.start;
  var elemName;
  while (this._peekIdentifier() || (elemName = TokenKind.elementsToName(this._peek())) != null) {
    var attrName = null;
    if (elemName == null) {
      attrName = this.identifier();
    }
    else {
      attrName = new Identifier(elemName, this._makeSpan(start));
      this._template_next(true);
    }
    var attrValue = null;
    if (this._peek() == (500)) {
      var tok = this._template_next(true);
      attrValue = new StringValue(tok.get$value(), this._makeSpan(tok.get$start()));
    }
    attrs.$setindex(attrName.get$name(), new TemplateAttribute(attrName, attrValue, this._makeSpan(start)));
    start = this._peekToken.start;
    elemName = null;
  }
  return attrs;
}
Parser.prototype.identifier = function() {
  var tok = this._template_next(true);
  if (!TokenKind.isIdentifier(tok.get$kind())) {
    this._error(("expected identifier, but found " + tok), tok.get$span());
  }
  return new Identifier(tok.get$text(), this._makeSpan(tok.get$start()));
}
Parser.prototype.processTextNodes = function() {
  var nodes = [];
  var start = this._peekToken.start;
  var inExpression = false;
  var stringValue = new StringBufferImpl("");
  if (this._previousToken.kind == (16)) {
    if (this._peek() == (65)) {
      this.tokenizer.set$index(this._previousToken.end);
      this._template_next(false);
    }
    else if (this._peek() != (7)) {
      stringValue.add(this._previousToken.source.get$text().substring(this._previousToken.end, this._peekToken.start));
    }
  }
  while (this._peek() != (15) && (this._peek() != (7) || (this._peek() == (7) && inExpression)) && this._peek() != (1)) {
    if (this._peek() == (51)) {
      if (stringValue.get$length() > (0)) {
        nodes.add(new TemplateText(stringValue.toString(), this._makeSpan(start)));
        stringValue = new StringBufferImpl("");
        start = this._peekToken.start;
      }
      inExpression = true;
    }
    var tok = this._template_next(false);
    if ($eq$(tok.get$kind(), (7)) && inExpression) {
      inExpression = false;
      nodes.add(new TemplateExpression(stringValue.toString(), this._makeSpan(start)));
      stringValue = new StringBufferImpl("");
      start = this._peekToken.start;
    }
    else if ($ne$(tok.get$kind(), (51))) {
      stringValue.add(tok.get$text());
    }
  }
  if (stringValue.get$length() > (0)) {
    nodes.add(new TemplateText(stringValue.toString(), this._makeSpan(start)));
  }
  return nodes;
}
// ********** Code for CGBlock **************
function CGBlock(_indent, _blockType, _inEach, _localName) {
  this._indent = _indent;
  this._blockType = _blockType;
  this._inEach = _inEach;
  this._localName = _localName;
  this._stmts = new Array();
  this.localIndex = (0);
}
CGBlock.prototype.get$isEach = function() {
  return this._blockType == (1);
}
CGBlock.prototype.get$isWith = function() {
  return this._blockType == (2);
}
CGBlock.prototype.get$hasLocalName = function() {
  return this._localName != null;
}
CGBlock.prototype.get$localName = function() {
  return this._localName;
}
CGBlock.prototype.push = function(elem, parentName, exact) {
  var varName;
  if ((elem instanceof TemplateElement) && elem.get$hasVar()) {
    varName = elem.get$varName();
  }
  else {
    varName = this.localIndex++;
  }
  var stmt = new CGStatement(elem, this._indent, parentName, varName, exact, this._inEach);
  this._stmts.add(stmt);
  return stmt;
}
CGBlock.prototype.add = function(value) {
  if ($ne$(this._stmts.last())) {
    this._stmts.last().add$1(value);
  }
}
CGBlock.prototype.get$last = function() {
  return this._stmts.last();
}
CGBlock.prototype.get$globalDeclarations = function() {
  var buff = new StringBufferImpl("");
  var $$list = this._stmts;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var stmt = $$i.next$0();
    buff.add(stmt.globalDeclaration());
  }
  return buff.toString();
}
CGBlock.prototype.get$globalInitializers = function() {
  var buff = new StringBufferImpl("");
  var $$list = this._stmts;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var stmt = $$i.next$0();
    buff.add(stmt.globalInitializers());
  }
  return buff.toString();
}
CGBlock.prototype.get$codeBody = function() {
  var buff = new StringBufferImpl("");
  var $$list = this._stmts;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var stmt = $$i.next$0();
    buff.add(stmt.emitDartStatement());
  }
  return buff.toString();
}
CGBlock.prototype.add$1 = CGBlock.prototype.add;
// ********** Code for CGStatement **************
function CGStatement(_elem, _indent, parentName, varNameOrIndex, _exact, _repeating) {
  this._elem = _elem;
  this._indent = _indent;
  this.parentName = parentName;
  this._exact = _exact;
  this._repeating = _repeating;
  this._buff = new StringBufferImpl("");
  this._closed = false;
  if ((typeof(varNameOrIndex) == 'string')) {
    this.varName = varNameOrIndex;
    this._globalVariable = true;
  }
  else {
    this.varName = ("e" + varNameOrIndex);
    this._globalVariable = false;
  }
}
CGStatement.prototype.get$varName = function() { return this.varName; };
CGStatement.prototype.get$hasGlobalVariable = function() {
  return this._globalVariable;
}
CGStatement.prototype.get$variableName = function() {
  return this.varName;
}
CGStatement.prototype.globalDeclaration = function() {
  if (this.get$hasGlobalVariable()) {
    var spaces = Codegen.spaces(this._indent);
    return (this._repeating) ? ("  List " + this.varName + ";    // Repeated elements.\n") : ("  var " + this.varName + ";\n");
  }
  return "";
}
CGStatement.prototype.globalInitializers = function() {
  if (this.get$hasGlobalVariable() && this._repeating) {
    return ("    " + this.varName + " = [];\n");
  }
  return "";
}
CGStatement.prototype.add = function(value) {
  this._buff.add(value);
}
CGStatement.prototype.get$isClosed = function() {
  return this._closed;
}
CGStatement.prototype.close = function() {
  if ((this._elem instanceof TemplateElement)) {
    this.add(("</" + this._elem.get$tagName() + ">"));
  }
  this._closed = true;
}
CGStatement.prototype.emitDartStatement = function() {
  var statement = new StringBufferImpl("");
  var spaces = Codegen.spaces(this._indent);
  if (this._exact) {
    statement.add(("" + spaces + this._buff.toString() + ";\n"));
  }
  else {
    var localVar = "";
    var tmpRepeat;
    if (this.get$hasGlobalVariable()) {
      if (this._repeating) {
        tmpRepeat = ("tmp_" + this.varName);
        localVar = "var ";
      }
    }
    else {
      localVar = "var ";
    }
    if ((this._elem instanceof TemplateCall)) {
      var cls = this._elem.get$toCall();
      var params = this._elem.get$params();
      statement.add(("\n" + spaces + "// Call template " + cls + ".\n"));
      statement.add(("" + spaces + localVar + this.varName + " = new " + cls + params + ";\n"));
      statement.add(("" + spaces + this.parentName + ".elements.add(" + this.varName + ".root);\n"));
    }
    else {
      var isTextNode = (this._elem instanceof TemplateText);
      var createType = isTextNode ? "Text" : "Element.html";
      if (tmpRepeat == null) {
        statement.add(("" + spaces + localVar + this.varName + " = new " + createType + "('"));
      }
      else {
        statement.add(("" + spaces + localVar + tmpRepeat + " = new " + createType + "('"));
      }
      statement.add(isTextNode ? this._buff.toString().trim() : this._buff.toString());
      if (tmpRepeat == null) {
        statement.add(("');\n" + spaces + this.parentName + ".elements.add(" + this.varName + ");\n"));
      }
      else {
        statement.add(("');\n" + spaces + this.parentName + ".elements.add(" + tmpRepeat + ");\n"));
        statement.add(("" + spaces + this.varName + ".add(" + tmpRepeat + ");\n"));
      }
    }
  }
  return statement.toString();
}
CGStatement.prototype.add$1 = CGStatement.prototype.add;
// ********** Code for Codegen **************
function Codegen() {}
Codegen.spaces = function(numSpaces) {
  return "                                              ".substring((0), numSpaces);
}
Codegen.generate = function(templates, filename) {
  var fileParts = filename.split_(".");
  filename = fileParts.$index((0));
  var buff = new StringBufferImpl("");
  var injectId = (0);
  buff.add("// Generated Dart class from HTML template.\n");
  buff.add("// DO NOT EDIT.\n\n");
  buff.add("String safeHTML(String html) {\n");
  buff.add("  // TODO(terry): Escaping for XSS vulnerabilities TBD.\n");
  buff.add("  return html;\n");
  buff.add("}\n\n");
  var addStylesheetFuncName = ("add_" + filename + "_templatesStyles");
  for (var $$i = templates.iterator(); $$i.hasNext(); ) {
    var template = $$i.next$0();
    var sig = template.get$signature();
    buff.add(Codegen._emitClass(sig.name, sig.params, template.get$content(), addStylesheetFuncName));
  }
  buff.add("\n\n// Inject all templates stylesheet once into the head.\n");
  buff.add(("bool " + filename + "_stylesheet_added = false;\n"));
  buff.add(("void " + addStylesheetFuncName + "() {\n"));
  buff.add(("  if (!" + filename + "_stylesheet_added) {\n"));
  buff.add("    StringBuffer styles = new StringBuffer();\n\n");
  buff.add("    // All templates stylesheet.\n");
  for (var $$i = templates.iterator(); $$i.hasNext(); ) {
    var template = $$i.next$0();
    var sig = template.get$signature();
    buff.add(("    styles.add(" + sig.name + ".stylesheet);\n"));
  }
  buff.add(("\n    " + filename + "_stylesheet_added = true;\n"));
  buff.add("    document.head.elements.add(new Element.html('<style>${styles.toString()}</style>'));\n");
  buff.add("  }\n");
  buff.add("}\n");
  return buff.toString();
}
Codegen._emitCSSSelectors = function(stylesheet) {
  if (stylesheet == null) {
    return "";
  }
  var classes = [];
  var $$list = stylesheet.get$topLevels();
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var production = $$i.next$0();
    if ((production instanceof IncludeDirective)) {
      var $list0 = production.get$styleSheet().get$topLevels();
      for (var $i0 = $list0.iterator(); $i0.hasNext(); ) {
        var topLevel = $i0.next$0();
        if ((topLevel instanceof RuleSet)) {
          classes = Generate.computeClassSelectors(topLevel, classes);
        }
      }
    }
    else if ((production instanceof RuleSet)) {
      classes = Generate.computeClassSelectors(production, classes);
    }
  }
  var dartNames = [];
  for (var $$i = classes.iterator(); $$i.hasNext(); ) {
    var knownClass = $$i.next$0();
    var dartName = new StringBufferImpl("");
    var splits = knownClass.split_("-");
    if (splits.get$length() > (0)) {
      dartName.add(splits.$index((0)));
      for (var idx = (1);
       idx < splits.get$length(); idx++) {
        var part = splits.$index(idx);
        dartName.add(("" + part[(0)].toUpperCase() + part.substring((1))));
      }
      dartNames.add(dartName.toString());
    }
  }
  var buff = new StringBufferImpl("");
  if (classes.get$length() > (0)) {
    buff.add("\n  // CSS class selectors for this template.\n");
    for (var i = (0);
     i < classes.get$length(); i++) {
      buff.add(("  static String get " + dartNames.$index(i) + "() => \"" + classes.$index(i) + "\";\n"));
    }
  }
  return buff.toString();
}
Codegen._emitClass = function(className, params, content, addStylesheetFuncName) {
  var buff = new StringBufferImpl("");
  buff.add(("class " + className + " {\n"));
  buff.add("  Map<String, Object> _scopes;\n");
  buff.add("  Element _fragment;\n\n");
  var anyParams = false;
  for (var $$i = params.iterator(); $$i.hasNext(); ) {
    var param = $$i.next$0();
    buff.add(("  " + param.$index("type") + " " + param.$index("name") + ";\n"));
    anyParams = true;
  }
  if (anyParams) buff.add("\n");
  var ecg = new ElemCG();
  if (!ecg.pushBlock((4), (0))) {
    $globals.world.error(("Error at " + content));
  }
  var root = content.html.children.$index((0));
  var firstTime = true;
  var $$list = root.get$children();
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var child = $$i.next$0();
    if ((child instanceof TemplateText)) {
      if (!firstTime) {
        ecg.closeStatement();
      }
      var stmt = ecg.pushStatement(child, "_fragment");
    }
    ecg.emitConstructHtml(child, "", "_fragment", (0), false);
    firstTime = false;
  }
  var decls = ecg.get$globalDeclarations();
  if (decls.length > (0)) {
    buff.add("\n  // Elements bound to a variable:\n");
    buff.add(("" + decls + "\n"));
  }
  buff.add(("  " + className + "("));
  var firstParam = true;
  for (var $$i = params.iterator(); $$i.hasNext(); ) {
    var param = $$i.next$0();
    if (!firstParam) {
      buff.add(", ");
    }
    buff.add(("this." + param.$index("name")));
    firstParam = false;
  }
  buff.add(") : _scopes = new Map<String, Object>() {\n");
  var initializers = ecg.get$globalInitializers();
  if (initializers.length > (0)) {
    buff.add("    //Global initializers.\n");
    buff.add(("" + initializers + "\n"));
  }
  buff.add("    // Insure stylesheet for template exist in the document.\n");
  buff.add(("    " + addStylesheetFuncName + "();\n\n"));
  buff.add("    _fragment = new DocumentFragment();\n");
  buff.add(ecg.get$codeBody());
  buff.add("  }\n\n");
  buff.add("  Element get root() => _fragment;\n");
  buff.add(Codegen._emitCSSSelectors(content.css));
  buff.add("\n  // Injection functions:");
  var $$list = ecg.expressions;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var expr = $$i.next$0();
    buff.add(("" + expr));
  }
  buff.add("\n  // Each functions:\n");
  var $$list = ecg.eachs;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var eachFunc = $$i.next$0();
    buff.add(("" + eachFunc + "\n"));
  }
  buff.add("\n  // With functions:\n");
  var $$list = ecg.withs;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var withFunc = $$i.next$0();
    buff.add(("" + withFunc + "\n"));
  }
  buff.add("\n  // CSS for this template.\n");
  buff.add("  static final String stylesheet = ");
  if (content.css != null) {
    buff.add(("'''\n    " + content.css.toString() + "\n"));
    buff.add("  ''';\n\n");
    buff.add("  // Stylesheet class selectors:\n");
  }
  else {
    buff.add("\"\";\n");
  }
  buff.add("}\n");
  return buff.toString();
}
// ********** Code for ElemCG **************
function ElemCG() {
  this.identRe = const$0275;
  this.expressions = [];
  this.eachs = [];
  this.withs = [];
  this._cgBlocks = [];
  this._globalDecls = new StringBufferImpl("");
  this._globalInits = new StringBufferImpl("");
}
ElemCG.prototype.activeBlocksLocalNames = function() {
  var result = [];
  var $$list = this._cgBlocks;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var block = $$i.next$0();
    if (block.get$isEach() || block.get$isWith()) {
      if (block.get$hasLocalName()) {
        result.add(block.get$localName());
      }
    }
  }
  return result;
}
ElemCG.prototype.matchBlocksLocalName = function(name) {
  var $$list = this._cgBlocks;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var block = $$i.next$0();
    if (block.get$isEach() || block.get$isWith()) {
      if (block.get$hasLocalName() && block.get$localName() == name) {
        return true;
      }
    }
  }
  return false;
}
ElemCG.prototype.isNestedBlock = function() {
  var $$list = this._cgBlocks;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var block = $$i.next$0();
    if (block.get$isEach() || block.get$isWith()) {
      return true;
    }
  }
  return false;
}
ElemCG.prototype.isNestedNamedBlock = function() {
  var $$list = this._cgBlocks;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var block = $$i.next$0();
    if ((block.get$isEach() || block.get$isWith()) && block.get$hasLocalName()) {
      return true;
    }
  }
  return false;
}
ElemCG.prototype.anyEachBlocks = function(blockToCreateType) {
  var result = blockToCreateType == (1);
  var $$list = this._cgBlocks;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var block = $$i.next$0();
    if (block.get$isEach()) {
      result = result || true;
    }
  }
  return result;
}
ElemCG.prototype.pushBlock = function(indent, blockType, itemName) {
  this.closeStatement();
  if (itemName != null && this.matchBlocksLocalName(itemName)) {
    $globals.world.error(("Active block already exist with local name: " + itemName + "."));
    return false;
  }
  else if (itemName == null && this.isNestedBlock()) {
    $globals.world.error("Nested #each or #with must have a localName;\n \n  #each list [localName]\n  #with object [localName]");
    return false;
  }
  this._cgBlocks.add(new CGBlock(indent, blockType, this.anyEachBlocks(blockType), itemName));
  return true;
}
ElemCG.prototype.popBlock = function() {
  this._globalDecls.add(this.get$lastBlock().get$globalDeclarations());
  this._globalInits.add(this.get$lastBlock().get$globalInitializers());
  this._cgBlocks.removeLast();
}
ElemCG.prototype.pushStatement = function(elem, parentName) {
  return this.get$lastBlock().push(elem, parentName, false);
}
ElemCG.prototype.pushExactStatement = function(elem, parentName) {
  return this.get$lastBlock().push(elem, parentName, true);
}
ElemCG.prototype.closeStatement = function() {
  if (this.get$lastBlock() != null && this.get$lastBlock().get$last() != null && !this.get$lastBlock().get$last().get$isClosed()) {
    this.get$lastBlock().get$last().close();
  }
}
ElemCG.prototype.get$lastVariableName = function() {
  if (this.get$lastBlock() != null && this.get$lastBlock().get$last() != null) {
    return this.get$lastBlock().get$last().get$variableName();
  }
}
ElemCG.prototype.get$lastBlock = function() {
  return this._cgBlocks.get$length() > (0) ? this._cgBlocks.last() : null;
}
ElemCG.prototype.add = function(str) {
  this._cgBlocks.last().add$1(str);
}
ElemCG.prototype.get$globalDeclarations = function() {
  this._globalDecls.add(this.get$lastBlock().get$globalDeclarations());
  return this._globalDecls.toString();
}
ElemCG.prototype.get$globalInitializers = function() {
  this._globalInits.add(this.get$lastBlock().get$globalInitializers());
  return this._globalInits.toString();
}
ElemCG.prototype.get$codeBody = function() {
  this.closeStatement();
  return this._cgBlocks.last().get$codeBody();
}
ElemCG.prototype.emitElement = function(elem, scopeName, parentVarOrIdx, immediateNestedEach) {
  if ((elem instanceof TemplateElement)) {
    if (!elem.get$isFragment()) {
      this.add(("<" + elem.get$tagName() + elem.attributesToString() + ">"));
    }
    var prevParent = this.get$lastVariableName();
    var $$list = elem.get$children();
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var childElem = $$i.next$0();
      if ((childElem instanceof TemplateElement)) {
        if (childElem.get$hasVar()) {
          this.closeStatement();
          this.emitConstructHtml(childElem, scopeName, prevParent, childElem.get$varName(), false);
          this.closeStatement();
        }
        else {
          this.closeStatement();
          this.emitConstructHtml(childElem, scopeName, prevParent, (0), false);
          this.closeStatement();
        }
      }
      else {
        this.emitElement(childElem, scopeName, parentVarOrIdx, false);
      }
    }
    this.closeStatement();
  }
  else if ((elem instanceof TemplateText)) {
    this.add(("" + elem.get$value()));
  }
  else if ((elem instanceof TemplateExpression)) {
    this.emitExpressions(elem, scopeName);
  }
  else if ((elem instanceof TemplateEachCommand)) {
    this.emitEach(elem, "List", elem.get$listName().get$name(), "parent", immediateNestedEach, elem.get$hasLoopItem() ? elem.get$loopItem().get$name() : null);
  }
  else if ((elem instanceof TemplateWithCommand)) {
    this.emitWith(elem, "var", elem.get$objectName().get$name(), "parent", elem.get$hasBlockItem() ? elem.get$blockItem().get$name() : null);
  }
  else if ((elem instanceof TemplateCall)) {
    this.emitCall(elem, parentVarOrIdx);
  }
}
ElemCG.prototype._resolveNames = function(expr, prefixPart) {
  var newExpr = new StringBufferImpl("");
  var matches = this.identRe.allMatches(expr);
  var lastIdx = (0);
  for (var $$i = matches.iterator(); $$i.hasNext(); ) {
    var m = $$i.next$0();
    if (m.start() > lastIdx) {
      newExpr.add(expr.substring(lastIdx, m.start()));
    }
    var identifier = true;
    if (m.start() > (0)) {
      var charCode = expr.charCodeAt(m.start() - (1));
      identifier = charCode != (34) && charCode != (39);
    }
    var strMatch = expr.substring(m.start(), m.end());
    if (identifier) {
      newExpr.add(("" + prefixPart + "." + strMatch));
    }
    else {
      newExpr.add(("" + strMatch));
    }
    lastIdx = m.end();
  }
  if (expr.length > lastIdx) {
    newExpr.add(expr.substring(lastIdx));
  }
  return newExpr.toString();
}
ElemCG.prototype.emitConstructHtml = function(elem, scopeName, parentName, varIndex, immediateNestedEach) {
  if ((elem instanceof TemplateElement)) {
    var stmt = this.pushStatement(elem, parentName);
    this.emitElement(elem, scopeName, stmt.get$hasGlobalVariable() ? stmt.get$variableName() : varIndex, false);
  }
  else {
    this.emitElement(elem, scopeName, varIndex, immediateNestedEach);
  }
}
ElemCG.prototype.eachIterNameToItem = function(iterName) {
  var newName = iterName;
  var dotForIter = iterName.indexOf(".");
  if ($gte$(dotForIter, (0))) {
    newName = ("_item" + iterName.substring(dotForIter));
  }
  return newName;
}
ElemCG.prototype.emitExpressions = function(elem, scopeName) {
  var func = new StringBufferImpl("");
  var newExpr = elem.expression;
  var anyNesting = this.isNestedNamedBlock();
  if (scopeName.length > (0) && !anyNesting) {
    this.add(("${inject_" + this.expressions.get$length() + "(_item)}"));
    func.add(("\n  String inject_" + this.expressions.get$length() + "(var _item) {\n"));
    newExpr = this._resolveNames(newExpr.replaceAll("'", "\\'"), "_item");
  }
  else {
    this.add(("${inject_" + this.expressions.get$length() + "()}"));
    func.add(("\n  String inject_" + this.expressions.get$length() + "() {\n"));
    if (anyNesting) {
      func.add(this.defineScopes());
    }
  }
  func.add(("    return safeHTML('${" + newExpr + "}');\n"));
  func.add("  }\n");
  this.expressions.add(func.toString());
}
ElemCG.prototype.emitCall = function(elem, scopeName) {
  this.pushStatement(elem, scopeName);
}
ElemCG.prototype.emitEach = function(elem, iterType, iterName, parentVarOrIdx, nestedImmediateEach, itemName) {
  var docFrag = elem.documentFragment;
  var eachIndex = this.eachs.get$length();
  this.eachs.add("");
  var funcBuff = new StringBufferImpl("");
  var funcName = ("each_" + eachIndex);
  funcBuff.add(("  " + funcName + "(" + iterType + " items, Element parent) {\n"));
  var paramName = this.injectParamName(itemName);
  if (paramName == null) {
    $globals.world.error(("Use a different local name; " + itemName + " is reserved."));
  }
  funcBuff.add(("    for (var " + paramName + " in items) {\n"));
  if (!this.pushBlock((6), (1), itemName)) {
    $globals.world.error(("Error at " + elem));
  }
  this.addScope((6), funcBuff, itemName);
  var docFragChild = docFrag.children.$index((0));
  var children = docFragChild.get$isFragment() ? docFragChild.children : docFrag.children;
  for (var $$i = children.iterator(); $$i.hasNext(); ) {
    var child = $$i.next$0();
    var eachChild = ((child instanceof TemplateEachCommand));
    this.emitConstructHtml(child, iterName, parentVarOrIdx, (0), eachChild);
  }
  funcBuff.add(this.get$codeBody());
  this.removeScope((6), funcBuff, itemName);
  this.popBlock();
  funcBuff.add("    }\n");
  funcBuff.add("  }\n");
  this.eachs.$setindex(eachIndex, funcBuff.toString());
  var varName = nestedImmediateEach ? "parent" : this.get$lastBlock().get$last().get$variableName();
  this.pushExactStatement(elem, parentVarOrIdx);
  var eachParam = (itemName == null) ? this.eachIterNameToItem(iterName) : iterName;
  this.add(("" + funcName + "(" + eachParam + ", " + varName + ")"));
}
ElemCG.prototype.emitWith = function(elem, withType, withName, parentVarIndex, itemName) {
  var docFrag = elem.documentFragment;
  var withIndex = this.withs.get$length();
  this.withs.add("");
  var funcBuff = new StringBufferImpl("");
  var funcName = ("with_" + withIndex);
  var paramName = this.injectParamName(itemName);
  if (paramName == null) {
    $globals.world.error(("Use a different local name; " + itemName + " is reserved."));
  }
  funcBuff.add(("  " + funcName + "(" + withType + " " + paramName + ", Element parent) {\n"));
  if (!this.pushBlock((4), (2), itemName)) {
    $globals.world.error(("Error at " + elem));
  }
  var docFragChild = docFrag.children.$index((0));
  var children = docFragChild.get$isFragment() ? docFragChild.children : docFrag.children;
  for (var $$i = children.iterator(); $$i.hasNext(); ) {
    var child = $$i.next$0();
    this.emitConstructHtml(child, withName, "parent", (0), false);
  }
  this.addScope((4), funcBuff, itemName);
  funcBuff.add(this.get$codeBody());
  this.removeScope((4), funcBuff, itemName);
  this.popBlock();
  funcBuff.add("  }\n");
  this.withs.$setindex(withIndex, funcBuff.toString());
  var varName = this.get$lastBlock().get$last().get$variableName();
  this.pushExactStatement(elem, parentVarIndex);
  this.add(("" + funcName + "(" + withName + ", " + varName + ")"));
}
ElemCG.prototype.injectParamName = function(name) {
  if (name != null && name == "_item") {
    return null;
  }
  return (name == null) ? "_item" : name;
}
ElemCG.prototype.addScope = function(indent, buff, item) {
  var spaces = Codegen.spaces(indent);
  if (item == null) {
    item = "_item";
  }
  buff.add(("" + spaces + "_scopes[\"" + item + "\"] = " + item + ";\n"));
}
ElemCG.prototype.removeScope = function(indent, buff, item) {
  var spaces = Codegen.spaces(indent);
  if (item == null) {
    item = "_item";
  }
  buff.add(("" + spaces + "_scopes.remove(\"" + item + "\");\n"));
}
ElemCG.prototype.defineScopes = function() {
  var buff = new StringBufferImpl("");
  var names = this.activeBlocksLocalNames();
  if (names.get$length() > (0)) {
    buff.add("    // Local scoped block names.\n");
    for (var $$i = names.iterator(); $$i.hasNext(); ) {
      var name = $$i.next$0();
      buff.add(("    var " + name + " = _scopes[\"" + name + "\"];\n"));
    }
    buff.add("\n");
  }
  return buff.toString();
}
ElemCG.prototype.add$1 = ElemCG.prototype.add;
// ********** Code for ASTNode **************
function ASTNode(span) {
  this.span = span;
}
ASTNode.prototype.get$span = function() { return this.span; };
ASTNode.prototype.toDebugString = function() {
  var to = new TreeOutput();
  var tp = new TreePrinter(to);
  this.visit(tp);
  return to.get$buf().toString();
}
// ********** Code for TreeOutput **************
function TreeOutput() {
  this.depth = (0);
  this.buf = new StringBufferImpl("");
}
TreeOutput.prototype.get$depth = function() { return this.depth; };
TreeOutput.prototype.set$depth = function(value) { return this.depth = value; };
TreeOutput.prototype.get$buf = function() { return this.buf; };
TreeOutput.prototype.set$printer = function(value) { return this.printer = value; };
TreeOutput.prototype.write = function(s) {
  for (var i = (0);
   i < this.depth; i++) {
    this.buf.add(" ");
  }
  this.buf.add(s);
}
TreeOutput.prototype.writeln = function(s) {
  this.write(s);
  this.buf.add("\n");
}
TreeOutput.prototype.heading = function(name, span) {
  this.write(name);
  this.buf.add(("  (" + span.get$locationText() + ")"));
  this.buf.add("\n");
}
TreeOutput.prototype.toValue = function(value) {
  if ($eq$(value)) return "null";
  else if ((value instanceof Identifier)) return value.get$name();
  else return value.toString();
}
TreeOutput.prototype.writeNode = function(label, node) {
  this.write($add$(label, ": "));
  this.depth = this.depth + (1);
  if (node != null) node.visit(this.printer);
  else this.writeln("null");
  this.depth = this.depth - (1);
}
TreeOutput.prototype.writeValue = function(label, value) {
  var v = this.toValue(value);
  this.writeln(("" + label + ": " + v));
}
TreeOutput.prototype.writeNodeList = function(label, list) {
  this.writeln(("" + label + " ["));
  if (list != null) {
    this.depth = this.depth + (1);
    for (var $$i = list.iterator(); $$i.hasNext(); ) {
      var node = $$i.next$0();
      if ($ne$(node)) {
        node.visit(this.printer);
      }
      else {
        this.writeln("null");
      }
    }
    this.depth = this.depth - (1);
    this.writeln("]");
  }
}
TreeOutput.prototype.heading$2 = TreeOutput.prototype.heading;
// ********** Code for Identifier **************
$inherits(Identifier, ASTNode);
function Identifier(name, span) {
  this.name = name;
  ASTNode.call(this, span);
}
Identifier.prototype.get$name = function() { return this.name; };
Identifier.prototype.visit = function(visitor) {
  return visitor.visitIdentifier(this);
}
Identifier.prototype.toString = function() {
  return this.name;
}
// ********** Code for StringValue **************
$inherits(StringValue, ASTNode);
function StringValue(value, span) {
  this.value = value;
  ASTNode.call(this, span);
}
StringValue.prototype.get$value = function() { return this.value; };
StringValue.prototype.set$value = function(value) { return this.value = value; };
StringValue.prototype.visit = function(visitor) {
  return visitor.visitStringValue(this);
}
StringValue.prototype.toString = function() {
  return this.value;
}
// ********** Code for Template **************
$inherits(Template, ASTNode);
function Template(signature, content, span) {
  this.signature = signature;
  this.content = content;
  ASTNode.call(this, span);
}
Template.prototype.get$signature = function() { return this.signature; };
Template.prototype.get$content = function() { return this.content; };
Template.prototype.visit = function(visitor) {
  return visitor.visitTemplate(this);
}
Template.prototype.toString = function() {
  return ("" + this.signature.toString() + " \r{\r" + this.content.toString() + "\r}\r");
}
// ********** Code for TemplateSignature **************
$inherits(TemplateSignature, ASTNode);
function TemplateSignature(name, params, span) {
  this.name = name;
  this.params = params;
  ASTNode.call(this, span);
}
TemplateSignature.prototype.get$name = function() { return this.name; };
TemplateSignature.prototype.get$params = function() { return this.params; };
TemplateSignature.prototype.visit = function(visitor) {
  return visitor.visitTemplateSignature(this);
}
TemplateSignature.prototype.paramsAsString = function() {
  var buff = new StringBufferImpl("");
  var first = true;
  var $$list = this.params;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var param = $$i.next$0();
    if (!first) {
      buff.add(", ");
    }
    if ($ne$(param.$index("type"))) {
      buff.add(param.$index("type"));
      buff.add(" ");
    }
    buff.add(param.$index("name"));
    first = false;
  }
  return buff.toString();
}
TemplateSignature.prototype.toString = function() {
  return ("template " + this.name + "(" + this.paramsAsString() + ")");
}
// ********** Code for TemplateChildren **************
$inherits(TemplateChildren, ASTNode);
function TemplateChildren(children, span) {
  this.children = children;
  ASTNode.call(this, span);
}
TemplateChildren.empty$ctor = function(span) {
  ASTNode.call(this, span);
}
TemplateChildren.empty$ctor.prototype = TemplateChildren.prototype;
TemplateChildren.prototype.get$children = function() { return this.children; };
TemplateChildren.prototype.add = function(child) {
  if (this.children == null) {
    this.children = new Array();
  }
  this.children.add(child);
}
TemplateChildren.prototype.visit = function(visitor) {
  return visitor.visitTemplateChildren(this);
}
TemplateChildren.prototype.toString = function() {
  var buff = new StringBufferImpl("");
  if (this.children != null) {
    var $$list = this.children;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var child = $$i.next$0();
      buff.add(child.toString());
    }
  }
  return buff.toString();
}
TemplateChildren.prototype.add$1 = TemplateChildren.prototype.add;
// ********** Code for TemplateContent **************
$inherits(TemplateContent, ASTNode);
function TemplateContent(css, html, span) {
  this.css = css;
  this.html = html;
  ASTNode.call(this, span);
}
TemplateContent.prototype.visit = function(visitor) {
  return visitor.visitTemplateContent(this);
}
// ********** Code for TemplateDocument **************
$inherits(TemplateDocument, TemplateChildren);
function TemplateDocument(children, span) {
  TemplateChildren.call(this, children, span);
}
TemplateDocument.prototype.visit = function(visitor) {
  return visitor.visitTemplateDocument(this);
}
// ********** Code for TemplateElement **************
$inherits(TemplateElement, TemplateChildren);
TemplateElement.fragment$ctor = function(span) {
  this.tagTokenId = (-1);
  TemplateChildren.empty$ctor.call(this, span);
}
TemplateElement.fragment$ctor.prototype = TemplateElement.prototype;
TemplateElement.attributes$ctor = function(tagTokenId, attributes, _varName, span) {
  this.tagTokenId = tagTokenId;
  this.attributes = attributes;
  this._varName = _varName;
  TemplateChildren.empty$ctor.call(this, span);
}
TemplateElement.attributes$ctor.prototype = TemplateElement.prototype;
function TemplateElement() {}
TemplateElement.prototype.get$tagTokenId = function() { return this.tagTokenId; };
TemplateElement.prototype.get$isFragment = function() {
  return this.tagTokenId == (-1);
}
TemplateElement.prototype.visit = function(visitor) {
  return visitor.visitTemplateElement(this);
}
TemplateElement.prototype.get$hasVar = function() {
  return this._varName != null;
}
TemplateElement.prototype.get$varName = function() {
  return this.get$hasVar() ? this._varName.value : null;
}
TemplateElement.prototype.attributesToString = function() {
  var buff = new StringBufferImpl("");
  var $$list = this.attributes;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var attr = $$i.next$0();
    buff.add((" " + attr.toString()));
  }
  return buff.toString();
}
TemplateElement.prototype.get$tagName = function() {
  return this.get$isFragment() ? "root" : TokenKind.tagNameFromTokenId(this.tagTokenId);
}
TemplateElement.prototype.tagStartToString = function() {
  return ("<" + this.get$tagName() + " " + this.attributesToString() + ">");
}
TemplateElement.prototype.tagEndToString = function() {
  return ("</" + this.get$tagName() + ">");
}
TemplateElement.prototype.toString = function() {
  var buff = new StringBufferImpl(this.tagStartToString());
  if (this.children != null) {
    var $$list = this.children;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var child = $$i.next$0();
      buff.add(child.toString());
    }
    buff.add(this.tagEndToString());
  }
  return buff.toString();
}
// ********** Code for TemplateAttribute **************
$inherits(TemplateAttribute, ASTNode);
function TemplateAttribute(name, value, span) {
  this.name = name;
  this.value = value;
  ASTNode.call(this, span);
}
TemplateAttribute.prototype.get$name = function() { return this.name; };
TemplateAttribute.prototype.get$value = function() { return this.value; };
TemplateAttribute.prototype.set$value = function(value) { return this.value = value; };
TemplateAttribute.prototype.visit = function(visitor) {
  return visitor.visitTemplateAttribute(this);
}
TemplateAttribute.prototype.toString = function() {
  return ("" + this.name + "=\"" + this.value + "\"");
}
// ********** Code for TemplateText **************
$inherits(TemplateText, ASTNode);
function TemplateText(value, span) {
  this.value = value;
  ASTNode.call(this, span);
}
TemplateText.prototype.get$value = function() { return this.value; };
TemplateText.prototype.set$value = function(value) { return this.value = value; };
TemplateText.prototype.visit = function(visitor) {
  return visitor.visitTemplateText(this);
}
TemplateText.prototype.toString = function() {
  return this.value;
}
// ********** Code for TemplateExpression **************
$inherits(TemplateExpression, ASTNode);
function TemplateExpression(expression, span) {
  this.expression = expression;
  ASTNode.call(this, span);
}
TemplateExpression.prototype.visit = function(visitor) {
  return visitor.visitTemplateExpression(this);
}
TemplateExpression.prototype.toString = function() {
  return "${value}";
}
// ********** Code for TemplateEachCommand **************
$inherits(TemplateEachCommand, ASTNode);
function TemplateEachCommand(listName, loopItem, documentFragment, span) {
  this.listName = listName;
  this.loopItem = loopItem;
  this.documentFragment = documentFragment;
  ASTNode.call(this, span);
}
TemplateEachCommand.prototype.get$listName = function() { return this.listName; };
TemplateEachCommand.prototype.get$loopItem = function() { return this.loopItem; };
TemplateEachCommand.prototype.get$hasLoopItem = function() {
  return this.loopItem != null;
}
TemplateEachCommand.prototype.get$loopNameOptional = function() {
  return this.get$hasLoopItem() ? (" " + this.loopItem) : "";
}
TemplateEachCommand.prototype.visit = function(visitor) {
  return visitor.visitTemplateEachCommand(this);
}
TemplateEachCommand.prototype.toString = function() {
  return ("${#each " + this.listName + this.get$loopNameOptional() + "}");
}
// ********** Code for TemplateWithCommand **************
$inherits(TemplateWithCommand, ASTNode);
function TemplateWithCommand(objectName, blockItem, documentFragment, span) {
  this.objectName = objectName;
  this.blockItem = blockItem;
  this.documentFragment = documentFragment;
  ASTNode.call(this, span);
}
TemplateWithCommand.prototype.get$objectName = function() { return this.objectName; };
TemplateWithCommand.prototype.get$blockItem = function() { return this.blockItem; };
TemplateWithCommand.prototype.get$hasBlockItem = function() {
  return this.blockItem != null;
}
TemplateWithCommand.prototype.get$blockNameOptional = function() {
  return this.get$hasBlockItem() ? (" " + this.blockItem) : "";
}
TemplateWithCommand.prototype.visit = function(visitor) {
  return visitor.visitTemplateWithCommand(this);
}
TemplateWithCommand.prototype.toString = function() {
  return ("${#with " + this.objectName + this.get$blockNameOptional() + "}");
}
// ********** Code for TemplateCall **************
$inherits(TemplateCall, ASTNode);
function TemplateCall(toCall, params, span) {
  this.toCall = toCall;
  this.params = params;
  ASTNode.call(this, span);
}
TemplateCall.prototype.get$toCall = function() { return this.toCall; };
TemplateCall.prototype.get$params = function() { return this.params; };
TemplateCall.prototype.visit = function(visitor) {
  return visitor.visitTemplateCall(this);
}
TemplateCall.prototype.toString = function() {
  return ("${#" + this.toCall + this.params + "}");
}
// ********** Code for TreePrinter **************
function TreePrinter(output) {
  this.output = output;
  this.output.set$printer(this);
}
TreePrinter.prototype.visitIdentifier = function(node) {
  this.output.heading$2(("Identifier(" + this.output.toValue(node.name) + ")"), node.span);
}
TreePrinter.prototype.visitStringValue = function(node) {
  this.output.heading$2(("\"" + this.output.toValue(node.value) + "\""), node.span);
}
TreePrinter.prototype.visitTemplate = function(node) {
  var $0, $1;
  this.output.heading$2("Template", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.visitTemplateSignature(node.signature);
  this.visitTemplateContent(node.content);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
TreePrinter.prototype.visitTemplateSignature = function(node) {
  var $0, $1;
  this.output.heading$2("TemplateSignature", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeValue("Template", node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
TreePrinter.prototype.visitTemplateChildren = function(node) {
  this.output.writeNodeList("children", node.children);
}
TreePrinter.prototype.visitTemplateContent = function(node) {
  var $0, $1;
  this.visitTemplateDocument(node.html);
  if (node.css != null) {
    ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
    this.output.writeValue("---CSS---", node.css.toString());
    ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
  }
}
TreePrinter.prototype.visitTemplateDocument = function(node) {
  var $0, $1;
  this.output.heading$2("Content", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  var child = node.children.$index((0));
  this.output.writeNodeList("document", node.children);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
TreePrinter.prototype.visitTemplateElement = function(node) {
  var $0, $1;
  this.output.heading$2("Element", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeValue("tag", node.get$tagName());
  if (node.attributes != null && (node.attributes.get$length() > (0))) {
    this.output.writeNodeList("attributes", node.attributes);
  }
  this.visitTemplateChildren(node);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
TreePrinter.prototype.visitTemplateAttribute = function(node) {
  var $0, $1;
  this.output.heading$2("Attribute", node.span);
  ($0 = this.output).set$depth($add$($0.get$depth(), (1)));
  this.output.writeValue("name", node.name);
  this.output.writeValue("value", node.value);
  ($1 = this.output).set$depth($sub$($1.get$depth(), (1)));
}
TreePrinter.prototype.visitTemplateText = function(node) {
  this.output.heading$2("Text", node.span);
  this.output.writeValue("value", node.value);
}
TreePrinter.prototype.visitTemplateExpression = function(node) {
  this.output.heading$2("Interpolate", node.span);
  this.output.writeValue("expression", ("${" + node.expression + "}"));
}
TreePrinter.prototype.visitTemplateEachCommand = function(node) {
  this.output.heading$2("#each", node.span);
  this.output.writeValue("list", node.listName);
  this.visitTemplateDocument(node.documentFragment);
}
TreePrinter.prototype.visitTemplateWithCommand = function(node) {
  this.output.heading$2("#with", node.span);
  this.output.writeValue("object", node.objectName);
  this.visitTemplateDocument(node.documentFragment);
}
TreePrinter.prototype.visitTemplateCall = function(node) {
  this.output.heading$2("#call template", node.span);
  this.output.writeValue("templateToCall", node.toCall);
  this.output.writeValue("params", node.params);
}
// ********** Code for TemplateOptions **************
function TemplateOptions(args, files) {
  this.warningsAsErrors = false;
  this.checkOnly = false;
  this.throwOnErrors = false;
  this.throwOnWarnings = false;
  this.throwOnFatal = false;
  this.showInfo = false;
  this.showWarnings = true;
  this.useColors = true;
  var ignoreUnrecognizedFlags = false;
  var passedLibDir = false;
  this.childArgs = [];
  loop:
  for (var i = (2);
   i < args.get$length(); i++) {
    var arg = args.$index(i);
    switch (arg) {
      case "--check-only":

        this.checkOnly = true;
        break;

      case "--verbose":

        this.showInfo = true;
        break;

      case "--suppress_warnings":

        this.showWarnings = false;
        break;

      case "--warnings_as_errors":

        this.warningsAsErrors = true;
        break;

      case "--throw_on_errors":

        this.throwOnErrors = true;
        break;

      case "--throw_on_warnings":

        this.throwOnWarnings = true;
        break;

      case "--no_colors":

        this.useColors = false;
        break;

      case "--checked":

        this.checkOnly = true;
        break;

      default:

        if (!ignoreUnrecognizedFlags) {
          print$(("unrecognized flag: \"" + arg + "\""));
        }

    }
  }
}
// ********** Code for CompilerException **************
function CompilerException(_message, _location) {
  this._template_message = _message;
  this._location = _location;
}
CompilerException.prototype.toString = function() {
  if (this._location != null) {
    return ("CompilerException: " + this._location.toMessageString(this._template_message));
  }
  else {
    return ("CompilerException: " + this._template_message);
  }
}
// ********** Code for World **************
function World(files) {
  this.errors = (0);
  this.warnings = (0);
  this.seenFatal = false;
  this.files = files;
}
World.prototype.init = function() {

}
World.prototype._template_message = function(color, prefix, message, span, span1, span2, throwing) {
  if (this.messageHandler != null) {
    this.messageHandler(prefix, message, span);
    if (span1 != null) {
      this.messageHandler(prefix, message, span1);
    }
    if (span2 != null) {
      this.messageHandler(prefix, message, span2);
    }
  }
  else {
    var messageWithPrefix = $globals.options.useColors ? ($add$($add$($add$(color, prefix), $globals._NO_COLOR), message)) : ($add$(prefix, message));
    var text = messageWithPrefix;
    if (span != null) {
      text = span.toMessageString(messageWithPrefix);
    }
    var span1Text = span1 != null ? span1.toMessageString(messageWithPrefix) : "";
    var span2Text = span2 != null ? span2.toMessageString(messageWithPrefix) : "";
    if (this.printHandler == null) {
      print$(text);
      if (span1 != null) {
        print$(span1Text);
      }
      if (span2 != null) {
        print$(span2Text);
      }
    }
    else {
      this.printHandler(("" + text + "\r" + span1Text + "\r" + span2Text));
    }
  }
  if (throwing) {
    $throw(new CompilerException($add$(prefix, message), span));
  }
}
World.prototype.error = function(message, span, span1, span2) {
  this.errors++;
  this._template_message($globals._RED_COLOR, "error: ", message, span, span1, span2, $globals.options.throwOnErrors);
}
World.prototype.fatal = function(message, span, span1, span2) {
  this.errors++;
  this.seenFatal = true;
  this._template_message($globals._RED_COLOR, "fatal: ", message, span, span1, span2, $globals.options.throwOnFatal || $globals.options.throwOnErrors);
}
World.prototype.internalError = function(message, span, span1, span2) {
  this._template_message($globals._NO_COLOR, "We are sorry, but...", message, span, span1, span2, true);
}
// ********** Code for top level **************
function initHtmlWorld(commandLine) {
  var fs = new MemoryFileSystem();
  initializeWorld(fs);
}
function templateParseAndValidate(template) {
  var parser = new Parser(new SourceFile($globals.SourceFile_IN_MEMORY_FILE, template), (0));
  return parser.parse(to$call$1(null));
}
var options;
function parseOptions(args, files) {
  $globals.options = new TemplateOptions(args, files);
}
var world;
function initializeWorld(files) {
  $globals.world = new World(files);
  $globals.world.init();
}
//  ********** Library uitest **************
// ********** Code for top level **************
var currSampleTemplate;
function changeTemplate() {
  var doc = get$$window().get$document();
  var samples = doc.query("#templateSamples");
  var template = doc.query("#template");
  template.value = sample(samples.value);
}
function sample(sampleName) {
  var each = "${#each";
  var endEach = "${/each}";
  var with_ = "${#with";
  var endWith = "${/with}";
  var simpleTemplate = "template NameEntry(String name, int age) {\n  <div var=topDiv attr=\"test\" attr1=test1 attr2='test2' attr3=test3>\n    <span var=spanElem>${name}</span>\n    <span>-</span>\n    <span>${age}</span>\n  </div>\n}\n  ";
  var simpleTemplate2 = "template NameEntry(String name, int age) {\n  <div var=topDiv attr=\"test\" attr1=test1 attr2='test2' attr3=test3>\n    <h1>\n      <h2>\n        <h3>\n          <span var=spanElem>${name}</span>\n          <span>-</span>\n          <span>${age}</span>\n        </h3>\n      </h2>\n    </h1>\n  </div>\n}\n  ";
  var simpleTemplateCSS = "template NameEntry(String name, int age) {\n  css {\n    .foo {\n      left: 10px;\n    }\n  }\n  <div var=topDiv attr=\"test\" attr1=test1 attr2='test2' attr3=test3>\n    <span var=spanElem>${name}</span>\n    <span>-</span>\n    <span>${age}</span>\n  </div>\n}\n  ";
  var eachTemplate = ("template Applications(var products) {\n  <div>\n    " + each + " products}\n      <div>\n        <span>${name}</span>\n        <span>-</span>\n        <span>${users}</span>\n      </div>\n    " + endEach + "\n  </div>\n}\n  ");
  var withTemplate = ("template Product(Person person) {\n  <div>\n    " + with_ + " person}\n      <div>\n        <span>${name}</span>\n        <span>-</span>\n        <span>${age}</span>\n      </div>\n    " + endWith + "\n  </div>\n}\n  ");
  var withTemplate2 = ("template Product(Person person) {\n  <div>\n    <span var=a1>\n      <h1>\n        " + with_ + " person}\n          <div>\n            <span>${name}</span>\n            <span>-</span>\n            <span>${age}</span>\n          </div>\n        " + endWith + "\n      </h1>\n    </span>\n  </div>\n}\n  ");
  var complexTemplate = ("template ProductsForPerson(Person person, var products) {\n  <div>\n    " + with_ + " person pn}\n      <div>\n        <span>${pn.name}</span>\n        <span>-</span>\n        <span>${pn.age}</span>\n      </div>\n      " + each + " products ps}\n        <div>\n          <span>product=${ps.name},users=${ps.users}</span>\n        </div>\n      " + endEach + "\n    " + endWith + "\n  </div>\n}\n  ");
  var complexTemplate2 = ("template ProductsForPerson(Person person, var products) {\n  <div>\n    " + with_ + " person pn}\n      <div>\n        <span>${pn.name}</span>\n        <span>-</span>\n        <span>${pn.age}</span>\n      </div>\n      <div>\n        " + each + " products ps}\n          <span>product=${ps.name},users=${ps.users}</span>\n        " + endEach + "\n      </div>\n    " + endWith + "\n  </div>\n}\n  ");
  var complexTemplate3 = ("template ProductsForPerson(Person person, var products) {\n  css {\n    .sales-item {\n      font-family: arial;\n      background-color: lightgray;\n      margin-left: 10px;\n      border-bottom: 1px solid white;\n    }\n    .ytd-sales {\n      position: absolute;\n      left: 100px;\n    }\n  }\n  <div>\n    " + with_ + " person pn}\n      <div>\n        <span>${pn.name}</span>\n        <span>-</span>\n        <span>${pn.age}</span>\n      </div>\n      <div>\n        " + each + " products ps}\n          <div>product=${ps.name},users=${ps.users}</div>\n          " + each + " products.sales pss}\n            <div class=\"sales-item\">\n              <span>${pss.country}</span>\n              <span class=\"ytd-sales\">\\$${pss.yearly}</span>\n            </div>\n          " + endEach + "\n        " + endEach + "\n      </div>\n    " + endWith + "\n  </div>\n}\n\n\ntemplate NameEntry(String name, int age) {\n  css {\n    .name-item {\n      font-size: 18pt;\n      font-weight: bold;\n    }\n  }\n  <div var=topDiv class=\"name-item\" attr=\"test\" attr1=test1 attr2='test2' attr3=test3>\n    <span var=spanElem>${name}</span>\n    <span> - </span>\n    <span>${age}</span>\n  </div>\n}\n");
  var complexTemplate4 = "template DivisionSales(var divisions) {\n  <div>\n    ${#each divisions dv}\n      <div>\n        <span>${dv.name}</span>\n        <span>-</span>\n        <span>${dv.id}</span>\n      </div>\n      <div>\n        ${#each divisions.products dvp}\n          <div>\n            <span var=productItem>&#9654;</span>\n            <span>Product</span>\n            <span>${dvp.name}</span>\n            <span>${dvp.users}&nbsp;users</span>\n          </div>\n          ${#each products.sales pss}\n            <div>\n              <span>${pss.country}</span>\n              <span>\\$${pss.yearly}</span>\n            </div>\n          ${/each}\n        ${/each}\n      </div>\n    ${/each}\n  </div>\n}\n";
  var realWorldList = "template DivisionSales(var divisions) {\n  css {\n    .division-item {\n      background-color: #bbb;\n      border-top: 2px solid white;\n      line-height: 20pt;\n      padding-left: 5px;\n    }\n    .product-item {\n      background-color: lightgray;\n      margin-left: 10px;\n      border-top: 2px solid white;\n      line-height: 20pt;\n    }\n    .product-title {\n      position: absolute;\n      left: 45px;\n    }\n    .product-name {\n      font-weight: bold;\n      position: absolute;\n      left: 100px;\n    }\n    .product-users {\n      position: absolute;\n      left: 150px;\n      font-style: italic;\n      color: gray;\n      width: 110px;\n    }\n    .expand-collapse {\n      margin-left: 5px;\n      margin-right: 5px;\n      vertical-align: top;\n      cursor: pointer;\n    }\n    .expand {\n      font-size: 9pt;\n    }\n    .collapse {\n      font-size: 8pt;\n    }\n    .show-sales {\n      display: inherit;\n    }\n    .hide-sales {\n      display: none;\n    }\n    .sales-item {\n      font-family: arial;\n      background-color: lightgray;\n      margin-left: 10px;\n      border-top: 1px solid white;\n      line-height: 18pt;\n      padding-left: 5px;\n    }\n    .ytd-sales {\n      position: absolute;\n      left: 100px;\n    }\n  }\n  <div>\n    ${#each divisions dv}\n      <div class=\"division-item\">\n        <span>${dv.name}</span>\n        <span>-</span>\n        <span>${dv.id}</span>\n      </div>\n      <div>\n        ${#each divisions.products dvs}\n          <div class=\"product-item\">\n            <span var=productZippy class=\"expand-collapse expand\">&#9660;</span>\n            <span class='product-title'>Product</span>\n            <span class=\"product-name\">${dvs.name}</span>\n            <span class=\"product-users\" align=right>${dvs.users}&nbsp;users</span>\n            <div class=\"show-sales\">\n              ${#each products.sales pss}\n                <div class=\"sales-item\">\n                  <span>${pss.country}</span>\n                  <span class=\"ytd-sales\">\\$${pss.yearly}</span>\n                </div>\n              ${/each}\n            </div>\n          </div>\n        ${/each}\n      </div>\n    ${/each}\n  </div>\n}\n\ntemplate Header(String company, Date date) {\n  css {\n    .header {\n      background-color: slateGray;\n      font-family: arial;\n      color: lightgray;\n      font-weight: bold;\n      padding-top: 20px;\n    }\n  }\n  <div class='header' align=center>\n    <h2>${company}</h2>\n    <div align=right>${date}</div>\n  </div>\n}\n";
  switch (sampleName) {
    case "simple":

      return simpleTemplate;

    case "simple2":

      return simpleTemplate2;

    case "simpleCSS":

      return simpleTemplateCSS;

    case "with":

      return withTemplate;

    case "with2":

      return withTemplate2;

    case "list":

      return eachTemplate;

    case "complex":

      return complexTemplate;

    case "complex2":

      return complexTemplate2;

    case "complex3":

      return complexTemplate3;

    case "complex4":

      return complexTemplate4;

    case "realWorldList":

      return realWorldList;

    default:

      print$("ERROR: Unknown sample template");

  }
}
function runTemplate(debug, parseOnly) {
  var doc = get$$window().get$document();
  var dartClass = doc.query("#dart");
  var template = doc.query("#template");
  var validity = doc.query("#validity");
  var result = doc.query("#result");
  var templateValid = true;
  var dumpTree = new StringBufferImpl("");
  var code = new StringBufferImpl("");
  var htmlTemplate = template.value;
  if (debug) {
    try {
      var templates = templateParseAndValidate(htmlTemplate);
      for (var $$i = templates.iterator(); $$i.hasNext(); ) {
        var tmpl = $$i.next$0();
        dumpTree.add(tmpl.toDebugString());
      }
      code.add(Codegen.generate(templates, "foo"));
    } catch (htmlException) {
      htmlException = _toDartException(htmlException);
      print$("ERROR unhandled EXCEPTION");
    }
  }
  var bgcolor = templateValid ? "white" : "red";
  var color = templateValid ? "black" : "white";
  var valid = templateValid ? "VALID" : "NOT VALID";
  var resultStyle = "resize: none; margin: 0; height: 100%; width: 100%;padding: 5px 7px;";
  result.set$innerHTML(("    <textarea style=\"" + resultStyle + "\">" + dumpTree.toString() + "</textarea>\n  "));
  dartClass.value = code.toString();
}
function main() {
  var element = _ElementFactoryProvider.Element$tag$factory("div");
  element.set$innerHTML(("    <table style=\"width: 100%; height: 100%;\">\n      <tbody>\n        <tr>\n          <td style=\"vertical-align: top; width: 50%; padding-right: 7px;\">\n            <table style=\"height: 100%; width: 100%;\" cellspacing=0 cellpadding=0 border=0>\n              <tbody>\n                <tr style=\"vertical-align: top; height: 1em;\">\n                  <td>\n                    <span style=\"font-weight:bold;\">Generated Dart</span>\n                  </td>\n                </tr>\n                <tr>\n                  <td>\n                    <textarea id=\"dart\" style=\"resize: none; width: 100%; height: 100%; padding: 5px 7px;\"></textarea>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n          <td>\n            <table style=\"width: 100%; height: 100%;\" cellspacing=0 cellpadding=0 border=0>\n              <tbody>\n                <tr style=\"vertical-align: top; height: 50%;\">\n                  <td>\n                    <table style=\"width: 100%; height: 100%;\" cellspacing=0 cellpadding=0 border=0>\n                      <tbody>\n                        <tr>\n                          <td>\n                            <span style=\"font-weight:bold;\">HTML Template</span>\n                          </td>\n                        </tr>\n                        <tr style=\"height: 100%;\">\n                          <td>\n                            <textarea id=\"template\" style=\"resize: none; width: 100%; height: 100%; padding: 5px 7px;\">" + sample("simple") + "</textarea>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n\n                <tr style=\"vertical-align: top; height: 50px;\">\n                  <td>\n                    <table>\n                      <tbody>\n                        <tr>\n                          <td>\n                            <button id=generate>Generate</button>\n                          </td>\n                          <td align=\"right\">\n                            <select id=templateSamples>\n                              <option value=\"simple\">Simple Template</option>\n                              <option value=\"simple2\">Simple Template #2</option>\n                              <option value=\"simpleCSS\">Simple Template w/ CSS</option>\n                              <option value=\"with\">With Template</option>\n                              <option value=\"with2\">With Template #2</option>\n                              <option value=\"list\">List Template</option>\n                              <option value=\"complex\">Complex Template</option>\n                              <option value=\"complex2\">Complex Template #2</option>\n                              <option value=\"complex3\">Complex Template #3 w/ CSS</option>\n                              <option value=\"complex4\">Complex Template #4</option>\n                              <option value=\"realWorldList\">Real world</option>\n                            </select>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n\n                <tr style=\"vertical-align: top;\">\n                  <td>\n                    <table style=\"width: 100%; height: 100%;\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n                      <tbody>\n                        <tr style=\"vertical-align: top; height: 1em;\">\n                          <td>\n                            <span style=\"font-weight:bold;\">Parse Tree</span>\n                          </td>\n                        </tr>\n                        <tr style=\"vertical-align: top; height: 1em;\">\n                          <td id=\"validity\">\n                          </td>\n                        </tr>\n                        <tr>\n                          <td id=\"result\">\n                            <textarea style=\"resize: none; width: 100%; height: 100%; border: black solid 1px; padding: 5px 7px;\"></textarea>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  "));
  get$$document().get$body().style.setProperty("background-color", "lightgray");
  get$$document().get$body().get$elements().add(element);
  var genElem = get$$window().get$document().query("#generate");
  genElem.get$on().get$click().add$1((function (e) {
    runTemplate(true, true);
  })
  );
  var cannedTemplates = get$$window().get$document().query("#templateSamples");
  cannedTemplates.get$on().get$change().add((function (e) {
    changeTemplate();
  })
  , false);
  parseOptions([], null);
  initHtmlWorld(false);
  $globals.options.useColors = false;
  $globals.world.printHandler = (function (msg) {
    get$$window().alert(msg);
  })
  ;
}
// 260 dynamic types.
// 278 types
// 22 !leaf
function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
(function(){
  var v0/*SVGTextPositioningElement*/ = 'SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement';
  var v1/*SVGAnimationElement*/ = 'SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement';
  var v2/*SVGComponentTransferFunctionElement*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement';
  var v3/*SVGGradientElement*/ = 'SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement';
  var v4/*SVGTextContentElement*/ = [v0/*SVGTextPositioningElement*/,'SVGTextContentElement|SVGTextPathElement'].join('|');
  var v5/*HTMLHtmlElement*/ = 'HTMLHtmlElement|SVGDocument';
  var v6/*HTMLMediaElement*/ = 'HTMLMediaElement|HTMLAudioElement|HTMLVideoElement';
  var v7/*SVGElement*/ = [v1/*SVGAnimationElement*/,v2/*SVGComponentTransferFunctionElement*/,v3/*SVGGradientElement*/,v4/*SVGTextContentElement*/,'SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGCircleElement|SVGClipPathElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement'].join('|');
  var v8/*CharacterData*/ = 'CharacterData|Comment|Text|CDATASection';
  var v9/*DocumentFragment*/ = 'DocumentFragment|ShadowRoot';
  var v10/*Element*/ = [v5/*HTMLHtmlElement*/,v6/*HTMLMediaElement*/,v7/*SVGElement*/,'Element|HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|IntentionallyInvalid|HTMLIFrameElement|HTMLImageElement|HTMLInputElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement'].join('|');
  var v11/*AbstractWorker*/ = 'AbstractWorker|SharedWorker|Worker';
  var v12/*Node*/ = [v8/*CharacterData*/,v9/*DocumentFragment*/,v10/*Element*/,'Node|Attr|HTMLDocument|DocumentType|Entity|EntityReference|Notation|ProcessingInstruction'].join('|');
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['AbstractWorker', v11/*AbstractWorker*/]
    , ['AudioParam', 'AudioParam|AudioGain']
    , ['CSSValueList', 'CSSValueList|WebKitCSSTransformValue']
    , ['CharacterData', v8/*CharacterData*/]
    , ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList']
    , ['HTMLHtmlElement', v5/*HTMLHtmlElement*/]
    , ['DocumentFragment', v9/*DocumentFragment*/]
    , ['HTMLMediaElement', v6/*HTMLMediaElement*/]
    , ['SVGAnimationElement', v1/*SVGAnimationElement*/]
    , ['SVGComponentTransferFunctionElement', v2/*SVGComponentTransferFunctionElement*/]
    , ['SVGGradientElement', v3/*SVGGradientElement*/]
    , ['SVGTextPositioningElement', v0/*SVGTextPositioningElement*/]
    , ['SVGTextContentElement', v4/*SVGTextContentElement*/]
    , ['SVGElement', v7/*SVGElement*/]
    , ['Element', v10/*Element*/]
    , ['Entry', 'Entry|DirectoryEntry|FileEntry']
    , ['EntrySync', 'EntrySync|DirectoryEntrySync|FileEntrySync']
    , ['Node', v12/*Node*/]
    , ['EventTarget', [v11/*AbstractWorker*/,v12/*Node*/,'EventTarget|DOMApplicationCache|EventSource|MessagePort|Notification|SVGElementInstance|WebSocket|DOMWindow|XMLHttpRequest|XMLHttpRequestUpload'].join('|')]
    , ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection']
    , ['Uint8Array', 'Uint8Array|Uint8ClampedArray']
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
  $globals.SourceFile_IN_MEMORY_FILE = "<buffer>";
  $globals.css__NO_COLOR = "\x1B[0m";
  $globals._NO_COLOR = "\x1B[0m";
  $globals.css__RED_COLOR = "\x1B[31m";
  $globals._RED_COLOR = "\x1B[31m";
}
var const$0000 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0001 = Object.create(NoMoreElementsException.prototype, {});
var const$0002 = Object.create(EmptyQueueException.prototype, {});
var const$0003 = Object.create(UnsupportedOperationException.prototype, {_message: {"value": "", writeable: false}});
var const$0005 = Object.create(IllegalAccessException.prototype, {});
var const$0006 = _constMap(["type", (600), "value", "a"]);
var const$0007 = _constMap(["type", (601), "value", "abbr"]);
var const$0008 = _constMap(["type", (602), "value", "acronym"]);
var const$0009 = _constMap(["type", (603), "value", "address"]);
var const$0010 = _constMap(["type", (604), "value", "applet"]);
var const$0011 = _constMap(["type", (605), "value", "area"]);
var const$0012 = _constMap(["type", (606), "value", "b"]);
var const$0013 = _constMap(["type", (607), "value", "base"]);
var const$0014 = _constMap(["type", (608), "value", "basefont"]);
var const$0015 = _constMap(["type", (609), "value", "bdo"]);
var const$0016 = _constMap(["type", (610), "value", "big"]);
var const$0017 = _constMap(["type", (611), "value", "blockquote"]);
var const$0018 = _constMap(["type", (612), "value", "body"]);
var const$0019 = _constMap(["type", (613), "value", "br"]);
var const$0020 = _constMap(["type", (614), "value", "button"]);
var const$0021 = _constMap(["type", (615), "value", "caption"]);
var const$0022 = _constMap(["type", (616), "value", "center"]);
var const$0023 = _constMap(["type", (617), "value", "cite"]);
var const$0024 = _constMap(["type", (618), "value", "code"]);
var const$0025 = _constMap(["type", (619), "value", "col"]);
var const$0026 = _constMap(["type", (620), "value", "colgroup"]);
var const$0027 = _constMap(["type", (621), "value", "dd"]);
var const$0028 = _constMap(["type", (622), "value", "del"]);
var const$0029 = _constMap(["type", (623), "value", "dfn"]);
var const$0030 = _constMap(["type", (624), "value", "dir"]);
var const$0031 = _constMap(["type", (625), "value", "div"]);
var const$0032 = _constMap(["type", (626), "value", "dl"]);
var const$0033 = _constMap(["type", (627), "value", "dt"]);
var const$0034 = _constMap(["type", (628), "value", "em"]);
var const$0035 = _constMap(["type", (629), "value", "fieldset"]);
var const$0036 = _constMap(["type", (630), "value", "font"]);
var const$0037 = _constMap(["type", (631), "value", "form"]);
var const$0038 = _constMap(["type", (632), "value", "frame"]);
var const$0039 = _constMap(["type", (633), "value", "frameset"]);
var const$0040 = _constMap(["type", (634), "value", "h1"]);
var const$0041 = _constMap(["type", (635), "value", "h2"]);
var const$0042 = _constMap(["type", (636), "value", "h3"]);
var const$0043 = _constMap(["type", (637), "value", "h4"]);
var const$0044 = _constMap(["type", (638), "value", "h5"]);
var const$0045 = _constMap(["type", (639), "value", "h6"]);
var const$0046 = _constMap(["type", (640), "value", "head"]);
var const$0047 = _constMap(["type", (641), "value", "hr"]);
var const$0048 = _constMap(["type", (642), "value", "html"]);
var const$0049 = _constMap(["type", (643), "value", "i"]);
var const$0050 = _constMap(["type", (644), "value", "iframe"]);
var const$0051 = _constMap(["type", (645), "value", "img"]);
var const$0052 = _constMap(["type", (646), "value", "input"]);
var const$0053 = _constMap(["type", (647), "value", "ins"]);
var const$0054 = _constMap(["type", (648), "value", "isindex"]);
var const$0055 = _constMap(["type", (649), "value", "kbd"]);
var const$0056 = _constMap(["type", (650), "value", "label"]);
var const$0057 = _constMap(["type", (651), "value", "legend"]);
var const$0058 = _constMap(["type", (652), "value", "li"]);
var const$0059 = _constMap(["type", (653), "value", "link"]);
var const$0060 = _constMap(["type", (654), "value", "map"]);
var const$0061 = _constMap(["type", (645), "value", "menu"]);
var const$0062 = _constMap(["type", (656), "value", "meta"]);
var const$0063 = _constMap(["type", (657), "value", "noframes"]);
var const$0064 = _constMap(["type", (658), "value", "noscript"]);
var const$0065 = _constMap(["type", (659), "value", "object"]);
var const$0066 = _constMap(["type", (660), "value", "ol"]);
var const$0067 = _constMap(["type", (661), "value", "optgroup"]);
var const$0068 = _constMap(["type", (662), "value", "option"]);
var const$0069 = _constMap(["type", (663), "value", "p"]);
var const$0070 = _constMap(["type", (664), "value", "param"]);
var const$0071 = _constMap(["type", (665), "value", "pre"]);
var const$0072 = _constMap(["type", (666), "value", "q"]);
var const$0073 = _constMap(["type", (667), "value", "s"]);
var const$0074 = _constMap(["type", (668), "value", "samp"]);
var const$0075 = _constMap(["type", (669), "value", "script"]);
var const$0076 = _constMap(["type", (670), "value", "select"]);
var const$0077 = _constMap(["type", (671), "value", "small"]);
var const$0078 = _constMap(["type", (672), "value", "span"]);
var const$0079 = _constMap(["type", (673), "value", "strike"]);
var const$0080 = _constMap(["type", (674), "value", "strong"]);
var const$0081 = _constMap(["type", (675), "value", "style"]);
var const$0082 = _constMap(["type", (676), "value", "sub"]);
var const$0083 = _constMap(["type", (677), "value", "sup"]);
var const$0084 = _constMap(["type", (678), "value", "table"]);
var const$0085 = _constMap(["type", (679), "value", "tbody"]);
var const$0086 = _constMap(["type", (680), "value", "td"]);
var const$0087 = _constMap(["type", (681), "value", "textarea"]);
var const$0088 = _constMap(["type", (682), "value", "tfoot"]);
var const$0089 = _constMap(["type", (683), "value", "th"]);
var const$0090 = _constMap(["type", (684), "value", "thead"]);
var const$0091 = _constMap(["type", (685), "value", "title"]);
var const$0092 = _constMap(["type", (686), "value", "tr"]);
var const$0093 = _constMap(["type", (687), "value", "tt"]);
var const$0094 = _constMap(["type", (688), "value", "u"]);
var const$0095 = _constMap(["type", (689), "value", "ul"]);
var const$0096 = _constMap(["type", (690), "value", "var"]);
var const$0098 = _constMap(["type", (595), "value", "template"]);
var const$0100 = _constMap(["unit", (600), "value", "em"]);
var const$0101 = _constMap(["unit", (601), "value", "ex"]);
var const$0102 = _constMap(["unit", (602), "value", "px"]);
var const$0103 = _constMap(["unit", (603), "value", "cm"]);
var const$0104 = _constMap(["unit", (604), "value", "mm"]);
var const$0105 = _constMap(["unit", (605), "value", "in"]);
var const$0106 = _constMap(["unit", (606), "value", "pt"]);
var const$0107 = _constMap(["unit", (607), "value", "pc"]);
var const$0108 = _constMap(["unit", (608), "value", "deg"]);
var const$0109 = _constMap(["unit", (609), "value", "rad"]);
var const$0110 = _constMap(["unit", (610), "value", "grad"]);
var const$0111 = _constMap(["unit", (611), "value", "ms"]);
var const$0112 = _constMap(["unit", (612), "value", "s"]);
var const$0113 = _constMap(["unit", (613), "value", "hz"]);
var const$0114 = _constMap(["unit", (614), "value", "khz"]);
var const$0115 = _constMap(["unit", (616), "value", "fr"]);
var const$0117 = _constMap(["type", (651), "value", "import"]);
var const$0118 = _constMap(["type", (652), "value", "media"]);
var const$0119 = _constMap(["type", (653), "value", "page"]);
var const$0120 = _constMap(["type", (654), "value", "include"]);
var const$0121 = _constMap(["type", (655), "value", "stylet"]);
var const$0122 = _constMap(["type", (656), "value", "-webkit-keyframes"]);
var const$0123 = _constMap(["type", (657), "value", "font-face"]);
var const$0125 = _constMap(["name", "aliceblue", "value", (985343)]);
var const$0126 = _constMap(["name", "antiquewhite", "value", (16444375)]);
var const$0127 = _constMap(["name", "aqua", "value", (65535)]);
var const$0128 = _constMap(["name", "aquamarine", "value", (8388564)]);
var const$0129 = _constMap(["name", "azure", "value", (15794175)]);
var const$0130 = _constMap(["name", "beige", "value", (16119260)]);
var const$0131 = _constMap(["name", "bisque", "value", (16770244)]);
var const$0132 = _constMap(["name", "black", "value", (0)]);
var const$0133 = _constMap(["name", "blanchedalmond", "value", (16772045)]);
var const$0134 = _constMap(["name", "blue", "value", (255)]);
var const$0135 = _constMap(["name", "blueviolet", "value", (9055202)]);
var const$0136 = _constMap(["name", "brown", "value", (10824234)]);
var const$0137 = _constMap(["name", "burlywood", "value", (14596231)]);
var const$0138 = _constMap(["name", "cadetblue", "value", (6266528)]);
var const$0139 = _constMap(["name", "chartreuse", "value", (8388352)]);
var const$0140 = _constMap(["name", "chocolate", "value", (13789470)]);
var const$0141 = _constMap(["name", "coral", "value", (16744272)]);
var const$0142 = _constMap(["name", "cornflowerblue", "value", (6591981)]);
var const$0143 = _constMap(["name", "cornsilk", "value", (16775388)]);
var const$0144 = _constMap(["name", "crimson", "value", (14423100)]);
var const$0145 = _constMap(["name", "cyan", "value", (65535)]);
var const$0146 = _constMap(["name", "darkblue", "value", (139)]);
var const$0147 = _constMap(["name", "darkcyan", "value", (35723)]);
var const$0148 = _constMap(["name", "darkgoldenrod", "value", (12092939)]);
var const$0149 = _constMap(["name", "darkgray", "value", (11119017)]);
var const$0150 = _constMap(["name", "darkgreen", "value", (25600)]);
var const$0151 = _constMap(["name", "darkgrey", "value", (11119017)]);
var const$0152 = _constMap(["name", "darkkhaki", "value", (12433259)]);
var const$0153 = _constMap(["name", "darkmagenta", "value", (9109643)]);
var const$0154 = _constMap(["name", "darkolivegreen", "value", (5597999)]);
var const$0155 = _constMap(["name", "darkorange", "value", (16747520)]);
var const$0156 = _constMap(["name", "darkorchid", "value", (10040012)]);
var const$0157 = _constMap(["name", "darkred", "value", (9109504)]);
var const$0158 = _constMap(["name", "darksalmon", "value", (15308410)]);
var const$0159 = _constMap(["name", "darkseagreen", "value", (9419919)]);
var const$0160 = _constMap(["name", "darkslateblue", "value", (4734347)]);
var const$0161 = _constMap(["name", "darkslategray", "value", (3100495)]);
var const$0162 = _constMap(["name", "darkslategrey", "value", (3100495)]);
var const$0163 = _constMap(["name", "darkturquoise", "value", (52945)]);
var const$0164 = _constMap(["name", "darkviolet", "value", (9699539)]);
var const$0165 = _constMap(["name", "deeppink", "value", (16716947)]);
var const$0166 = _constMap(["name", "deepskyblue", "value", (49151)]);
var const$0167 = _constMap(["name", "dimgray", "value", (6908265)]);
var const$0168 = _constMap(["name", "dimgrey", "value", (6908265)]);
var const$0169 = _constMap(["name", "dodgerblue", "value", (2003199)]);
var const$0170 = _constMap(["name", "firebrick", "value", (11674146)]);
var const$0171 = _constMap(["name", "floralwhite", "value", (16775920)]);
var const$0172 = _constMap(["name", "forestgreen", "value", (2263842)]);
var const$0173 = _constMap(["name", "fuchsia", "value", (16711935)]);
var const$0174 = _constMap(["name", "gainsboro", "value", (14474460)]);
var const$0175 = _constMap(["name", "ghostwhite", "value", (16316671)]);
var const$0176 = _constMap(["name", "gold", "value", (16766720)]);
var const$0177 = _constMap(["name", "goldenrod", "value", (14329120)]);
var const$0178 = _constMap(["name", "gray", "value", (8421504)]);
var const$0179 = _constMap(["name", "green", "value", (32768)]);
var const$0180 = _constMap(["name", "greenyellow", "value", (11403055)]);
var const$0181 = _constMap(["name", "grey", "value", (8421504)]);
var const$0182 = _constMap(["name", "honeydew", "value", (15794160)]);
var const$0183 = _constMap(["name", "hotpink", "value", (16738740)]);
var const$0184 = _constMap(["name", "indianred", "value", (13458524)]);
var const$0185 = _constMap(["name", "indigo", "value", (4915330)]);
var const$0186 = _constMap(["name", "ivory", "value", (16777200)]);
var const$0187 = _constMap(["name", "khaki", "value", (15787660)]);
var const$0188 = _constMap(["name", "lavender", "value", (15132410)]);
var const$0189 = _constMap(["name", "lavenderblush", "value", (16773365)]);
var const$0190 = _constMap(["name", "lawngreen", "value", (8190976)]);
var const$0191 = _constMap(["name", "lemonchiffon", "value", (16775885)]);
var const$0192 = _constMap(["name", "lightblue", "value", (11393254)]);
var const$0193 = _constMap(["name", "lightcoral", "value", (15761536)]);
var const$0194 = _constMap(["name", "lightcyan", "value", (14745599)]);
var const$0195 = _constMap(["name", "lightgoldenrodyellow", "value", (16448210)]);
var const$0196 = _constMap(["name", "lightgray", "value", (13882323)]);
var const$0197 = _constMap(["name", "lightgreen", "value", (9498256)]);
var const$0198 = _constMap(["name", "lightgrey", "value", (13882323)]);
var const$0199 = _constMap(["name", "lightpink", "value", (16758465)]);
var const$0200 = _constMap(["name", "lightsalmon", "value", (16752762)]);
var const$0201 = _constMap(["name", "lightseagreen", "value", (2142890)]);
var const$0202 = _constMap(["name", "lightskyblue", "value", (8900346)]);
var const$0203 = _constMap(["name", "lightslategray", "value", (7833753)]);
var const$0204 = _constMap(["name", "lightslategrey", "value", (7833753)]);
var const$0205 = _constMap(["name", "lightsteelblue", "value", (11584734)]);
var const$0206 = _constMap(["name", "lightyellow", "value", (16777184)]);
var const$0207 = _constMap(["name", "lime", "value", (65280)]);
var const$0208 = _constMap(["name", "limegreen", "value", (3329330)]);
var const$0209 = _constMap(["name", "linen", "value", (16445670)]);
var const$0210 = _constMap(["name", "magenta", "value", (16711935)]);
var const$0211 = _constMap(["name", "maroon", "value", (8388608)]);
var const$0212 = _constMap(["name", "mediumaquamarine", "value", (6737322)]);
var const$0213 = _constMap(["name", "mediumblue", "value", (205)]);
var const$0214 = _constMap(["name", "mediumorchid", "value", (12211667)]);
var const$0215 = _constMap(["name", "mediumpurple", "value", (9662683)]);
var const$0216 = _constMap(["name", "mediumseagreen", "value", (3978097)]);
var const$0217 = _constMap(["name", "mediumslateblue", "value", (8087790)]);
var const$0218 = _constMap(["name", "mediumspringgreen", "value", (64154)]);
var const$0219 = _constMap(["name", "mediumturquoise", "value", (4772300)]);
var const$0220 = _constMap(["name", "mediumvioletred", "value", (13047173)]);
var const$0221 = _constMap(["name", "midnightblue", "value", (1644912)]);
var const$0222 = _constMap(["name", "mintcream", "value", (16121850)]);
var const$0223 = _constMap(["name", "mistyrose", "value", (16770273)]);
var const$0224 = _constMap(["name", "moccasin", "value", (16770229)]);
var const$0225 = _constMap(["name", "navajowhite", "value", (16768685)]);
var const$0226 = _constMap(["name", "navy", "value", (128)]);
var const$0227 = _constMap(["name", "oldlace", "value", (16643558)]);
var const$0228 = _constMap(["name", "olive", "value", (8421376)]);
var const$0229 = _constMap(["name", "olivedrab", "value", (7048739)]);
var const$0230 = _constMap(["name", "orange", "value", (16753920)]);
var const$0231 = _constMap(["name", "orangered", "value", (16729344)]);
var const$0232 = _constMap(["name", "orchid", "value", (14315734)]);
var const$0233 = _constMap(["name", "palegoldenrod", "value", (15657130)]);
var const$0234 = _constMap(["name", "palegreen", "value", (10025880)]);
var const$0235 = _constMap(["name", "paleturquoise", "value", (11529966)]);
var const$0236 = _constMap(["name", "palevioletred", "value", (14381203)]);
var const$0237 = _constMap(["name", "papayawhip", "value", (16773077)]);
var const$0238 = _constMap(["name", "peachpuff", "value", (16767673)]);
var const$0239 = _constMap(["name", "peru", "value", (13468991)]);
var const$0240 = _constMap(["name", "pink", "value", (16761035)]);
var const$0241 = _constMap(["name", "plum", "value", (14524637)]);
var const$0242 = _constMap(["name", "powderblue", "value", (11591910)]);
var const$0243 = _constMap(["name", "purple", "value", (8388736)]);
var const$0244 = _constMap(["name", "red", "value", (16711680)]);
var const$0245 = _constMap(["name", "rosybrown", "value", (12357519)]);
var const$0246 = _constMap(["name", "royalblue", "value", (4286945)]);
var const$0247 = _constMap(["name", "saddlebrown", "value", (9127187)]);
var const$0248 = _constMap(["name", "salmon", "value", (16416882)]);
var const$0249 = _constMap(["name", "sandybrown", "value", (16032864)]);
var const$0250 = _constMap(["name", "seagreen", "value", (3050327)]);
var const$0251 = _constMap(["name", "seashell", "value", (16774638)]);
var const$0252 = _constMap(["name", "sienna", "value", (10506797)]);
var const$0253 = _constMap(["name", "silver", "value", (12632256)]);
var const$0254 = _constMap(["name", "skyblue", "value", (8900331)]);
var const$0255 = _constMap(["name", "slateblue", "value", (6970061)]);
var const$0256 = _constMap(["name", "slategray", "value", (7372944)]);
var const$0257 = _constMap(["name", "slategrey", "value", (7372944)]);
var const$0258 = _constMap(["name", "snow", "value", (16775930)]);
var const$0259 = _constMap(["name", "springgreen", "value", (65407)]);
var const$0260 = _constMap(["name", "steelblue", "value", (4620980)]);
var const$0261 = _constMap(["name", "tan", "value", (13808780)]);
var const$0262 = _constMap(["name", "teal", "value", (32896)]);
var const$0263 = _constMap(["name", "thistle", "value", (14204888)]);
var const$0264 = _constMap(["name", "tomato", "value", (16737095)]);
var const$0265 = _constMap(["name", "turquoise", "value", (4251856)]);
var const$0266 = _constMap(["name", "violet", "value", (15631086)]);
var const$0267 = _constMap(["name", "wheat", "value", (16113331)]);
var const$0268 = _constMap(["name", "white", "value", (16777215)]);
var const$0269 = _constMap(["name", "whitesmoke", "value", (16119285)]);
var const$0270 = _constMap(["name", "yellow", "value", (16776960)]);
var const$0271 = _constMap(["name", "yellowgreen", "value", (10145074)]);
var const$0275 = new JSSyntaxRegExp("s*('\"\\'\\\"[^'\"\\'\\\"]+'\"\\'\\\"|[_A-Za-z][_A-Za-z0-9]*)");
var const$0099 = ImmutableList.ImmutableList$from$factory([const$0098]);
var const$0124 = ImmutableList.ImmutableList$from$factory([const$0117, const$0118, const$0119, const$0120, const$0121, const$0122, const$0123]);
var const$0116 = ImmutableList.ImmutableList$from$factory([const$0100, const$0101, const$0102, const$0103, const$0104, const$0105, const$0106, const$0107, const$0108, const$0109, const$0110, const$0111, const$0112, const$0113, const$0114, const$0115]);
var const$0097 = ImmutableList.ImmutableList$from$factory([const$0006, const$0007, const$0008, const$0009, const$0010, const$0011, const$0012, const$0013, const$0014, const$0015, const$0016, const$0017, const$0018, const$0019, const$0020, const$0021, const$0022, const$0023, const$0024, const$0025, const$0026, const$0027, const$0028, const$0029, const$0030, const$0031, const$0032, const$0033, const$0034, const$0035, const$0036, const$0037, const$0038, const$0039, const$0040, const$0041, const$0042, const$0043, const$0044, const$0045, const$0046, const$0047, const$0048, const$0049, const$0050, const$0051, const$0052, const$0053, const$0054, const$0055, const$0056, const$0057, const$0058, const$0059, const$0060, const$0061, const$0062, const$0063, const$0064, const$0065, const$0066, const$0067, const$0068, const$0069, const$0070, const$0071, const$0072, const$0073, const$0074, const$0075, const$0076, const$0077, const$0078, const$0079, const$0080, const$0081, const$0082, const$0083, const$0084, const$0085, const$0086, const$0087, const$0088, const$0089, const$0090, const$0091, const$0092, const$0093, const$0094, const$0095, const$0096]);
var const$0272 = ImmutableList.ImmutableList$from$factory([const$0125, const$0126, const$0127, const$0128, const$0129, const$0130, const$0131, const$0132, const$0133, const$0134, const$0135, const$0136, const$0137, const$0138, const$0139, const$0140, const$0141, const$0142, const$0143, const$0144, const$0145, const$0146, const$0147, const$0148, const$0149, const$0150, const$0151, const$0152, const$0153, const$0154, const$0155, const$0156, const$0157, const$0158, const$0159, const$0160, const$0161, const$0162, const$0163, const$0164, const$0165, const$0166, const$0167, const$0168, const$0169, const$0170, const$0171, const$0172, const$0173, const$0174, const$0175, const$0176, const$0177, const$0178, const$0179, const$0180, const$0181, const$0182, const$0183, const$0184, const$0185, const$0186, const$0187, const$0188, const$0189, const$0190, const$0191, const$0192, const$0193, const$0194, const$0195, const$0196, const$0197, const$0198, const$0199, const$0200, const$0201, const$0202, const$0203, const$0204, const$0205, const$0206, const$0207, const$0208, const$0209, const$0210, const$0211, const$0212, const$0213, const$0214, const$0215, const$0216, const$0217, const$0218, const$0219, const$0220, const$0221, const$0222, const$0223, const$0224, const$0225, const$0226, const$0227, const$0228, const$0229, const$0230, const$0231, const$0232, const$0233, const$0234, const$0235, const$0236, const$0237, const$0238, const$0239, const$0240, const$0241, const$0242, const$0243, const$0244, const$0245, const$0246, const$0247, const$0248, const$0249, const$0250, const$0251, const$0252, const$0253, const$0254, const$0255, const$0256, const$0257, const$0258, const$0259, const$0260, const$0261, const$0262, const$0263, const$0264, const$0265, const$0266, const$0267, const$0268, const$0269, const$0270, const$0271]);
var $globals = {};
$static_init();
main();
