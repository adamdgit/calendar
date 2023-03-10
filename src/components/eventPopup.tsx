import { useState } from "react"
import { localStorageData } from "../App";

type eventPopupProps = {
  popupIsVisible: boolean,
  setPopupIsVisible: (args: boolean) => void,
  selectedDate: Date,
  setLsItems: (args: localStorageData[] | []) => void
}

export default function eventPopup(
  { popupIsVisible, setPopupIsVisible, selectedDate, setLsItems } : eventPopupProps ) {
  
  const [description, setDescription] = useState<string>('')

  function createNewLsItem() {
    const LS_ITEMS: localStorageData[] | [] = JSON.parse(localStorage.getItem('Calendar events')) || [];
    let newStorage: localStorageData = { 
      'Id': LS_ITEMS.length !== 0 ? LS_ITEMS[LS_ITEMS.length -1].Id +1 : 1,
      'Date': selectedDate.toString(),
      'Description': description
    };
    LS_ITEMS.push(newStorage);
    localStorage.setItem('Calendar events', JSON.stringify(LS_ITEMS));
    setLsItems(LS_ITEMS);
    setPopupIsVisible(false);
  };
  
  return (
    <div className='popup' style={popupIsVisible ? {opacity: '1', pointerEvents: 'all'} : {opacity: '0', pointerEvents: 'none'}}>
      <span className="heading">Selected: {selectedDate}</span>
      <p>Add event info:</p>
      <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
      <button onClick={() => createNewLsItem()}>Create reminder</button>
    </div>
  )
};
