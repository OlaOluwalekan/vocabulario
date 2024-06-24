import { createSlice } from '@reduxjs/toolkit'

interface initialStateProps {
  selectedPOF: string[]
}

const initialState: initialStateProps = {
  selectedPOF: [],
}

const generalSlice = createSlice({
  name: 'general',
  initialState: initialState,
  reducers: {
    setSelectedPOF: (state, action) => {
      state.selectedPOF = action.payload
    },
  },
})

export const { setSelectedPOF } = generalSlice.actions

export default generalSlice.reducer
