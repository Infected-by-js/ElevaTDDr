export default class ElevatorEngine {
  private intervalId: ReturnType<typeof setInterval> | null = null
  private _isRunning: boolean = false
  private _speed: number = 1000
  private _onTick: (() => void) | null = null

  constructor(options?: {speed?: number; onTick?: () => void}) {
    if (options) {
      this._speed = options.speed ?? 1000
      this._onTick = options.onTick ?? null
    }
    console.log('ElevatorEngine created with speed:', this._speed);
  }

  get isRunning(): boolean {
    return this._isRunning
  }

  start() {
    if (this._isRunning) return

    console.log('ElevatorEngine starting with interval:', this._speed);
    this._isRunning = true
    this.intervalId = setInterval(() => {
      console.log('ElevatorEngine tick');
      this._onTick?.();
    }, this._speed)
  }

  stop() {
    console.log('ElevatorEngine stopping');
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this._isRunning = false
  }

  destroy() {
    console.log('ElevatorEngine destroyed');
    this.stop()
  }
}
