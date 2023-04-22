import { baseDir, checkExt, importen } from './utils.mjs'

export default async (wpEnv, wpArg, userOpt) => {

  {
    const mode = wpArg.mode || 'production';
    var arg = {
      _:          userOpt,
      appName:    userOpt.appName || process.env.npm_package_name,
      appVersion: userOpt.appVersion || process.env.npm_package_version,
      cwd:        baseDir(),
      mode:       mode,
      modeDev:    mode === 'development',
      modeNone:   mode === 'none',
      modePro:    mode === 'production',
      modeServe:  wpArg.env.WEBPACK_SERVE === true, 
      modeWatch:  wpArg.env.WEBPACK_WATCH === true,
      wp:         wpArg,
    }
  };

  {
    const repo = baseDir(baseDir(import.meta.url)('../repo/'));
    var dir = {
      addon : baseDir(repo('addon/')),
      config: baseDir(repo('config/')),
      server: baseDir(repo('server/')),
      watch : baseDir(repo('watch/')),
    }
  };
  
  {
    const configName = dir.config(userOpt.config || 'web.mjs');
    var {main:conf, addons} = (await importen(configName))(arg);
  }
  
/*
  if (typeof addons === 'object') {
    const plugins = [];
    pushToArray(conf.plugins, plugins)
    const entries = Object.entries(addons);
    arg.conf = conf;
    for (const [key, value] of entries) {
      if (value !== false) {
        const opt = typeof value === 'boolean' ? undefined : value;
        const [fileName, importName] = key.split(':');
        const addon = (await module(dirAddons(fileName), importName))(opt, arg);
        pushToArray(addon.plugins, plugins);
      }
    }  
    conf.plugins = plugins;
  }
  
  return conf;
  */

  return conf;


  
}