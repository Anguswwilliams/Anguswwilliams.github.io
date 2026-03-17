let gameActive = true; 

function classroom() {
    clear();
    print("\nAfter the earthquake you were trapped inside of Brickston High School and the front entrance caved in, your objective is to navigate through the rooms and try to escape. Good luck!");

    print("\nWhere do you want to go?");
    print("\n\tthe Hallway...");

    function processInput(input){
        if (input.toLowerCase() === "hallway") {
            hallway();
        } else {
            stayHere();
            waitThenCall(clssroom);
        }
    }
    waitForInput(processInput);
}

function hallway() {
    clear();
    print("\nYou exit the room and find yourself in a dark hallway, there is a faint shaft of light peeking out from what used to be the roof, and you see four open doors that are not caved in.");
    print("\nWhere do you want to go next? Say one of these choices:" +
    
    print("\n\tLibrary");
    print("\n\the box");
    print("\n\the commons");

    function processInput(input){
        if (input.toLowerCase() === "library") {
            library();
        } else (input.toLowerCase() === "the box") {
            gym();
        } else (input.toLowerCase() === "commons") 
            cafeteria();
        } else {
            stayHere();
            waitThenCall(hallway)
        }
}
    waitForInput(processInput);
}

function library() {
    clear();
    print("\nYou enter the library.");
    print("\nThe library is on fire and all the books ae buring. You also see a golden key laying in the corner of the room...");  print("\nWhere do you want to go next? Say one of these choices:" +
    print("\n\tScience room");
    print("\n\tHallway");
    
    function processInput(input){
        if (input.toLowerCase() === "hallway") {
            Hallway();
         if (input.toLowerCase() === "science room") {
            ScienceRoom();
        } else {
            stayHere();
            waitThenCall(Library);
        }
    }
    waitForInput(processInput);
}

function commons() {
    clear();
    print("\nAll of the tables are flipped over and backpacks are strewn about, its clear there's no escaping this way");
    print("\nWhere do you want to go next? Say one of these choices:" +
        "\n\tlibrary");
    
    function processInput(input){
        if (input.toLowerCase() === "library") {
            library();
        } else {
            stayHere();
            waitThenCall(commons);
        }
    }
    waitForInput(processInput);
}

function scienceroom() {
    clear();
    print("\nThere is a chemical fire");
    print("\nWhere do you want to go next? Say one of these choices:" +
        "\n\tlocationB");
    
 function processInput(input){
        if (input.toLowerCase() === "library") {
            library();
        } else {
            stayHere();
            waitThenCall(scienceROOM);
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
