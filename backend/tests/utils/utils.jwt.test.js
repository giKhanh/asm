const { generateToken, verifyToken } = require('../../src/utils/jwt');

describe('JWT Utilities', () => {
    it('should generate a valid token and verify its payload', () => {
        const user = {
            _id: '123',
            name: 'John Doe',
            govaaEmail: 'john@agency.gov.sg',
            agency: 'GovTech'
        };

        const token = generateToken(user);
        expect(typeof token).toBe('string');

        const decoded = verifyToken(token);
        expect(decoded.id).toBe(user._id);
        expect(decoded.govaaEmail).toBe(user.govaaEmail);
        expect(decoded.name).toBe(user.name);
    });
});