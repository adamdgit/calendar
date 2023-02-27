
type eventPopupProps = {
  popupIsVisible: boolean,
  selectedDate: Date
}

export default function eventPopup({ popupIsVisible, selectedDate } : eventPopupProps ) {
  return (
    <div className='popup' style={popupIsVisible ? {opacity: '1'} : {opacity: '0'}}>
      <p>Date: {selectedDate}</p>
      <p>Add event description:</p>
      <input type="text" />
    </div>
  )
}
