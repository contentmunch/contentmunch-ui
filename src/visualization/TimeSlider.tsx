import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import type {Dataset} from "./dataset/Dataset.ts";
import {canonicalPeriod, formatPeriod, periodsOf, shapeOf} from "./dataset/derive.ts";
import {Button} from "../button/Button.tsx";
import {Icon} from "../icon/Icon.tsx";
import {Slider} from "../slider/Slider.tsx";
import "./assets/visualization.css";

export interface TimeSliderProps {
    data: Dataset;
    /** The period being shown (an ISO date); the latest when none is given. */
    period?: string | null;
    onPeriod(period: string): void;
    /** How long each period stays on screen while playing. Default 1200. */
    intervalMs?: number;
}

/**
 * Steps through the periods of a dataset: play and pause, back and forward, and a slider. It only reports the period; the chart is
 * given it as `period`. It plays through the periods that have data, once, and stops at the last.
 */
export const TimeSlider: React.FC<TimeSliderProps> = ({ data, period, onPeriod, intervalMs = 1200 }) => {
    const periods = useMemo(() => periodsOf(data), [data]);
    const grain = shapeOf(data).time?.grain ?? "month";
    const asked = period ? canonicalPeriod(period, grain) : null;
    const index = asked !== null && periods.includes(asked) ? periods.indexOf(asked) : periods.length - 1;
    const [playing, setPlaying] = useState(false);
    const last = periods.length - 1;

    useEffect(() => {
        if (!playing) return;
        if (index >= last) {
            setPlaying(false);
            return;
        }
        const timer = setTimeout(() => onPeriod(periods[index + 1]), intervalMs);
        return () => clearTimeout(timer);
    }, [playing, index, last, intervalMs, onPeriod, periods]);

    if (periods.length < 2) return null;

    const go = (to: number) => onPeriod(periods[Math.min(last, Math.max(0, to))]);
    const play = () => {
        if (playing) return setPlaying(false);
        // playing from the end starts again from the first period
        if (index >= last) go(0);
        setPlaying(true);
    };

    return (
        <div className="muncher-time-slider" role="group" aria-label="Time">
            <div className="muncher-time-slider-controls">
                <Button variant="transparent" title="First period" aria-label="First period" disabled={index === 0} onClick={() => { setPlaying(false); go(0); }}>
                    <Icon name="skip-back"/>
                </Button>
                <Button variant="transparent" title={playing ? "Pause" : "Play"} aria-label={playing ? "Pause" : "Play"} onClick={play}>
                    <Icon name={playing ? "pause" : "play"}/>
                </Button>
                <Button variant="transparent" title="Last period" aria-label="Last period" disabled={index === last} onClick={() => { setPlaying(false); go(last); }}>
                    <Icon name="skip-forward"/>
                </Button>
            </div>
            <Slider
                min={0}
                max={last}
                value={index}
                setValue={(i) => { setPlaying(false); go(i); }}
                numberFormatter={(i) => formatPeriod(periods[Math.round(i)] ?? periods[last], grain)}
            />
        </div>
    );
};
