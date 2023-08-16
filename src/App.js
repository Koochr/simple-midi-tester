import './App.css';
import MidiWriter from 'midi-writer-js';
import {PlayerElement} from 'html-midi-player'
import {useRef} from "react"

function App() {
  const playerRef = useRef()
  const fileRef = useRef()

  const play = (file) => {
    const player = new PlayerElement()
    playerRef.current.appendChild(player)
    player.soundFont = "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
    player.src = file
  }

  const playGenerated = () => {
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
    )

    // Generate a data URI
    const write = new MidiWriter.Writer(track);
    play(write.dataUri())
  }

  const playUploaded = () => {
    const file = fileRef.current.files[0]
    if (!file) {
      alert('No file selected')
      return
    }
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        play(reader.result)
      },
      false,
    )

    reader.readAsDataURL(file)
  }

  return (
    <div className="App">
      <p>Upload file or play a generated one</p>
      <input ref={fileRef} type="file"/>
      <button onClick={playUploaded}>play uploaded</button>
      <button onClick={playGenerated}>play generated</button>
      <div ref={playerRef}/>
    </div>
  );
}

export default App;
