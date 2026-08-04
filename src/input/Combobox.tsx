import * as React from "react";
import {useEffect, useState} from "react";
import {TextInputDropdown} from "./TextInputDropdown";
import "./assets/combobox.css";

export const Combobox: React.FC<ComboboxProps> = (
    {
        name, items, selectedId, onSelect,
        filter, emptyMessage = "No matching options",
        ...props
    }
) => {
    const selected = items.find(item => item.id === selectedId);
    const [query, setQuery] = useState(selected ? selected.name : "");
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // re-syncs when `items` arrives after this component has already
        // mounted (e.g. the options fetch resolves after the parent
        // record's fetch) -- otherwise the input stays permanently blank
        // even though selectedId is set, since `selected` was computed
        // against an empty list on first render and never recomputed
        // once the real list showed up.
        const current = items.find(item => item.id === selectedId);
        setQuery(current ? current.name : "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId, items]);

    const defaultFilter = (item: ComboboxItem, q: string) =>
        item.name.toLowerCase().includes(q.trim().toLowerCase());
    const matches = items.filter(item => (filter ?? defaultFilter)(item, query));

    const select = (item: ComboboxItem) => {
        onSelect(item.id);
        setQuery(item.name);
        setShowContent(false);
    };

    return (
        <TextInputDropdown
            name={name}
            value={query}
            handleInputChange={value => {
                setQuery(value);
                setShowContent(true);
            }}
            showContent={showContent}
            setShowContent={setShowContent}
            {...props}
        >
            <ul className="muncher-combobox-options">
                {matches.length === 0 && <li className="muncher-combobox-empty">{emptyMessage}</li>}
                {matches.map(item => (
                    <li key={item.id}>
                        <button type="button" onClick={() => select(item)}>
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>
        </TextInputDropdown>
    );
};

export interface ComboboxItem {
    id: string | number;
    name: string;
}

export interface ComboboxProps {
    name: string;
    items: ComboboxItem[];
    selectedId: string | number | null;
    onSelect: (id: string | number) => void;
    /**
     * overrides the default "name includes query" filter, e.g. to also
     * match on a secondary field, or to do a fuzzy/starts-with match
     */
    filter?: (item: ComboboxItem, query: string) => boolean;
    emptyMessage?: string;
}
