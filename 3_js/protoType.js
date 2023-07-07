class Parent {
  name = "12";
}

class Chilren extends Parent {
  constructor() {
    super({ text: "hello word" });
  }
  sex = "1";
  name = "13";
}

Parent.prototype.age = 12;

const obj = new Chilren();
