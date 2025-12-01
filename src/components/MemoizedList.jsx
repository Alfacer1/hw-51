// MemoizedList.jsx
import React, { useMemo } from 'react';

const expensiveFilter = (list, filter) => {
  console.log(`[EXPENSIVE CALC] Фільтрування списку... (лише при зміні list або filter)`);
  let start = performance.now();
  while (performance.now() - start < 50)
  
  return list.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase()) || 
    item.category.toLowerCase().includes(filter.toLowerCase())
  );
};

const ListComponent = ({ items, filter }) => {
  const filteredItems = useMemo(() => {
    return expensiveFilter(items, filter);
  }, [items, filter]);

  console.log(`[List Component] Рендеринг ListComponent (кількість елементів: ${filteredItems.length})`);

  return (
    <div style={{ border: '1px solid blue', padding: '10px' }}>
      <h3>Результат Обчислення</h3>
      <p>Знайдено елементів: **{filteredItems.length}**</p>
      <ul>
        {filteredItems.slice(0, 15).map(item => (
          <li key={item.id}>{item.name} - {item.price} грн</li>
        ))}
        {filteredItems.length > 5 && <li>... Ще {filteredItems.length - 5} елементів</li>}
      </ul>
    </div>
  );
};

export const MemoizedList = React.memo(ListComponent);