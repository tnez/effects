import { describe, expect, it } from '@jest/globals'
import { greet } from './main'

describe('when name is provided', () => {
  it('should yield expected result', () => {
    const result = greet('Larry')
    expect(result).toBe('Hello Larry! Nice to meet you.')
  })
})

describe('when no name is provided', () => {
  it('should yield expected result', () => {
    const result = greet()
    expect(result).toBe('Hello You! Nice to meet you.')
  })
})
