export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  private isItemNormal(item: Item): boolean {
    return item.name !== 'Aged Brie' && item.name !== 'Backstage passes to a TAFKAL80ETC concert' && item.name !== 'Sulfuras, Hand of Ragnaros';
  }

  private isItemAgedBrie(item: Item): boolean {
    return item.name === 'Aged Brie';
  }

  private isItemBackstagePass(item: Item): boolean {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  private isItemSulfuras(item: Item): boolean {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  private decreaseQuality(item: Item, amount: number = 1): void {
    item.quality = Math.max(0, item.quality - amount);
  }

  private increaseQuality(item: Item, amount: number = 1): void {
    item.quality = Math.min(50, item.quality + amount);
  }

  updateQuality() {
    for (const item of this.items) {
      if (this.isItemNormal(item)) {
        this.decreaseQuality(item);
        console.log('isItemNormal quality after decrease:', item.quality);
      }

      else if (this.isItemBackstagePass(item)) {
        if (item.sellIn > 10) {
          this.increaseQuality(item);
          console.log('isItemBackstagePass quality if sellinIn > 10:', item.quality);
        }
        if (item.sellIn <= 10 && item.sellIn > 5) {
          this.increaseQuality(item, 2);
          console.log('isItemBackstagePass quality if sellinIn <= 10:', item.quality);
        }
        if (item.sellIn <= 5) {
          this.increaseQuality(item, 3);
          console.log('isItemBackstagePass quality if sellinIn <= 5:', item.quality);
        }
      }

      else if (this.isItemAgedBrie(item)) {
        this.increaseQuality(item);
        console.log('isItemAgedBrie quality:', item.quality);
      }

      if (!this.isItemSulfuras(item)) {
        item.sellIn = item.sellIn - 1;
        console.log('sellIn remaining:', item.sellIn);
      }

      if (item.sellIn < 0) {
        if (this.isItemNormal(item)) {
          this.decreaseQuality(item);
          console.log('isItemNormal quality if item.sellIn < 0', item.quality);
        } else if (this.isItemBackstagePass(item)) {
          item.quality = item.quality - item.quality;
          console.log('isItemBackstagePass quality if item.sellIn < 0', item.quality);
        } else if (this.isItemAgedBrie(item)) {
          this.increaseQuality(item);
          console.log('isItemAgedBrie quality if item.sellIn < 0', item.quality);
        }
      }
      return this.items;
    }
  }
}

