import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = 'live_v3b6g3kC05mvVfGwhMFHPqlXLR0GyXLhITxwNgcaBpPJcBaXGAwlUE1SzKeFksBC'

interface Breed {
    id: string,
    name: string
    image: {
        url: string
    }
}

export const dogApiSlice = createApi({
    reducerPath: 'dogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.thedogapi.com/v1',
        prepareHeaders(headers) {
            headers.set('x-api-key', API_KEY)
            return headers
        }
    }),
    endpoints(builder) {
        return {
            fetchBreeds: builder.query<Breed[], number | void>({
                query(limit = 10) {
                    return `/breeds?limit=${limit}`
                }
            })
        }
    }
})

export const { useFetchBreedsQuery } = dogApiSlice;