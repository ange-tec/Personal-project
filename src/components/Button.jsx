import { useNavigate } from "react-router";

export default function Button({ id }) {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="details-button"
            onClick={() => navigate(`/pokemon/${id}`)}
        >View details <span aria-hidden="true">↗</span></button>
    )
}
