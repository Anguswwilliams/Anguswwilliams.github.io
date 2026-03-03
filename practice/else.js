function addToBody(text){
    document.body.innerHTML += "<p>" + text + "</p>";
}

let temp = prompt("What temperature is it outside?");
temp = Number(temp);

if(temp < 32){
    addToBody("Its freezing! Watch out for ice!");
}
else if(temp < 80){
    addToBody("Take a walk outside!");
}else{
    addToBody("Go to the beach!");
}