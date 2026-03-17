let gameActive = true; 

function classroom() {
    clear();
    print("\nAfter the earthquake you were trapped inside of Brickston High School and the front entrance caved in. Your objective is to navigate through the rooms and try to escape. Good luck!");

    print("\nWhere do you want to go?");
    print("\n\tthe hallway");

    function processInput(input){
        if (input.toLowerCase() === "hallway") {
            hallway();
        } else {
            stayHere();
            waitThenCall(classroom);
        }
    }
    waitForInput(processInput);
}

function hallway() {
    clear();
    print("\nYou exit the room and find yourself in a dark hallway. A faint shaft of light peeks from the broken roof and you see several open doors.");

    print("\nWhere do you want to go next?");
    print("\n\tlibrary");
    print("\n\tthe box");
    print("\n\tcommons");

    function processInput(input){
        input = input.toLowerCase();

        if (input === "library") {
            library();
        } else if (input === "the box") {
            thebox();
        } else if (input === "commons") {
            commons();
        } else {
            stayHere();
            waitThenCall(hallway);
        }
    }
    waitForInput(processInput);
}

function library() {
    clear();
    print("\nYou enter the library.");
    print("\nThe library is on fire and all the books are burning. A golden key lies in the corner.");

    print("\nWhere do you want to go next?");
    print("\n\tscience room");
    print("\n\thallway");

    function processInput(input){
        input = input.toLowerCase();

        if (input === "hallway") {
            hallway();
        } else if (input === "science room") {
            scienceroom();
        } else {
            stayHere();
            waitThenCall(library);
        }
    }
    waitForInput(processInput);
}

function commons() {
    clear();
    print("\nAll the tables are flipped over and backpacks are everywhere. It looks like there is no escape here.");

    print("\nWhere do you want to go next?");
    print("\n\tlibrary");

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
    print("\nYou enter the science room. A chemical fire is burning.");

    print("\nWhere do you want to go next?");
    print("\n\tlibrary");

    function processInput(input){
        if (input.toLowerCase() === "library") {
            library();
        } else {
            stayHere();
            waitThenCall(scienceroom);
        }
    }
    waitForInput(processInput);
}

function thebox() {
    clear();
    print("\nYou walk into the gym (The Box).");

    print("\nWhere do you want to go next?");
    print("\n\thallway");

    function processInput(input){
        if (input.toLowerCase() === "hallway") {
            hallway();
        } else {
            stayHere();
            waitThenCall(thebox);
        }
    }
    waitForInput(processInput);
}

function start(){
    print("Welcome to my game! Press any key to start.");

    function processInput(input){
        classroom();
    }

    waitForInput(processInput);
}let gameActive = true; 

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

function escape() {
    clear();
    print("\nYou push the emergency door open.");
    print("\nFresh air rushes in.");
    print("\nYou escaped the school!");

    gameActive = false;
}

function start(){
    print("Welcome to my game! Press any key to start");

    function processInput(input){
            locationA();
    }
    waitForInput(processInput);
}
