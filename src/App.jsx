import { useState } from 'react'
import './App.css'

function App() {

  const[word,setWord]=useState("")
  const[definition,setDefinition]=useState("")
  const[loading,setLoading]=useState(false)

  const handleSearch=()=>{
    setLoading(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res=>res.json())
    .then((data)=>{
     if(data.length > 0){
      const define=data[0].meanings[0].definitions[0].definition;
      setDefinition(define);
     }else{
      setDefinition(`Word not found`)
     }
    })
    .then(()=>{
      setLoading(false)
    })
  }
  
  return (
    <div id='wrapper'>
      <input type="text" value={word} onChange={(e)=>{setWord(e.target.value)}} className='inputWord' placeholder='Search word...'/>
      <button onClick={handleSearch} className='searchBtn'>Search</button>
      {loading ? <div className='spinner'></div> : <div className='definition'>{definition}</div>}
    </div>
  )
}

export default App
