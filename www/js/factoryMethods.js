// (function() {
//
// }())

function WalkWithMyFeet() {
  this.go = function() {
    console.log("walking")
  }
}

function DriveMyCar() {
  this.go = function() {
    console.log("driving")
  }
}

function RideABlueBike() {
  this.go = function() {
    console.log("riding")
  }
}

function StealAGoogleBike() {
  this.go = function() {
    console.log("riding hot")
  }
}

function myFactory(methodOfTransport){
   switch(methodOfTransport) {
    case "walk" :
      return new WalkWithMyFeet();
    case "drive" :
      return new DriveMyCar();
    case "steal" :
      return new StealAGoogleBike()
    case "ride" :
      return new RideABlueBike();
  }
}

var transport = myFactory("walk");

transport.go();
