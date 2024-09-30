import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Item {
  id: string;
  name: string;
}

export const goodsApiSlice = createApi({
  reducerPath: "goodsApi", //this name will show up in Redux store (dev tools) but in components we'll receive it as data from the hook
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  endpoints: (builder) => {
    return {
      fetchGoods: builder.query<Item[], string | void>({
        query: (limit = "") => {
          return `/goods?${limit && `_limit=${limit}`}`; //_limit is a built-in feature of json-server module
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "Products" as const, id })),
                { type: "Products", id: "LIST" },
              ]
            : [{ type: "Products", id: "LIST" }],
      }),
      addProduct: builder.mutation({
        query: (body) => ({
          url: "goods",
          method: "POST",
          body, //id generates automatically
        }),
        invalidatesTags: [{ type: "Products", id: "LIST" }],
      }),
      deleteProduct: builder.mutation({
        query: (id) => ({
          url: `goods/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Products", id: "LIST" }],
      }),
    };
  },
});

export const {
  useFetchGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = goodsApiSlice;
