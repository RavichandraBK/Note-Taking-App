// import React, { useContext } from 'react'
import { useContext, useState } from 'react';
import styles from './NotesLeft.module.css'
import myContext from '../Contexts/mycontext';

const NotesLeft = ({noteName,bgClr,data,isSelected,onSelect,onToggleNoteChk}) => {

    const {notePad,setNotepad} = useContext(myContext);
    const [hover, setHover] = useState({hvr:false, clk:false});
    const tagName = noteName.toUpperCase();
    const noteTag = useState(()=>tagName.slice(0,1) + tagName[Math.floor(Math.random()*[tagName.length-1])+1])[0];
    console.log(bgClr);

    const handleMousehover = ()=>{
        setHover({...hover,hvr:true});
    }
    const handleMouseleave = ()=>{
        setHover({...hover,hvr:false});
    }

    const handleNoteClick = ()=>{
        setHover({...hover,clk:!hover[data]?.clk});
        setNotepad({...notePad,selected:noteName, noteChk:!notePad[data]?.noteChk,noteClk:true});
        onSelect(data);
        onToggleNoteChk();
    }
    const myNoteStyle = {
        backgroundColor: hover.hvr&&'#F7ECDC',
        borderRadius: hover.hvr&&'60px ',
        padding: hover.hvr&&'5px 0px 5px 10px',
        boxSizing:'border-box',
    }
    const myNoteClick = {
        backgroundColor: hover.clk?'#F7ECDC':'none',
        borderRadius: hover.clk?'30px 0px 0px 30px':'0px',
        padding: hover.clk?'5px 0px 5px 10px':'0px',
        boxSizing:'border-box',
    }
    return (
        <div className={styles.notesLeft}>
            <div 
                style={hover.clk&&isSelected?myNoteClick:myNoteStyle}
                onMouseEnter={handleMousehover}
                onMouseLeave={handleMouseleave}
                onClick={handleNoteClick}
            >
                <div style={{backgroundColor:`${bgClr}`}}><p>{noteTag}</p></div>
                <p>{noteName}</p>
                {console.log(noteName)}
            </div>
        </div>
    )
}

export default NotesLeft