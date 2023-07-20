import { Request } from "express"
import ContextFactory from "../contextFactory"
import { Response } from "express"
import sinon from "sinon"

const FAKE_REQ = ("req" as unknown) as Request
const FAKE_RES = ("res" as unknown) as Response

test('Builds context', async () => {
    const factory = new ContextFactory()
    const context = factory.build(FAKE_REQ, FAKE_RES)

    expect(context).toBeTruthy()
})

test('Can add builders', async () => {
    const TEST_KEY = "test entry key"

    const factory = new ContextFactory()

    const stubBuilder = sinon.stub()
    factory.addBuilder(TEST_KEY, stubBuilder)
})
