import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { createApp } from 'vue'
import Counter from '@/components/Counter.vue'

describe('Counter Integration', () => {
  it('maintains state correctly through multiple interactions', async () => {
    // Render the component
    const { unmount } = render(Counter, {
      props: {
        title: 'Integration Test'
      }
    })

    // Initial state check
    expect(screen.getByTestId('count').textContent).toContain('Count: 0')
    
    // Perform multiple interactions
    const incrementButton = screen.getByTestId('increment-button')
    const decrementButton = screen.getByTestId('decrement-button')
    
    // Click increment 3 times
    await fireEvent.click(incrementButton)
    await fireEvent.click(incrementButton)
    await fireEvent.click(incrementButton)
    expect(screen.getByTestId('count').textContent).toContain('Count: 3')
    
    // Click decrement once
    await fireEvent.click(decrementButton)
    expect(screen.getByTestId('count').textContent).toContain('Count: 2')
    
    // Unmount and check that component lifecycle works correctly
    unmount()
  })

  it('can be used as part of a larger application', async () => {
    // Create a test app that includes our component
    const app = createApp({
      components: { Counter },
      template: `
        <div>
          <h1>Test App</h1>
          <Counter title="App Counter" />
        </div>
      `
    })
    
    // Mount the app to a test container
    const container = document.createElement('div')
    document.body.appendChild(container)
    app.mount(container)
    
    // Verify the counter is properly mounted in the app
    expect(container.querySelector('h1')?.textContent).toBe('Test App')
    expect(container.querySelector('[data-testid="count"]')?.textContent).toContain('Count: 0')
    
    // Test interaction
    const incrementButton = container.querySelector('[data-testid="increment-button"]')
    incrementButton?.dispatchEvent(new Event('click'))
    
    // Wait for update
    await new Promise(resolve => setTimeout(resolve, 0))
    
    // Check state updated
    expect(container.querySelector('[data-testid="count"]')?.textContent).toContain('Count: 1')
    
    // Cleanup
    app.unmount()
    document.body.removeChild(container)
  })
}) 