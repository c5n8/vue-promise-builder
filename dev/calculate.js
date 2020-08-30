import { sample, random } from 'lodash-es'

export default calculate

export async function calculate() {
  const duration = random(200, 2000)

  await new Promise((resolve) => setTimeout(resolve, duration))

  if (sample([true, false])) {
    throw new Error('Failed to generate')
  }

  return random(0, 1000)
}
