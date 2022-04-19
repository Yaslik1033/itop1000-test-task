import React from 'react';
import { HeaderCurBlock } from './HeaderCurBlock'

export const Header = ({ USD, EUR }) => {

  return (
    <header>
      <div className='container'>
        <h1>Курс валют</h1>
        <div className='header-cur-blocks-container'>
          <HeaderCurBlock title='EUR' rate={EUR}/>
          <HeaderCurBlock title='USD' rate={USD}/>
        </div>
      </div>
    </header>
  );
}