import {useState, useEffect} from 'react'
import InventoryList from "./InventoryList"
import AddItemForm from './AddItemForm'
import SystemInsights from './SystemInsights'

function buildSummaryFromInventory(items) {
  const normalized = items.map((item) => ({
    ...item,
    category: String(item.category || '').trim(),
    quantity: Number(item.quantity) || 0
  }))

  const itemsByCategoryMap = normalized.reduce((acc, item) => {
    const key = item.category.toLowerCase()
    if (!acc[key]) {
      acc[key] = {
        category: item.category || 'Uncategorized',
        item_count: 0,
        total_quantity: 0
      }
    }
    acc[key].item_count += 1
    acc[key].total_quantity += item.quantity
    return acc
  }, {})

  const itemsByCategory = Object.values(itemsByCategoryMap)
    .sort((a, b) => b.item_count - a.item_count)

  return {
    total_items: normalized.length,
    low_stock_count: normalized.filter((item) => item.quantity <= 5).length,
    items_by_category: itemsByCategory
  }
}

function App() {
  const [inventory, setInventory] = useState([])
  const [summary, setSummary] = useState(null)
  const [reconciliation, setReconciliation] = useState(null)

  const fetchInventory = () => {
    fetch('/inventory')
      .then(res => res.json())
      .then(data => {
        setInventory(data)
        setSummary(buildSummaryFromInventory(data))
      })
  }

  const fetchArtifacts = () => {
    fetch('/artifacts/inventory_summary.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => setSummary(data))
      .catch(() => setSummary(null))

    fetch('/artifacts/reconciliation_report.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => setReconciliation(data))
      .catch(() => setReconciliation(null))
  }

  useEffect(() => {
    fetchInventory()
    fetchArtifacts()
  }, [])

  return (
    <div>
      <h1>Open Project Inventory</h1>
      <AddItemForm onItemAdded={fetchInventory}/>
      <InventoryList inventory={inventory}/>
      <SystemInsights summary={summary} reconciliation={reconciliation} />
    </div>
  )
}

export default App