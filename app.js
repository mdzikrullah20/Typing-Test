const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.input-field')
const time = document.querySelector('.time span b')
const mistake = document.querySelector('.mistake span')
const Wpm = document.querySelector('.Wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('#btn')

//set value

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;


function loadParagraph() {
    let paragraph = ["Avoid daydreaming about the  years to come.", 
        "You are the most important person in your whole life.","Granovetter begins by looking at balance theory. In brief",
        "Many novice writers tend to make a sharp distinction between content and style."]


    const randomIndex = Math.floor(Math.random() * paragraph.length)
    typingText.innerHTML = "";
    for(const char of paragraph[randomIndex]){
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`; 
    }
}
//handal user input 

function initTyping(){
    const char = typingText.querySelectorAll('span')
    const typedChar = input.value.charAt(charIndex);

    if(charIndex < char.length && timeLeft >0){      

        if(!isTyping){
            timer = setInterval(iniTime,1000);
            isTyping = true;
        }
        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add("correct")
        }
        else{
            mistakes++;
        char[charIndex].classList.add('incorrect');
        }
        charIndex++;
        mistake.innerText = mistakes; 
        cpm.innerText = charIndex - mistakes;
    }
    else{
        clearInterval(timer)
    }
}
///Timer function
function iniTime(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerHTML = timeLeft;

        const wpmVal = Math.floor(Math.random((charIndex - mistakes)/5) / (maxTime - timeLeft)*60)
        Wpm.innerText = wpmVal;
    }    
    else{
        clearInterval(timer)
    }
}
function reset(){
    clearInterval(timer)
    loadParagraph()
    timeLeft =  maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    input.value = ""
}

input.addEventListener('input', initTyping)
input.value = ""
btn.addEventListener('click',reset)
loadParagraph();
