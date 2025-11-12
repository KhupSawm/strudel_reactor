import React, { useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

// DefaultValue: initial volume level (default: 0.3)
export default function VolumeControl({ volume, onVolumeChange }) {

    const [showSlider, setShowSlider] = useState(false); // Controls visibility

    const handleChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        console.log("Slider changed to:", newVolume);
        onVolumeChange(newVolume);
    };

    return (
        <div className="mb-3">
            {/* Speaker icon toggles slider */}
            <button
                className="btn btn-outline-secondary mb-2" onClick={() => setShowSlider(!showSlider)}>

                {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}

            </button>
            {/* Volume slider appears only if toggled */}
            {showSlider && (
                  <>
                    <label htmlFor="volumeSlider" className="form-label">
                        Volume: {Math.round(volume * 100)}%
                    </label>
                        <input
                            id="volumeSlider"
                            type="range"
                            className="form-range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleChange}
                        />
                 </>
            )}
        </div>
    );
}
