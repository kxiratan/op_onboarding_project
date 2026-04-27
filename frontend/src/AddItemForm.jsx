import {useState} from 'react';
import BASE_URL from './api'

function AddItemForm({onItemAdded}) {
    const [form, setForm] = useState({
        name: '',
        category: '',
        quantity: '',
        status: 'Available'
    })

    const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
}

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${BASE_URL}/inventory`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => {
                onItemAdded()
                setForm({name: '', category: '', quantity: '', status: 'Available'})
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
            <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
            <select name="status" value={form.status} onChange={handleChange}>
                <option>Available</option>
                <option>Unavailable</option>
            </select>
            <button type="submit">Add Item</button>
        </form>
    )
}

export default AddItemForm