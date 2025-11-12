import './cors-redirect';
import './App.css';
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import Controls from "./components/controls"; // Importing the nessesary buttons
import P1Toggle from "./components/p1toggle"; // Importing p1toggle comp
import P2Toggle from "./components/p2toggle"; // Importing p2toggle comp
import VolumeControl from "./components/volumeControl"; //Importing Volume Controll
import { preprocess } from "./util/preprocess";


let globalEditor = null;

export default function StrudelDemo() {

    const hasRun = useRef(false);

    const [songText, setSongText] = useState("");

    const [ready, setReady] = useState(false);

    const [muteP1, setMuteP1] = useState(false);
    const [muteP2, setMuteP2] = useState(false);

    const [volume, setVolume] = useState(1);


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
          setSongText(stranger_tune); // preload text
          setReady(true);             // enable buttons
      })();
    }

  }, []);

    // Runs setcode everytime songtext changes
    useEffect(() => {
        if (globalEditor) {
            globalEditor.setCode(songText);
            console.log("songText is:", songText);

        }
    }, [songText]);

    useEffect(() => {
        if (!globalEditor) return;

        let processed = songText
            .replaceAll('<p1_Radio>', muteP1 ? '_' : '')
            .replaceAll('<p2_Radio>', muteP2 ? '_' : '');

        globalEditor.setCode(processed);
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
    }

  return (
    <div>
      <h2>Strudel Demo</h2>
      <main>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                          <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
                          <textarea className="form-control" rows="15" id="proc" value={songText} onChange={(e) => setSongText(e.target.value)} ></textarea>
            </div>
                      <div className="col-md-4">
                          <Controls isReady={ready}
                              onPlay={() => { handlePlay(songText, muteP1, muteP2, volume) }}
                              onStop={() => globalEditor?.stop()}
                              replay={() => {
                                  globalEditor.stop();
                                  setTimeout(() => handlePlay(songText, muteP1, muteP2, volume), 300);
                              }}
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

                          <VolumeControl onVolumeChange={setVolume} volume={volume} />

            </div>
          </div>
        </div>
      </main >
    </div >
  );


}

