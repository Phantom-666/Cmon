import { yellow, green, red } from 'colors'
import reservedNames from './reservedNames'

const greetings = () => console.log(yellow(reservedNames.phrases.greeting))
const printUpdating = () => console.log(green(reservedNames.phrases.update))
const printRemoving = () => console.log(red(reservedNames.phrases.remove))

const printConsole = (event: string) => {
  if (event === 'update') printUpdating()
  if (event === 'remove') printRemoving()
}

export { greetings, printConsole }
