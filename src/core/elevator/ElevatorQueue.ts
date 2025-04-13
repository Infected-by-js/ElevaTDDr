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
      console.log(`ElevatorQueue.add(${floor}, ${dir}): Added to queue. Current queue:`, this.floors);
    } else {
      console.log(`ElevatorQueue.add(${floor}, ${dir}): Already in queue`);
    }
  }

  remove(floor: number): void {
    const beforeLength = this._queue.length;
    this._queue = this._queue.filter((item) => item.floor !== floor)
    const afterLength = this._queue.length;
    console.log(`ElevatorQueue.remove(${floor}): Removed ${beforeLength - afterLength} items. Remaining queue:`, this.floors);
  }

  findNextFloor(currentFloor: number, direction: ElevatorDirection, sweepComplete: boolean): number | null {
    if (this.isEmpty) {
      console.log('ElevatorQueue.findNextFloor: Queue is empty');
      return null;
    }

    console.log(`ElevatorQueue.findNextFloor(${currentFloor}, ${direction}, ${sweepComplete}): Finding next floor`);
    let nextFloor: number | null = null;

    if (direction === "UP") {
      if (!sweepComplete) {
        const upCandidates = this._queue.filter((item) => item.floor > currentFloor && item.dir === "UP").map((item) => item.floor)

        if (upCandidates.length > 0) {
          nextFloor = Math.min(...upCandidates);
          console.log(`ElevatorQueue.findNextFloor: Found UP candidates above current floor:`, upCandidates, `Selected:`, nextFloor);
          return nextFloor;
        } else {
          const pendingAbove = this._queue.filter((item) => item.floor > currentFloor).map((item) => item.floor)

          if (pendingAbove.length > 0) {
            nextFloor = Math.max(...pendingAbove);
            console.log(`ElevatorQueue.findNextFloor: Found pending above current floor:`, pendingAbove, `Selected:`, nextFloor);
            return nextFloor;
          }
        }
      }

      const downCandidates = this._queue.filter((item) => item.floor < currentFloor && item.dir === "DOWN").map((item) => item.floor)

      if (downCandidates.length) {
        nextFloor = Math.max(...downCandidates);
        console.log(`ElevatorQueue.findNextFloor: Found DOWN candidates below current floor:`, downCandidates, `Selected:`, nextFloor);
        return nextFloor;
      }
    } else if (direction === "DOWN") {
      if (!sweepComplete) {
        const downCandidates = this._queue.filter((item) => item.floor < currentFloor && item.dir === "DOWN").map((item) => item.floor)

        if (downCandidates.length) {
          nextFloor = Math.max(...downCandidates);
          console.log(`ElevatorQueue.findNextFloor: Found DOWN candidates below current floor:`, downCandidates, `Selected:`, nextFloor);
          return nextFloor;
        }

        const pendingBelow = this._queue.filter((item) => item.floor < currentFloor).map((item) => item.floor)
        if (pendingBelow.length) {
          nextFloor = Math.min(...pendingBelow);
          console.log(`ElevatorQueue.findNextFloor: Found pending below current floor:`, pendingBelow, `Selected:`, nextFloor);
          return nextFloor;
        }
      }

      const upCandidates = this._queue.filter((item) => item.floor > currentFloor && item.dir === "UP").map((item) => item.floor)

      if (upCandidates.length) {
        nextFloor = Math.min(...upCandidates);
        console.log(`ElevatorQueue.findNextFloor: Found UP candidates above current floor:`, upCandidates, `Selected:`, nextFloor);
        return nextFloor;
      }
    }

    console.log(`ElevatorQueue.findNextFloor: No suitable floor found, returning current floor:`, currentFloor);
    return currentFloor;
  }
}
