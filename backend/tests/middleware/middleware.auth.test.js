const { generateToken } = require('../../src/utils/jwt');
const { requireAuth, optionalAuth } = require('../../src/middleware/auth');

describe('Auth Middleware', () => {
    const user = {
        _id: '123',
        name: 'John Doe',
        govaaEmail: 'john@agency.gov.sg',
        agency: 'GovTech'
    };
    const validToken = generateToken(user);

    // Helper to create mock response object
    const createRes = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    it('requireAuth - passes request with valid token', () => {
        const req = { headers: { authorization: `Bearer ${validToken}` } };
        const res = createRes();
        const next = jest.fn();

        requireAuth(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.user.id).toBe(user._id);
    });

    it('requireAuth - blocks request without token', () => {
        const req = { headers: {} };
        const res = createRes();
        const next = jest.fn();

        requireAuth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it('optionalAuth - continues when no token provided', () => {
        const req = { headers: {} };
        const res = createRes();
        const next = jest.fn();

        optionalAuth(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.user).toBeUndefined();
    });
});