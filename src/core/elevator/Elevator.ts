type ElevatorState = "IDLE" | "MOVING_UP" | "MOVING_DOWN" | "DOORS_OPENING" | "DOORS_CLOSING"

export default class Elevator {
  static readonly IDLE: ElevatorState = "IDLE"
  static readonly MOVING_UP: ElevatorState = "MOVING_UP"
  static readonly MOVING_DOWN: ElevatorState = "MOVING_DOWN"
  static readonly DOORS_OPENING: ElevatorState = "DOORS_OPENING"
  static readonly DOORS_CLOSING: ElevatorState = "DOORS_CLOSING"

  private _state: ElevatorState = Elevator.IDLE
  private _currentFloor: number = 1
  private _speed: number = 1
  private _maxFloor: number = 4
  private _queue: number[] = []

  constructor({currentFloor = 1, speed = 1, maxFloor = 4}: {currentFloor?: number; speed?: number; maxFloor?: number} = {}) {
    this._currentFloor = this.validateFloor(currentFloor, maxFloor)
    this._speed = this.validateSpeed(speed)
    this._maxFloor = this.validateMaxFloor(maxFloor)
  }

  validateFloor(floor: number, maxFloor: number) {
    if (floor < 1 || floor > maxFloor) throw new Error(`Invalid floor: ${floor}. Must be between 1 and ${maxFloor}`)
    return floor
  }

  validateSpeed(speed: number) {
    if (speed <= 0) throw new Error(`Invalid speed: ${speed}. Must be greater than 0`)
    return speed
  }

  validateMaxFloor(maxFloor: number) {
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
    return structuredClone(this._queue)
  }

  call(floor: number) {
    this._queue.push(floor)
  }

  selectFloor(floor: number) {
    this._queue.push(floor)
  }

  move() {
    if (!this._queue.length) return

    const nextFloor = this._queue.shift()
    if (!nextFloor) return

    this._currentFloor = nextFloor
  }

  stop() {
    this._state = Elevator.IDLE
  }
}