/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	// get node at index
	_get(idx) {
		if (idx > this.length || idx < 0) {
			throw new Error("Invalid index.");
		}

		let cur = this.head;
		let count = 0;

		while (cur !== null && count != idx) {
			count += 1;
			cur = cur.next;
		}

		return cur;
	}

	/** push(val): add new value to end of list. */

	push(val) {
		let newNode = new Node(val);

		if (this.head === null) this.head = newNode;

		if (this.tail !== null) this.tail.next = newNode;

		this.tail = newNode;
		this.length++;
	}

	/** unshift(val): add new value to start of list. */

	unshift(val) {
		let newNode = new Node(val);
		newNode.next = this.head;
		this.head = newNode;
		if (this.tail === null) this.tail = newNode;
		this.length++;
	}

	/** pop(): return & remove last item. */

	pop() {
		return this.removeAt(this.length - 1);
	}

	/** shift(): return & remove first item. */

	shift() {
		return this.removeAt(0);
	}

	/** getAt(idx): get val at idx. */

	getAt(idx) {
		let node = this._get(idx);
		return node.val;
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		let node = this._get(idx);
		node.val = val;
	}

	/** insertAt(idx, val): add node w/val before idx. */

	insertAt(idx, val) {
		// if index is head
		if (idx == 0) {
			return this.unshift(val);
		} else if (idx == this.length) {
			// if index is tail
			return this.push(val);
		} else {
			// insert into middle of list
			let newNode = new Node(val);
			let prevNode = this._get(idx - 1);
			newNode.next = prevNode.next;
			prevNode.next = newNode;
			this.length++;
		}
	}

	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		// if index is head
		if (idx === 0) {
			let node = this.head;
			this.head = node.next;
			this.length--;
			if (this.length === 0) {
				this.head = null;
				this.tail = null;
			}
			return node.val;
		} else {
			let prevNode = this._get(idx - 1);
			// if index is tail
			if (prevNode.next == this.tail) {
				let oldTail = prevNode.next;
				this.tail = prevNode;
				this.length--;
				return oldTail.val;
			} else {
				// remove from middle of list
				oldNode = prevNode.next;
				prevNode.next = oldNode.next;
				this.length--;
				return oldNode.val;
			}
		}
	}

	/** average(): return an average of all values in the list */

	average() {
		const avgArr = [];
		for (let i = 0; i < this.length; i++) {
			avgArr.push(this.getAt(i));
		}
		if (!avgArr[0]) {
			return 0;
		}
		return avgArr.reduce((a, b) => a + b) / avgArr.length;
	}
}

module.exports = LinkedList;
