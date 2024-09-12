// redux dev tools work in Edge, don't work in Chrome

// Ducks pattern (made as a joke on Redux. The pattern allows you to put all logic related to a single feature into one slice file instead of splitting it into action-type, action-creator, reducer)
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// createSlice is the main function to create Redux logic
// PayloadAction is TypeScript type that defines the contents of action object

//this CounterState is an object here, but we could have just easily made it a simple number value
// e.g. in createSlice we can simly write
// initialState: 0, and no need to create interface and const initialState and
// of course no need to reference state.counter.value - because we can simply use state.counter
// const counterSlice = createSlice({
//     name: 'counter',
//     initialState: 0,
//     reducers: {
//         incremented(state) {
//             return state +1
//         },
//         amountAdded(state, action: PayloadAction<number>) {
//             state +=action.payload
//         }
//     }
// })
interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented(state) {
            state.value++
        },
        amountAdded(state, action: PayloadAction<number>) {
            state.value+=action.payload
        }
    }
})

// if we need to modify the payload before changing the state then use:
// reducers: {
//     addTodo: {
//       reducer: (state, action: PayloadAction<Item>) => {
//         state.push(action.payload)
//       },
//       prepare: (text: string) => {
//         const id = nanoid()
//         return { payload: { id, text } }
//       },
//     },

export const { incremented, amountAdded } = counterSlice.actions;

export default counterSlice.reducer;