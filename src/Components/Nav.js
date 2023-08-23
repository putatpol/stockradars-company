import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to='/'>Part I</Link>
      <Link to='/form?ref=stockradars&email=example@siamsquared.com'>Part II</Link>
    </nav>
  )
}

export default Nav
