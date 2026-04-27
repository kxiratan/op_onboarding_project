import {useState, useEffect} from 'react'
import InventoryList from "./InventoryList"
import AddItemForm from './AddItemForm'

function App() {
  const [inventory, setInventory] = useState([])

  const fetchInventory = () => {
    fetch('/inventory')
      .then(res => res.json())
      .then(data => setInventory(data))
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  return (
    <div>
      <h1>Open Project Inventory</h1>
      <AddItemForm onItemAdded={fetchInventory}/>
      <InventoryList inventory={inventory}/>
    </div>
  )
}

export default App