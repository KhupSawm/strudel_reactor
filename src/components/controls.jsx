import { FaPlay, FaStop, FaRedo, FaSave, FaUpload } from "react-icons/fa";

export default function Controls({ onSaveJson, onLoadJson, onPlay, onStop, replay, isReady}) {
    return (
        <div className="music-controls d-flex justify-content-center align-items-center gap-3 my-3">
            {/*<button className="control-btn" title="Process" onClick={onProcess}><FaCogs /></button>*/}
            {/*<button className="control-btn" title="Proc&Play" onClick={onProcPlay}><FaPlayCircle /></button>*/}
            <button disabled={!isReady} className="control-btn stop-btn" title="Stop" onClick={onStop}><FaStop /></button>
            <button disabled={!isReady} className="control-btn play-btn" title="Play" onClick={onPlay}><FaPlay /></button>
            <button disabled={!isReady} className="control-btn redo-btn" title="Reload" onClick={replay}><FaRedo /></button>

            {/* Save current song state as JSON */}
            <button className="control-btn save-btn m-1" onClick={onSaveJson} title="Save as Json">
                <FaSave/>
            </button>

            {/* Load song state from JSON file */}
            <input
                type="file"
                accept=".json"
                id="jsonFileInput"
                style={{ display: "none" }}
                onChange={onLoadJson}
            />
            <label htmlFor="jsonFileInput" className="control-btn load-btn m-1" title="Load">
                <FaUpload/>
            </label>

        </div>
    );
}
