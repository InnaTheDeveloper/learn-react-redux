import { useState } from "react";
import { useFetchBreedsQuery } from "../features/dogsApi/dogs-api-slice";

export const Dogs: React.FC = () => {
  const [numDogs, setNumDogs] = useState(10);
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  return (
    <>
      <p>Dogs to fetch</p>
      <select
        value={numDogs}
        onChange={(e) => setNumDogs(Number(e.target.value))}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <p>Number of dogs fetched {data.length}</p>
      {isFetching ? (
        <p>loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {data.map((breed) => (
              <tr key={breed.id}>
                <td>{breed.name}</td>
                <td>
                  <img
                    src={breed.image.url}
                    alt=""
                    height={150}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
