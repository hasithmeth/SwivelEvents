export default () => ({
  currentUser: null,
  signInWithEmailAndPassword: jest
    .fn()
    .mockResolvedValue({ user: { uid: 'test-uid' } }),
  createUserWithEmailAndPassword: jest
    .fn()
    .mockResolvedValue({ user: { uid: 'test-uid' } }),
  signOut: jest.fn().mockResolvedValue(true),
  onAuthStateChanged: jest.fn(callback => callback(null)),
});
