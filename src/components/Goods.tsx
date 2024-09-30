import { useState } from "react";
import {
  useFetchGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from "../features/goodsApi/goods-api-slice";

export const Goods: React.FC = () => {
  const [count, setCount] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const { data, isSuccess, isLoading } = useFetchGoodsQuery(count);
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const hadnleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct("");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id).unwrap();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button onClick={hadnleAddProduct}>Add Product</button>
      </div>
      <div>
        <select
          value={count}
          onChange={(e) => setCount(e.target.value)}
        >
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <ul>
        {isSuccess &&
          data.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => handleDeleteProduct(item.id)}
              >
                {item.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
