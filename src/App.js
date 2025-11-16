import './cors-redirect';
import './App.css';
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { Tunes } from './tunes';
import Controls from "./components/controls"; // Importing the nessesary buttons
import P1Toggle from "./components/p1toggle"; // Importing p1toggle comp
import P2Toggle from "./components/p2toggle"; // Importing p2toggle comp
import VolumeControl from "./components/volumeControl"; //Importing Volume Controll
import { preprocess } from "./util/preprocess";
import TuneDropdown from "./components/tuneDropdown";
import Graph from "./components/strudleGraph";

let globalEditor = null;
// Global gain node reference
let masterGainNode = null;
export default function StrudelDemo() {

    const hasRun = useRef(false);

    const [songText, setSongText] = useState("");

    const [ready, setReady] = useState(false);

    const [muteP1, setMuteP1] = useState(false);
    const [muteP2, setMuteP2] = useState(false);

    const [volume, setVolume] = useState(1);

    const [isPlaying, setIsPlaying] = useState(false);

    const [logData, setLogData] = useState([]);

    useEffect(() => {

        if (!hasRun.current) {
            hasRun.current = true;
            (async () => {
                await initStrudel();

                globalEditor = new StrudelMirror({
                    defaultOutput: webaudioOutput,
                    getTime: () => getAudioContext().currentTime,
                    transpiler,
                    root: document.getElementById('editor'),
                    prebake: async () => {
                        initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                        const loadModules = evalScope(
                            import('@strudel/core'),
                            import('@strudel/draw'),
                            import('@strudel/mini'),
                            import('@strudel/tonal'),
                            import('@strudel/webaudio'),
                        );
                        await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                    },
                });
                //setSongText(Tunes); // preload text
                setReady(true);             // enable buttons

                // Setup gain node
                const audioCtx = getAudioContext();
                masterGainNode = audioCtx.createGain();
                masterGainNode.gain.value = volume; // Initial volume

                // Replace default output with gain routing
                const customOutput = {
                    outputNode: masterGainNode,
                    gain: masterGainNode,
                };
                globalEditor.setOutput(customOutput);

                // Connect to destination
                masterGainNode.connect(audioCtx.destination);

                // Listen for Strudel's .log() values and forward to D3
                window.addEventListener("log", handleD3Graph);
            })();
        }
        // Cleanup when component unmounts
        return () => {
            window.removeEventListener("log", handleD3Graph);
        };
    }, []);

    // Runs setcode everytime songtext changes
    useEffect(() => {
        if (globalEditor) {
            globalEditor.setCode(songText);
            console.log("songText is:", songText);

        }
    }, [songText]);

    useEffect(() => {
        if (!globalEditor || !isPlaying) return;

        let processed = songText
            .replaceAll('<p1_Radio>', muteP1 ? '_' : '')
            .replaceAll('<p2_Radio>', muteP2 ? '_' : '');

        const volProcessed = preprocess(processed, volume);
        globalEditor.setCode(volProcessed);
        globalEditor.evaluate();

    }, [muteP1, muteP2]);

    function handlePlay(songText, muteP1, muteP2, volume) {
        try { initAudioOnFirstClick(); } catch (e) { }

        if (!globalEditor) return;

        // Replace mute placeholders based on toggle state
        let processed = songText
            .replaceAll('<p1_Radio>', muteP1 ? '_' : '')
            .replaceAll('<p2_Radio>', muteP2 ? '_' : '');

        let vol_process = preprocess(processed, volume);
        console.log("Evaluating processed code:\n", vol_process); // Debug purpose

        globalEditor.setCode(vol_process);
        globalEditor.evaluate();
        setIsPlaying(true);
    }

    function handleVolumeChange(newVolume) {
        setVolume(newVolume); // Update state
        if (masterGainNode) {
            masterGainNode.gain.value = newVolume;
            console.log("Live volume set to:", newVolume);
        } else {
            console.warn("Gain node not ready.");
        }
        // Only recompile if playing
        if (isPlaying) {
            let processed = songText
                .replaceAll('<p1_Radio>', muteP1 ? '_' : '')
                .replaceAll('<p2_Radio>', muteP2 ? '_' : '');
            const volProcessed = preprocess(processed, newVolume);
            globalEditor.setCode(volProcessed);
            globalEditor.evaluate();
        }
    }

    // Function save as json
    function handleSaveJson() {

        // Create a new Blob object containing the songText as JSON
        const file = new Blob([JSON.stringify({ songText })], { type: "application/json" });

        // Create Link route
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = "song.json"; // Set file name as song
        link.click();
    }
    // Function to load a JSON file and update songText
    function handleLoadJson(e) {
        const file = e.target.files[0]; // Get the selected file
        if (!file) return;

        const reader = new FileReader(); // Create a file reader
        reader.onload = () => {

            // Parse JSON content and set it to songText
            const data = JSON.parse(reader.result);
            setSongText(data.songText || "");
        };

        reader.readAsText(file); // Read the file as text
    }

    // D3 graph function handler
    // Event handler for capturing values from Strudel's `.log()` output
    const handleD3Graph = (event) => {
        const newValue = event.detail; // Get the new value emitted from the log event

        // Update the logData state with the new value
        setLogData((prev) => {
            const updated = [...prev, newValue]; // Append the new value to the existing array

            // Limit the array to the last 100 values for performance and visualization clarity
            return updated.length > 100 ? updated.slice(-100) : updated;
        });
    };




      return (
        <div>
          <h2>Strudel Demo</h2>
          <main>

            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
                        <TuneDropdown
                            tunes={Tunes}
                            onSelect={(tuneName) => {
                                const selectedTune = Tunes[tuneName];
                                if (selectedTune) setSongText(selectedTune);
                            }}
                        />
                    <textarea className="form-control" rows="15" id="proc" value={songText} onChange={(e) => setSongText(e.target.value)} ></textarea>
                </div>
                <div className="col-md-4">
                    <Controls isReady={ready}
                        onPlay={() => { handlePlay(songText, muteP1, muteP2, volume) }}
                        onStop={() => { globalEditor?.stop(); setIsPlaying(false); }}
                        replay={() => {
                            globalEditor.stop();
                            setTimeout(() => handlePlay(songText, muteP1, muteP2, volume), 300);
                        }}
                        onSaveJson={handleSaveJson}
                        onLoadJson={handleLoadJson}
                              />
                </div>
                </div>

              <div className="row">
                <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                     <div id="editor" />
                </div>
                <div className="col-md-4">
                    <P1Toggle muted={muteP1} onToggle={setMuteP1} />
                    <P2Toggle muted={muteP2} onToggle={setMuteP2} />

                    <VolumeControl onVolumeChange={handleVolumeChange} volume={volume} />
                 </div>


              </div>                          <div className="row">
                              <div className="col-12 md-12">
                                  <h5>Audio Log Graph</h5>
                                  <Graph data={logData} />
                              </div>
                          </div>
            </div>
          </main >
        </div >
      );


    }

