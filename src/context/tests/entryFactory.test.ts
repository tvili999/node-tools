import { Request } from "express"
import EntryFactory from "../entryFactory"
import { Response } from "express"
import sinon from "sinon"

const FAKE_REQ = ("req" as unknown) as Request
const FAKE_RES = ("res" as unknown) as Response

test('Builds entry', async () => {
    const TEST_KEY = "test entry key"
    const TEST_VALUE = "test entry value"

    const factory = new EntryFactory()

    factory.addBuilder(TEST_KEY, async (req, res) => TEST_VALUE)

    const result = await factory.build(TEST_KEY, FAKE_REQ, FAKE_RES)

    expect(result).toBe(TEST_VALUE)
})

test('Builders get the correct args', async () => {
    const TEST_KEY = "test entry key"

    const factory = new EntryFactory()

    const stubBuilder = sinon.stub()
    factory.addBuilder(TEST_KEY, stubBuilder)

    await factory.build(TEST_KEY, FAKE_REQ, FAKE_RES)

    expect(stubBuilder.calledWithExactly(FAKE_REQ, FAKE_RES)).toBe(true)
})
