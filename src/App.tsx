import "./App.css";
import { useAppDisptach, useAppSelector } from "./app/hooks";
import { incremented, amountAdded } from "./features/counter/counter-slice";
import { Dogs } from "./components/Dogs";
import { Goods } from "./components/Goods";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDisptach();

  const handleClick = () => {
    dispatch(incremented());
  };

  const handleClickAmount = () => {
    dispatch(amountAdded(3));
  };

  return (
    <>
      <div className="card">
        <Goods />
      </div>
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
        <button onClick={handleClickAmount}>Increment by 3</button>
      </div>
      <div className="card">
        <Dogs />
      </div>
    </>
  );
}

export default App;
