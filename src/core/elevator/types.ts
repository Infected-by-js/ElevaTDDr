export type ElevatorState = "IDLE" | "MOVING_UP" | "MOVING_DOWN" | "DOORS_OPENING" | "DOORS_CLOSING"
export type ElevatorDirection = "UP" | "DOWN"
export type ElevatorQueueItem = {floor: number; dir: ElevatorDirection} 