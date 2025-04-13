import type {ElevatorDirection, ElevatorQueueItem} from "./types"

export default class ElevatorQueue {
  private _queue: ElevatorQueueItem[] = []

  get queue(): ElevatorQueueItem[] {
    return structuredClone(this._queue)
  }

  get direction(): ElevatorDirection {
    return this._queue[0]?.dir ?? "UP"
  }

  get floors(): number[] {
    return this._queue.map((item) => item.floor)
  }

  get isEmpty(): boolean {
    return this._queue.length === 0
  }

  add(floor: number, dir: ElevatorDirection): void {
    if (!this._queue.some((item) => item.floor === floor && item.dir === dir)) {
      this._queue.push({floor, dir})
    }
  }

  remove(floor: number): void {
    this._queue = this._queue.filter((item) => item.floor !== floor)
  }

  findNextFloor(currentFloor: number, direction: ElevatorDirection, sweepComplete: boolean): number | null {
    if (this.isEmpty) return null

    if (direction === "UP") {
      if (!sweepComplete) {
        const upCandidates = this._queue.filter((item) => item.floor > currentFloor && item.dir === "UP").map((item) => item.floor)

        if (upCandidates.length > 0) {
          return Math.min(...upCandidates)
        } else {
          const pendingAbove = this._queue.filter((item) => item.floor > currentFloor).map((item) => item.floor)

          if (pendingAbove.length > 0) {
            return Math.max(...pendingAbove)
          }
        }
      }

      const downCandidates = this._queue.filter((item) => item.floor < currentFloor && item.dir === "DOWN").map((item) => item.floor)

      if (downCandidates.length) return Math.max(...downCandidates)
    } else if (direction === "DOWN") {
      if (!sweepComplete) {
        const downCandidates = this._queue.filter((item) => item.floor < currentFloor && item.dir === "DOWN").map((item) => item.floor)

        if (downCandidates.length) return Math.max(...downCandidates)

        const pendingBelow = this._queue.filter((item) => item.floor < currentFloor).map((item) => item.floor)
        if (pendingBelow.length) return Math.min(...pendingBelow)
      }

      const upCandidates = this._queue.filter((item) => item.floor > currentFloor && item.dir === "UP").map((item) => item.floor)

      if (upCandidates.length) return Math.min(...upCandidates)
    }

    return currentFloor
  }
}
