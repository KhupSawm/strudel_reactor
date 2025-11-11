import { FaPlayCircle, FaVolumeMute } from "react-icons/fa";
export default function P2Toggle({ onChange }) {
    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                id="p1Toggle"
                checked={muted}
                onChange={() => onToggle(!muted)}
            />
            <label className="form-check-label" htmlFor="p1Toggle">
                (P2) <FaVolumeMute />
            </label>
        </div>
    );
}
