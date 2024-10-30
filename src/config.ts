export const getRandomPositionAndSalary = () => {
  const position = positions[Math.floor(Math.random() * positions.length)];
  const salary =
    Math.floor(Math.random() * (position.maxSalary - position.minSalary + 1)) +
    position.minSalary;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  return {position: position.title, salary, status};
};

export const randomuserMock = 'https://randomuser.me/api/?results=10';
export const CANDIDATE_LOCAL_STORAGE_KEY = 'candidates';

export const COLORS = {
  bkg: '#f5f5f5',
  primary: '#15803d',
  secondary: '#22d3ee',
  submit: '#065f46',
  title: '#888888',
  modalTitle: '#455EFF',
  thirdary: '#5B58AD',
  text: '#A6A6A6',
  subtext: '#9a3412',
  gray: '#D9D9D9',
  error: '#f13a59',
  placeholder: '#AAA9C0',
};

export const HE_COMPANION_TITLE = 'HR Companion';
export const ADD__TITLE = 'Add Candidate';
export const EDIT_TITLE = 'Edit Profile';

export const positions = [
  {title: 'Software Engineer', minSalary: 70000, maxSalary: 120000},
  {title: 'Product Manager', minSalary: 80000, maxSalary: 140000},
  {title: 'Data Scientist', minSalary: 90000, maxSalary: 150000},
  {title: 'UX Designer', minSalary: 60000, maxSalary: 100000},
  {title: 'DevOps Engineer', minSalary: 85000, maxSalary: 130000},
];

export const statuses = ['In Process', 'Declined', 'Hired'] as const;

export const validateName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return 'Name is required.';
  }
  if (name.trim().length < 3) {
    return 'Name should be at least 3 characters long.';
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim().length === 0) {
    return 'Email is required.';
  }
  if (!emailRegex.test(email.trim())) {
    return 'Invalid email format.';
  }
  return null;
};
