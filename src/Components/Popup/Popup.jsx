import React, { useContext, useState } from 'react'
import styles from './Popup.module.css'
import { useRef } from 'react'
import myContext from '../Contexts/mycontext';

const Popup = ({ handleClose, show }) => {

    const chkClick = useRef();
    const { notepad, setNotepad } = useContext(myContext);

    const handleOutsideClick = (event) => {
        if (chkClick.current && !chkClick.current.contains(event.target)) {
            handleClose();
            setInputVal('');
            setNoteVar({...noteVar,invalid:false})
        }
    }
    const showPopup = show ? `${styles.Popup} ${styles.displayBlock}` : `${styles.Popup} ${styles.displayNone}`;
    const [noteVar, setNoteVar] = useState({ invalid: false })
    const [inputVal, setInputVal] = useState('')

    const handleColor = (backColor) => {
        setNoteVar({ ...noteVar, color: backColor.backgroundColor })

    }
    const handleNoteName = (notesName) => {
        
        inputVal!==''?setNoteVar({ ...noteVar, name: notesName, invalid:false}):setNoteVar({...noteVar,invalid:true});
        
    }
    const handleCreatNote = (clr, noteName) => {

        if (inputVal !== '') {
            let PNotes = JSON.parse(localStorage.getItem('PNotes'));
            console.log(PNotes)

            if (!PNotes) {
                PNotes = [];
            }

            let newNote = {
                name: noteVar.name,
                color: noteVar.color,
            }
            PNotes.push(newNote);
            localStorage.setItem('PNotes', JSON.stringify(PNotes));
            setNotepad({
                ...notepad,
                name: newNote.name,
                backClr: newNote.color,
                // noteCreate: true,
            })
            setNoteVar({ ...noteVar, name: '', color: '',invalid:false });
            setInputVal('');
            handleClose();
        }
        else {
            setNoteVar({ ...noteVar, invalid: true });
        }
    }
    return (
        <>
            {show && <div className={styles.overlay} onClick={handleOutsideClick}></div>}
            <div className={showPopup} ref={chkClick}>

                <div>
                    <p>Create New Notes group</p>
                </div>
                <div className={styles.PopupText}>
                    <p>Group Name</p>
                    <input type="text" placeholder='Enter your group name....'
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)} onKeyUp={
                            (e) => {
                                !((e.key >= 'A' && e.key <= 'Z') || (e.key === ' ') || (e.key >= 'a' && e.key <= 'z') || (e.key === 'Backspace')) && e.preventDefault();
                                handleNoteName(e.target.value)
                            }
                        }
                    />

                </div>
                {
                    noteVar.invalid && (<p style={{ fontFamily: 'Roboto', fontSize: '15px', display: 'block', marginTop: '0px', lineHeight: '0px', marginLeft: '250px' }}>Invalid input</p>)
                }
                <div className={styles.PopupColor}>
                    <div>
                        <p>Choose colour</p>
                    </div>
                    <div>
                        <div style={{ backgroundColor: '#B38BFA' }} onClick={(e) => { handleColor(window.getComputedStyle(e.target)) }}></div>
                        <div style={{ backgroundColor: '#FF79F2' }} onClick={(e) => { handleColor(window.getComputedStyle(e.target)) }}></div>
                        <div style={{ backgroundColor: '#43E6FC' }} onClick={(e) => { handleColor(window.getComputedStyle(e.target)) }}></div>
                        <div style={{ backgroundColor: '#F19576' }} onClick={(e) => { handleColor(window.getComputedStyle(e.target)) }}></div>
                        <div style={{ backgroundColor: '#0047FF' }} onClick={(e) => { handleColor(window.getComputedStyle(e.target)) }}></div>
                        <div style={{ backgroundColor: '#6691FF' }} onClick={(e) => { handleColor(window.getComputedStyle(e.target)) }}></div>
                    </div>
                </div>
                <button onClick={handleCreatNote}>Create</button>
            </div>

        </>
    )
}

export default Popup