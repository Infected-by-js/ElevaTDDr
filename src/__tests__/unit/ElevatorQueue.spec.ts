import ElevatorQueue from "@/core/elevator/ElevatorQueue"
import { describe, expect, it } from "vitest"

describe("ElevatorQueue", () => {
  it("should be defined", () => {
    const queue = new ElevatorQueue()
    expect(queue).toBeDefined()
  })

  it("should initialize with empty queue", () => {
    const queue = new ElevatorQueue()
    expect(queue.isEmpty).toBe(true)
    expect(queue.floors).toEqual([])
    expect(queue.queue).toEqual([])
  })

  it("should add item to queue", () => {
    const queue = new ElevatorQueue()
    queue.add(5, "UP")
    expect(queue.isEmpty).toBe(false)
    expect(queue.floors).toEqual([5])
    expect(queue.direction).toEqual("UP")
  })

  it("should not add duplicate items", () => {
    const queue = new ElevatorQueue()
    queue.add(5, "UP")
    queue.add(5, "UP")
    expect(queue.floors).toEqual([5])
    expect(queue.queue).toEqual([{floor: 5, dir: "UP"}])
  })

  it("should add item with same floor but different direction", () => {
    const queue = new ElevatorQueue()
    queue.add(5, "UP")
    queue.add(5, "DOWN")
    expect(queue.floors).toEqual([5, 5])
    expect(queue.queue).toEqual([{floor: 5, dir: "UP"}, {floor: 5, dir: "DOWN"}])
  })

  it("should remove item from queue", () => {
    const queue = new ElevatorQueue()
    queue.add(5, "UP")
    queue.add(6, "DOWN")
    queue.remove(5)
    expect(queue.floors).toEqual([6])
    expect(queue.queue).toEqual([{floor: 6, dir: "DOWN"}])
  })

  describe("findNextFloor", () => {
    it("should return null for empty queue", () => {
      const queue = new ElevatorQueue()
      expect(queue.findNextFloor(1, "UP", false)).toBeNull()
    })

    it("should find next floor going UP with UP request above", () => {
      const queue = new ElevatorQueue()
      queue.add(5, "UP")
      queue.add(7, "UP")
      queue.add(3, "DOWN")
      expect(queue.findNextFloor(1, "UP", false)).toBe(5)
    })

    it("should find next floor going UP with any floor above when no UP requests", () => {
      const queue = new ElevatorQueue()
      queue.add(5, "DOWN")
      queue.add(7, "DOWN")
      expect(queue.findNextFloor(1, "UP", false)).toBe(7)
    })

    it("should find next floor going DOWN with DOWN request below", () => {
      const queue = new ElevatorQueue()
      queue.add(5, "DOWN")
      queue.add(3, "DOWN")
      queue.add(7, "UP")
      expect(queue.findNextFloor(10, "DOWN", false)).toBe(5)
    })

    it("should find next floor going DOWN with any floor below when no DOWN requests", () => {
      const queue = new ElevatorQueue()
      queue.add(5, "UP")
      queue.add(3, "UP")
      expect(queue.findNextFloor(10, "DOWN", false)).toBe(3)
    })

    it("should switch direction from UP to DOWN when sweepComplete is true", () => {
      const queue = new ElevatorQueue()
      queue.add(3, "DOWN")
      queue.add(1, "DOWN")
      expect(queue.findNextFloor(10, "UP", true)).toBe(3)
    })

    it("should switch direction from DOWN to UP when sweepComplete is true", () => {
      const queue = new ElevatorQueue()
      queue.add(7, "UP")
      queue.add(10, "UP")
      expect(queue.findNextFloor(1, "DOWN", true)).toBe(7)
    })
  })
}) 