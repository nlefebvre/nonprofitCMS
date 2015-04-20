var module = (function(){

  var name = "";

  function uppercaseName(){
    return String(name).toUpperCase();
  }

  var o = {};

  Object.defineProperty(o, "name", {
    configurable: false,
    enumerable: true,
    get: function(){
      console.log("get name" + _name);
      return _name;
    },
    set: funtion(val){
      console.log("set name" + _name  +" to " + val);
      _name = String(val);
    }
  })

  return o;


  return {
    getName: function(){
      return name;
    },
    setName: function(value);
    name = value;
  };
})();

console.dir(module);
