import { useState } from "react";
import Calendar from "./components/Calendar"
import EventPopup from "./components/eventPopup"
import LocalStorageItems from "./components/LocalStorageItems"

function App() {

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);
  
  return (
    <div className="App">
      <EventPopup 
        popupIsVisible={popupIsVisible} 
        selectedDate={selectedDate}
      />

      <div className="left">
        <h1>Your saved events:</h1>
        <LocalStorageItems />
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
