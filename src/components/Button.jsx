import { useNavigate } from "react-router";
import { playSelectionSound } from "../utils/sounds.js";

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
