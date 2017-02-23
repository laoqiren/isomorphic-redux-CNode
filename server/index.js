
require('babel-register');
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

const Webpack_isomorphic_tools = require('webpack-isomorphic-tools')
const project_base_path = require('path').join(__dirname, '..')
global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(require('../webpack/webpack-isomorphic-tools-configuration'))
    .server(project_base_path)
    .then(()=>{
        require('./app');
    })
    