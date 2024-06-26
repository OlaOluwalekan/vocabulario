import { createSlice } from '@reduxjs/toolkit'

interface initialStateProps {
  selectedPOF: string[]
  selectedGender: string
}

const initialState: initialStateProps = {
  selectedPOF: [],
  selectedGender: 'neuter',
}

const generalSlice = createSlice({
  name: 'general',
  initialState: initialState,
  reducers: {
    setSelectedPOF: (state, action) => {
      state.selectedPOF = action.payload
    },
    setSelectedGender: (state, action) => {
      state.selectedGender = action.payload
    },
  },
})

export const { setSelectedPOF, setSelectedGender } = generalSlice.actions

export default generalSlice.reducer
