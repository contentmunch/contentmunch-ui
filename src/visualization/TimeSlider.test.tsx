import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {act, fireEvent, render, screen} from "@testing-library/react";
import {useState} from "react";
import {TimeSlider} from "./TimeSlider.tsx";
import {latestPeriod} from "./dataset/derive.ts";
import {monthlyRevenue, spending} from "./fixtures.ts";

const Harness = ({ start, intervalMs = 1000, onPeriod }: { start?: string; intervalMs?: number; onPeriod?: (p: string) => void }) => {
    const [period, setPeriod] = useState(start ?? latestPeriod(monthlyRevenue) ?? "");
    return (
        <>
            <TimeSlider data={monthlyRevenue} period={period} onPeriod={(p) => { onPeriod?.(p); setPeriod(p); }} intervalMs={intervalMs}/>
            <output data-testid="period">{period}</output>
        </>
    );
};

const shown = () => screen.getByTestId("period").textContent;

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("TimeSlider", () => {
    it("shows the period it is at, and the first and the last", () => {
        const { container } = render(<Harness start="2026-06"/>);
        expect(container.querySelector(".slider-header")).toHaveTextContent("June 2026");
        expect(container.querySelector(".slider-min")).toHaveTextContent("March 2026");
        expect(container.querySelector(".slider-max")).toHaveTextContent("October 2026");
    });

    it("plays through the periods one at a time, then stops at the last", () => {
        render(<Harness start="2026-08" intervalMs={1000}/>);
        fireEvent.click(screen.getByRole("button", { name: "Play" }));
        expect(shown()).toBe("2026-08");
        act(() => { vi.advanceTimersByTime(1000); });
        expect(shown()).toBe("2026-09");
        act(() => { vi.advanceTimersByTime(1000); });
        expect(shown()).toBe("2026-10");
        act(() => { vi.advanceTimersByTime(5000); });
        expect(shown()).toBe("2026-10");
        expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
    });

    it("starts again from the first period when played from the end", () => {
        render(<Harness/>);
        fireEvent.click(screen.getByRole("button", { name: "Play" }));
        expect(shown()).toBe("2026-03");
        act(() => { vi.advanceTimersByTime(1000); });
        expect(shown()).toBe("2026-04");
    });

    it("pauses where it is", () => {
        render(<Harness start="2026-03"/>);
        fireEvent.click(screen.getByRole("button", { name: "Play" }));
        act(() => { vi.advanceTimersByTime(1000); });
        fireEvent.click(screen.getByRole("button", { name: "Pause" }));
        act(() => { vi.advanceTimersByTime(5000); });
        expect(shown()).toBe("2026-04");
    });

    it("jumps to the first and last periods, and moving the slider stops the playing", () => {
        const { container } = render(<Harness start="2026-06"/>);
        fireEvent.click(screen.getByRole("button", { name: "First period" }));
        expect(shown()).toBe("2026-03");
        fireEvent.click(screen.getByRole("button", { name: "Last period" }));
        expect(shown()).toBe("2026-10");
        fireEvent.click(screen.getByRole("button", { name: "First period" }));
        fireEvent.click(screen.getByRole("button", { name: "Play" }));
        fireEvent.change(container.querySelector("input[type=range]") as HTMLInputElement, { target: { value: "4" } });
        expect(shown()).toBe("2026-07");
        act(() => { vi.advanceTimersByTime(5000); });
        expect(shown()).toBe("2026-07");
    });

    it("steps through the periods that have data, in order", () => {
        const seen: string[] = [];
        render(<Harness start="2026-03" intervalMs={100} onPeriod={(p) => seen.push(p)}/>);
        fireEvent.click(screen.getByRole("button", { name: "Play" }));
        for (let i = 0; i < 8; i++) act(() => { vi.advanceTimersByTime(100); });
        expect(seen).toEqual(["2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10"]);
    });

    it("shows nothing when there is only one period to step through", () => {
        const one = { ...monthlyRevenue, rows: monthlyRevenue.rows.slice(0, 1) };
        const { container } = render(<TimeSlider data={one} onPeriod={() => undefined}/>);
        expect(container).toBeEmptyDOMElement();
        const { container: spendingContainer } = render(<TimeSlider data={spending} onPeriod={() => undefined}/>);
        expect(spendingContainer.querySelector(".muncher-time-slider")).not.toBeNull();
    });
});
