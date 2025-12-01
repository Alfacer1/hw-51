import React from 'react';

const ControlPanelComponent = ({ onIncrement }) => {
  console.log('[Control Panel] Рендеринг ControlPanel');
  
  return (
    <div style={{ border: '1px solid green', padding: '10px' }}>
      <h4>Незалежний Лічильник</h4>
      <p>Цей компонент ререндериться лише при зміні пропсів.</p>
      <button onClick={onIncrement}>
        Збільшити Лічильник у App
      </button>
    </div>
  );
};

export const ControlPanel = React.memo(ControlPanelComponent);