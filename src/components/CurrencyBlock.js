import React from 'react';

export const CurrencyBlock = ({
  index,
  titles,
  selectedCur,
  changeValue,
  changeCurrency,
  assignment,
  value
}) => {
  return (
    <div className='currency-block'>
      <select
        value={selectedCur}
        onChange={(event) => changeCurrency(event, index)}
      >
        {titles.map(title => (
          <option key={title} value={title}>{title}</option>
        ))}
      </select>
      <input
        value={value}
        name={assignment}
        type='text'
        min={0}
        onChange={(event) => changeValue(event)}
      />
    </div>
  );
}