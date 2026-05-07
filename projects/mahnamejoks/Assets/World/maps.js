import { level } from "./main.js";
import { initializeGame } from "./main.js";
import { plains } from "./plains.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



const tutorial = {
    color1: "#000000",
    color2: "#b2b2b2",
    color3: "#5d5dd5",
}

const map1 = {
    color1: "#000000",
    color2: "#851d03",
    color3: "#ff9451",
}

const map2 = {
    color1: "#000000",
    color2: "#0b3d91",
    color3: "#4c7edb",
}

const map3 = {
    color1: "#000000",
    color2: "#1b7200",
    color3: "#15ca4e",
}

const map4 = {
    color1: "#000000",
    color2: "#920038",
    color3: "#db4c83",
}

const map5 = {
    color1: "#000000",
    color2: "#82a300",
    color3: "#ffef3d",
}




export function mapDescription(mapObject) {
    document.getElementById("mapDesc").innerHTML = `<h1 style="color:white; text-decoration: underline;">${mapObject.name}</h1><h3 style="color:white; width: 70%; padding-left: 15%; padding-right: 15%;  ">${mapObject.description}</h3>`;
    document.getElementById("mapDesc").style.opacity = ".8";
    setTimeout(() => {
        document.getElementById("mapDesc").style.opacity = "0";
    }, 5000);
}


export function drawMap(mapObject) {
    let imageUrl = mapObject.imageLink || "";
    imageUrl = imageUrl.replace(/^\.?\/?art\//i, "/Assets/Art/");
    imageUrl = imageUrl.replace(/^\.\.\/Art\//i, "/Assets/Art/");
    imageUrl = imageUrl.replace(/^\.\/Assets\/Art\//i, "/Assets/Art/");
    if (imageUrl.includes("plains.png")) {
        imageUrl = "/Assets/Art/plains.png";
    }
    document.getElementById("canvas").style.backgroundImage = `url(${imageUrl})`;
    document.getElementById("canvas").style.backgroundSize = "cover";
    document.getElementById("canvas").style.backgroundPosition = "center";
    document.getElementById("canvas").style.backgroundRepeat = "no-repeat";
}



