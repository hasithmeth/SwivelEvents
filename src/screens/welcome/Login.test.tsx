import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from './Login';
import { signIn } from '../../store/slices/authSlice';

// Mock navigation
const mockReplace = jest.fn();
const mockNavigation = { replace: mockReplace };

// Mock Redux hooks and actions
jest.mock('../../hooks', () => ({
  useAppDispatch: () => mockDispatch,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useAppSelector: (selector: any) => {
    // Return default state or modify if needed based on the selector
    return { isLoading: false };
  },
}));

jest.mock('../../store/slices/authSlice', () => ({
  signIn: jest.fn(),
  selectAuth: jest.fn(),
}));

// Mock dispatch
const mockDispatch = jest.fn();

describe('Login Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch signIn with correct credentials when "Login" is pressed', async () => {
    const { getByLabelText, getByText } = render(
      <Login navigation={mockNavigation as any} />,
    );

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    // Enter valid credentials
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'abcdef');

    // Press login
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'abcdef',
      });
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
