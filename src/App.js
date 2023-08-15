import './App.css';
import MidiWriter from 'midi-writer-js';
import {PlayerElement} from 'html-midi-player'
import {useRef} from "react"

function App() {
  const playerRef = useRef()

  const play = () => {
    // Start with a new track
    const track = new MidiWriter.Track();

    // Define an instrument (optional):
    track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}));

    // Add some notes:
    track.addEvent([
        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
        new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}),
        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'})
      ], function(event, index) {
        return {sequential: true};
      }
    );

    // Generate a data URI
    const write = new MidiWriter.Writer(track);

    const player = new PlayerElement()
    playerRef.current.appendChild(player)
    player.soundFont = "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
    player.src = write.dataUri()
  }

  return (
    <div className="App">
      <button onClick={play}>play</button>
      <div ref={playerRef}/>
    </div>
  );
}

export default App;
