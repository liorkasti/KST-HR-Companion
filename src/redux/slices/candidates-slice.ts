import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {Candidate, CandidateState} from '../types';
import {
  CANDIDATE_LOCAL_STORAGE_KEY,
  getRandomPositionAndSalary,
  randomuserMock,
} from '../../config';

const initialState: CandidateState = {
  data: [],
  filteredData: [],
  status: 'idle',
  error: null,
};

export const fetchCandidates = createAsyncThunk<
  Candidate[],
  void,
  {rejectValue: string}
>(
  `${CANDIDATE_LOCAL_STORAGE_KEY}/fetchCandidates'`,
  async (_, {rejectWithValue}) => {
    try {
      const response: AxiosResponse<{results: any[]}> = await axios.get(
        randomuserMock,
      );
      const candidates: Candidate[] = response.data.results.map(
        (candidate: Candidate | any) => {
          const {position, salary, status} = getRandomPositionAndSalary();
          return {
            id: candidate.email,
            name: candidate.name,
            email: candidate.email, // Add email property
            picture: candidate.picture,
            location: candidate.location, // Add location property
            position,
            salaryExpectations: `${salary} $`,
            birthDate: new Date(candidate.dob.date).toISOString(), // Store as string
            status: status,
            cv: 'No CV available',
          };
        },
      );

      await AsyncStorage.setItem('candidates', JSON.stringify(candidates));
      return candidates;
    } catch (error) {
      return rejectWithValue('Failed to fetch candidates');
    }
  },
);

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCandidate: (state, action: PayloadAction<Candidate>) => {
      state.data.push(action.payload);
    },
    editCandidate: (
      state,
      action: PayloadAction<{id: string; candidate: Partial<Candidate>}>,
    ) => {
      const {id, candidate} = action.payload;
      const index = state.data.findIndex(c => c.id === id);
      if (index !== -1) {
        state.data[index] = {...state.data[index], ...candidate};
      }
    },
    removeCandidate: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(
        candidate => candidate.id !== action.payload,
      );
    },
    filterCandidates: (state, action: PayloadAction<string>) => {
      const searchText = action.payload.toLowerCase();
      state.filteredData = state.data.filter(
        candidate =>
          candidate.position.toLowerCase().includes(searchText) ||
          candidate.name.first.toLowerCase().includes(searchText) ||
          candidate.name.last.toLowerCase().includes(searchText),
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCandidates.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchCandidates.fulfilled,
        (state, action: PayloadAction<Candidate[]>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        },
      )
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {addCandidate, editCandidate, removeCandidate, filterCandidates} =
  candidatesSlice.actions;

export default candidatesSlice.reducer;
