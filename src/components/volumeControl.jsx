import React, { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

// DefaultValue: initial volume level (default: 0.3)
export default function VolumeControl({ volume, onVolumeChange }) {

    const handleChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        console.log("Slider changed to:", newVolume);
        onVolumeChange(newVolume);
    };

    return (
        <div className="mb-3">
            <label htmlFor="volumeSlider" className="form-label">
                Volume: {volume}
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
        </div>
    );
}
