import { GildedRose, Item } from './index';

    describe('test updateQuality', () => {
        it('should decrease quality for isNormalItem', () => {
            const normalItem = new Item('Normal Item', 10, 20);
            const gildedRose = new GildedRose([normalItem]);

            gildedRose.updateQuality();

            expect(normalItem.sellIn).toBe(9);
            expect(normalItem.quality).toBe(19);
        });

        it('should decrease quality twice as fast once the sell by date has passed', () => {
            const normalItem = new Item('Normal Item', -1, 20);
            const gildedRose = new GildedRose([normalItem]);

            gildedRose.updateQuality();

            expect(normalItem.sellIn).toBe(-2);
            expect(normalItem.quality).toBe(18);
        });

        it('should not have negative quality for an item', () => {
            const normalItem = new Item('Normal Item', 10, 0);
            const gildedRose = new GildedRose([normalItem]);

            gildedRose.updateQuality();

            expect(normalItem.sellIn).toBe(9);
            expect(normalItem.quality).toBe(0);
        });

        it('should increase quality for "Aged Brie"', () => {
            const agedBrie = new Item('Aged Brie', 10, 20);
            const gildedRose = new GildedRose([agedBrie]);

            gildedRose.updateQuality();

            expect(agedBrie.sellIn).toBe(9);
            expect(agedBrie.quality).toBe(21);
        });

        it('should not exceed a quality of 50', () => {
            const agedBrie = new Item('Aged Brie', 10, 50);
            const gildedRose = new GildedRose([agedBrie]);

            gildedRose.updateQuality();

            expect(agedBrie.sellIn).toBe(9);
            expect(agedBrie.quality).toBe(50);
        });

        it('should increase quality for "Backstage passes" and adjust quality based on sellIn', () => {
            const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20);
            const gildedRose = new GildedRose([backstagePasses]);

            gildedRose.updateQuality();

            expect(backstagePasses.sellIn).toBe(14);
            expect(backstagePasses.quality).toBe(21);
        });

        it('should increase quality by 2 when there are 10 days or less sellIn for "Backstage passes"', () => {
            const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20);
            const gildedRose = new GildedRose([backstagePasses]);

            gildedRose.updateQuality();

            expect(backstagePasses.sellIn).toBe(9);
            expect(backstagePasses.quality).toBe(22);
        });

        it('should increase quality by 3 when there are 5 days or less sellIn for "Backstage passes"', () => {
            const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20);
            const gildedRose = new GildedRose([backstagePasses]);

            gildedRose.updateQuality();

            expect(backstagePasses.sellIn).toBe(4);
            expect(backstagePasses.quality).toBe(23);
        });

        it('should drop quality to 0 for "Backstage passes" when sellIn is ne', () => {
            const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', -1, 20);
            const gildedRose = new GildedRose([backstagePasses]);

            gildedRose.updateQuality();

            expect(backstagePasses.sellIn).toBe(-2);
            expect(backstagePasses.quality).toBe(0);
        });

        it('should not change quality for "Sulfuras"', () => {
            const sulfuras = new Item('Sulfuras, Hand of Ragnaros', 10, 80);
            const gildedRose = new GildedRose([sulfuras]);

            gildedRose.updateQuality();

            expect(sulfuras.sellIn).toBe(10);
            expect(sulfuras.quality).toBe(80);
        });
    });