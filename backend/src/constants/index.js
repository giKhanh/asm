const GOVAA_CONFIG = {
    EMAIL: process.env.GOVAA_MOCK_EMAIL || 'test@agency.gov.sg',
    PASSWORD: process.env.GOVAA_MOCK_PASSWORD || 'password123',
    NAME: process.env.GOVAA_MOCK_NAME || 'John Doe'
};

const AGENCIES = [
    "A*Star",
    "A*STAR Companies",
    "ACRA",
    "AGD Pensions Branch",
    "Attorney-General's Chambers",
    "Auditor-General's Office",
    "Board of Architects",
    "Building & Construction Authority",
    "Central Provident Fund",
    "Civil List for President",
    "Civil Service College",
    "Competition and Consumer Comm",
    "Council for Estate Agencies",
    "Civil Aviation Authority of Singapore",
    "Defence Science & Tech Agency",
    "Economic Development Board",
    "Energy Market Authority",
    "Enterprise Singapore",
    "Gambling Regulatory Authority",
    "GovTech"
];

module.exports = {
    GOVAA_CONFIG,
    AGENCIES
};