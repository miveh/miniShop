export class CartItem {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public image: string,
    public qty: number = 1
  ) {}
  inc() {
    this.qty += 1;
  }
  dec() {
    this.qty = Math.max(1, this.qty - 1);
  }
  get total(): number {
    return this.price * this.qty;
  }
}

export class Cart {
  items: Map<number, CartItem> = new Map();

  add(item: CartItem) {
    const existing = this.items.get(item.id);
    if (existing) existing.inc();
    else this.items.set(item.id, item);
  }
  remove(id: number) {
    this.items.delete(id);
  }
  clear() {
    this.items.clear();
  }
  get totalPrice(): number {
    return Array.from(this.items.values()).reduce((sum, i) => sum + i.total, 0);
  }

  toArray(): CartItem[] {
    return Array.from(this.items.values());
  }
}
