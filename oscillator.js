document.addEventListener('keydown', getKey);

const numberOfAudioSources = 10;
let contexts = [];
let current = 0;
let activeKey = 0;

for (i = 0; i < numberOfAudioSources; i++) {
    contexts.push(new AudioContext());
}

function getKey(e) {
    playSound(getFrequency(e.code));
}

function getFrequency(key) {
    switch (key) {
        case "KeyA":
            activeKey = 0;
            return 440.0;
        case "KeyW":
            activeKey = 1;
            return 466.2;
        case "KeyS":
            activeKey = 2;
            return 493.9;
        case "KeyD":
            activeKey = 3;
            return 523.3;
        case "KeyR":
            activeKey = 4;
            return 554.4;
        case "KeyF":
            activeKey = 5;
            return 587.3;
        case "KeyT":
            activeKey = 6;
            return 622.3;
        case "KeyG":
            activeKey = 7;
            return 659.3;
        case "KeyH":
            activeKey = 8;
            return 698.5;
        case "KeyU":
            activeKey = 9;
            return 740.0;
        case "KeyJ":
            activeKey = 10;
            return 784.0;
        case "KeyI":
            activeKey = 11;
            return 830.6;
        case "KeyK":
            activeKey = 12;
            return 880.0;
        case "KeyO":
            activeKey = 13;
            return 932.3;
        case "KeyL":
            activeKey = 14;
            return 987.8;
        case "Semicolon":
            activeKey = 15;
            return 1047;
        case "BracketLeft":
            activeKey = 16;
            return 1109;
        case "Quote":
            activeKey = 17;
            return 1175;
        default:
            return 0;
    }
}

let numberOfCases = 18;
var node = document.createElement("div");
node.className = "flexChild";

for (i = 0; i < numberOfCases; i++) {
    document.querySelector("#wrapper").appendChild(node.cloneNode(true));
}

let flexChildren = [];
flexChildren = document.querySelectorAll(".flexChild");

function playSound(fq) {
    if(fq == 0) {
        return;
    }
    if (current == contexts.length - 1) {
        current = 0;
    } else {
        current++;
    }
    context = contexts[current];
    var o = context.createOscillator();
    var gain = context.createGain();
    var frequency = fq;
    var rampDownTime = 2.4;
    gain.gain.exponentialRampToValueAtTime(1, context.currentTime);
    o.frequency.value = frequency;
    o.connect(gain);
    gain.connect(context.destination);
    o.start(0);
    gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + rampDownTime);
    
    node = document.getElementById("wrapper");
    node.replaceChild(flexChildren[activeKey], flexChildren[activeKey]);

    //o.stop(1.0);
}