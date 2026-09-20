import { useNavigate } from "react-router";

function playSelectionSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const startTime = audioContext.currentTime;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(523.25, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(783.99, startTime + 0.12);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.2);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.2);
    oscillator.addEventListener("ended", () => audioContext.close());
}

export default function Button({ id }) {
    const navigate = useNavigate();

    const openDetails = () => {
        playSelectionSound();
        navigate(`/pokemon/${id}`);
    };

    return (
        <button
            type="button"
            className="details-button"
            onClick={openDetails}
        >View details <span aria-hidden="true">↗</span></button>
    )
}
