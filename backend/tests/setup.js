process.env.JWT_SECRET = 'test-secret';

// Mock the MongoDB connection so tests don't attempt to reach a real database
jest.mock('../src/config/database', () => jest.fn());

// Increase default timeout slightly for slower environments
jest.setTimeout(30000);