import { useState } from 'react'
import './App.css'
import { useAppDisptach, useAppSelector } from './app/hooks'
import { incremented, amountAdded } from './features/counter/counter-slice'
import { useFetchBreedsQuery } from './features/dogsApi/dogs-api-slice'
import { useFetchGoodsQuery } from './features/goodsApi/goods-api-slice'

function App() {
  const count = useAppSelector(state=> state.counter.value)
  const dispatch = useAppDisptach();
  const [numDogs, setNumDogs] = useState(10);
  const {goods = [], error  } = useFetchGoodsQuery();

  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  const handleClick = () => {
    dispatch(incremented())
  }

  const handleClickAmount = () => {
    dispatch(amountAdded(3))
  }

  return (
    <>
    <div className="card">
      <ul>
        {goods.map(item => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
      <div className="card">
        <button onClick={handleClick}>
          count is {count}
        </button>
        <button onClick={handleClickAmount}>Increment by 3</button>
        
      </div>
      <div className="card">
        <p>Dogs to fetch</p>
        <select value={numDogs} onChange={e=>setNumDogs(Number(e.target.value))}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        </select>
        <p>Number of dogs fetched {data.length}</p>
        {isFetching ? <p>loading...</p> : <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
            </thead>
          <tbody>
            {data.map((breed)=>(
              <tr key={breed.id}>
                <td>{breed.name}</td>
                <td>
                  <img src={breed.image.url} alt="" height={150}/>
                  </td>
              </tr>
            ) )}
          </tbody>
        </table>}
        
      </div>
    </>
  )
}

export default App
