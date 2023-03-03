import { useState } from "react"
import Calendar from "./components/Calendar"
import EventPopup from "./components/eventPopup"

function App() {

  const [popupIsVisible, setPopupIsVisible] = useState<Boolean>(false)
  const [selectedDate, setSelectedDate] = useState<String>('')

  return (
    <div className="App">

      <div className="left">

      </div>

      <div className="right">
        <h1>Calendar event organiser</h1>
        <Calendar 
          setPopupIsVisible={setPopupIsVisible} 
          setSelectedDate={setSelectedDate}
        />
        <EventPopup 
          popupIsVisible={popupIsVisible} 
          selectedDate={selectedDate}
        />
      </div>
      
    </div>
  )
}

export default App
