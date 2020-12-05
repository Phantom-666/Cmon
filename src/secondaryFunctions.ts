import reservedNames from './reservedNames'
import { executeCommand, runOutputFile } from './executeCommand'
import { printConsole } from './print'
import { getArgumentsString, isDir } from './workWithPaths'

const getFileName = (path: string) => {
  const filePathSplited = path.split('/')
  return filePathSplited[filePathSplited.length - 1]
}

const getCompileCommand = (agruments: string) =>
  'g++ ' + agruments + ' -o ' + reservedNames.outputName

const getCompileCommandIntoObject = (agruments: string) => 'g++ -c ' + agruments

const reAssemble = (event: string, pathObject: string) => {
  printConsole(event)
  compileObjectsToExecAndExecute(pathObject)
}

const getExt = (path: string) => {
  const paths = path.split('/')
  const file = paths[paths.length - 1]
  const fileWithExt = file.split('.')
  return fileWithExt[fileWithExt.length - 1]
}

const Instructions = (event: string, name: string) => {
  if (name === reservedNames.outputPath) return
  if (getExt(name) !== 'cpp') return

  reAssemble(event, name)
}

const findFilesByExtAndMakeString = (res: string[], ext: string) => {
  return res
    .filter((p) => !isDir(p))
    .filter((p) => p !== reservedNames.outputPath)
    .filter((p) => {
      const file = getFileName(p).split('.')
      const extFile = file[file.length - 1]
      return extFile === ext
    })
    .join(' ')
}

const compileObjectsToExecAndExecute = (compileArguments: string) => {
  const command = getCompileCommandIntoObject(compileArguments)
  executeCommand(command)
    .then(() => getArgumentsString(reservedNames.root, 'o'))
    .then((cppObjects) => getCompileCommand(cppObjects))
    .then((command) => executeCommand(command))
    .then(() => runOutputFile(reservedNames.outputPath))
}

const preCompile = () => {
  const compileArguments = getArgumentsString(reservedNames.root)

  compileObjectsToExecAndExecute(compileArguments)
}

export {
  getFileName,
  Instructions,
  findFilesByExtAndMakeString,
  getCompileCommandIntoObject,
  getCompileCommand,
  compileObjectsToExecAndExecute,
  preCompile,
}
