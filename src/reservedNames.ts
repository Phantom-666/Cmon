import { returnRootPath } from './workWithPaths'
import { resolve } from 'path'

const outputName = 'output'
const root = returnRootPath()
const outputPath = resolve(root, outputName)
const phrases = {
  greeting: 'Cmon activated...',
  update: 'Updating...',
  remove: 'Removing...',
}

export default { outputName, root, outputPath, phrases }
