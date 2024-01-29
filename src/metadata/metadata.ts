import 'reflect-metadata';
function Type(type) {
  return Reflect.metadata('design:type', type);
}
function ParamTypes(...types) {
  return Reflect.metadata('design:paramtypes', types);
}
function ReturnType(type) {
  return Reflect.metadata('design:returntype', type);
}

@ParamTypes(String, Number)
class Meta {
  constructor(text, i) {
    console.log(text, i);
  }

  @Type(String)
  get name() {
    return 'text';
  }

  @Type(Function)
  @ParamTypes(Number, Number)
  @ReturnType(Number)
  add(x, y) {
    return x + y;
  }
}

const obj = new Meta('a', 1);

const paramTypes = Reflect.getMetadata('design:paramtypes', obj, 'add');

console.log(paramTypes);
