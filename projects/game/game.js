let gameActive = true;

function classroom() {
    clear();

    print("After the earthquake you were trapped inside Brickston High School.");
    print("The front entrance collapsed. You must find another way out.");

    print("");
    print("Where do you want to go?");
    print("hallway");

    waitForInput(function(input){
        input = input.toLowerCase();

        if (input === "hallway") {
            hallway();
        } else {
            stayHere();
            waitThenCall(classroom);
        }
    });
}

function hallway() {
    clear();

    print("You step into a dank hallway.");
    print("A shaft of light shines through a small crack the broken roof.");
    print("There are only 3 doors that are not caved in.");

    print("");
    print("Choose a location to go to");
    print("library");
    print("commons");
    print("box");

    waitForInput(function(input){
        input = input.toLowerCase();

        if (input === "library") {
            library();
        }
        else if (input === "commons") {
            commons();
        }
        else if (input === "box") {
            thebox();
        }
        else {
            stayHere();
            waitThenCall(hallway);
        }
    });
}

function library() {
    clear();

    print("You enter the library.");
    print("The books are on fire and you spot a small golden key in the far corner of the room...");

    print("");
    print("Where do you want to go?");
    print("science");
    print("hallway");

    waitForInput(function(input){
        input = input.toLowerCase();

        if (input === "hallway") {
            hallway();
        }
        else if (input === "science") {
            scienceroom();
        }
        else {
            stayHere();
            waitThenCall(library);
        }
    });
}

function commons() {
    clear();

    print("The commons area is completely destroyed.");
    print("Tables are flipped over and debris blocks all the exits.");

    print("");
    print("Only one path remains...");
    print("library");

    waitForInput(function(input){
        input = input.toLowerCase();

        if (input === "library") {
            library();
        }
        else {
            stayHere();
            waitThenCall(commons);
        }
    });
}

function scienceroom() {
    clear();

    print("You enter the science room.");
    print("A small chemical fire burns under one of the lab tables.");

    print("");
    print("Where do you want to go?");
    print("library");

    waitForInput(function(input){
        input = input.toLowerCase();

        if (input === "library") {
            library();
        }
        else {
            stayHere();
            waitThenCall(scienceroom);
        }
    });
}

function thebox() {
    clear();

    print("You enter the the box.");
    print("The ceiling is collapsed and blocks the exit.");

    print("");
    print("You must return to the hallway.");
    print("hallway");

    waitForInput(function(input){
        input = input.toLowerCase();

        if (input === "hallway") {
            hallway();
        }
        else {
            stayHere();
            waitThenCall(thebox);
        }
    });
}

function start(){
    print("Escape From School.");
    print("Type enter to begin.");

    waitForInput(function(){
        classroom();
    });
}
