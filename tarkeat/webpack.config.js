var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'lodash', 'redux', 'react-redux', 'react-dom', 'faker',
  'react-input-range', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS       //toinen bundle jonne kaikki moduulit
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'  //[chunkhash] -> ladattavan javascript tiedoston nimi muuttuu joka kerta kun siihen tehdään
    // tehdaan muutoksia, jolloin paivitetyt tiedostot joutuu lataamaan uudestaan
  },
  module: { //tarkoitettu enemmankin tiedostokohtaiseksi
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/ //estaa babelin kayton node_modules kansiossa
      },
      {
        use: ['style-loader', 'css-loader'],
        //css-loader mahdollistaa webpackin css tiedostojen lukemisen
        //style loader ottaa css moduulit ja pistaa tyyli tagin sisalle
        test: /\.css$/
      }
    ]
  },
  plugins: [ //kuten loaderit, mutta summaa kaikki sisaan/ulostulevat asiat
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({ //automaattisesti kaikki javascript tiedostot
      // mitkä webpack luo, tekee myös script tagin html tiedostoon
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({ //vähentaa erroreiden tarkistamista. lisatty myos package tiedostoon
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};


