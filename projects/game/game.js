let gameActive = true; //this variable is required. 
                       //to stop the game, set it to false.

//Declare your other global variables here


//If you need, add any "helper" functions here


//Make one function for each location
function classroom() {
    clear();
    print("\nAfter the earthquake you were trapped inside of Brickston High School and the front entrance caved in, your objective is to navigate through the rooms and try to escape. Good luck!");

    print("\nWhere do you want to go?");
    print("\n\tthe Hallway...
          ");
    function processInput(input){
        if (input.toLowerCase() === "locationb") {
            locationB();
        } else {
            stayHere();
            waitThenCall(locationA);
        }
    }
    waitForInput(processInput);
}

function hallway() {
    clear();
    print("\nYou are in location B!");
    print("\nWhere do you want to go next? Say one of these choices:" +
        "\n\tlocationC");
    
    function processInput(input){
        if (input.toLowerCase() === "locationc") {
            locationC();
        } else {
            stayHere();
            waitThenCall(locationB);
        }
    }
    waitForInput(processInput);
}

function library() {
    clear();
    print("\nYou are in location C!");
    print("\nWhere do you want to go next? Say one of these choices:" +
        "\n\tlocationB");
    
    function processInput(input){
        if (input.toLowerCase() === "locationb") {
            locationB();
        } else {
            stayHere();
            waitThenCall(locationC);
        }
    }
    waitForInput(processInput);
}

function commons() {
    clear();
    print("\nYou are in location C!");
    print("\nWhere do you want to go next? Say one of these choices:" +
        "\n\tlocationB");
    
    function processInput(input){
        if (input.toLowerCase() === "locationb") {
            locationB();
        } else {
            stayHere();
            waitThenCall(locationC);
        }
    }
    waitForInput(processInput);
}

function scienceroom() {
    clear();
    print("\nYou are in location C!");
    print("\nWhere do you want to go next? Say one of these choices:" +
        "\n\tlocationB");
    
    function processInput(input){
        if (input.toLowerCase() === "locationb") {
            locationB();
        } else {
            stayHere();
            waitThenCall(locationC);
        }
    }
    waitForInput(processInput);
}

function thebox() {
    clear();
    print("\nYou are in location C!");
    print("\nWhere do you want to go next? Say one of these choices:" +
        "\n\tlocationB");
    
    function processInput(input){
        if (input.toLowerCase() === "locationb") {
            locationB();
        } else {
            stayHere();
            waitThenCall(locationC);
        }
    }
    waitForInput(processInput);
}

//finally, make sure you customize this to tell it what should happen at the
//very start. For this simple example, any input will bring you
//to locationA
function start(){
    print("Welcome to my game! Press any key to start");

    function processInput(input){
            locationA();
    }
    waitForInput(processInput);
}
