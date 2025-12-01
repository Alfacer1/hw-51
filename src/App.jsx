// src/App.jsx
import React, { useState, useCallback} from 'react';
import { INITIAL_ITEMS } from './data';
import { MemoizedList } from './components/MemoizedList';
import { ControlPanel } from './components/ControlPanel';

// 📚 Обов'язкові Бібліотеки
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Стилі для Toastify
import { IdleTimerProvider, useIdleTimer } from 'react-idle-timer';
import { FaPlus, FaPalette } from 'react-icons/fa'; // React Icons

// 📚 Додаткові Бібліотеки
import { HexColorPicker } from "react-colorful"; // Для демонстрації

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [filter, setFilter] = useState('');
  const [counter, setCounter] = useState(0); 
  const [isIdle, setIsIdle] = useState(false); // Стан для IdleTimer
  const [color, setColor] = useState("#aabbcc"); // Стан для ColorPicker

  // --- ЛОГІКА IDLE TIMER ---
  const handleOnIdle = () => {
    setIsIdle(true);
    toast.warn('Ви неактивні! (Idle Timer спрацював)', { autoClose: 3000 });
  };

  const handleOnActive = () => {
    setIsIdle(false);
  };
  
  // Ініціалізація IdleTimer (альтернативний спосіб, якщо не використовується провайдер)
  useIdleTimer({
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    timeout: 1000 * 10, // 10 секунд неактивності для тестування
    throttle: 500,
    stopOnIdle: false,
    events: ['keydown', 'mousemove', 'mousedown', 'touchstart', 'scroll'],
  });
  // --- КІНЕЦЬ ЛОГІКИ IDLE TIMER ---

  // 3. Мемоізація колбек-функції (useCallback) - залишається
  const handleCounterIncrement = useCallback(() => {
    setCounter(c => c + 1);
  }, []); 

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const updateItems = () => {
    const newItem = { id: Date.now(), name: 'Новий товар (Toastify)', price: 999 };
    setItems(prevItems => [...prevItems, newItem]);
    
    // 🔥 React Toastify: Сповіщення про додавання
    toast.success(`Товар "${newItem.name}" додано!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
  };

  console.log(`[APP] Рендеринг App.jsx (Counter: ${counter})`);

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      {/* 💥 Toastify Container */}
      <ToastContainer />

      <h1>React Project Доопрацювання</h1>
      
      {/* Індикатор неактивності */}
      <p style={{ fontWeight: 'bold', color: isIdle ? 'orange' : 'green' }}>
        Статус: {isIdle ? 'Неактивний' : 'Активний'}
      </p>
      
      <hr />

      <h2>1. Мемоізація та Контроль</h2>
      <p>
        **Лічильник:** <span style={{ fontWeight: 'bold', color: 'red' }}>{counter}</span>
      </p>
      
      <ControlPanel onIncrement={handleCounterIncrement} />
      
      <hr />

      <h2>2. Бібліотеки: Toastify та Icons</h2>
      <input
        type="text"
        placeholder="Фільтр (назва або категорія)"
        value={filter}
        onChange={handleFilterChange}
        style={{ padding: '8px', width: '300px' }}
      />
      
      <br />
      {/* 🚀 React Icons: Використання іконки у кнопці */}
      <button onClick={updateItems} style={{ marginTop: '10px', padding: '10px' }}>
        <FaPlus style={{ marginRight: '5px' }} /> Додати Товар (Toastify)
      </button>
      <br /><br />
      
      <MemoizedList items={items} filter={filter} />
      
      <hr />

      <h2>3. Додаткова Бібліотека: React-Colorful</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <HexColorPicker color={color} onChange={setColor} />
        <div style={{ textAlign: 'center' }}>
          <FaPalette size={32} color={color} /> 
          <p style={{ marginTop: '10px' }}>Вибраний колір: **{color}**</p>
        </div>
      </div>

    </div>
  );
}

// Загортаємо App у IdleTimerProvider, якщо це потрібно для глобальної логіки, 
// але useIdleTimer вже працює в компоненті. 
export default App;