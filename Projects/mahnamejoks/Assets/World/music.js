let win = new sound("./Music/win.mp3");
let lose = new sound("./Music/lose.mp3");
let whateverTheHeckThisIs = new sound("./Music/man.mp3");

export { win, lose, whateverTheHeckThisIs, };

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.setAttribute("loop","");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}