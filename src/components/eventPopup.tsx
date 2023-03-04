import { FormEvent, useState } from "react"

type eventPopupProps = {
  popupIsVisible: boolean,
  selectedDate: Date
}

export default function eventPopup({ popupIsVisible, selectedDate } : eventPopupProps ) {
  
  const [description, setDescription] = useState<String>('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const LS_ITEMS = JSON.parse(localStorage.getItem('Calendar events')) || [];
    let newStorage = { 
      'Date': selectedDate,
      'Description': description
    };
    LS_ITEMS.push(newStorage);
    localStorage.setItem('Calendar events', JSON.stringify(LS_ITEMS));
  };
  
  return (
    <form onSubmit={(e) => handleSubmit(e)} className='popup' style={popupIsVisible ? {opacity: '1'} : {opacity: '0'}}>
      <p>Selected Date: {selectedDate}</p>
      <p>Add event description:</p>
      <input type="text" onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Create reminder</button>
    </form>
  )
};
