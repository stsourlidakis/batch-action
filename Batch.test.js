/* eslint-env jest */
const Batch = require('./Batch');

let batch, mockCallback;

beforeEach(() => {
	mockCallback = jest.fn();

	batch = new Batch({
		size: 5,
		action: mockCallback,
	});
});

test("Doesn't run the action until the batch is full", () => {
	batch.add('hello');

	expect(mockCallback.mock.calls.length).toBe(0);
});

test('Runs the action for every batch', () => {
	for (let i = 0; i < 17; i++) {
		batch.add(i);
	}
	expect(mockCallback.mock.calls.length).toBe(3);
});

test('Runs the action with correct arguments', () => {
	for (let i = 0; i < 10; i++) {
		batch.add(i);
	}

	expect(mockCallback.mock.calls[0][0]).toEqual([0, 1, 2, 3, 4]);
	expect(mockCallback.mock.calls[1][0]).toEqual([5, 6, 7, 8, 9]);
});

test('Runs the action when the force method is called', () => {
	batch.add(0);
	batch.add(1);
	batch.add(2);
	batch.force();

	expect(mockCallback.mock.calls.length).toBe(1);
});

test('Empties the batch when the force method is called', () => {
	batch.add(0);
	batch.add(1);
	batch.add(2);
	batch.force();

	expect(batch.getSize()).toBe(0);
});

test('Empties the batch when the clear method is called', () => {
	batch.add(0);
	batch.add(1);
	batch.add(2);
	batch.clear();

	expect(batch.getSize()).toBe(0);
});

test('Throws an error if the size option is missing or not an integer', () => {
	expect(
		() =>
			new Batch({
				action: mockCallback,
			})
	).toThrowError(/^Option "size" is not an integer$/);

	expect(
		() =>
			new Batch({
				size: 'foo',
				action: mockCallback,
			})
	).toThrowError(/^Option "size" is not an integer$/);
});

test('Throws an error if the action property is missing or not a function', () => {
	expect(
		() =>
			new Batch({
				size: 5,
			})
	).toThrowError(/^Option "action" is not a function$/);

	expect(
		() =>
			new Batch({
				size: 5,
				action: 'foo',
			})
	).toThrowError(/^Option "action" is not a function$/);
});
