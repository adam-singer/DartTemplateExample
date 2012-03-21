// Generated Dart class from HTML template.
// DO NOT EDIT.

//String safeHTML(String html) {
//  // TODO(terry): Escaping for XSS vulnerabilities TBD.
//  return html;
//}

class Hello {
  Map<String, Object> _scopes;
  Element _fragment;

  String to;
  List fruits;


  // Elements bound to a variable:
  var hello;
  var p;

  Hello(this.to, this.fruits) : _scopes = new Map<String, Object>() {
    // Insure stylesheet for template exist in the document.
    add_FruitTemplate_templatesStyles();

    _fragment = new DocumentFragment();
    hello = new Element.html('<div></div>');
    _fragment.elements.add(hello);
    p = new Element.html('<p>${inject_0()}</p>');
    hello.elements.add(p);
    var e0 = new Element.html('<p>My favorite fruits are:</p>');
    hello.elements.add(e0);

    // Call template Fruit.
    var e1 = new Fruit(fruits);
    hello.elements.add(e1.root);
  }

  Element get root() => _fragment;

  // Injection functions:
  String inject_0() {
    return safeHTML('${to}');
  }

  // Each functions:

  // With functions:

  // CSS for this template.
  static final String stylesheet = "";
}
class Fruit {
  Map<String, Object> _scopes;
  Element _fragment;

  List fruits;

  Fruit(this.fruits) : _scopes = new Map<String, Object>() {
    // Insure stylesheet for template exist in the document.
    add_FruitTemplate_templatesStyles();

    _fragment = new DocumentFragment();
    var e0 = new Element.html('<ul></ul>');
    _fragment.elements.add(e0);
    each_0(fruits, e0);
  }

  Element get root() => _fragment;

  // Injection functions:
  String inject_0() {
    // Local scoped block names.
    var fruit = _scopes["fruit"];

    return safeHTML('${fruit}');
  }

  // Each functions:
  each_0(List items, Element parent) {
    for (var fruit in items) {
      _scopes["fruit"] = fruit;
      var e0 = new Element.html('<li>I do love eating a fresh, ripe ${inject_0()}</li>');
      parent.elements.add(e0);
      _scopes.remove("fruit");
    }
  }


  // With functions:

  // CSS for this template.
  static final String stylesheet = "";
}


// Inject all templates stylesheet once into the head.
bool FruitTemplate_stylesheet_added = false;
void add_FruitTemplate_templatesStyles() {
  if (!FruitTemplate_stylesheet_added) {
    StringBuffer styles = new StringBuffer();

    // All templates stylesheet.
    styles.add(Hello.stylesheet);
    styles.add(Fruit.stylesheet);

    FruitTemplate_stylesheet_added = true;
    document.head.elements.add(new Element.html('<style>${styles.toString()}</style>'));
  }
}
