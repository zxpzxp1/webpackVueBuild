module.exports=(isDev)=>{
	return {
		preserveWhitespace:true,
		extractCss:!isDev,
		cssModules:{
           localIndentName:isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
           camelCase:true
		},
		// hotReload:false
		loaders:{
			'docus':
		}
	}
}