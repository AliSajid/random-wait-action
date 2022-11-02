export async function wait(minimum: number, maximum: number): Promise<string> {
  return new Promise(resolve => {
    if (isNaN(minimum) || isNaN(maximum)) {
      throw new Error('minimum and maximum must be numbers')
    }

    if (minimum > maximum) {
      throw new Error('minimum must be less than maximum')
    }

    const ms = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

    setTimeout(() => resolve('done!'), ms * 1000)
    return ms / 1000
  })
}
