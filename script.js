const wordContainer = document.getElementById('words_death');
const startButton = document.getElementById('starButton');
const usedLettersElement = document.getElementById('usedLetters')

const words = ['carne', 'codigo', 'nevera', 'carro', 'computadora', 'humano', 'estudiante'] ///Falta el llamado a las palabras 

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart); 
};

const endGame = () =>{
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';

}

const wrongletter =() => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++; // mistakes = mistakes + 1
    console.log('ERRORES',mistakes)
    if (mistakes === bodyParts.length) endGame();
};

const correctletter = letter => {
    const { children} = wordContainer;
    for ( let i = 0; i < children.length; i ++) {
        if (children[i].innerHTML === letter){
            children[i].classList.toggle('hidden'); //toggle significa quitar un atributo 
            hits++; //aciertos 
            console.log('ACIERTOS', hits) /// Imprimir
        }
    }
    if ( hits === selectedWord.length) endGame();
};

const letterInput = letter =>{
    if (selectedWord.includes(letter)){
        correctletter(letter);
    } else {
        wrongletter();
    }
    addLetter(letter); 
    usedLetters.push(letter); 

};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if ( newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput ( newLetter );
    };
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);    
    });
};

const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase(); //error mal escrito length
    selectedWord = word.split(''); //['nevera'] = ['n','e','v', 'e',r,a]
};

const drawHangMan = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20,20);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = '#3D1600';
    ctx.fillRect(0,7,4,1);
    ctx.fillRect(1,0,1,8); // X, Y , Num_pixel_x, Num_pixl_y 
    ctx.fillRect(2,0,3,1);
    ctx.fillRect(4,1,1,1);
};

const startGame = () => {
    var num_partidas = 0; 
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML ='';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', startGame);
