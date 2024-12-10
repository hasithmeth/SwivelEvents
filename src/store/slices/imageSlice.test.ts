import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, {
  getTopImages,
  getBottomImages,
  selectTopImages,
  selectBottomImages,
  imageState,
} from './imagesSlice';

// Mock the axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('imagesSlice', () => {
  let store: ReturnType<
    typeof configureStore<{
      image: imageState;
    }>
  >;

  beforeEach(() => {
    // Set up a fresh store before each test
    store = configureStore({
      reducer: {
        image: reducer,
      },
    });
    jest.clearAllMocks();
  });

  it('should handle successful fetching of top images', async () => {
    const mockImages = [
      { id: 1, title: 'Test Image 1', url: 'http://example.com/1' },
      { id: 2, title: 'Test Image 2', url: 'http://example.com/2' },
      // ... up to 10 images if you like
    ];

    // Mock a successful response from the API
    mockedAxios.get.mockResolvedValueOnce({ data: mockImages });

    // Dispatch the thunk
    const result = await store.dispatch(getTopImages());

    // Verify that the thunk returned the correct payload
    expect(result.type).toBe('images/getImages/fulfilled');
    expect((result as any).payload).toEqual(mockImages);

    // Check state updates
    const state = store.getState().image;
    expect(state.isTopLoading).toBe(false);
    expect(state.topImages).toEqual(mockImages);
    expect(state.bottomImages).toEqual([]);
  });

  it('should handle a failed fetching of top images', async () => {
    // Mock a failed response from the API
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const result = await store.dispatch(getTopImages());

    expect(result.type).toBe('images/getImages/rejected');

    const state = store.getState().image;
    expect(state.isTopLoading).toBe(false);
    expect(state.topImages).toEqual([]); // No images should be set on failure
  });

  it('should handle successful fetching of bottom images', async () => {
    const mockImages = [
      { id: 3, title: 'Bottom Image 1', url: 'http://example.com/3' },
      { id: 4, title: 'Bottom Image 2', url: 'http://example.com/4' },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockImages });

    const result = await store.dispatch(getBottomImages());

    expect(result.type).toBe('images/getImagesBottom/fulfilled');
    expect((result as any).payload).toEqual(mockImages);

    const state = store.getState().image;
    expect(state.isBottomLoading).toBe(false);
    expect(state.bottomImages).toEqual(mockImages);
  });

  it('should handle a failed fetching of bottom images', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const result = await store.dispatch(getBottomImages());

    expect(result.type).toBe('images/getImagesBottom/rejected');

    const state = store.getState().image;
    expect(state.isBottomLoading).toBe(false);
    expect(state.bottomImages).toEqual([]); // No images set on failure
  });

  it('should correctly select top and bottom images from state', async () => {
    const mockTopImages = [{ id: 1, title: 'Top 1', url: 'url1' }];
    const mockBottomImages = [{ id: 2, title: 'Bottom 1', url: 'url2' }];

    // Manually update the state using the reducer to test selectors
    store.dispatch({
      type: 'images/getImages/fulfilled',
      payload: mockTopImages,
    });
    store.dispatch({
      type: 'images/getImagesBottom/fulfilled',
      payload: mockBottomImages,
    });

    const state = store.getState().image;
    expect(selectTopImages({ image: state })).toEqual(mockTopImages);
    expect(selectBottomImages({ image: state })).toEqual(mockBottomImages);
  });
});
