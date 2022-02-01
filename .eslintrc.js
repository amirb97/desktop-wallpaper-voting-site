module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'warn',
			'tab'
		],
		'linebreak-style': [
			'warn',
			'windows'
		],
		'quotes': [
			'warn',
			'single'
		],
		'semi': [
			'warn',
			'never'
		]
	}
}
