import { useState } from 'react';
import './PPT.css';

export default function PPT() {
  const expression = '832+1-/';
  const [selectedToken, setSelectedToken] = useState(-1);
  const [stack, setStack] = useState([]);
  const [calculator, setCalculator] = useState([]);

  const handleInit = () => {
    setSelectedToken(-1);
    setStack([]);
    setCalculator([]);
  };

  const handleNext = () => {
    const token = expression[selectedToken + 1];
    if (calculator.length > 0) {
      setStack((prev) => [...prev, Number(calculator.at(-1))]);
      setCalculator([]);
      return;
    }
    setSelectedToken((prev) => (prev + 1 >= expression.length ? expression.length - 1 : prev + 1));
    if (!isNaN(token)) setStack((prev) => [...prev, Number(token)]);
    else {
      const [a, b] = stack.slice(-2);
      setStack((prev) => prev.slice(0, -2));
      if (token === '+') setCalculator([a, token, b, '=', a + b]);
      else if (token === '-') setCalculator([a, token, b, '=', a - b]);
      else if (token === '*') setCalculator([a, token, b, '=', a * b]);
      else if (token === '/') setCalculator([a, token, b, '=', a / b]);
    }
  };

  return (
    <div className='ppt'>
      <div className='expression'>
        <span className='token'>{'[ '}</span>
        {expression.split('').map((token, i) => (
          <span key={i} className={`token ${selectedToken === i ? 'selected' : ''}`}>
            {token}
          </span>
        ))}
        <span className='token'>{' ]'}</span>
      </div>
      <div className='board'>
        <div className='stack'>
          {stack.map((token, i) => (
            <span key={i} className='token stacked'>
              {token}
            </span>
          ))}
        </div>
        <div className='calculator'>
          {calculator.map((cal, i) => (
            <span key={i} className='token'>
              {cal}
            </span>
          ))}
        </div>
      </div>

      <div className='controller'>
        <button onClick={handleInit}>init</button>
        <button onClick={handleNext}>next</button>
      </div>
    </div>
  );
}
