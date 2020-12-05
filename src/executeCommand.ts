import { exec } from 'child_process'
import { red, green } from 'colors'

const runOutputFile = (path: string) => {
  exec(path, (_, stdout, stderr) => {
    if (stdout.length) console.log(stdout)
    if (stderr) console.error(stderr)
  })
}

const executeCommand = (command: string) => {
  return new Promise((res, rej) => {
    exec(command, (_, stdout, stderr) => {
      if (stdout) console.log(green(stdout))
      if (stderr) console.error(red(stderr))
      if (!stderr) {
        res()
      }
    })
  })
}

export { executeCommand, runOutputFile }
