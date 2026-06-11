import { level } from "./main.js";
import { initializeGame } from "./main.js";
import { plains } from "./plains.js";

export function mapDescription(mapObject, time) {
    document.getElementById("mapDesc").innerHTML = `<h1 style="color:white; text-decoration: underline;">${mapObject.name}</h1><h3 style="color:white; width: 70%; padding-left: 15%; padding-right: 15%;  ">${mapObject.description}</h3>`;
    document.getElementById("mapDesc").style.opacity = "0.5";
    setTimeout(() => {document.getElementById("mapDesc").style.opacity = "0"}, time)
}


export function drawMap(mapObject) {
    let imageUrl = mapObject.imageLink || "";
    imageUrl = imageUrl.replace(/^\.?\/?art\//i, "./Assets/Art/");
    imageUrl = imageUrl.replace(/^\.\.\/Art\//i, "./Assets/Art/");
    imageUrl = imageUrl.replace(/^\.\/Assets\/Art\//i, "./Assets/Art/");
    if (imageUrl.includes("plains.png")) {
        imageUrl = "./Assets/Art/plains.png";
    }
    document.getElementById("canvas").style.backgroundImage = `url(${imageUrl})`;
    document.getElementById("canvas").style.backgroundSize = "cover";
    document.getElementById("canvas").style.backgroundPosition = "center";
    document.getElementById("canvas").style.backgroundRepeat = "no-repeat";
}



