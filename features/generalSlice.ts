import { createSlice } from '@reduxjs/toolkit'

interface initialStateProps {
  selectedPOF: string[]
  selectedGender: string
  note: string
}

const initialState: initialStateProps = {
  selectedPOF: [],
  selectedGender: 'neuter',
  note: '',
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
    setNotes: (state, action) => {
      state.note = action.payload
    },
  },
})

export const { setSelectedPOF, setSelectedGender, setNotes } =
  generalSlice.actions

export default generalSlice.reducer
