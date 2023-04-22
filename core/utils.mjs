import { URL, fileURLToPath, pathToFileURL } from 'node:url';

function baseDir(input) {
  const path = input || '.';
  const base = path instanceof URL || path.startsWith('file://') ? path : pathToFileURL(`${path}/`);
    
  return (relative = '.') =>
    fileURLToPath(new URL (relative, base));
}

const cwd = baseDir(process.cwd());

function checkExt(fileName, fileExt){
  if (typeof fileName !== 'string') return 
    fileName;
  const dotExt = fileExt[0] === '.' ? fileExt : `.${fileExt}`;
  if (fileName.endsWith(dotExt))
    return fileName
  else
    return `${fileName}${dotExt}`
}

async function importen(file, name){
  var fileName = checkExt(file, 'mjs');
  var importName = name || 'default';
  return (await import(fileName))[importName];
}

function singleDone(func) {
  var done = false;
  var result = undefined;

  return () => {
    if (!done) {
      result = func();
      done = true;
      func = undefined;
    }
    return result;
  } 
}

export {baseDir, checkExt, cwd, importen, singleDone}