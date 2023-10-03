import styles from './App.module.css'
import { useState } from 'react';
import Popup from './Components/Popup/Popup';
import NotesLeft from './Components/Left/NotesLeft';
import myContext from './Components/Contexts/mycontext';
// import MobPopup from './Components/MobPopup/MobPopup';
import RightNotes from './Components/Right/RightNotes';

function App() {

  // const myContext = useContext(myContext);
  const [show, setShow] = useState(false);
  // let Rn = true;

  const togglePopup = () => {
    setShow(!show);
  }
  const [notePad, setNotepad] = useState({ noteChk: {}, noteClk: false });

  const [noteSelected, setNoteSelected] = useState(null);
  const pnote = JSON.parse(localStorage.getItem('PNotes')) || [];
  const handleNoteSelected = (id) => {
    setNoteSelected(id)
  }
  const toggleNoteChk = (index) => {
    setNotepad((prev) => {
      const updatedNote = { ...prev.noteChk };
      updatedNote[index] = !updatedNote[index];
      return { ...prev, noteChk: updatedNote }
    })
  }
  return (
    <>
      <myContext.Provider value={{ notePad, setNotepad }}>
        <div className={styles.App}>
          <div className={styles.LeftPanel}>
            <div>
              <p>Pocket Notes</p>
              <button onClick={togglePopup}>+ Create Notes group</button>
            </div>
            <div>
              {
                pnote.map((item, index) => {
                  return <NotesLeft key={index} data={index} noteName={item.name} bgClr={item.color} isSelected={noteSelected === index} onSelect={handleNoteSelected} onToggleNoteChk={() => toggleNoteChk(index)} />
                })
              }

            </div>
          </div>
          {notePad.noteClk ? (pnote.map((item, index) => {
            console.log('right check', notePad[index]?.noteChk)
            return notePad.noteChk[index] && <RightNotes key={index} noteName={item.name} bgClr={item.color} id={index} />
          })) :
            (<div className={styles.RightPanel}>
              <div>
                <div>
                  <img src='/assets/NotePic.png' alt='' />
                  <p>Pocket Notes</p>
                  <p>Send and receive messages without keeping your phone online.
                    Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                </div>
                <div><img src='/assets/Encrypt.svg' alt='' /><p>end-to-end encrypted</p></div>
              </div>
            </div>)}
        </div>
        <Popup show={show} handleClose={togglePopup} />
        {/* {window.innerWidth>=768?(<Popup show={show} handleClose={togglePopup} />):(<MobPopup show={show} handleClose={togglePopup} />)} */}
      </myContext.Provider>
    </>
  );
}

export default App;
