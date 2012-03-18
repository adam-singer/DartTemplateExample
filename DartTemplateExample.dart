#import('dart:html');
#source('DivisionSales.dart');

class Sales {
  String country;
  String yearly;
  Sales(this.country, this.yearly);
}

class Products {
  List<Sales> sales;
  String name;
  String users;
  Products(this.name, this.users, this.sales);
}

class Divisions {
  List<Products> products;
  String id;
  String name;
  Divisions(this.id, this.name, this.products);
}

class DartTemplateExample {

  DartTemplateExample() {
  }

  void run() {
    document.body.elements.add(new Header("Dollar Shave Club", new Date.now().toString()).root);
    
    List<Sales> sales = [new Sales("USA", "3500"), new Sales("USA", "4500")];
    List<Products> products = [new Products("Razor", "Sammy", sales)];
    List<Divisions> divisions = [new Divisions("South West", "A-Team", products), new Divisions("North East", "B-Team", products),];
    
    DivisionSales divisionSales = new DivisionSales(divisions);
    document.body.elements.add(divisionSales.root);
  }
}

void main() {
  new DartTemplateExample().run();
}
