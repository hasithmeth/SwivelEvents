export default () => ({
  ref: jest.fn(() => ({
    set: jest.fn().mockResolvedValue(null),
    push: jest.fn(() => ({
      set: jest.fn().mockResolvedValue(null),
    })),
    once: jest.fn().mockResolvedValue({ val: () => null }),
    on: jest.fn(),
    off: jest.fn(),
  })),
});
