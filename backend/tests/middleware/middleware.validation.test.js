const { validateGovaaLogin, validateRegistration } = require('../../src/middleware/validation');

describe('Validation Middleware', () => {
    const createRes = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    it('validateGovaaLogin - succeeds with valid data', () => {
        const req = { body: { email: 'alice@agency.gov.sg', password: 'password123' } };
        const res = createRes();
        const next = jest.fn();

        validateGovaaLogin(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('validateGovaaLogin - fails with non-gov email', () => {
        const req = { body: { email: 'alice@example.com', password: 'password123' } };
        const res = createRes();
        const next = jest.fn();

        validateGovaaLogin(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(next).not.toHaveBeenCalled();
    });

    it('validateRegistration - succeeds with correct data', () => {
        const req = {
            body: {
                govaaName: 'Alice',
                govaaEmail: 'alice@agency.gov.sg',
                contactEmail: 'alice@example.com',
                agency: 'GovTech',
                jobDescription: 'I build better digital services',
                acceptedTerms: true
            }
        };
        const res = createRes();
        const next = jest.fn();

        validateRegistration(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('validateRegistration - fails when terms not accepted', () => {
        const req = {
            body: {
                govaaName: 'Alice',
                govaaEmail: 'alice@agency.gov.sg',
                contactEmail: 'alice@example.com',
                agency: 'GovTech',
                jobDescription: 'I build better digital services',
                acceptedTerms: false
            }
        };
        const res = createRes();
        const next = jest.fn();

        validateRegistration(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(next).not.toHaveBeenCalled();
    });
});