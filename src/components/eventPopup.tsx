import { useState } from "react"

type eventPopupProps = {
  popupIsVisible: boolean,
  selectedDate: Date
}

export default function eventPopup({ popupIsVisible, selectedDate } : eventPopupProps ) {
  
  const [description, setDescription] = useState<String>('')

  function createNewLsItem() {
    const LS_ITEMS = JSON.parse(localStorage.getItem('Calendar events')) || [];
    let newStorage = { 
      'Id': LS_ITEMS.length !== 0 ? LS_ITEMS[LS_ITEMS.length -1].Id +1 : 1,
      'Date': selectedDate,
      'Description': description
    };
    LS_ITEMS.push(newStorage);
    localStorage.setItem('Calendar events', JSON.stringify(LS_ITEMS));
  };
  
  return (
    <div className='popup' style={popupIsVisible ? {opacity: '1', pointerEvents: 'all'} : {opacity: '0', pointerEvents: 'none'}}>
      <p>Selected: {selectedDate}</p>
      <p>Add event info:</p>
      <input type="text" onChange={(e) => setDescription(e.target.value)} />
      <button onClick={() => createNewLsItem()}>Create reminder</button>
    </div>
  )
};
