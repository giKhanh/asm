jest.mock('../../src/models/User');
jest.mock('../../src/utils/jwt', () => ({
    generateToken: () => 'fake-jwt-token'
}));

const authController = require('../../src/controllers/authController');
const User = require('../../src/models/User');

// Helper to create mock response object
const createRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Auth Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('govaaAuth', () => {
        it('should return 403 for invalid credentials', async() => {
            const req = { body: { email: 'bob@example.com', password: 'wrong' } };
            const res = createRes();

            await authController.govaaAuth(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        });

        it('should prompt registration when user not found', async() => {
            const req = { body: { email: 'bob@agency.gov.sg', password: 'password123' } };
            const res = createRes();
            User.findOne.mockResolvedValue(null);

            await authController.govaaAuth(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ govaaEmail: req.body.email });
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ needsRegistration: true }));
        });

        it('should login existing user', async() => {
            const mockUser = {
                _id: '456',
                name: 'Bob',
                govaaEmail: 'bob@agency.gov.sg',
                isActive: true,
                save: jest.fn()
            };
            User.findOne.mockResolvedValue(mockUser);

            const req = { body: { email: mockUser.govaaEmail, password: 'password123' } };
            const res = createRes();

            await authController.govaaAuth(req, res);

            expect(mockUser.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true, token: 'fake-jwt-token' }));
        });
    });

    describe('login', () => {
        it('should return 404 if account missing', async() => {
            User.findOne.mockResolvedValue(null);
            const req = { body: { email: 'charlie@agency.gov.sg', password: 'password123' } };
            const res = createRes();

            await authController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
});