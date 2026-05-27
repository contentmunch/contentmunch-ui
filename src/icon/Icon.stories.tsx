import type {Meta, StoryFn, StoryObj} from '@storybook/react';
import {useState} from "react";
import {Icon} from "./Icon";
import {Input} from "../input/Input";
import {drawings, type IconName} from "./Drawings";
import {Button} from "../button/Button";
import "./assets/icon-stories.css";

const meta: Meta<typeof Icon> = {
    component: Icon,
    title: 'Visual/Icons',
    argTypes: {
        color: {control: 'color'},
    },
    render: (args) => <div><Icon {...args} /></div>
};

export default meta;
type Story = StoryObj<typeof Icon>;
type StoryFunction = StoryFn<typeof meta>;
export const Search: StoryFunction = () => {
    const [query, setQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">();

    const toggleSort = () => {
        if (sortOrder === "asc") {
            setSortOrder("desc");
        } else {
            setSortOrder("asc");
        }
    }

    const cirular: IconName[] = [
        "arrow-left",
        "arrow-right",
        "arrow-up",
        "arrow-down",
        "compass",
        "plus",
        "minus",
        "close",
        "divide",
        "equals",
        "slash",
        "disc",
        "alert",
        "check",
        "info",
        "help",
        "meh",
        "smile",
        "frown",
        "angry",
        "annoyed",
        "laugh",
        "circle",
        "dribble",
        "clock",
        "alarm-clock",
        "target",
        "globe",
    ];

    const navigation: IconName[] = [

        "chevron-left",
        "chevron-right",
        "skip-back",
        "skip-forward",
        "fast-forward",
        "rewind",
        "external-link",
        "hamburger",
        "uneven-hamburger",
        "repeat",
        "shuffle",
        "eye",
        "eye-off",
        "hash",
        "share",
        "rss",
        "muncher",
        "code-pen",
        "youtube",
    ];
    const actions: IconName[] = [
        "undo",
        "redo",
        "play",
        "pause",
        "refresh",
        "reset",
        "save",
        "copy",
        "clipboard",
        "upload",
        "download",
        "send",
        "log-in",
        "log-out",
        "power",
        "settings",
        "tool",
        "toggle-left",
        "toggle-right",
        "search",
        "filter",
        "sort-asc",
        "sort-desc",
        "0-1",
        "1-0",
        "a-z",
        "z-a",
        "loading",
        "edit",
        "pencil",
        "trash",
        "archive",
        "360",
        "zoom-in",
        "zoom-out",
        "split-view",
        "sidebar",
        "maximize",
        "minimize",
        "print",
        "move",
        "max",
        "rotate",
        "scissor",
        "sun",
        "sunset",
        "sunrise",
        "sun-moon",
        "moon",
        "moon-star",
        "tithi",
        "eclipse",
        "orbit",
        "atom",
        "globe",
        "wind"
    ];
    const content: IconName[] = [
        "bold",
        "italic",
        "underline",
        "align-left",
        "align-center",
        "align-right",
        "align-justify",
        "ordered-list",
        "unordered-list",
        "type",
        "link",
        "unlink",
        "code",
        "terminal",
        "image",
        "video",
        "video-off",
        "film",
        "music",
        "camera",
        "camera-off",
        "mic",
        "mic-off",
        "speaker",
        "volume",
        "mute",
        "grid",
        "layout",
        "table",
        "crop",
        "paper-clip",
        "bookmark",
        "pen-tool",
        "headphone",
        "tv",
        "telescope",
        "microscope",
        "monitor",
        "phone",
        "voicemail",
        "mail",
        "message",
        "inbox"
    ];

    const entity: IconName[] = [
        "user",
        "users",
        "user-plus",
        "user-minus",
        "user-settings",
        "user-lock",
        "meditate",
        "awake",
        "github",
        "slack",
        "twitter",
        "facebook",
        "instagram",
        "linkedin",
        "home",
        "car",
        "bike",
        "walk",
        "monitor",
        "truck",
        "building",
        "bed",
        "bath",
        "coffee",
        "food",
        "water",
        "utensils",
        "umbrella",
        "package",
        "box",
        "file",
        "folder",
        "database",
        "server",
        "cloud",
        "cloud-drizzle",
        "cloud-lightning",
        "map",
        "book",
        "briefcase",
        "anchor",
        "key",
        "fingerprint",
        "lock",
        "unlock",
        "credit-card",
        "dollar",
        "shopping-cart",
        "calendar",
        "calendar-heart",
        "calendar-settings",
        "watch",
        "layers",
        "mixer",
        "tag",
        "rose",
        "leaf",
        "feather",
        "palm-tree",
        "flower",
        "scale"
    ];

    const signals: IconName[] = [


        "simple-check",
        "star",
        "thumbs-up",
        "thumbs-down",
        "hand-shake",
        "heart",
        "bell",
        "bell-off",
        "flag",
        "trending-up",
        "trending-down",
        "activity",
        "bar-chart",
        "pie-chart",
        "dot",
        "at",
        "more",
        "award",
        "gift",
        "balloon",
        "zap",
        "bulb",
        "quiz",
        "ai"
    ];


    const allCategories = [
        cirular,
        navigation,
        actions,
        content,
        entity,
        signals,
    ];
    const uniqueIcons = new Set<IconName>();
    const duplicates = new Set<IconName>();
    for (const set of allCategories) {
        for (const icon of set) {
            if (uniqueIcons.has(icon)) {
                duplicates.add(icon);
            }
            uniqueIcons.add(icon);
        }
    }
    const allIcons = Object.keys(drawings) as IconName[];

    const remainingIcons = allIcons.filter(
        icon => !uniqueIcons.has(icon)
    );

    if (process.env.NODE_ENV === "development") {
        if (duplicates.size > 0) {
            console.warn("Duplicates:", [...duplicates].join(","));
        }

    }

    const categories = [
        {name: "circular", icons: cirular},
        {name: "navigation", icons: navigation},
        {name: "actions", icons: actions},
        {name: "content", icons: content},
        {name: "entity", icons: entity},
        {name: "signals", icons: signals},
        {name: "miscellaneous", icons: remainingIcons}
    ] as const;

    const normalizedQuery = query.replace(/\s*/g, "").toLowerCase();

    const filtered = allIcons.filter(icon =>
        icon.toLowerCase().includes(normalizedQuery)
    );
    const grouped = categories.map(cat => ({
        name: cat.name,
        icons: cat.icons.filter(icon => filtered.includes(icon)),
    })).filter(group => group.icons.length > 0);

    const getSort = (group: {
        name: "circular" | "navigation" | "actions" | "content" | "entity" | "signals" | "miscellaneous";
        icons: IconName[]
    }) => {
        if (sortOrder)
            return group.icons.sort((a, b) =>
                sortOrder === "desc"
                    ? b.localeCompare(a)
                    : a.localeCompare(b)
            );
        else
            return group.icons;
    }
    return (
        <div className="icon-search-story">
            <div className="search-panel">
                <Input name="search-query" onChange={(e) => setQuery(e.target.value)} icon={"search"}
                       placeholder="Type Icon Name"/>
                <Button size="small" variant={"tertiary"} title="Sort Icons" onClick={() => toggleSort()}>
                    {sortOrder === "desc" ? <Icon name="sort-desc"/> : <Icon name="sort-asc"/>}
                </Button>

            </div>
            <div className="icon-buttons">
                {grouped.map(group => (
                    <div key={group.name} className="icon-group">
                        <div className="group-title">{group.name}</div>

                        <div className="icon-grid">
                            {getSort(group).map(icon => (
                                <Button
                                    key={icon}
                                    size="small"
                                    title={icon}
                                    variant="tertiary"
                                >
                                    <Icon iconString={icon}/>
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export const Default: Story = {
    args: {
        name: 'muncher',
        size: 'small'
    }
};

export const Medium: Story = {
    args: {
        ...Default.args,
        size: 'medium',
        weight: 1
    }
}
export const Dark: Story = {
    args: {
        ...Medium.args,
        weight: 2
    }
}

export const IconWithText: Story = {
    args: {
        name: 'muncher',
    },
    render: (args) => <div><Icon {...args} ><p>Text</p></Icon></div>
}
