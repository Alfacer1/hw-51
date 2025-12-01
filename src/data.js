const generateItems = (count) => {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push({
      id: i,
      name: `Товар #${i}`,
      price: Math.floor(Math.random() * 100) + 1,
      category: i % 2 === 0 ? 'Електроніка' : 'Одяг',
    });
  }
  return items;
};

export const INITIAL_ITEMS = generateItems(1000);