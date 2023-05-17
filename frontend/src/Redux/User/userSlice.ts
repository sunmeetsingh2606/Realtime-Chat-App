import { User } from "../../interfaces/User";
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
// Define a type for the slice state
interface user {
    user: User | null
}

// Define the initial state using that type
const initialState: user = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<user>) => {
        return {
            ...state,
            user: action.payload.user
        }
    }
  },
})

export const { addUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.user

export default userSlice.reducer