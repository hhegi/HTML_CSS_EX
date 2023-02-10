import { useEffect, useState } from 'react';
import axios from 'axios';
import test from './test';

function App() {
  useEffect(() => {
    const [saramList, setSaramList] = useState([]);
    axios.get('http://localhost:5000/car').then((response) => {
      setSaramList(response.data);
    });
  }, []);

  return (
    <div>
      <h1>길동이의 홈페이지</h1>
      <Test />
      <ul>
        {saramList.map((saram) => {
          return (
            <li key={saram.no}>
              {saram.name},{saram.company},{saram.year}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
