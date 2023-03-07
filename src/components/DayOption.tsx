import { useState } from "react";
import EventPopup from "./eventPopup";

export default function DayOption({day, monthSelect}:any) {

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);
  const [isSelected, setIsSlected] = useState<boolean>(false)

  function createNewEvent(e: any) {
    console.log(e.target)
    setPopupIsVisible(true);
    setIsSlected(true);
    // pass slected date value to popup
    setSelectedDate(e.target.value)
  }

  return (
    <div style={{position: 'relative'}}>
      <button
        style={isSelected ? {background: '#74b5e3', color: 'black'} : {background: ''}}
        onClick={(e) => createNewEvent(e)}
        className={
          day.toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' }) === new Date().toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' }) ? 'date today' 
        : day.getMonth() === Number(monthSelect.value) ? 'date'
        : 'date not-current-month'} 
        value={day.toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' })}>
        {day.toLocaleString('en-us', { day: '2-digit' })}
      </button>
      <EventPopup 
        popupIsVisible={popupIsVisible} 
        selectedDate={selectedDate}
      />
    </div>
  )
}
