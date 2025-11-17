// Dropdown to select a tune
export default function TuneDropdown({ tunes, onSelect }) {
    return (
        <div className="mb-3">
            <label htmlFor="tuneDropdown" className="text-white form-label">
                Select a Tune:
            </label>
            <select
                id="tuneDropdown"
                className="bg-black form-select"
                onChange={(e) => onSelect(e.target.value)}
            >
                {/* Default disabled option */}
                <option className="text-white" value="">-- Choose a tune --</option>
                {Object.keys(tunes).map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
}
