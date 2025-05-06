import React, { useContext } from 'react'
import './Main.css'
import './ChatScreen.css'
import { assets } from '../../assets/assets'
import {Context} from '../../context/Context'

const Main = () => {
  
  const {onSent, recentPrompt,showResult,loading,resultData,setInput,input, newChat} = useContext(Context);

  const handleKeyDown=(event)=>{
    if(event.key == 'Enter'){
      onSent();
    }
  }

  return (
    <>
    <div className='main'>
        <div className="nav">
          <p>YourBuddy</p>
          <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

          {!showResult? (         
          <>
          <div className="greet">
            <img src="" alt="#D-avatar-of-chatBot" />
          </div>
          </>
          ) : ( 
          <div className="result">
            <div className='result-title'>
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.app_icon} alt="" />
              {loading
              ?<div className='loader'>
                <hr />
                <hr />
                <hr />
              </div>
              :
              <p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
            </div>
          </div>
          )}
        </div> 
        <div className="main-bottom">
          <div className="search-box">
            <input onKeyDown={handleKeyDown} onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Write here to start conversation'/>
            <div >
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input? <img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
              {/* we use arrow function here so that onSent function is excuted only when onClickevent occurs , otherwise it would have been excuted as soon as component renders */}
            </div>
          </div>
          <div className="bottom-info">
            <p>YourBuddy is always here to listen, support and guide you. </p>
          </div>
        </div>
    </div>
    </>
  );
};

export default Main