import React, { useState, useCallback } from 'react';
import { INITIAL_ITEMS } from './data';
import { MemoizedList } from './components/MemoizedList';
import { ControlPanel } from './components/ControlPanel';

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [filter, setFilter] = useState('');
  const [counter, setCounter] = useState(0);
  const handleCounterIncrement = useCallback(() => {
    setCounter(c => c + 1);
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const updateItems = () => {
    setItems(prevItems => [...prevItems, { id: Date.now(), name: 'Новий товар', price: 0 }]);
};
  console.log(`[APP] Рендеринг App.jsx (Counter: ${counter})`);

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>React Мемоізація Демо</h1>
      <hr />

      <h2>Секція 1</h2>
      <p>
        *Лічильник:* <span style={{ fontWeight: 'bold', color: 'red' }}>{counter}</span>
      </p>
      
      <ControlPanel onIncrement={handleCounterIncrement} />
      
      <hr />

      <h2>Секція 2</h2>
      <p>
        Кожен раз, коли ви вводите текст, обчислення виконується. 
      </p>
      <input
        type="text"
        placeholder="Фільтр (назва)"
        value={filter}
        onChange={handleFilterChange}
        style={{ padding: '8px', width: '300px' }}
      />
      <br /><button onClick={updateItems}>Додати Товар</button><br />
      
      <MemoizedList items={items} filter={filter} />
    </div>
  );
}

export default App;