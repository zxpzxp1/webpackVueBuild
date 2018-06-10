const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isDev=process.env.NODE_ENV==='development'
const ExtractPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const defaultPluins=new webpack.DefinePlugin({
    'process.env':{
      NODE_ENV:isDev?'"development"':'"production"'
    }
});
const config = {
      target:"web",
	    mode: process.env.NODE_ENV||"production",
      entry:[path.join(__dirname,'./app/js/viewport.js') ,path.join(__dirname,'./app/js/main.js') ],
      module:{
        rules:[
        {
            test:/\.html$/,
            loader:'html-loader'
        },{
          test:/\.vue$/,
          loader:'vue-loader',
          options:{
            cssModules: {
              localIdentName: '[path][name]---[local]---[hash:base64:5]',
              camelCase: true,
              module:true
            },
            loaders:{
              css:'vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8',
              scss:'vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8!sass-loader'
            }
          }
        },{
          test:/\.scss$/,
          loader:'style-loader!css-loader!sass-loader'
        }]
      },
      plugins:[    
      		new CleanWebpackPlugin(['dist']),
    		  new HtmlWebpackPlugin({template: './app/views/index.html'}),
    		  new webpack.HotModuleReplacementPlugin(),
          defaultPluins,
          ],
      optimization:{
          splitChunks:{
            chunks:'all'
          },
          runtimeChunk:true
      },  
      output:{
           filename:'[name].min.js',
           path:path.resolve(__dirname,'dist'),
           publicPath:'/public/'
      },
      resolve: {
      extensions: [
        '.js', '.vue', '.json'
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
      },
       
};

if(isDev)
{
  // config.devtool = '#cheap-module-eval-source-map'
  config.devServer={
        contentBase:path.join(__dirname,'dist'),
        compress:true,
        overlay:{
          errors:true
        },
        port:9998,
        publicPath:'/public',
        historyApiFallback:{
          index:'/public/index.html'
        },
        hot:true
      }  
     
       config.plugins.push(
         new webpack.HotModuleReplacementPlugin(),
         new webpack.NamedModulesPlugin()
      )   
}else{
     // config.plugins.push(new ExtractPlugin('styles.[contentHash:8].css'))
  
}

module.exports =config
