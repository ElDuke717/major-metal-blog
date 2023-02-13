import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Quotes({messages}) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];
  
  const [quote, setQuote] = useState(randomMessage());

  return (
    <div> 
      <h3>{quote}</h3>
      <button class='change button' onClick={() => setQuote(randomMessage())}>
        Change Quote
      </button>
    </div>
  );
}