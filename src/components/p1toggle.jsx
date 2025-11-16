import {FaVolumeMute } from "react-icons/fa";
export default function P1Toggle({ muted, onToggle }) {
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
                Mute P1 <FaVolumeMute/>
            </label>
        </div>
    );
}
