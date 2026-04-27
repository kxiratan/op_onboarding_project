function SystemInsights({ summary, reconciliation }) {
  const counts = reconciliation?.counts || {}
  const categories = summary?.items_by_category || []
  const uncertainByScene = reconciliation?.uncertain_items_by_scene || []

  return (
    <section style={{ marginTop: '24px' }}>
      <h2>System Insights</h2>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <StatCard label="Total Declared Items" value={summary?.total_items ?? 0} />
        <StatCard label="Low Stock (Declared)" value={summary?.low_stock_count ?? 0} />
        <StatCard label="Accepted Predictions" value={counts.accepted ?? 0} />
        <StatCard label="Need Manual Review" value={counts.uncertain ?? 0} />
        <StatCard label="Discrepancies" value={counts.discrepancy ?? 0} />
      </div>

      <h3>Items by Category (Declared Inventory)</h3>
      <table style={{ margin: '0 auto' }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Item Count</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((row) => (
            <tr key={row.category}>
              <td>{row.category}</td>
              <td>{row.item_count}</td>
              <td>{row.total_quantity}</td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan="3">No category summary available yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Observed Inventory Flags (ML Output)</h3>
      <table style={{ margin: '0 auto' }}>
        <thead>
          <tr>
            <th>Scene</th>
            <th>Uncertain Items</th>
          </tr>
        </thead>
        <tbody>
          {uncertainByScene.map((row) => (
            <tr key={row.scene_id}>
              <td>{row.scene_id}</td>
              <td>{row.items.join(', ')}</td>
            </tr>
          ))}
          {uncertainByScene.length === 0 && (
            <tr>
              <td colSpan="2">No uncertain predictions in latest artifact.</td>
            </tr>
          )}
        </tbody>
      </table>

    </section>
  )
}

function StatCard({ label, value }) {
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 14px', minWidth: '170px' }}>
      <div style={{ fontSize: '14px' }}>{label}</div>
      <div style={{ fontSize: '22px', fontWeight: 600 }}>{value}</div>
    </div>
  )
}

export default SystemInsights
