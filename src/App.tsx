import { useEffect, useState } from "react"
import Calendar from "./components/Calendar"
import LocalStorageItems from "./components/LocalStorageItems"

export type localStorageProps = {
  'Date': string,
  'Description': string
}

function App() {

  const [lsItems, setLsItems] = useState<localStorageProps[]>([])

  // get events stored in LS on mount
  useEffect(() => {
    const LS_ITEMS = JSON.parse(localStorage.getItem('Calendar events'));
    setLsItems(LS_ITEMS === null ? [] : LS_ITEMS);
  },[])
  
  return (
    <div className="App">

      <div className="left">
        <h1>Your saved events:</h1>
        <LocalStorageItems 
          lsItems={lsItems} 
        />
      </div>

      <div className="right">
        <h2>Calendar event organiser</h2>
        <Calendar />
      </div>
      
    </div>
  )
}

export default App
