import { URL, fileURLToPath, pathToFileURL } from 'node:url';
import { stat } from 'node:fs/promises'

var cwd = url(process.cwd());

async function checkPackage(packageName){
  const packageNM = `node_modules/${packageName}`;
  const dir = url(process.cwd(), '', false);
  do 
    if (await isDirectory(url(dir(), packageNM)())) 
      return true;
  while (dir() != dir('..'));

  const globalPaths = await importName("module", "globalPaths");
  for (const globalPath of globalPaths) {
    if (await isDirectory(url(globalPath, packageName)())) 
      return true;
  }

  return false;
}

function checkExt(fileName, fileExt){
  if (typeof fileName !== 'string') return 
    fileName;
  const dotExt = fileExt[0] === '.' ? fileExt : `.${fileExt}`;
  if (fileName.endsWith(dotExt))
    return fileName
  else
    return `${fileName}${dotExt}`
}

async function importName(file, name){
  var impName = name || 'default';
  return (await import(file))[impName];
}

async function isDirectory(path) {
  try {  
    return (await stat(path)).isDirectory();
  }
  catch (error) {
    return false;
  }
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

function url(initBase, initRelative, fixed = true) {
  const path = initBase || '.';
  var base = path instanceof URL || path.startsWith('file://') ? path : pathToFileURL(`${path}/`);
  if (initRelative || !(base instanceof URL))
    base = new URL (initRelative, base);
      
  return (relative) => {
    var newUrl = relative ? new URL (relative, base) : base;
    if (!fixed && relative)
      base = newUrl;
    return fileURLToPath(newUrl);
  }
}

export {
  checkExt, 
  checkPackage, 
  cwd, 
  importName, 
  singleDone, 
  url}