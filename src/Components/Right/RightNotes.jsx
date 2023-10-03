import React from 'react'
import styles from './RightNotes.module.css'
import { useState } from 'react';
import { useRef } from 'react';

const RightNotes = ({ noteName, bgClr, id }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentDate = new Date();
  let hours = currentDate.getHours();
  const mins = currentDate.getMinutes();
  const meridean = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const formateTime = `${hours}:${mins.toString().padStart(2, '0')} ${meridean}`
  const day = currentDate.getDate();
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const formateDate = `${day.toString()} ${month} ${year}`
  const tagName = noteName.toUpperCase();
  const inputRef = useRef(null)
  const noteTag = useState(() => tagName.slice(0, 1) + tagName[Math.floor(Math.random() * [tagName.length - 1]) + 1])[0];
  const [noteStack, setNoteStack] = useState(() => JSON.parse(localStorage.getItem(`NoteStore${id}`)) || []);
  const [inputVal, setInputVal]= useState('');
  // const typedNote = ;
  // const [prompted,setPrompted] = useState(false);
  // let text = 'gauranga';

  const handleEnterKey = (e) => {
    if ((e.key === 'Enter' && inputRef.current.value.trim()!=='')) {
      const tmp = {
        Note:e.target.value.trim('\n'),
        Date:formateDate,
        Time:formateTime,
      };
      setNoteStack(prev => [...prev, tmp]);
      // const noteTrack = {
      //   Date:formateDate,
      //   Time:formateTime,
      // }
      // setDateStack(prev=>[...prev,noteTrack]);
      // setPrompted(true);
      e.target.value = '';
    }
  }
  const handleNoteChange = (e) => {
    localStorage.setItem(`NoteStore${id}`, JSON.stringify(noteStack));
    setInputVal(e.target.value);
    // localStorage.setItem(`DateStore${id}`,JSON.stringify(dateStack));
  }
  const handleSend = () => {
    // setSendBtn(true);
    if(inputRef.current.value.trim()!=='' && inputVal.length!=='0'){
      const tmp = {
      Note:inputRef.current.value,
      Date:formateDate,
      Time:formateTime,
    };
    setNoteStack(prev => [...prev, tmp]);
      // const noteTrack = {
      //   Date:formateDate,
      //   Time:formateTime,
      // }
      // setDateStack(prev=>[...prev,noteTrack]);
    inputRef.current.value = '';}
  }
  return (
    <>
      <div className={styles.navBar}>
        <div>
          <div><p>{noteTag}</p></div>
          <p>{noteName}</p>
        </div>
        <div className={styles.noted}>
          {noteStack.map((item, index) => (<div className={styles.notedText} key={index}>
            <div><p>{item.Time}<br />{item.Date}</p></div>
            <div><p>{item.Note}</p></div>
          </div>))}
        </div>
        <div className={styles.typeNotes}>
          <img src="/assets/send.svg" alt="" onClick={handleSend} style={{ cursor: 'pointer' }} />
          <textarea name="note" id="" cols="30" rows="10" ref={inputRef} placeholder='Enter your text here...........' onChange={handleNoteChange} onKeyDown={handleEnterKey}></textarea>
        </div>
      </div>
    </>
  )
}

export default RightNotes