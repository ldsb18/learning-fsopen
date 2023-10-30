/* eslint-env node */
module.exports = {
	env: {
		browser: true,
		es6: true,
		"jest/globals": true,
		"cypress/globals": true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:cypress/recommended", //locura lo que hice aca
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["react", "jest"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "single"],
		semi: ["error", "never"],
		eqeqeq: "error",
		"no-trailing-spaces": 0,
		"object-curly-spacing": ["error", "always"],
		"arrow-spacing": ["error", { before: true, after: true }],
		"no-console": 0,
		"react/prop-types": 0,
		"react/react-in-jsx-scope": "off",
		"cypress/no-unnecessary-waiting": 0,
	},
	settings: {
		react: {
			version: "detect",
		},
	},
}
