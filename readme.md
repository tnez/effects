`@tnezdev/effects`

## Thesis

All applications need to interact with the outside world in some way to do anything meaningful. An application is a combination of domain-specific **business logic** and generalized **side-effects** that define what lasting effect domain events should have and where those effects should be expressed. But these **side-effects** do not and _should not_ be unique to each application. We can share familiar expectations between our applications so that all of our focus can be pointed at solving problems in the business domain rather than trying to figure out what our data model should be.

We can express this as a pattern of **Actions (domain specific business logic)** and **Effects (generalized side-effects)**.

Examples of possible **Actions**:

- Create A New User
- Update User Preferences
- Add an Item to a Cart
- Place an Order

Examples of **Effects**:

- Create Data Record
- Update Data Record
- Enqueue A Job
- Dequeue A Job
- Emit a Log
- Query External Data

`@tnezdev/effects` is an attempt to formally define interfaces for these **side-effects**.

The aim is to allow developers to reserve mental energy for domain-specific problem solving rather than having to think through implementation details for data-persistence, or some other low-level, but required work.

In short, focus on the things that differentiate your product while applying reusable patterns to your applications plumbing.

## Prior Art

This is heavily inspired by the `ports` and `adapters` pattern employed by the team at [hyper.io](https://blog.hyper.io/clean-architecture-at-hyper/). I was inspired by their work and wanted to create something that captured _some_ of their ideas in a very lightweight way. After some false starts, I landed on the idea of publishing only the **interfaces** of common application effects.

## Getting Started

### NPM

`npm install --save-dev @tnezdev/effects`

### Yarn

`yarn add --dev @tnezdev/effects`

### PNPM

`pnpm add --save-dev @tnezdev/effects`

## Usage

As you develop your application, we suggest consolidating your business logic in self-contained, reusable **actions**. You may have something like:

```ts
import type { Data, Jobs, Logs } from '@tnezdev/effects'

export type CreateNewUserActionContext = {
  data: Data
  jobs: Jobs
  logs: Logs
}

export type CreateNewUserActionInput = {
  email: string
  tags: string[]
}

export class CreateNewUserAction {
  private readonly data: Data
  private readonly jobs: Jobs
  private readonly logs: Logs

  constructor(context: CreateNewUserActionContext) {
    this.data = context.data
    this.jobs = context.jobs
    this.logs = context.logs
  }

  async execute(input: CreateNewUserActionInput) {
    const user = await data.insertRecord({
      type: 'user',
      version: '1.0',
      data: JSON.stringify(input),
    })

    await jobs.enqueue({
      topic: 'build_related_user_list',
      data: JSON.stringify({ userId: user.id }),
    })

    await logs.emit(`Created new user: ${user.id}`)

    return user
  }
}
```

Which can be unit-tested, completely isolated from the implementation details of any database, queue, or log service.

```ts
import {
  CreateNewUserAction,
  CreateNewUserActionContext,
  CreateNewUserActionInput,
} from './create-new-user-action'

describe('CreateNewUserAction', () => {
  test('it should create a new user record', async () => {
    // Given
    const context = createMockContext()
    const action = new CreateNewUserAction(context)
    const input: CreateNewUserActionInput = {
      email: 'user@example.com',
      tags: ['beta', 'priority'],
    }

    // When
    await action.execute(input)

    // Then
    expect(context.data).toHaveBeenCalledWith({
      type: 'user',
      version: '1.0',
      data: JSON.stringify(input),
    })
  })

  test('it should enqueue a job to build a related user list', async () => {
    // Given
    const context = createMockContext()
    const action = new CreateNewUserAction(context)
    const input: CreateNewUserActionInput = {
      email: 'user@example.com',
      tags: ['beta', 'priority'],
    }

    // When
    const user = await action.execute(input)

    // Then
    expect(context.jobs).toHaveBeenCalledWith({
      topic: 'build_related_user_list',
      data: JSON.stringify({ userId: user.id }),
    })
  })

  test('it should emit a log', async () => {
    // Given
    const context = createMockContext()
    const action = new CreateNewUserAction(context)
    const input: CreateNewUserActionInput = {
      email: 'user@example.com',
      tags: ['beta', 'priority'],
    }

    // When
    const user = await action.execute(input)

    // Then
    expect(context.jobs).toHaveBeenCalledWith({
      topic: 'build_related_user_list',
      data: JSON.stringify({ userId: user.id }),
    })
  })
})

const DEFAULT_MOCK_INSERT_RECORD_IMPLEMENTATION = async () => ({
  id: 'USER-ID-1234',
})
function createMockContext(
  insertRecordMockImplementation = DEFAULT_MOCK_INSERT_RECORD_IMPLEMENTATION,
): CreateNewUserActionContext {
  return {
    data: {
      insertRecord: jest
        .fn()
        .mockImplementationOnce(insertRecordMockImplementation),
    },
    jobs: {
      dequeue: jest.fn(),
      enqueue: jest.fn(),
    },
    logs: {
      emit: jest.fn(),
    },
  }
}
```
