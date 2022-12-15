const { 
	addWebpackModuleRule,
  	override,
  	} = require('customize-cra')

module.exports = {
  webpack: override(
    addWebpackModuleRule({
      loader: 'file-loader',
    }))
}