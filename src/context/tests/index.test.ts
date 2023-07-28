import { Request } from "express"
import { Response } from "express"
import sinon from "sinon"
import { ContextFactory } from "../index"

const FAKE_REQ = ("req" as unknown) as Request
const FAKE_RES = ("res" as unknown) as Response

test('Build and return value', async () => {
    const TEST_KEY = "test entry key"
    const TEST_VALUE = "test entry value"

    const contextFactory = new ContextFactory()

    const builderStub = sinon.stub()
        .withArgs(TEST_KEY).returns(Promise.resolve(TEST_VALUE))

    contextFactory.addBuilder(TEST_KEY, builderStub);

    const context = contextFactory.build(FAKE_REQ, FAKE_RES)

    await context.get(TEST_KEY)
    const value = await context.get(TEST_KEY)

    expect(value).toBe(TEST_VALUE)
    expect(builderStub.calledOnceWithExactly(FAKE_REQ, FAKE_RES))
})
