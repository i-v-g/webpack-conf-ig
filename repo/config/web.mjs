export default (arg) => {
  var {cwd, modePro} = arg;
  
  var main = {
    context: cwd('src/'), 
    devtool: modePro ? false : 'eval-source-map',
    entry: {
      main: ['./index.js'], 
    },
    mode: arg.mode,
    output: {
      clean: true, 
    
      filename: '[name].[contenthash:8].js',
      path: modePro ? cwd('public/') : cwd('dist/'), 
    },
    target: ['web', 'es2022'],
  };
  
  var addons = {
    
  };

  return {main, addons};
}