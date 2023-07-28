import { Request } from "express"
import { Response } from "express"
import sinon from "sinon"
import ContextImpl from "../context"
import EntryFactory from "../entryFactory"

const FAKE_REQ = ("req" as unknown) as Request
const FAKE_RES = ("res" as unknown) as Response

test('Can get entry', async () => {
    const TEST_KEY = "test entry key"
    const TEST_VALUE = "test entry value"

    const entryFactory = sinon.createStubInstance(EntryFactory)
    entryFactory.build.withArgs(TEST_KEY).returns(Promise.resolve(TEST_VALUE))

    const context = new ContextImpl(entryFactory, FAKE_REQ, FAKE_RES)

    const value = await context.get(TEST_KEY)

    expect(value).toBe(TEST_VALUE)
})

test('Caches entry', async () => {
    const TEST_KEY = "test entry key"
    const TEST_VALUE = "test entry value"

    const entryFactory = sinon.createStubInstance(EntryFactory)
    entryFactory.build.withArgs(TEST_KEY).returns(Promise.resolve(TEST_VALUE))

    const context = new ContextImpl(entryFactory, FAKE_REQ, FAKE_RES)

    await context.get(TEST_KEY)
    await context.get(TEST_KEY)

    expect(entryFactory.build.calledOnce).toBe(true)
})
