var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '..', 'build');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require('fs');

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      "presets": ["es2015", "react", "stage-0"]
    },
    include: path.join(__dirname, '..', 'app'),
    exclude: path.join(__dirname, '/node_modules/')
  },
  {
    test: /\.ts$|\.tsx$/,
    loader: 'ts-loader',
    include: path.join(__dirname, '..', 'app'),
    exclude: path.join(__dirname, '/node_modules/')      
  },
  { test: /\.json$/, loader: "json-loader" },
  {
    test: /\.(png|jpg|svg)$/,
    loader: 'url?limit=10000'
  },
  { test: /\.html$/, loader: 'html-loader' }
];

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = [{
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "..", "app"),
    entry: {
      server: "./server"
    },
    target: "node",
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "server.js",
      // The output path from the view of the Javascript
      // publicPath: "/assets/",
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: commonLoaders.concat([
           { 
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]!postcss-loader!sass?includePaths[]='
                        + encodeURIComponent(path.resolve(__dirname, '..', 'app', 'scss')))
           },
           {   
               test: /\.css$/,
               loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]!postcss-loader!sass?includePaths[]='
                        + encodeURIComponent(path.resolve(__dirname, '..', 'app', 'scss')))
           }
      ])
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
        // extract inline css from modules into separate files
        new ExtractTextPlugin("styles/main.css"),
        new webpack.DefinePlugin({
          __DEV__: true
        })
    ]
}
// ,{
//     name: "backend api",
//     context: path.join(__dirname, "..", "server"),
//     entry: {
//       server: "./index"
//     },
//     target: "node",
//     output: {
//       // The output directory as absolute path
//       path: assetsPath,
//       // The filename of the entry chunk as relative path inside the output.path directory
//       filename: "backend.js",
//       // The output path from the view of the Javascript
//       publicPath: "/assets/",
//       libraryTarget: "commonjs2"
//     },
//     module: {
// 		loaders: [{
// 			test: /\.js?$/,
// 			loaders: ['babel'],
//             include: path.join(__dirname, '..', 'server'),
//             exclude: path.join(__dirname, '/node_modules/')
// 		},{
// 			test: /\.ts?$/,
// 			loaders: ['ts'],
//             include: path.join(__dirname, '..', 'server'),
//             exclude: path.join(__dirname, '/node_modules/')
// 		},{
// 			test: /\.json?$/,
// 			loaders: ['json'],            
//         }]
//     },
//     externals: nodeModules,
//     resolve: {
//       extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
//       modulesDirectories: [
//         "node_modules", "server"
//       ]
//     },
//     plugins: [
//         // extract inline css from modules into separate files
//         new webpack.DefinePlugin({
//           __DEV__: true
//         })
//     ]
// }
];
