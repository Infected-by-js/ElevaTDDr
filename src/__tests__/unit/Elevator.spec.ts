import {Elevator} from "@/core/elevator"
import {describe, expect, it} from "vitest"

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
      expect(typeof elevator.move).toBe("function")
      expect(typeof elevator.stop).toBe("function")
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
})
