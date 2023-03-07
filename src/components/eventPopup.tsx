import { useState } from "react"

type eventPopupProps = {
  popupIsVisible: boolean,
  selectedDate: Date
}

export default function eventPopup({ popupIsVisible, selectedDate } : eventPopupProps ) {
  
  const [description, setDescription] = useState<String>('')

  function handleSubmit() {
    const LS_ITEMS = JSON.parse(localStorage.getItem('Calendar events')) || [];
    let newStorage = { 
      'Id': LS_ITEMS ? LS_ITEMS.length +1 : 1,
      'Date': selectedDate,
      'Description': description
    };
    LS_ITEMS.push(newStorage);
    localStorage.setItem('Calendar events', JSON.stringify(LS_ITEMS));
  };
  
  return (
    <div className='popup' style={popupIsVisible ? {opacity: '1', pointerEvents: 'all'} : {opacity: '0', pointerEvents: 'none'}}>
      <p>Selected Date: {selectedDate}</p>
      <p>Add event description:</p>
      <input type="text" onChange={(e) => setDescription(e.target.value)} />
      <button onClick={() => handleSubmit()}>Create reminder</button>
    </div>
  )
};
