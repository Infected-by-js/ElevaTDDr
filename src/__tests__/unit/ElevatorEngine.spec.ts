import ElevatorEngine from "@/core/elevator/ElevatorEngine"
import {describe, expect, it, vi} from "vitest"

describe("ElevatorEngine", () => {
  it("should be defined", () => {
    const engine = new ElevatorEngine()
    expect(engine).toBeDefined()
  })

  it("should have isRunning property that is false by default", () => {
    const engine = new ElevatorEngine()
    expect(engine.isRunning).toBe(false)
  })

  it("should set isRunning to true when started", () => {
    const engine = new ElevatorEngine()
    engine.start()
    expect(engine.isRunning).toBe(true)
  })

  it("should set isRunning to false when stopped", () => {
    const engine = new ElevatorEngine()
    engine.start()
    engine.stop()
    expect(engine.isRunning).toBe(false)
  })

  it("should not start if already running", () => {
    const engine = new ElevatorEngine()
    engine.start()
    engine.start()
    expect(engine.isRunning).toBe(true)
  })

  it("should call onTick callback after specified interval", async () => {
    const spy = vi.fn()
    const speed = 1000
    const engine = new ElevatorEngine({ speed, onTick: spy })

    engine.start()
    expect(engine.isRunning).toBe(true)

    await new Promise(resolve => setTimeout(resolve, speed + 100))
    expect(spy).toHaveBeenCalledTimes(1)
    
    engine.stop()
    expect(engine.isRunning).toBe(false)
  })

  it("should use default speed of 1000ms if not specified", async () => {
    const spy = vi.fn()
    const engine = new ElevatorEngine({ onTick: spy })

    engine.start()
    await new Promise(resolve => setTimeout(resolve, 1100))
    expect(spy).toHaveBeenCalledTimes(1)
    
    engine.stop()
  })

  it("should destroy", () => {
    const engine = new ElevatorEngine()
    engine.start()
    engine.destroy()
    expect(engine.isRunning).toBe(false)
  })
})
