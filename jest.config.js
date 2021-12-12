module.exports = {
	roots: ['.'],
	testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
	transform: {
		'^.+\\.(ts)$': 'ts-jest',
	},
	coveragePathIgnorePatterns: ['./node_modules/', './tests/helpers.ts'],
};
