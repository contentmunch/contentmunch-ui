import {describe, expect, it} from 'vitest';
import {buildDonutSlices} from './DonutSlice';

describe('buildDonutSlices', () => {
    it('returns an empty array when given no values', () => {
        expect(buildDonutSlices([], 50, 50, 50, 30)).toEqual([]);
    });

    it('returns an empty array when the total value is zero', () => {
        const values = [
            {title: 'A', value: 0, color: '#000'},
            {title: 'B', value: 0, color: '#111'},
        ];

        expect(buildDonutSlices(values, 50, 50, 50, 30)).toEqual([]);
    });

    it('returns an empty array when the total value is negative', () => {
        const values = [{title: 'A', value: -5, color: '#000'}];

        expect(buildDonutSlices(values, 50, 50, 50, 30)).toEqual([]);
    });

    it('computes a single slice spanning the full circle', () => {
        const values = [{title: 'Everything', value: 100, color: '#4e79a7'}];

        const slices = buildDonutSlices(values, 50, 50, 50, 30);

        expect(slices).toHaveLength(1);
        expect(slices[0].title).toBe('Everything');
        expect(slices[0].value).toBe(100);
        expect(slices[0].color).toBe('#4e79a7');
        expect(slices[0].percent).toBe(1);
        expect(slices[0].startAngle).toBe(0);
        expect(slices[0].endAngle).toBe(360);
        expect(slices[0].path).toContain('M');
        expect(slices[0].path).toContain('A');
        expect(slices[0].path).toContain('Z');
    });

    it('divides two equal values into two 50% slices with contiguous angles', () => {
        const values = [
            {title: 'A', value: 50, color: '#4e79a7'},
            {title: 'B', value: 50, color: '#59a14f'},
        ];

        const slices = buildDonutSlices(values, 50, 50, 50, 30);

        expect(slices).toHaveLength(2);
        expect(slices[0].percent).toBeCloseTo(0.5);
        expect(slices[1].percent).toBeCloseTo(0.5);
        expect(slices[0].startAngle).toBe(0);
        expect(slices[0].endAngle).toBe(180);
        expect(slices[1].startAngle).toBe(180);
        expect(slices[1].endAngle).toBe(360);
    });

    it('computes proportional percentages and angles for unequal values', () => {
        const values = [
            {title: 'A', value: 25, color: '#4e79a7'},
            {title: 'B', value: 50, color: '#59a14f'},
            {title: 'C', value: 25, color: '#f28e2c'},
        ];

        const slices = buildDonutSlices(values, 50, 50, 50, 30);

        expect(slices).toHaveLength(3);
        expect(slices[0].percent).toBeCloseTo(0.25);
        expect(slices[1].percent).toBeCloseTo(0.5);
        expect(slices[2].percent).toBeCloseTo(0.25);

        expect(slices[0].startAngle).toBe(0);
        expect(slices[0].endAngle).toBeCloseTo(90);
        expect(slices[1].startAngle).toBeCloseTo(90);
        expect(slices[1].endAngle).toBeCloseTo(270);
        expect(slices[2].startAngle).toBeCloseTo(270);
        expect(slices[2].endAngle).toBeCloseTo(360);
    });

    it('preserves input order and carries through title/value/color', () => {
        const values = [
            {title: 'Groceries', value: 420, color: '#4e79a7'},
            {title: 'Rent', value: 1500, color: '#59a14f'},
            {title: 'Utilities', value: 180, color: '#f28e2c'},
        ];

        const slices = buildDonutSlices(values, 110, 110, 110, 68.2);

        expect(slices.map(s => s.title)).toEqual(['Groceries', 'Rent', 'Utilities']);
        expect(slices.map(s => s.value)).toEqual([420, 1500, 180]);
        expect(slices.map(s => s.color)).toEqual(['#4e79a7', '#59a14f', '#f28e2c']);

        const totalPercent = slices.reduce((sum, s) => sum + s.percent, 0);
        expect(totalPercent).toBeCloseTo(1);
    });

    it('produces a valid path string using the given center and radii', () => {
        const values = [
            {title: 'A', value: 1, color: '#000'},
            {title: 'B', value: 1, color: '#111'},
        ];

        const slices = buildDonutSlices(values, 10, 20, 15, 5);

        slices.forEach(slice => {
            expect(slice.path.startsWith('M ')).toBe(true);
            expect(slice.path.trim().endsWith('Z')).toBe(true);
        });
    });
});
