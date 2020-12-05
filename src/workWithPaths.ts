import { resolve } from 'path'
import { lstatSync } from 'fs'
import { glob } from 'glob'
import { findFilesByExtAndMakeString } from './secondaryFunctions'

const isDir = (path: string) => lstatSync(path).isDirectory()

const returnRootPath = () => {
  const path = process.argv[2]
  if (!path) return process.cwd()

  const joinedPath = resolve(process.cwd(), path)

  if (!isDir(joinedPath)) throw new Error('Invalid path')

  return joinedPath
}

const getArgumentsString = (path: string, ext: string = 'cpp') => {
  const result = glob.sync(path + '/**/*')

  return findFilesByExtAndMakeString(result, ext)
}

export { returnRootPath, isDir, getArgumentsString }
