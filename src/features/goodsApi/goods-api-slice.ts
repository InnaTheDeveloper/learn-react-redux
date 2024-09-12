import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Item {
    id: string,
    name: string
}

export const goodsApiSlice = createApi({
    reducerPath: 'goodsApi', //this name will show up in Redux store (dev tools) but in components we'll receive it as data from the hook
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/'
    }),
    endpoints: (builder) => {
        return {
            fetchGoods: builder.query<Item[], string | void>({
                query: () => {
                    return `/goods`
                }
            })
        }
    }
})

export const { useFetchGoodsQuery } = goodsApiSlice;