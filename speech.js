let speech= new SpeechSynthesisUtterance();
 
let voices= [];
 
let voiceSelect = document.querySelector("select");
let textInput = document.querySelector("textarea"); // Add textInput referenc
let highlightedText = document.getElementById("highlightedText");

window.speechSynthesis.onvoiceschanged= ()=>{
    voices=window.speechSynthesis.getVoices();
    speech.voice= voices[0];

    voices.forEach((voice,i)=>(voiceSelect.options[i]= new Option(voice.name, i)));
}

voiceSelect.addEventListener("change",()=>{
    speech.voice=voices[voiceSelect.value]
})
 
document.querySelector("button").addEventListener("click",()=>{
    speech.text= document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
    updateHighlightedText(0, 0); // Reset highlight
});

// Highlight text as it is spoken
speech.onboundary = (event) => {
    if (event.name === 'word') {
        const start = event.charIndex;
        const end = event.charIndex + event.charLength;

        // Highlight the current word
        textInput.setSelectionRange(start, end);
        textInput.focus();
    }
};
// Hide overlay after speech ends
speech.onend = () => {
    highlightedText.style.display = 'none'; // Hide overlay after speech
};


