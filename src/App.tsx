import { useEffect, useState } from "react";
import Calendar from "./components/Calendar"
import EventPopup from "./components/eventPopup"
import LocalStorageItems from "./components/LocalStorageItems"

export type localStorageData = {
  'Id': number,
  'Date': string,
  'Description': string
}

function App() {

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);
  const [lsItems, setLsItems] = useState<localStorageData[] | []>([])

  // get events stored in LS on mount
  useEffect(() => {
    const LS_ITEMS:localStorageData[] = JSON.parse(localStorage.getItem('Calendar events'));
    setLsItems(LS_ITEMS === null ? [] : LS_ITEMS);
  },[])
  
  return (
    <div className="App">
      <EventPopup 
        popupIsVisible={popupIsVisible} 
        setPopupIsVisible={setPopupIsVisible}
        selectedDate={selectedDate}
        setLsItems={setLsItems}
      />

      <div className="left">
        <h1>Your saved events:</h1>
        <LocalStorageItems 
          setLsItems={setLsItems}
          lsItems={lsItems}
        />
      </div>

      <div className="right">
        <h2>Your Calendar:</h2>
        <Calendar 
          setPopupIsVisible={setPopupIsVisible}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  )
}

export default App
