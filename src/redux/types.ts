export interface Candidate {
  id: string;
  name: CandidateName;
  email: string;
  picture: CandidatePicture | undefined;
  location: CandidateLocation | undefined;
  position: string;
  salaryExpectations: string;
  birthDate: string | number;
  status: 'In Process' | 'Declined' | 'Hired';
  cv: string;
}

export interface CandidateName {
  title: string;
  first: string;
  last: string;
}
export interface CandidateLocation {
  country: string;
  city: string;
  street: CandidateStreet;
}
export interface CandidateStreet {
  name: string;
  number: number;
}
export interface CandidatePicture {
  medium: string | undefined;
}

export interface CandidateState {
  data: Candidate[];
  filteredData: Candidate[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
