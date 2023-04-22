import main from './core/index.mjs'

export default async (env, arg) => main(env, arg, opt);

const opt = {
  config: 'web',  
  server: '',
  watch: '',
}

