import React from 'react';

export const HeaderCurBlock = ({ title, rate }) => {
  return (
    <div className='header__cur-block'>
      <div className='currency-title'>{title}</div>
      <div className='currency-rate'>{rate}</div>
    </div>
  )
}