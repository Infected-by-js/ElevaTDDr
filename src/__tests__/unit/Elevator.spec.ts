import {Elevator} from "@/core/elevator"
import {describe, expect, it} from "vitest"

describe("Elevator", () => {
  it("should create an elevator", () => {
    const elevator = new Elevator()
    expect(elevator).toBeDefined()
  })

  it("should be at a default 1st floor", () => {
    //
  })

  it("should have a empty queue", () => {
    //
  })
})
