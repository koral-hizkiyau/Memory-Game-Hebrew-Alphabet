import React from 'react'

export default function StartGame({flagStart, setFlagStart}) {

    const changeFlagStart = () => {
        setFlagStart(!flagStart);
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_START_FLAG, !flagStart);
    }
  return (
    <div className='container' style={{marginTop:"10%"}}>
    <div className='row'>

    <h2 className='col-lg-12'><img src={"/images/alepp.png"} alt="title" width="55%" /> <br/> משחק זיכרון <br/></h2></div>
    <button className='col-lg-12' style={{marginTop:"2%"}} onClick={changeFlagStart}>התחל </button>
    </div>
  )
}
