import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStates= createAsyncThunk('states/fetchStates', async () => {
    const response = await fetch('https://rentsphere.onavinfosolutions.com/api/states')
    // console.log(await response.json())
    return await response.json(); // Parse the JSON string into an object
  });
  
  
   const statesData=createSlice({
    name:'states',
    initialState:{
      data:null,
      status:'idle',
      error:null
    },
  
    extraReducers:(builder)=>{
      builder
      .addCase(fetchStates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; // Save fetched data to the state
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    }
  
   })

   export default statesData.reducer

