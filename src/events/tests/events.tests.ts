import Event from "../events.js"
import sinon from "sinon"


test('fires event multiple times', () => {
    const TEST_ARGS = ['arg1', 'arg2']

    const event = new Event()

    const mockHandler = sinon.stub()
    event.on(mockHandler)

    event.fire(...TEST_ARGS)
    event.fire(...TEST_ARGS)

    expect(mockHandler.callCount).toBe(2)
    expect(mockHandler.alwaysCalledWithExactly(...TEST_ARGS))
})

test('fires event once', () => {
    const TEST_ARGS = ['arg1', 'arg2']

    const event = new Event()

    const mockHandler = sinon.stub()
    event.once(mockHandler)

    event.fire(...TEST_ARGS)
    event.fire(...TEST_ARGS)

    expect(mockHandler.calledOnceWithExactly(...TEST_ARGS))
})


test('does not fire event after unsubscribe', () => {
    const TEST_ARGS = ['arg1', 'arg2']

    const event = new Event()

    const mockHandler = sinon.stub()
    event.on(mockHandler)

    event.fire(...TEST_ARGS)
    event.fire(...TEST_ARGS)

    event.off(mockHandler)
    event.fire(...TEST_ARGS)

    expect(mockHandler.callCount).toBe(2)
})
