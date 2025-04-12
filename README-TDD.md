# 🧪 TDD Test Cases for Elevator Simulator (structured by TDD steps)

> Each step corresponds to a test-driven development stage: 
> TEST -> IMPLEMENTATION -> REFACTOR.

## Step 1: Basic Model (Unit Tests)

Goal - create a minimal working elevator model with API, initial state and basic logic.

| Name                                   | Description                                             | Goal                                       |
| -------------------------------------- | ------------------------------------------------------- | ------------------------------------------ |
| Elevator Creation                      | Verify that elevator is created                         | Initial structure and model initialization |
| Initial State                          | Check that elevator starts on 1st floor                 | Set starting floor                         |
| Empty Queue                            | Queue should be empty                                   | Ensure no default requests                 |
| Method Availability Check              | All public elevator methods are accessible and callable | Prepare for API usage                      |
| Elevator Doesn't Start Automatically   | After creation elevator doesn't start moving            | Verify control only through calls          |
| Support for Arbitrary Number of Floors | Elevator works with any number of floors                | Model scalability                          |

---

## Step 2: Call Processing (TDD - Outside-In)

Goal - define behavior when receiving external calls (up/down), without UI.

| Name                          | Description                                  | Goal                                   |
| ----------------------------- | -------------------------------------------- | -------------------------------------- |
| Up Call                       | Call from floor (up) is added to queue       | Basic call registration                |
| Down Call                     | Call from floor (down) is added to queue     | Check direction and addition           |
| Repeated Call Ignored         | Repeated call is not duplicated              | Prevent flooding                       |
| Movement Direction Processing | Call in same direction is processed en route | Route optimization                     |
| Elevator Call During Movement | Call is processed while moving               | Dynamic queue                          |
| Call from Non-existent Floor  | Attempt to call from invalid number          | Input validation                       |
| Single Call Button Handler    | All buttons use one handler                  | Architectural subscription requirement |

---

## Step 3: Movement and Queue (Unit + Integration)

Goal - teach elevator to process queue, stop, transition to Idle and return to first floor.

| Name                    | Description                               | Goal                          |
| ----------------------- | ----------------------------------------- | ----------------------------- |
| Next Call Processing    | After reaching target, next call is taken | FIFO queue                    |
| Floor Transitions       | Elevator moves on command                 | Basic movement simulation     |
| Transition to Wait Mode | Empty queue - Idle status                 | State management              |
| Wait Before Movement    | Elevator waits 5 seconds before new call  | Simulate passenger entry/exit |

---

## Step 4: Cabin Panel (Integration + Edge Cases)

Goal - implement behavior for passenger interaction with control panel in cabin.

| Name                              | Description                                  | Goal                             |
| --------------------------------- | -------------------------------------------- | -------------------------------- |
| Panel Button Press                | Adds floor to queue                          | Internal movement control        |
| Transition to Selection Wait Mode | Elevator waits 5 seconds before moving       | In-cabin behavior                |
| Automatic Next Call               | Without selection - process next             | Handle inaction                  |
| Ignore Repeated Floor             | Repeated current floor selection - no effect | UX and reliability               |
| Out-of-Range Press                | Error button is ignored                      | Input safety                     |
| Panel Inactive During Movement    | Buttons temporarily blocked                  | UX: prevent duplicate selections |
| Single Panel Handler              | All buttons use one handler                  | Architectural integrity          |

---

## Step 5: Idle State Behavior (FSM)

Goal - correct behavior in Idle, including return to 1st floor and its cancellation on new actions.

| Name                | Description                       | Goal                    |
| ------------------- | --------------------------------- | ----------------------- |
| Return to 1st Floor | With empty queue - return to base | Cycle completion        |
| Return Interruption | Call interrupts return            | Incoming event priority |

---

## Step 6: Limits and Events (UX + Robustness)

Goal - overload protection and UX hints.

| Name                   | Description             | Goal                 |
| ---------------------- | ----------------------- | -------------------- |
| Call Limit Exceeded    | Queue refuses new calls | Safety and stability |
| Warning Sound Playback | Audio on overload       | UX and feedback      |

---

## Step 7: UI and e2e Behavior

Goal - test end user scenarios.

| Name                            | Description                          | Goal                       |
| ------------------------------- | ------------------------------------ | -------------------------- |
| All Buttons Display             | UI matches building layout           | Visual structure           |
| Visual Elevator Movement        | Cabin moves with animation           | Feedback and realism       |
| Floor Button Activation         | Call initiated by user               | e2e behavior test          |
| Cabin Button Activation         | Selection triggers action            | User flow                  |
| Button Deactivation After Press | Not clickable until command complete | UX hint                    |
| Repeated Click on Active Button | Ignored                              | Flood protection           |
| Check for Multiple Handlers     | No event duplicates                  | Protect from leaks and lag |

---

## Step 8: Bonus Features

Goal - realism and activity simulation.

| Name                        | Description                            | Goal               |
| --------------------------- | -------------------------------------- | ------------------ |
| Arrival Sound Playback      | Elevator plays sound when stopping     | UX and atmosphere  |
| Random Passenger Generation | Simulates real calls                   | Load and scenarios |
| Appearance Interval Setting | Control passenger appearance frequency | Case customization |
