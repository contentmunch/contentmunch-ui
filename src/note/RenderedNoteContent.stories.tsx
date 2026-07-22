import type {Meta, StoryObj} from '@storybook/react';
import "./assets/note-content-stories.css";
import {RenderedNoteContent} from "./RenderedNoteContent.tsx";

const sampleXhtml = `<article xmlns="http://www.w3.org/1999/xhtml">
<h1>Access Token and Refresh Token</h1>
<h2>1. What is an Access Token?</h2>
<ul>
<li><strong>Purpose:</strong> Grants access to protected resources</li>
<li><strong>Lifespan:</strong> Short-lived (e.g., 15 minutes)</li>
</ul>
<blockquote><p>Short-lived tokens reduce blast radius if compromised.</p></blockquote>
<table>
<thead><tr><th>Benefit</th><th>Access Token</th><th>Refresh Token</th></tr></thead>
<tbody><tr><td>Short-lived</td><td>✅</td><td>❌</td></tr></tbody>
</table>
<pre><code>const token = jwtService.generate(userId);</code></pre>
</article>`;

const placeholderImage = (label: string, w = 560, h = 360) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
            <rect width="${w}" height="${h}" fill="#f0f4f8"/>
            <rect x="20" y="20" width="${w - 40}" height="40" fill="#d9e2ec"/>
            <text x="${w / 2}" y="45" font-family="sans-serif" font-size="16" fill="#334" text-anchor="middle">${label}</text>
            <g stroke="#c8d4e0" stroke-width="1">
                <line x1="20" y1="90" x2="${w - 20}" y2="90"/>
                <line x1="20" y1="${h - 50}" x2="${w - 20}" y2="${h - 50}"/>
            </g>
        </svg>
    `)}`;

const imagesXhtml = `<article xmlns="http://www.w3.org/1999/xhtml">
<p>Click either image below to enlarge it -- this exercises the same
click-to-zoom path a headless-API consumer gets for free just by rendering
this component, with no extra wiring on their end.</p>

<span class="media-image-wrap media-image-wrap--medium">
<img class="media-image" alt="July 2026 calendar" role="button" tabindex="0" aria-label="Enlarge image"
     src="${placeholderImage('July 2026')}"/>
<span class="media-image-caption">
<span class="muncher-icon"><svg class="muncher-icon--small" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></span>
<span data-link-text>Calendar for tithi</span>
</span>
</span>

<p>This second one has no caption at all -- the lightbox still works, it just
skips the caption pill.</p>

<span class="media-image-wrap media-image-wrap--small">
<img class="media-image" alt="Uncaptioned placeholder" role="button" tabindex="0" aria-label="Enlarge image"
     src="${placeholderImage('No caption', 320, 200)}"/>
</span>
</article>`;

const meta: Meta<typeof RenderedNoteContent> = {
    component: RenderedNoteContent,
    title: 'Content/RenderedNoteContent',
    render: (args) =>
        <div className="note-content-story">
            <RenderedNoteContent {...args} />
        </div>,
};

export default meta;
type Story = StoryObj<typeof RenderedNoteContent>;
export const Default: Story = {
    args: {
        xhtml: sampleXhtml,
    }
};

export const WithImages: Story = {
    args: {
        xhtml: imagesXhtml,
    }
};
