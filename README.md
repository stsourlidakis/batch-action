# batch-action [![codecov](https://codecov.io/gh/stsourlidakis/batch-action/branch/master/graph/badge.svg)](https://codecov.io/gh/stsourlidakis/batch-action)

Batch items and execute an action when a batch reaches the specified size

## Examples

```js
const Batch = require('batch-action');

function printMessage(items) {
	console.log(`Received batch with ${items.length} item(s)`);
}

const batch = new Batch({
	size: 3, // the action will be invoked every time 3 items are added
	action: printMessage,
});

batch.add('a');
batch.add('b');
batch.add(143);
// Action gets invoked with ['a', 'b', 143] and prints "Received batch with 3 item(s)"

batch.add('foo');
batch.force();
// Action gets invoked with ['foo'] and prints "Received batch with 1 item(s)"

batch.add('bar');
batch.getSize();
// => 1

batch.clear();
batch.getSize();
// => 0

batch.add({ name: 'John' });
batch.add('bar');
batch.items;
// => [{ name: 'John' }, 'bar']
```

## Initialization

```js
new Batch(options);
```

Returns a new `Batch` instance

### options

Type: `object`

##### size

Type: `number`\
Minimum: `1`\
Required

The maximum batch size

##### action

Type: `function`\
Required

The action that will be invoked every time the batch reaches the specified size

## Batch instance API

### .add(item)

Adds the provided item to the batch, the item can be of any type\
If the batch reaches the specified size with this item, `action` will be invoked

### .force()

Invokes `action` with the current items in the batch and then removes all items

### .clear()

Removes all items from the batch

### .getSize()

Returns the number of items in the current batch

### .items

The array containing the items
