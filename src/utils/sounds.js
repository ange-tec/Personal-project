function playTone(startFrequency, endFrequency, duration, volume) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const startTime = audioContext.currentTime;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(startFrequency, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startTime + duration * 0.6);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
    oscillator.addEventListener("ended", () => audioContext.close());
}

export function playSelectionSound() {
    playTone(523.25, 783.99, 0.2, 0.12);
}

export function playNavigationSound() {
    playTone(392, 523.25, 0.14, 0.07);
}
