import React from 'react';
import BIT from '../../images/PsudoLogos/BIT.png';
import HQF from '../../images/PsudoLogos/HQF.png';
import JHU from '../../images/PsudoLogos/JHU.png';
import RSJ from '../../images/PsudoLogos/RSJ.png';
import CSZU from '../../images/PsudoLogos/CSZU.png';

const Sponsers = () => (
  <div className='sponsers noSelect'>
    <img src={BIT} alt='Bae Institute of Technology' draggable='false' />
    <img src={HQF} alt='Hultquest Trust Fund' draggable='false' />
    <img src={JHU} alt='James Huang University' draggable='false' />
    <img src={RSJ} alt='Ruiz Street Journal' draggable='false' />
    <img src={CSZU} alt='Cal State Zhiyi Huang' draggable='false' />
  </div>
);

export default Sponsers;