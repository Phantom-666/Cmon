import { executeCommand } from './executeCommand'
import { greetings } from './print'
import reservedNames from './reservedNames'
import { Instructions, preCompile } from './secondaryFunctions'
import { rainbow } from 'colors'
const watch = require('node-watch')

const startWatching = () => {
  //Start the watching for files
  const watcher = watch(reservedNames.root, { recursive: true })

  watcher.on('change', Instructions)

  watcher.on('error', (err: Error) => {
    console.log('ERROR WATCHER : ', err)
    watcher.close()
  })

  watcher.on('ready', () => {
    greetings()
    preCompile()
  })

  process.on('SIGINT', () => {
    console.log(rainbow('\nProcess terminated'))
    executeCommand('rm *.o').then(() => process.exit())
  })
}

export { startWatching }
