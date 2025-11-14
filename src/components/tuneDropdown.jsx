// Dropdown to select a tune
export default function TuneDropdown({ tunes, onSelect }) {
    return (
        <div className="mb-3">
            <label htmlFor="tuneDropdown" className="form-label">
                Select a Tune:
            </label>
            <select
                id="tuneDropdown"
                className="form-select"
                onChange={(e) => onSelect(e.target.value)}
            >
                {/* Default disabled option */}
                <option value="">-- Choose a tune --</option>
                {Object.keys(tunes).map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
}
