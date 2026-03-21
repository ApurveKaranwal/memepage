import { useState } from 'react'
import { americaSound,
  americaImg,
  animeImg,
  animeSound,
  brainrotImg,
  brainrotAltImg,
  chaloImg,
  chaloSound,
  chinaGif,
  chinaSound,
  faahImg,
  faahSound,
  introSound,
  mkbGif,
  mkbSound,
  spidermanImg,
  spidermanSound,
  wowImg,
  wowSound } from "./assets/";



export default function App(){
  const playSound = (sound) =>{
    const audio = new Audio(sound);
    audio.play();
  };

 
  return(
    <>
    <div>
      <div style={{display:"flex", justifyContent:"flex-end"}}>
        <button>Log In</button>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
      <h1> Meme Page</h1>
    </div>
    <div>
      <center>
      <button onClick={function(){
        playSound(intro)
      }}>Play Intro</button>
      </center>
    </div>
    <div>
      <center> 

    <div>
      <h1> Click here if you are GAY </h1>
      <h4> I know you are, so better click here you Gay people</h4>
      <Button onClick={alertu}/>    
    </div>

    <div>
      <h2>America</h2>
      <img src={americaImg}></img>
    </div>
    <div>
      <button onClick={()=>playSound(americaSound)}>Play</button>
    </div>

    <div>
      <h2>Anime aahh!</h2>
      <img src={animeImg} width="200" height="200"></img>
    </div>
    <div>
      <button onClick={function(){
        playSound(animeSound)
      }}>Play</button>
    </div>

    <div>
      <h2>Tung-Tung SAHUR!</h2>
      <img src={brainrotImg} width="200" height="200"></img>
    </div>
    <div>
      <button onClick={()=>playSound(brainrotAltImg)}>Play</button>
    </div>

    <div>
      <h2>Chalooo</h2>
      <img src={chaloImg} width="200" height="200"></img>
    </div>
    <div>
      <button onClick={()=>playSound(chaloSound)}>Play</button>
    </div>

    <div>
      <h2>your phone linging</h2>
      <img src={chinaGif} width="400" height="200"></img>
    </div>
    <div>
      <button onClick={()=>playSound(chinaSound)}>Play</button>
    </div>

    <div>
      <h2>FAAAHHHH!!!</h2>
      <img src={faahImg} width="400" height="400"></img>
    </div>
    <div>
      <button onClick={()=>playSound(faahSound)}>Play</button>
    </div>

    <div>
      <h2>MKB aaaggg!!!</h2>
      <img src={mkbGif} width="200" height="200"></img>
    </div>
    <div>
      <button onClick={()=>playSound(mkbSound)}>Play</button>
    </div>

    <div>
      <h2>Spiderman </h2>
      <img src={spidermanImg} width="200" height="200"></img>
    </div>
    <div>
      <button onClick={()=>playSound(spidermanSound)}>Play</button>
    </div>

    <div>
      <h2>Wow kya ladka hai</h2>
      <img src={wowImg} width="400" height="200"></img>
    </div>
    <div>
      <button onClick={()=>playSound(wowSound)}>Play</button>
    </div>

    </center>
    </div>
    </div>

    </>

  )
}

function alertu(){
  alert("sussy behaviour you Gay")
}

function Button({onClick}){
  const[count, setCount]=useState(0);

  return(
    <button onClick={onClick}>x</button>
  )
}