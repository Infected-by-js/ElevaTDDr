import Elevator from "@/core/elevator/Elevator"
import {describe, expect, it, vi} from "vitest"

describe("Elevator", () => {
  describe("Step 1. Basic Model", () => {
    const elevator = new Elevator()

    it("should be defined", () => {
      expect(elevator).toBeDefined()
    })

    it("should default to 1st floor", () => {
      expect(elevator.currentFloor).toBe(1)
    })

    it("should have a empty queue", () => {
      expect(elevator.queue).toEqual([])
    })

    it("should have state", () => {
      expect(elevator.state).toBeDefined()
    })

    it("should default to idle state", () => {
      expect(elevator.state).toBe(Elevator.IDLE)
    })

    it("should have a speed of 1 floor per second", () => {
      expect(elevator.speed).toBe(1)
    })

    it("should throw error if initialized with floor below 1", () => {
      expect(() => new Elevator({currentFloor: 0})).toThrow()
    })

    it("should throw error if initialized with negative speed", () => {
      expect(() => new Elevator({speed: -1})).toThrow()
    })

    it("should accept initial floor through constructor", () => {
      const customElevator = new Elevator({currentFloor: 3})
      expect(customElevator.currentFloor).toBe(3)
    })

    it("should throw error if initialized with floor above max floor", () => {
      expect(() => new Elevator({currentFloor: 5})).toThrow()
    })

    it("should throw error if initialized with max floor below 1", () => {
      expect(() => new Elevator({maxFloor: 0})).toThrow()
    })

    it("should not allow direct queue modification", () => {
      elevator.queue.push(5)
      expect(elevator.queue).toEqual([])
    })

    it("should not allow direct speed modification", () => {
      expect(() => {
        // @ts-expect-error
        elevator.speed = 2
      }).toThrow()
    })

    it("should have all required states defined", () => {
      expect(Elevator.IDLE).toEqual("IDLE")
      expect(Elevator.MOVING_UP).toEqual("MOVING_UP")
      expect(Elevator.MOVING_DOWN).toEqual("MOVING_DOWN")
      expect(Elevator.DOORS_OPENING).toEqual("DOORS_OPENING")
      expect(Elevator.DOORS_CLOSING).toEqual("DOORS_CLOSING")
    })

    it("should expose required public methods", () => {
      expect(typeof elevator.call).toBe("function")
      expect(typeof elevator.selectFloor).toBe("function")
    })

    it("should have correct types for properties", () => {
      expect(Number.isInteger(elevator.currentFloor)).toBe(true)
      expect(Array.isArray(elevator.queue)).toBe(true)
      expect(typeof elevator.speed).toBe("number")
    })

    it("should have maximum floor limit", () => {
      expect(elevator.maxFloor).toBeDefined()
      expect(elevator.maxFloor).toBeGreaterThan(1)
    })

    it("should not change state during initialization", () => {
      const newElevator = new Elevator()
      expect(newElevator.state).toBe(Elevator.IDLE)

      setTimeout(() => {
        expect(newElevator.state).toBe(Elevator.IDLE)
      }, 100)
    })
  })

  describe("Step 2. Call and Select Floor", () => {
    it("should call a floor", async () => {
      const elevator = new Elevator({maxFloor: 5})
      vi.useFakeTimers()

      expect(elevator.currentFloor).toBe(1)

      elevator.call(3, "UP")

      expect(elevator.queue).toEqual([3])
      expect(elevator.state).toBe(Elevator.IDLE)

      vi.advanceTimersByTime(2000)
      
      expect(elevator.currentFloor).toBe(3)
      expect(elevator.state).toBe(Elevator.MOVING_UP)
      
      vi.useRealTimers()
    })

    it("should select a floor", async () => {
      const elevator = new Elevator({maxFloor: 5})
      vi.useFakeTimers()

      expect(elevator.currentFloor).toBe(1)
      expect(elevator.state).toBe(Elevator.IDLE)

      elevator.selectFloor(5)

      expect(elevator.queue).toEqual([5])
      expect(elevator.state).toBe(Elevator.IDLE)

      vi.advanceTimersByTime(4000)
      
      expect(elevator.currentFloor).toBe(5)
      expect(elevator.state).toBe(Elevator.MOVING_UP)
      
      vi.useRealTimers()
    })
  })

  describe("Step 3. SCAN Algorithm", () => {
    it("should follow SCAN algorithm for multiple calls", async () => {
      const elevator = new Elevator({currentFloor: 7, maxFloor: 10})
      vi.useFakeTimers()
      
      elevator.call(6, "DOWN")
      elevator.call(5, "DOWN")
      elevator.call(10, "DOWN")
      elevator.call(9, "DOWN")
      elevator.call(3, "UP")
      elevator.call(2, "DOWN")
      
      const visitedFloors: number[] = []
      
      for (let i = 0; i < 7; i++) {
        visitedFloors.push(elevator.currentFloor)
        vi.advanceTimersByTime(1000)
      }

      console.log("visitedFloors", visitedFloors)
      expect(visitedFloors).toEqual([7, 6, 5, 2, 3, 10, 9])
      
      vi.useRealTimers()
    })
    
    it("should handle direction changes correctly", async () => {
      const elevator = new Elevator({currentFloor: 5, maxFloor: 10})
      vi.useFakeTimers()
      
      elevator.call(8, "UP")
      elevator.call(3, "DOWN")
      elevator.call(10, "UP")
      elevator.call(1, "DOWN")
      
      const visitedFloors: number[] = []
      
      for (let i = 0; i < 5; i++) {
        visitedFloors.push(elevator.currentFloor)
        vi.advanceTimersByTime(1000)
      }
      
      expect(visitedFloors).toEqual([5, 8, 10, 3, 1])
      
      vi.useRealTimers()
    })
    
    it("should prioritize floors in current direction", async () => {
      const elevator = new Elevator({currentFloor: 3, maxFloor: 10})
      vi.useFakeTimers()
      
      elevator.call(7, "UP")
      elevator.call(2, "DOWN")
      elevator.call(5, "UP")
      elevator.call(9, "UP")
      
      const visitedFloors: number[] = []
      
      for (let i = 0; i < 5; i++) {
        visitedFloors.push(elevator.currentFloor)
        vi.advanceTimersByTime(1000)
      }
      
      expect(visitedFloors).toEqual([3, 5, 7, 9, 2])
      
      vi.useRealTimers()
    })

    it("should handle calls in opposite directions", async () => {
      const elevator = new Elevator({currentFloor: 4, maxFloor: 10})
      vi.useFakeTimers()
      
      elevator.call(2, "UP")
      elevator.call(8, "DOWN")
      elevator.call(6, "UP")
      elevator.call(3, "DOWN")
      
      const visitedFloors: number[] = []
      
      for (let i = 0; i < 5; i++) {
        visitedFloors.push(elevator.currentFloor)
        vi.advanceTimersByTime(1000)
      }
      
      expect(visitedFloors).toEqual([4, 6, 8, 3, 2])
      
      vi.useRealTimers()
    })

    it("should handle calls in the same direction", async () => {
      const elevator = new Elevator({currentFloor: 1, maxFloor: 10})
      vi.useFakeTimers()
      
      elevator.call(5, "UP")
      elevator.call(7, "UP")
      elevator.call(3, "UP")
      elevator.call(9, "UP")
      
      const visitedFloors: number[] = []
      
      for (let i = 0; i < 5; i++) {
        visitedFloors.push(elevator.currentFloor)
        vi.advanceTimersByTime(1000)
      }
      
      expect(visitedFloors).toEqual([1, 3, 5, 7, 9])
      
      vi.useRealTimers()
    })

    it("should handle calls in the same direction (down)", async () => {
      const elevator = new Elevator({currentFloor: 10, maxFloor: 10})
      vi.useFakeTimers()
      
      elevator.call(7, "DOWN")
      elevator.call(5, "DOWN")
      elevator.call(3, "DOWN")
      elevator.call(1, "DOWN")
      
      const visitedFloors: number[] = []
      
      for (let i = 0; i < 5; i++) {
        visitedFloors.push(elevator.currentFloor)
        vi.advanceTimersByTime(1000)
      }
      
      expect(visitedFloors).toEqual([10, 7, 5, 3, 1])
      
      vi.useRealTimers()
    })

    it("should handle calls in the same direction with mixed directions", async () => {
      const elevator = new Elevator({currentFloor: 5, maxFloor: 10})
      vi.useFakeTimers()
      
      elevator.call(7, "UP")
      elevator.call(3, "DOWN")
      elevator.call(9, "UP")
      elevator.call(2, "DOWN")
      
      const visitedFloors: number[] = []
      
      for (let i = 0; i < 5; i++) {
        visitedFloors.push(elevator.currentFloor)
        vi.advanceTimersByTime(1000)
      }
      
      expect(visitedFloors).toEqual([5, 7, 9, 3, 2])
      
      vi.useRealTimers()
    })

    it("should handle calls in the same direction with mixed directions (down first)", async () => {
      const elevator = new Elevator({currentFloor: 5, maxFloor: 10})
      vi.useFakeTimers()
      
      elevator.call(3, "DOWN")
      elevator.call(7, "UP")
      elevator.call(2, "DOWN")
      elevator.call(9, "UP")
      
      const visitedFloors: number[] = []
      
      for (let i = 0; i < 5; i++) {
        visitedFloors.push(elevator.currentFloor)
        vi.advanceTimersByTime(1000)
      }
      
      expect(visitedFloors).toEqual([5, 3, 2, 7, 9])
      
      vi.useRealTimers()
    })
  })
})
