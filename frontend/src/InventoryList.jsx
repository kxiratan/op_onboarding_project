import {useState, useEffect} from 'react'

function InventoryList({inventory}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.quantity}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default InventoryList;