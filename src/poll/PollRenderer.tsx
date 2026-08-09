import React, {useEffect, useState} from "react";
import {Button} from "../button/Button.tsx";
import {usePollWidgetClient} from "../note/NoteWidgetClientProvider.tsx";
import {PollAlreadyRespondedError} from "./PollWidgetClient.ts";
import type {Poll, PollTally} from "./model/Poll.ts";
import "./assets/poll.css";

export interface PollRendererProps extends React.ComponentProps<"div"> {
    "data-poll-nid"?: string;
}

const pollCache = new Map<string, Promise<Poll>>();

const fetchPoll = (
    nid: string,
    getPoll: (bucket: string, pollId: string) => Promise<Poll>
): Promise<Poll> => {
    let pending = pollCache.get(nid);
    if (!pending) {
        const [bucket, pollId] = nid.split("/");
        pending = (!bucket || !pollId)
            ? Promise.reject(new Error(`invalid poll nid "${nid}" — expected "bucket/nid"`))
            : getPoll(bucket, pollId);

        pending.catch(() => pollCache.delete(nid));
        pollCache.set(nid, pending);
    }
    return pending;
};

export const PollRenderer: React.FC<PollRendererProps> = (props) => {
    const nid = props["data-poll-nid"];
    const {getPoll, submitPollResponse} = usePollWidgetClient();

    const [poll, setPoll] = useState<Poll | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [tally, setTally] = useState<PollTally | null>(null);
    const [hasResponded, setHasResponded] = useState(false);

    useEffect(() => {
        if (!nid) return;
        let cancelled = false;
        setPoll(null);
        setError(null);
        setSelected([]);
        setTally(null);
        setHasResponded(false);

        fetchPoll(nid, getPoll)
            .then((fetched) => {
                if (cancelled) return;
                setPoll(fetched);
                setHasResponded(!!fetched.hasResponded);
                setTally(fetched.tally ?? null);
            })
            .catch(() => {
                if (!cancelled) setError(`Could not resolve poll "${nid}"`);
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nid]);

    if (!nid) {
        return <span className="external-link-error">:poll is missing a required nid attribute</span>;
    }
    if (error) {
        return <span className="external-link-error">{error}</span>;
    }
    if (!poll) {
        return <div data-poll-nid={nid} className="poll-embed-loading">…</div>;
    }

    const [bucket, pollId] = nid.split("/");

    const toggleOption = (option: string) => {
        if (poll.type === "SINGLE") {
            setSelected([option]);
        } else {
            setSelected((prev) => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]);
        }
    };

    const handleSubmit = async () => {
        if (selected.length === 0 || !bucket || !pollId) return;
        setSubmitting(true);
        setSubmitError(null);
        try {
            const result = await submitPollResponse(bucket, pollId, selected);
            setTally(result);
            setHasResponded(true);
        } catch (err) {
            if (err instanceof PollAlreadyRespondedError) {
                setSubmitError("You've already responded to this poll.");
                try {
                    const fresh = await getPoll(bucket, pollId);
                    setTally(fresh.tally ?? null);
                    setHasResponded(true);
                } catch {
                    // leave hasResponded as-is; the inline message already explains the 409
                }
            } else {
                setSubmitError("Could not submit your response. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (hasResponded) {
        const totalResponses = tally?.totalResponses ?? 0;
        return (
            <div data-poll-nid={nid} className="poll-embed poll-embed-results">
                <p className="poll-title">{poll.title}</p>
                {submitError && <p className="poll-submit-error">{submitError}</p>}
                <ul className="poll-results-list">
                    {poll.options.map((option) => {
                        const count = tally?.counts?.[option] ?? 0;
                        const pct = totalResponses === 0 ? 0 : Math.round((count / totalResponses) * 100);
                        return (
                            <li key={option} className="poll-result-row">
                                <div className="poll-result-label">
                                    <span>{option}</span>
                                    <span className="poll-result-count">{count} / {totalResponses} ({pct}%)</span>
                                </div>
                                <div className="poll-result-bar-track">
                                    <div className="poll-result-bar-fill" style={{width: `${pct}%`}}/>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    return (
        <div data-poll-nid={nid} className="poll-embed poll-embed-form">
            <p className="poll-title">{poll.title}</p>
            <ul className="poll-options-list">
                {poll.options.map((option) => (
                    <li key={option} className="poll-option-row">
                        <label>
                            <input
                                type={poll.type === "SINGLE" ? "radio" : "checkbox"}
                                name={`poll-${nid}`}
                                checked={selected.includes(option)}
                                onChange={() => toggleOption(option)}
                            />
                            <span>{option}</span>
                        </label>
                    </li>
                ))}
            </ul>
            {submitError && <p className="poll-submit-error">{submitError}</p>}
            <Button variant="secondary" size="small" disabled={selected.length === 0 || submitting}
                    onClick={handleSubmit}>
                {submitting ? "Submitting..." : "Vote"}
            </Button>
        </div>
    );
};

export const PollDirectiveError: React.FC<React.ComponentProps<"span">> = () => (
    <span className="external-link-error">Invalid :poll directive</span>
);
