import './App.css';
import {Button, Form} from 'react-bootstrap/';
import { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { youtube_parser } from './utils';


function App() {
  const [mode, setmode] = useState(faSun)
  const [bodymode, setbodymode] = useState("#FFFF")
  const [bodyColor, setBodyColor] = useState("#09072c")
  const [modeTitle, setModeTitle] = useState("Light")
  const [name, setName] = useState("")

  const inputUrlRef = useRef()
  const [urlResult, setUrlResult] = useState(null)

  const changemode = () => {
    if(mode === faSun) {
      setmode(faMoon)
      setModeTitle("Dark")
      setbodymode("#09072c")
      setBodyColor("#FFFF")

    } else {
      setmode(faSun)
      setModeTitle("Light")
      setbodymode("#FFFF")
      setBodyColor("#09072c")

    } 
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputUrlRef.current.value)
    const youtubeId = youtube_parser(inputUrlRef.current.value)

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: {id: youtubeId},
      headers: {
        'X-RapidAPI-Key': 'bcdf52b7d1msha30571f387c3f8ap167a02jsncb4b99e7320f',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    }
    axios(options)
      .then(res => {
        setUrlResult(res.data.link)
        setName(res.data.title)
      })
      .catch(err => console.log(err))

    inputUrlRef.current.value = ""
  }
  return (
    <div className="app" style={{backgroundColor: bodymode}}>
        <div className="mode" style={{color: bodyColor}}>
            <h4>Youteube to mp3</h4>
            <button style={{color: bodyColor}} onClick={changemode} className='modeBtn'>{modeTitle} <FontAwesomeIcon icon={mode} /> </button>
        </div>
        <div className="inputform">
          <form onSubmit={handleSubmit} className="form">
            <Form.Control ref={inputUrlRef} type='text' placeholder='Enter link'/>
            <Button type='submit'>Search</Button>
          </form>
        <div className="result">
          {urlResult ? <a target='_blank' rel='noreferrer' href={urlResult} className='downloaded'>{name}</a> : ""}
        </div>
        </div>
    </div>
  );
}

export default App;