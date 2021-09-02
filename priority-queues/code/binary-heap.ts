class BinaryHeap<A> {
  private elements: A[] = [];

  constructor(private greaterThan: (x: A, y: A) => boolean) {}

  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  push(x: A) {
    this.elements.push(x);
    this.siftUp();
  }

  private siftUp() {
    let focusedIndex = this.elements.length - 1;

    while (focusedIndex > 0) {
      const parentIndex = Math.floor((focusedIndex - 1) / 2);

      const focusedValue = this.elements[focusedIndex];
      const parentValue = this.elements[parentIndex];

      if (this.greaterThan(focusedValue, parentValue)) {
        this.elements[focusedIndex] = parentValue;
        this.elements[parentIndex] = focusedValue;
        focusedIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  peek(): A | null {
    if (this.elements.length === 0) {
      return null;
    }

    return this.elements[0];
  }

  pop(): A | null {
    if (this.elements.length === 0) {
      return null;
    }

    const root = this.elements[0];
    const last = this.elements.pop() as A;
    if (root !== last) {
      this.elements[0] = last;
      this.siftDown();
    }

    return root;
  }

  private siftDown() {
    let parentIndex = 0;

    while (true) {
      const lChildIndex = 2 * parentIndex + 1;
      const rChildIndex = 2 * parentIndex + 2;

      const parentValue = this.elements[parentIndex];
      const lChildValue = this.elements[lChildIndex];
      const rChildValue = this.elements[rChildIndex];

      if (
        (lChildValue && this.greaterThan(lChildValue, parentValue)) ||
        (rChildValue && this.greaterThan(rChildValue, parentValue))
      ) {
        if (rChildValue && this.greaterThan(rChildValue, lChildValue)) {
          this.elements[rChildIndex] = parentValue;
          this.elements[parentIndex] = rChildValue;
          parentIndex = rChildIndex;
        } else {
          this.elements[lChildIndex] = parentValue;
          this.elements[parentIndex] = lChildValue;
          parentIndex = lChildIndex;
        }
      } else {
        break;
      }
    }
  }
}

interface Task {
  priority: number;
  name: string;
}

const heap = new BinaryHeap<Task>((t1, t2) => t1.priority > t2.priority);

heap.push({ priority: 4, name: 'warning' });
heap.push({ priority: 8, name: 'meltdown' });
heap.push({ priority: 1, name: 'todo' });
heap.push({ priority: 9, name: '!' });

console.log(heap.pop()); // => { priority: 9, name: '!' }
console.log(heap.pop()); // => { priority: 8, name: 'meltdown' }
