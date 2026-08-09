export type PollType = "SINGLE" | "MULTI";

export interface PollTally {
    counts: Record<string, number>;
    totalResponses: number;
}

export interface Poll {
    title: string;
    options: string[];
    type: PollType;
    hasResponded?: boolean;
    tally?: PollTally | null;
}
