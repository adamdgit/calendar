import Calendar from "./components/Calendar"
import LocalStorageItems from "./components/LocalStorageItems"

function App() {
  
  return (
    <div className="App">
      <div className="left">
        <h1>Your saved events:</h1>
        <LocalStorageItems />
      </div>

      <div className="right">
        <h2>Your Calendar:</h2>
        <Calendar />
      </div>
    </div>
  )
}

export default App
