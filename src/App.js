import { useState } from "react";

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    student: "",
    date: "",
    amount: "",
    paid: false,
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const addEntry = () => {
    if (form.student && form.date && form.amount) {
      setEntries([...entries, form]);
      setForm({ student: "", date: "", amount: "", paid: false, notes: "" });
    }
  };

  const togglePaid = (index) => {
    const newEntries = [...entries];
    newEntries[index].paid = !newEntries[index].paid;
    setEntries(newEntries);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "1rem" }}>
      <h1>Ödeme Takip</h1>
      <input name="student" placeholder="Öğrenci Adı" value={form.student} onChange={handleChange} /><br/>
      <input type="date" name="date" value={form.date} onChange={handleChange} /><br/>
      <input name="amount" type="number" placeholder="Ücret (₺)" value={form.amount} onChange={handleChange} /><br/>
      <textarea name="notes" placeholder="Notlar" value={form.notes} onChange={handleChange} /><br/>
      <button onClick={addEntry}>Ekle</button>

      <div style={{ marginTop: "1rem" }}>
        {entries.map((entry, index) => (
          <div key={index} style={{ background: entry.paid ? "#d4edda" : "#f8d7da", padding: "10px", margin: "10px 0" }}>
            <strong>{entry.student}</strong><br/>
            {entry.date} | {entry.amount}₺<br/>
            <em>{entry.notes}</em><br/>
            <button onClick={() => togglePaid(index)}>
              {entry.paid ? "Ödeme Alındı" : "Bekleniyor"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
