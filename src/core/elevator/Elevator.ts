import ElevatorEngine from "./ElevatorEngine"
import ElevatorQueue from "./ElevatorQueue"

import type {ElevatorDirection, ElevatorState} from "./types"

export default class Elevator {
  static readonly IDLE: ElevatorState = "IDLE"
  static readonly MOVING_UP: ElevatorState = "MOVING_UP"
  static readonly MOVING_DOWN: ElevatorState = "MOVING_DOWN"
  static readonly DOORS_OPENING: ElevatorState = "DOORS_OPENING"
  static readonly DOORS_CLOSING: ElevatorState = "DOORS_CLOSING"

  private _state: ElevatorState = Elevator.IDLE
  private _currentFloor: number
  private _maxFloor: number
  private _direction: ElevatorDirection = "UP"
  private _sweepComplete: boolean = false
  private _queueManager: ElevatorQueue
  private engine: ElevatorEngine
  private _speed: number

  constructor({
    currentFloor = 1,
    speed = 1,
    maxFloor = 4,
  }: {
    currentFloor?: number
    speed?: number
    maxFloor?: number
  } = {}) {
    this._speed = this.validateSpeed(speed)
    this._maxFloor = this.validateMaxFloor(maxFloor)
    this._currentFloor = this.validateFloor(currentFloor, this._maxFloor)

    this._queueManager = new ElevatorQueue()

    this.engine = new ElevatorEngine({
      speed: this._speed * 1000,
      onTick: () => this._move(),
    })
  }

  validateFloor(floor: number, maxFloor: number): number {
    if (floor < 1 || floor > maxFloor) throw new Error(`Invalid floor: ${floor}. Must be between 1 and ${maxFloor}`)
    return floor
  }

  validateSpeed(speed: number): number {
    if (speed <= 0) throw new Error(`Invalid speed: ${speed}. Must be greater than 0`)
    return speed
  }

  validateMaxFloor(maxFloor: number): number {
    if (maxFloor <= 1) throw new Error(`Invalid maxFloor: ${maxFloor}. Must be greater than 1`)
    return maxFloor
  }

  get state(): ElevatorState {
    return this._state
  }

  get currentFloor(): number {
    return this._currentFloor
  }

  get speed(): number {
    return this._speed
  }

  get maxFloor(): number {
    return this._maxFloor
  }

  get queue(): number[] {
    return this._queueManager.floors
  }

  get direction(): ElevatorDirection {
    return this._direction
  }

  call(floor: number, dir: ElevatorDirection): void {
    try {
      this.validateFloor(floor, this._maxFloor)
      this._queueManager.add(floor, dir)
      console.log(`Elevator.call(${floor}, ${dir}): Called elevator to floor ${floor} with direction ${dir}`);
      this.startIfIdle()
    } catch (error) {
      console.error(error)
    }
  }

  selectFloor(floor: number): void {
    try {
      this.validateFloor(floor, this._maxFloor)
      const dir = floor > this._currentFloor ? "UP" : "DOWN"
      this._queueManager.add(floor, dir)
      console.log(`Elevator.selectFloor(${floor}): Selected floor ${floor}, direction ${dir}`);
      this.startIfIdle()
    } catch (error) {
      console.error(error)
    }
  }

  destroy(): void {
    this.stop()
    this.engine.destroy()
  }

  private startIfIdle(): void {
    console.log(`Elevator.startIfIdle(): Engine running: ${this.engine.isRunning}, State: ${this._state}`);
    if (!this.engine.isRunning) this.engine.start()
  }

  private _move(): void {
    if (this._queueManager.isEmpty) return

    console.log(`Elevator._move(): Current floor: ${this._currentFloor}, State: ${this._state}, Direction: ${this._direction}`);
    if (this._state === Elevator.IDLE) {
      this._direction = this._queueManager.direction
      this._sweepComplete = false
    }

    const nextFloor = this._queueManager.findNextFloor(this._currentFloor, this._direction, this._sweepComplete)
    console.log(`Elevator._move(): Next floor: ${nextFloor}, Queue: ${JSON.stringify(this._queueManager.floors)}`);

    if (nextFloor !== null) {
      if (nextFloor !== this._currentFloor) {
        if (nextFloor > this._currentFloor) {
          this._state = Elevator.MOVING_UP
          console.log(`Elevator._move(): Moving UP to floor ${nextFloor}`);
        } else if (nextFloor < this._currentFloor) {
          this._state = Elevator.MOVING_DOWN
          console.log(`Elevator._move(): Moving DOWN to floor ${nextFloor}`);
        }

        if (this._direction === "UP" && this._state === Elevator.MOVING_DOWN) {
          this._sweepComplete = true
        } else if (this._direction === "DOWN" && this._state === Elevator.MOVING_UP) {
          this._sweepComplete = true
        }

        this._queueManager.remove(nextFloor)
        this._currentFloor = nextFloor
        console.log(`Elevator._move(): Arrived at floor ${this._currentFloor}`);
      }

      if (this._sweepComplete) {
        this._direction = this._direction === "UP" ? "DOWN" : "UP"
        this._sweepComplete = false
        console.log(`Elevator._move(): Sweep complete, changing direction to ${this._direction}`);
      }
    }
  }

  private stop(): void {
    this.engine.stop()
    this._state = Elevator.IDLE
  }
}
