import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import Counter from '@/components/Counter.vue'

describe('Counter Component', () => {
  it('renders with correct title', () => {
    render(Counter, {
      props: {
        title: 'Test Counter'
      }
    })

    expect(screen.getByText('Test Counter')).toBeDefined()
  })

  it('starts with count of 0', () => {
    render(Counter, {
      props: {
        title: 'Test Counter'
      }
    })

    expect(screen.getByTestId('count').textContent).toContain('Count: 0')
  })

  it('increments the count when increment button is clicked', async () => {
    render(Counter, {
      props: {
        title: 'Test Counter'
      }
    })

    const incrementButton = screen.getByTestId('increment-button')
    await fireEvent.click(incrementButton)

    expect(screen.getByTestId('count').textContent).toContain('Count: 1')
  })

  it('decrements the count when decrement button is clicked', async () => {
    render(Counter, {
      props: {
        title: 'Test Counter'
      }
    })

    const decrementButton = screen.getByTestId('decrement-button')
    await fireEvent.click(decrementButton)

    expect(screen.getByTestId('count').textContent).toContain('Count: -1')
  })
}) 