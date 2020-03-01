class Batch {
	/**
	 * Batches items and executes an action when a batch reaches the specified size
	 * @param {Object} options
	 * @property {number} options.size - The size of each batch
	 * @property {function} options.action - The function to run when a batch is full
	 */
	constructor(options) {
		if (typeof options.action !== 'function') {
			throw new Error('Option "action" is not a function');
		}

		this.batch = [];
		this.maxSize = Number.parseInt(options.size);
		this.action = options.action;

		if (Number.isNaN(this.maxSize) || this.maxSize < 1) {
			throw new Error('Option "size" is not a positive integer');
		}
	}

	add(item) {
		this.batch.push(item);

		if (this.batch.length >= this.maxSize) {
			this.force();
		}
	}

	force() {
		this.action(this.batch);
		this.clear();
	}

	clear() {
		this.batch = [];
	}

	getSize() {
		return this.batch.length;
	}
}

module.exports = Batch;
