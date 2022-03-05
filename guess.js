
var test = false
const randomstring = require("randomstring");
const prompt = require('prompt-sync')({sigint: true});
var colors = require('colors');

var win = false
const info = `Welcome to Guess! This a short game coded in nodejs.
The goal is to guess a random generated 4 digits number, with numbers from 1 to 6, in less than 10 turns.
Each guess gets a reply consisting of:
* \x1b[32mGreen X\x1b[0m corresponding to the number of \x1b[33mcorrect numbers\x1b[0m in the \x1b[33mcorrect places.\x1b[0m
* \x1b[34mBlue X\x1b[0m corresponding to the number of \x1b[33mcorrect numbers\x1b[0m in the \x1b[36mwrong places.\x1b[0m
* White X corresponding to \x1b[36mwrong numbers.\x1b[0m (Regardless of its position).
To play you must simply type a 4 digits answer, with numbers from 1 to 6 (including).

Example: The correct answer is 1233, typing 4564 will reply XXXX, as no correct number is present.
Whereas 3156 will reply \x1b[34mXX\x1b[0mXX, as the 3 and 1 are present in the answer, but they aren't in the correct position.
Lastly, 3431 will reply \x1b[34mXX\x1b[0m\x1b[32mX\x1b[0mX as just a 3 is in the correct position.
Please note that the order of the reply will NOT vary depending on position, as it will always be \x1b[32mGreen\x1b[0m, then \x1b[34mBlue\x1b[0m, then WHITE.


If you decide to give up or you can't wait to see the answer, you can simply type: 'solve'
`
const anum = randomstring.generate({ //generates the ANSWER NUMBER as string
  length: 4,
  charset: '123456'
});
var adigits = anum.toString().split('').map(iNum => parseInt(iNum, 7));
//ANSWER DIGITS. takes the ANSWER NUMBER and splits it into digits. the 7 is for the biggest bit
var ansf = { //creates the object ANSWER FINAL, with its value from last operation
  ans1:adigits[0], ans2:adigits[1], ans3:adigits[2], ans4:adigits[3]};
if (test === true) {
  console.log(ansf); //this is just for testing, so i know whats the answer
}
var i = 0
var greeting = "Welcome to Guess! If this is your first time, type 'help' to learn how to play. If you already know what's goin on just "
console.log(greeting);
do {
var input = prompt("Guess the number: ".yellow)
var idigits = input.toString().split('').map(iNum => parseInt(iNum, 7)); //INPUT DIGITS. same shit as before
                                                      //but this time with the input (our guess)
var inpf = {
  inp1:idigits[0], inp2:idigits[1], inp3:idigits[2], inp4:idigits[3]};
var valansf = Object.values(ansf) //access the value of the array ansf
var valinpf = Object.values(inpf)
//this works, but for some reason it seems sketchy to do it. Ideally i'd like to compare them without
//having to convert them to string. Gotta find a better solution.
var gre = 0 // gre will say how many correct numbers in right place there are
var blu = 0 // blue will say how many correct numbers in the wrong place there are

var anscomp = anum //ANSWER COMPARE setting up the comparing answer values
var inpcomp = Object.assign({}, inpf); //INPUT COMPARE creates a new object to compare the input
var fill = 0;
if (isNaN(input)  || input.length !=4){
  switch (input) {
    case "help":
      console.log(info);
      break;
    case "undo":
      i--
      break;
    case "solve":
      console.log("You lost!".red)
      console.log("The right answer was: " + anum)
      return
      break ;
    default:
    console.log("Input provided is not a 4 digit number. If you need help type: 'help'");
  }
}
else {
  if (valansf.toString() === valinpf.toString()) {; //checks if the input is the same as the random generated answer
  console.log("You won!".green);
  var win = true
} else { //start of else
  if (inpf.inp1 === ansf.ans1) { //starts gre. compares input 1 with answer 1. if it is, increases gre in 1, and updates the comparing object
      gre++
    var anscomp = anscomp.replace(inpf.inp1,'',1); //replace with "" will delete, cause it's a string
    delete inpcomp.inp1; //deletes the input from the comparison
} if (inpf.inp2 === ansf.ans2) { //and so on and so on **
      gre++
    var anscomp = anscomp.replace(inpf.inp2,'',1);
    delete inpcomp.inp2;
} if (inpf.inp3 === ansf.ans3) {
      gre++
    var anscomp = anscomp.replace(inpf.inp3,'',1);
    delete inpcomp.inp3;
} if (inpf.inp4 === ansf.ans4) {
      gre++
    var anscomp = anscomp.replace(inpf.inp4,'',1);
    delete inpcomp.inp4; //maybe i should add a way to increment at will the number of bits. I'll do that later

}   if(String(anscomp).includes(inpcomp.inp1)) { //starts blue. if the comparing input is in the comparing answer, will increase blue and remove that element from the comparing ans
        blu++
        var anscomp = anscomp.replace(inpf.inp1,'',1);
}   if(String(anscomp).includes(inpcomp.inp2)) {
        blu++
        var anscomp = anscomp.replace(inpf.inp2,'',1);
}   if(String(anscomp).includes(inpcomp.inp3)) {
        blu++
        var anscomp = anscomp.replace(inpf.inp3,'',1);
}   if(String(anscomp).includes(inpcomp.inp4)) {
        blu++
        var anscomp = anscomp.replace(inpf.inp4,'',1);
}
var fill = 4 - gre - blu // there are fancier ways to do this, but this is short and works
console.log("X".repeat(gre).green + "X".repeat(blu).blue + "X".repeat(fill) + `. ${9 - i } tries left.`)
var i = i + 1;
 if (i === 10) {
   console.log("You lost!".red)
   console.log("The right answer was: " + anum);;}
}
}
} while (i < 10 && !win);
