import * as React from "react";

/** Which series of a bar or line is shown alone: the one held by a click, else the one under the pointer. In this chart only. */
export function useSeriesFocus() {
    const [held, setHeld] = React.useState<string | null>(null);
    const [hover, setHover] = React.useState<string | null>(null);
    return { held, focus: hover ?? held, onHover: setHover, onHold: setHeld };
}
