
type dayOptionProps = {
  day: Date,
  monthSelect: any,
  setPopupIsVisible: (args: boolean) => void,
  setSelectedDate: (args: string) => void
}

export default function DayOption(
  { day, monthSelect, setPopupIsVisible, setSelectedDate } 
  : dayOptionProps) {

  function handlePopup(e: any) {
    console.log(e.target)
    setPopupIsVisible(true);
    // pass slected date value to popup
    setSelectedDate(e.target.value)
  }

  return (
    <div style={{position: 'relative'}}>
      <button
        onClick={(e) => handlePopup(e)}
        className={
          day.toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' }) === new Date().toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' }) ? 'date today' 
        : day.getMonth() === Number(monthSelect.value) ? 'date'
        : 'date not-current-month'} 
        value={day.toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' })}>
        {day.toLocaleString('en-us', { day: '2-digit' })}
      </button>
    </div>
  )
}
