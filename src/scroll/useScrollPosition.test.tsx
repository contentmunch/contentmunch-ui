import {afterEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useScrollPosition} from './useScrollPosition.tsx';

const setScrollY = (value: number) => {
    Object.defineProperty(window, 'scrollY', {value, writable: true, configurable: true});
};

const setInnerHeight = (value: number) => {
    Object.defineProperty(window, 'innerHeight', {value, writable: true, configurable: true});
};

const setScrollHeight = (value: number) => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
        value,
        writable: true,
        configurable: true,
    });
};

const fireScroll = () => {
    act(() => {
        window.dispatchEvent(new Event('scroll'));
    });
};

describe('useScrollPosition', () => {
    afterEach(() => {
        setScrollY(0);
        setInnerHeight(768);
        setScrollHeight(0);
    });

    it('returns the initial position (top, not bottom) on mount', () => {
        setScrollY(0);
        setInnerHeight(768);
        setScrollHeight(2000);

        const {result} = renderHook(() => useScrollPosition());

        expect(result.current.scrollTop).toBe(0);
        expect(result.current.isTop).toBe(true);
        expect(result.current.isBottom).toBe(false);
    });

    it('updates scrollTop and isTop=false once scrolled past the top threshold', () => {
        setInnerHeight(768);
        setScrollHeight(3000);
        const {result} = renderHook(() => useScrollPosition());

        setScrollY(200);
        fireScroll();

        expect(result.current.scrollTop).toBe(200);
        expect(result.current.isTop).toBe(false);
        expect(result.current.isBottom).toBe(false);
    });

    it('reports isBottom=true once scrolled near the bottom of the document', () => {
        setInnerHeight(800);
        setScrollHeight(1000);
        const {result} = renderHook(() => useScrollPosition());

        setScrollY(180);
        fireScroll();

        expect(result.current.isBottom).toBe(true);
    });

    it('removes the scroll listener on unmount', () => {
        setInnerHeight(768);
        setScrollHeight(2000);
        const removeSpy = vi.spyOn(window, 'removeEventListener');
        const {unmount} = renderHook(() => useScrollPosition());

        unmount();

        expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
        removeSpy.mockRestore();
    });
});
