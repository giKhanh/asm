/* eslint-disable no-undef */
/* global jest */
import '@testing-library/jest-dom';

// Mock window.matchMedia required by MUI and some libraries
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Polyfill TextEncoder/TextDecoder for node <18 (used by react-router)
// use require to work with Jest's CJS loader
const util = require('util');
if (!global.TextEncoder) global.TextEncoder = util.TextEncoder;
if (!global.TextDecoder) global.TextDecoder = util.TextDecoder;