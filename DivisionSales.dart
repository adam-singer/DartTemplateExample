// Generated Dart class from HTML template.
// DO NOT EDIT.

String safeHTML(String html) {
  // TODO(terry): Escaping for XSS vulnerabilities TBD.
  return html;
}

class DivisionSales {
  Map<String, Object> _scopes;
  Element _fragment;

  var divisions;


  // Elements bound to a variable:
  List productZippy;    // Repeated elements.

  DivisionSales(this.divisions) : _scopes = new Map<String, Object>() {
    //Global initializers.
    productZippy = [];

    // Insure stylesheet for template exist in the document.
    add_DivisionSales_templatesStyles();

    _fragment = new DocumentFragment();
    var e0 = new Element.html('<div></div>');
    _fragment.elements.add(e0);
    each_0(divisions, e0);
  }

  Element get root() => _fragment;

  // CSS class selectors for this template.
  static String get divisionItem() => "division-item";
  static String get productItem() => "product-item";
  static String get productTitle() => "product-title";
  static String get productName() => "product-name";
  static String get productUsers() => "product-users";
  static String get expandCollapse() => "expand-collapse";
  static String get expand() => "expand";
  static String get collapse() => "collapse";
  static String get showSales() => "show-sales";
  static String get hideSales() => "hide-sales";
  static String get salesItem() => "sales-item";
  static String get ytdSales() => "ytd-sales";

  // Injection functions:
  String inject_0() {
    // Local scoped block names.
    var div = _scopes["div"];

    return safeHTML('${div.name}');
  }

  String inject_1() {
    // Local scoped block names.
    var div = _scopes["div"];

    return safeHTML('${div.id}');
  }

  String inject_2() {
    // Local scoped block names.
    var div = _scopes["div"];
    var divProd = _scopes["divProd"];

    return safeHTML('${divProd.name}');
  }

  String inject_3() {
    // Local scoped block names.
    var div = _scopes["div"];
    var divProd = _scopes["divProd"];

    return safeHTML('${divProd.users}');
  }

  String inject_4() {
    // Local scoped block names.
    var div = _scopes["div"];
    var divProd = _scopes["divProd"];
    var divProdSales = _scopes["divProdSales"];

    return safeHTML('${divProdSales.country}');
  }

  String inject_5() {
    // Local scoped block names.
    var div = _scopes["div"];
    var divProd = _scopes["divProd"];
    var divProdSales = _scopes["divProdSales"];

    return safeHTML('${divProdSales.yearly}');
  }

  // Each functions:
  each_0(List items, Element parent) {
    for (var div in items) {
      _scopes["div"] = div;
      var e0 = new Element.html('<div class="division-item"></div>');
      parent.elements.add(e0);
      var e1 = new Element.html('<span>${inject_0()}</span>');
      e0.elements.add(e1);
      var e2 = new Element.html('<span>&nbsp;-&nbsp;</span>');
      e0.elements.add(e2);
      var e3 = new Element.html('<span>${inject_1()}</span>');
      e0.elements.add(e3);
      var e4 = new Element.html('<div></div>');
      parent.elements.add(e4);
      each_1(div.products, e4);
      _scopes.remove("div");
    }
  }

  each_1(List items, Element parent) {
    for (var divProd in items) {
      _scopes["divProd"] = divProd;
      var e0 = new Element.html('<div class="product-item"></div>');
      parent.elements.add(e0);
      var tmp_productZippy = new Element.html('<span class="expand-collapse expand">&#9660;</span>');
      e0.elements.add(tmp_productZippy);
      productZippy.add(tmp_productZippy);
      var e1 = new Element.html('<span class="product-title">Product</span>');
      e0.elements.add(e1);
      var e2 = new Element.html('<span class="product-name">${inject_2()}</span>');
      e0.elements.add(e2);
      var e3 = new Element.html('<span class="product-users">${inject_3()}&nbsp;</span>');
      e0.elements.add(e3);
      var e4 = new Element.html('<div class="show-sales"></div>');
      e0.elements.add(e4);
      each_2(divProd.sales, e4);
      _scopes.remove("divProd");
    }
  }

  each_2(List items, Element parent) {
    for (var divProdSales in items) {
      _scopes["divProdSales"] = divProdSales;
      var e0 = new Element.html('<div class="sales-item"></div>');
      parent.elements.add(e0);
      var e1 = new Element.html('<span>${inject_4()}</span>');
      e0.elements.add(e1);
      var e2 = new Element.html('<span class="ytd-sales">${inject_5()}</span>');
      e0.elements.add(e2);
      _scopes.remove("divProdSales");
    }
  }


  // With functions:

  // CSS for this template.
  static final String stylesheet = '''
    
.division-item {
  background-color: #bbb;
  border-top: 2px solid #ffffff;
  line-height: 20pt;
  padding-left: 5px;
}

.product-item {
  background-color: #d3d3d3;
  margin-left: 10px;
  border-top: 2px solid #ffffff;
  line-height: 20pt;
}

.product-title {
  position: absolute;
  left: 45px;
}

.product-name {
  font-weight: bold;
  position: absolute;
  left: 100px;
}

.product-users {
  position: absolute;
  right: 150px;
  font-style: italic;
  color: #808080;
  width: 110px;
}

.expand-collapse {
  margin-left: 5px;
  margin-right: 5px;
  vertical-align: top;
  cursor: pointer;
}

.expand {
  font-size: 9pt;
}

.collapse {
  font-size: 8pt;
}

.show-sales {
  display: inherit;
}

.hide-sales {
  display: none;
}

.sales-item {
  font-family: arial;
  background-color: #d3d3d3;
  margin-left: 10px;
  border-top: 1px solid #ffffff;
  line-height: 18pt;
  padding-left: 5px;
}

.ytd-sales {
  position: absolute;
  left: 100px;
}

  ''';

  // Stylesheet class selectors:
}
class Header {
  Map<String, Object> _scopes;
  Element _fragment;

  String company;
  Date date;

  Header(this.company, this.date) : _scopes = new Map<String, Object>() {
    // Insure stylesheet for template exist in the document.
    add_DivisionSales_templatesStyles();

    _fragment = new DocumentFragment();
    var e0 = new Element.html('<div align="center" class="header"></div>');
    _fragment.elements.add(e0);
    var e1 = new Element.html('<h2>${inject_0()}</h2>');
    e0.elements.add(e1);
    var e2 = new Element.html('<div align="right">${inject_1()}</div>');
    e0.elements.add(e2);
  }

  Element get root() => _fragment;

  // CSS class selectors for this template.
  static String get header() => "header";

  // Injection functions:
  String inject_0() {
    return safeHTML('${company}');
  }

  String inject_1() {
    return safeHTML('${date}');
  }

  // Each functions:

  // With functions:

  // CSS for this template.
  static final String stylesheet = '''
    
.header {
  background-color: #708090;
  font-family: arial;
  color: #d3d3d3;
  font-weight: bold;
  padding-top: 20px;
}

  ''';

  // Stylesheet class selectors:
}


// Inject all templates stylesheet once into the head.
bool DivisionSales_stylesheet_added = false;
void add_DivisionSales_templatesStyles() {
  if (!DivisionSales_stylesheet_added) {
    StringBuffer styles = new StringBuffer();

    // All templates stylesheet.
    styles.add(DivisionSales.stylesheet);
    styles.add(Header.stylesheet);

    DivisionSales_stylesheet_added = true;
    document.head.elements.add(new Element.html('<style>${styles.toString()}</style>'));
  }
}
