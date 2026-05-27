import {Fragment} from "react";

export type IconName = keyof typeof drawings;

export const drawings = {
        'align-center':
            <Fragment>
                <line x1="18" y1="10" x2="6" y2="10"/>
                <line x1="21" y1="6" x2="3" y2="6"/>
                <line x1="21" y1="14" x2="3" y2="14"/>
                <line x1="18" y1="18" x2="6" y2="18"/>
            </Fragment>,
        'align-justify':
            <Fragment>
                <line x1="21" y1="10" x2="3" y2="10"/>
                <line x1="21" y1="6" x2="3" y2="6"/>
                <line x1="21" y1="14" x2="3" y2="14"/>
                <line x1="21" y1="18" x2="3" y2="18"/>
            </Fragment>,
        'align-left':
            <Fragment>
                <line x1="17" y1="10" x2="3" y2="10"/>
                <line x1="21" y1="6" x2="3" y2="6"/>
                <line x1="21" y1="14" x2="3" y2="14"/>
                <line x1="17" y1="18" x2="3" y2="18"/>
            </Fragment>,
        'align-right':
            <Fragment>
                <line x1="21" y1="10" x2="7" y2="10"/>
                <line x1="21" y1="6" x2="3" y2="6"/>
                <line x1="21" y1="14" x2="3" y2="14"/>
                <line x1="21" y1="18" x2="7" y2="18"/>
            </Fragment>,
        'type':
            <Fragment>
                <polyline points="4 7 4 4 20 4 20 7"/>
                <line x1="9" y1="20" x2="15" y2="20"/>
                <line x1="12" y1="4" x2="12" y2="20"/>
            </Fragment>,
        'italic':
            <Fragment>
                <line x1="19" y1="4" x2="10" y2="4"/>
                <line x1="14" y1="20" x2="5" y2="20"/>
                <line x1="15" y1="4" x2="9" y2="20"/>
            </Fragment>,
        'bold':
            <Fragment>
                <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
            </Fragment>,
        'underline':
            <Fragment>
                <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/>
                <line x1="4" y1="21" x2="20" y2="21"/>
            </Fragment>,
        'ordered-list':
            <Fragment>
                <line x1="9" y1="5" x2="21" y2="5"/>
                <line x1="9" y1="12" x2="21" y2="12"/>
                <line x1="9" y1="19" x2="21" y2="19"/>
                <polyline points="3 10 5 10 3 13 5 13"/>
                <polyline points="3 3 4 3 4 6"/>
                <path d="M3 17H4H5L4 19C4.55 19 5 19.45 5 20C5 20.55 4.55 21 4 21H3"/>
            </Fragment>,
        'unordered-list':
            <Fragment>
                <line x1="9" y1="5" x2="21" y2="5"/>
                <line x1="9" y1="12" x2="21" y2="12"/>
                <line x1="9" y1="19" x2="21" y2="19"/>
                <circle cx="4" cy="12" r="1"/>
                <circle cx="4" cy="5" r="1"/>
                <circle cx="4" cy="19" r="1"/>
            </Fragment>,
        'undo':
            <Fragment>
                <polyline points="2 10 2 16 8 16"/>
                <path d="m22 16c-1.8136-6.5424-9.5593-9.4823-15.36-4.36l-4.64 4.36"/>
            </Fragment>,
        'redo':
            <Fragment>
                <polyline points="22 10 22 16 16 16"/>
                <path d="m1.9935 16c1.8136-6.5424 9.5593-9.4823 15.36-4.36l4.64 4.36"/>
            </Fragment>,
        'link':
            <Fragment>
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </Fragment>,
        'unlink':
            <Fragment>
                <path d="M18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"/>
                <path d="M5.17 11.75l-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"/>
                <line x1="8" y1="2" x2="8" y2="5"/>
                <line x1="2" y1="8" x2="5" y2="8"/>
                <line x1="16" y1="19" x2="16" y2="22"/>
                <line x1="19" y1="16" x2="22" y2="16"/>
            </Fragment>,

        'hamburger':
            <Fragment>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
            </Fragment>,
        'uneven-hamburger':
            <Fragment>
                <line x1="17" y1="11" x2="3" y2="11"/>
                <line x1="21" y1="6" x2="3" y2="6"/>
                <line x1="21" y1="16" x2="3" y2="16"/>
            </Fragment>,
        'chevron-left':
            <Fragment>
                <polyline points="15 18 9 12 15 6"/>
            </Fragment>,
        'chevron-right':
            <Fragment>
                <polyline points="9 18 15 12 9 6"/>
            </Fragment>,
        'fast-forward':
            <Fragment>
                <polygon points="13 19 22 12 13 5 13 19"/>
                <polygon points="2 19 11 12 2 5 2 19"/>
            </Fragment>,
        'pause':
            <Fragment>
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
            </Fragment>,
        'play':
            <Fragment>
                <polygon points="5 3 19 12 5 21 5 3"/>
            </Fragment>,
        'power':
            <Fragment>
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
                <line x1="12" y1="2" x2="12" y2="12"/>
            </Fragment>,
        'repeat':
            <Fragment>
                <polyline points="17 1 21 5 17 9"/>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                <polyline points="7 23 3 19 7 15"/>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </Fragment>,
        'rewind':
            <Fragment>
                <polygon points="11 19 2 12 11 5 11 19"/>
                <polygon points="22 19 13 12 22 5 22 19"/>
            </Fragment>,
        'shuffle':
            <Fragment>
                <polyline points="16 3 21 3 21 8"/>
                <line x1="4" y1="20" x2="21" y2="3"/>
                <polyline points="21 16 21 21 16 21"/>
                <line x1="15" y1="15" x2="21" y2="21"/>
                <line x1="4" y1="4" x2="9" y2="9"/>
            </Fragment>,
        'skip-back':
            <Fragment>
                <polygon points="19 20 9 12 19 4 19 20"/>
                <line x1="5" y1="19" x2="5" y2="5"/>
            </Fragment>,
        'skip-forward':
            <Fragment>
                <polygon points="5 4 15 12 5 20 5 4"/>
                <line x1="19" y1="5" x2="19" y2="19"/>
            </Fragment>,
        'youtube':
            <Fragment>
                <path
                    d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
            </Fragment>,

        'cloud':
            <Fragment>
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
            </Fragment>,
        'cloud-drizzle':
            <Fragment>
                <line x1="8" y1="19" x2="8" y2="21"/>
                <line x1="8" y1="13" x2="8" y2="15"/>
                <line x1="16" y1="19" x2="16" y2="21"/>
                <line x1="16" y1="13" x2="16" y2="15"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="12" y1="15" x2="12" y2="17"/>
                <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
            </Fragment>,
        'cloud-lightning':
            <Fragment>
                <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/>
                <polyline points="13 11 9 17 15 17 11 23"/>
            </Fragment>,
        'server':
            <Fragment>
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                <line x1="6" y1="6" x2="6.01" y2="6"/>
                <line x1="6" y1="18" x2="6.01" y2="18"/>
            </Fragment>,
        'camera':
            <Fragment>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
            </Fragment>,
        'camera-off':
            <Fragment>
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path
                    d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"/>
            </Fragment>,
        'coffee':
            <Fragment>
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                <line x1="6" y1="1" x2="6" y2="4"/>
                <line x1="10" y1="1" x2="10" y2="4"/>
                <line x1="14" y1="1" x2="14" y2="4"/>
            </Fragment>,
        'eye':
            <Fragment>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            </Fragment>,
        'eye-off':
            <Fragment>
                <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
            </Fragment>,
        'droplet':
            <Fragment>
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </Fragment>,
        'feather':
            <Fragment>
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
                <line x1="16" y1="8" x2="2" y2="22"/>
                <line x1="17.5" y1="15" x2="9" y2="15"/>
            </Fragment>,
        'headphone':
            <Fragment>
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                <path
                    d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
            </Fragment>,
        'slash':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
            </Fragment>,
        'circle':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
            </Fragment>,
        'triangle':
            <Fragment>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            </Fragment>,
        'square':
            <Fragment>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            </Fragment>,
        'hexagon':
            <Fragment>
                <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </Fragment>,
        'octagon':
            <Fragment>
                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
            </Fragment>,
        'package':
            <Fragment>
                <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
                <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
            </Fragment>,
        'paper-clip':
            <Fragment>
                <path
                    d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </Fragment>,
        'pen-tool':
            <Fragment>
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
            </Fragment>,
        'pocket':
            <Fragment>
                <path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"/>
                <polyline points="8 10 12 14 16 10"/>
            </Fragment>,
        'shield':
            <Fragment>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </Fragment>,
        'watch':
            <Fragment>
                <circle cx="12" cy="12" r="7"/>
                <polyline points="12 9 12 12 13.5 13.5"/>
                <path
                    d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"/>
            </Fragment>,
        'wind':
            <Fragment>
                <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
            </Fragment>,
        'water':
            <Fragment>
                <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"/>
                <path d="M5 8h14"/>
                <path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/>
                <path d="m12 8 1-6h2"/>
            </Fragment>,
        'zap':
            <Fragment>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </Fragment>,

        'video':
            <Fragment>
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </Fragment>,
        'video-off':
            <Fragment>
                <path
                    d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
            </Fragment>,
        'speaker':
            <Fragment>
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                <circle cx="12" cy="14" r="4"/>
                <line x1="12" y1="6" x2="12.01" y2="6"/>
            </Fragment>,
        'tv':
            <Fragment>
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
                <polyline points="17 2 12 7 7 2"/>
            </Fragment>,
        'film':
            <Fragment>
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                <line x1="7" y1="2" x2="7" y2="22"/>
                <line x1="17" y1="2" x2="17" y2="22"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <line x1="2" y1="7" x2="7" y2="7"/>
                <line x1="2" y1="17" x2="7" y2="17"/>
                <line x1="17" y1="17" x2="22" y2="17"/>
                <line x1="17" y1="7" x2="22" y2="7"/>
            </Fragment>,
        'monitor':
            <Fragment>
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
            </Fragment>,
        'music':
            <Fragment>
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
            </Fragment>,
        'truck':
            <Fragment>
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
            </Fragment>,
        'umbrella':
            <Fragment>
                <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/>
            </Fragment>,
        'maximize':
            <Fragment>
                <path
                    d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </Fragment>,
        'minimize':
            <Fragment>
                <path
                    d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            </Fragment>,
        'zoom-in':
            <Fragment>
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="11" y1="8" x2="11" y2="14"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
            </Fragment>,
        'zoom-out':
            <Fragment>
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
            </Fragment>,
        'move':
            <Fragment>
                <polyline points="5 9 2 12 5 15"/>
                <polyline points="9 5 12 2 15 5"/>
                <polyline points="15 19 12 22 9 19"/>
                <polyline points="19 9 22 12 19 15"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <line x1="12" y1="2" x2="12" y2="22"/>
            </Fragment>,
        'mixer':
            <Fragment>
                <line x1="4" y1="21" x2="4" y2="14"/>
                <line x1="4" y1="10" x2="4" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12" y2="3"/>
                <line x1="20" y1="21" x2="20" y2="16"/>
                <line x1="20" y1="12" x2="20" y2="3"/>
                <line x1="1" y1="14" x2="7" y2="14"/>
                <line x1="9" y1="8" x2="15" y2="8"/>
                <line x1="17" y1="16" x2="23" y2="16"/>
            </Fragment>,
        'volume':
            <Fragment>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            </Fragment>,
        'mute':
            <Fragment>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
            </Fragment>,
        'mic':
            <Fragment>
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
            </Fragment>,
        'mic-off':
            <Fragment>
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
            </Fragment>,
        'arrow-left':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 8 8 12 12 16"/>
                <line x1="16" y1="12" x2="8" y2="12"/>
            </Fragment>,
        'arrow-right':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 16 16 12 12 8"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
            </Fragment>,
        'arrow-down':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="8 12 12 16 16 12"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
            </Fragment>,
        'arrow-up':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="16 12 12 8 8 12"/>
                <line x1="12" y1="16" x2="12" y2="8"/>
            </Fragment>,
        'alert':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </Fragment>,
        'check':
            <Fragment>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </Fragment>,
        'help':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </Fragment>,
        'info':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
            </Fragment>,
        'close':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
            </Fragment>,
        'plus':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
            </Fragment>,
        'minus':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
            </Fragment>,
        'divide':
            <Fragment>
                <line x1="8" y1="12" x2="16" y2="12"/>
                <line x1="12" y1="16" x2="12" y2="16"/>
                <line x1="12" y1="8" x2="12" y2="8"/>
                <circle cx="12" cy="12" r="10"/>
            </Fragment>,
        'equals':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <line x1="8" y1="10" x2="16" y2="10"/>
                <line x1="8" y1="14" x2="16" y2="14"/>
            </Fragment>,
        'disc':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
            </Fragment>,
        'scale':
            <Fragment>
                <path d="M12 3v18"/>
                <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"/>
                <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"/>
                <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"/>
                <path d="M7 21h10"/>

            </Fragment>,
        'quiz':
            <Fragment>
                <path
                    d="M12 2a7.5 7.5 0 0 0-4.8 13.263C8.19 16.089 9 17.21 9 18.5h6c0-1.29.81-2.411 1.8-3.238A7.5 7.5 0 0 0 12 2Z"/>
                <path d="M15 18.5H9v2a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5z"/>
                <path d="M10 8c0-1.013.895-2 2-2s2 .82 2 1.833c0 .365-.116.705-.317.991C13.085 9.676 12 10.488 12 11.5"/>
                <path d="M11.992 14h.009"/>
            </Fragment>,
        'ai':
            <Fragment>
                <path
                    d="M15.5 22v-.5c0-1.105.932-2 1.922-2.489c.963-.476 1.772-1.26 1.875-2.18L19.5 15l2-1l-2.5-3.75a8.25 8.25 0 1 0-13 6.746m0 0V22m0-5.004c.75.53 1.594.937 2.5 1.194"/>
                <path d="M11.308 12L9.847 7.479A.72.72 0 0 0 9.154 7a.72.72 0 0 0-.693.479L7 12m7-5v5m-6.462-1.5h3.231"/>
            </Fragment>,
        'flash-card':
            <Fragment>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                <line x1="7" y1="10" x2="17" y2="10"/>
                <line x1="7" y1="14" x2="17" y2="14"/>
                <line x1="7" y1="18" x2="17" y2="18"/>
            </Fragment>,
        'target':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
            </Fragment>,
        'clock':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
            </Fragment>,
        'compass':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </Fragment>,
        'globe':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </Fragment>,
        'dribble':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <path
                    d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
            </Fragment>,
        'smile':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
            </Fragment>,
        'frown':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
            </Fragment>,
        'meh':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <line x1="8" y1="15" x2="16" y2="15"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
            </Fragment>,
        'angry':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                <path d="M7.5 8 10 9"/>
                <path d="m14 9 2.5-1"/>
                <path d="M9 10h.01"/>
                <path d="M15 10h.01"/>
            </Fragment>,
        'annoyed':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 15h8"/>
                <path d="M8 9h2"/>
                <path d="M14 9h2"/>
            </Fragment>,
        'laugh':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z"/>
                <line x1="9" x2="9.01" y1="9" y2="9"/>
                <line x1="15" x2="15.01" y1="9" y2="9"/>
            </Fragment>,
        'balloon':
            <Fragment>
                <path d="M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1"/>
                <path d="M12 6a2 2 0 0 1 2 2"/>
                <path d="M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0"/>
            </Fragment>,
        'simple-check':
            <Fragment>
                <polyline points="20 6 9 17 4 12"></polyline>
            </Fragment>,
        'code':
            <Fragment>
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
            </Fragment>,
        'database':
            <Fragment>
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </Fragment>,
        'file':
            <Fragment>
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
            </Fragment>,
        'folder':
            <Fragment>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </Fragment>,
        'terminal':
            <Fragment>
                <polyline points="4 17 10 11 4 5"/>
                <line x1="12" y1="19" x2="20" y2="19"/>
            </Fragment>,
        'edit':
            <Fragment>
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </Fragment>,
        'pencil':
            <Fragment>
                <line x1="18" y1="2" x2="22" y2="6"/>
                <path d="M7.5 20.5L19 9l-4-4L3.5 16.5 2 22l5.5-1.5z"/>
            </Fragment>,
        'image':
            <Fragment>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
            </Fragment>,
        'print':
            <Fragment>
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
            </Fragment>,
        'loading':
            <Fragment>
                <line x1="12" y1="2" x2="12" y2="6"/>
                <line x1="12" y1="18" x2="12" y2="22"/>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                <line x1="2" y1="12" x2="6" y2="12"/>
                <line x1="18" y1="12" x2="22" y2="12"/>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
            </Fragment>,
        'sun':
            <Fragment>
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </Fragment>,
        'sunrise':
            <Fragment>
                <path d="M17 18a5 5 0 0 0-10 0"/>
                <line x1="12" y1="2" x2="12" y2="9"/>
                <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/>
                <line x1="1" y1="18" x2="3" y2="18"/>
                <line x1="21" y1="18" x2="23" y2="18"/>
                <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/>
                <line x1="23" y1="22" x2="1" y2="22"/>
                <polyline points="8 6 12 2 16 6"/>
            </Fragment>,
        'sunset':
            <Fragment>
                <path d="M17 18a5 5 0 0 0-10 0"/>
                <line x1="12" y1="9" x2="12" y2="2"/>
                <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/>
                <line x1="1" y1="18" x2="3" y2="18"/>
                <line x1="21" y1="18" x2="23" y2="18"/>
                <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/>
                <line x1="23" y1="22" x2="1" y2="22"/>
                <polyline points="16 5 12 9 8 5"/>
            </Fragment>,
        'sun-moon':
            <Fragment>
                <path d="M12 2v2"/>
                <path
                    d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/>
                <path d="M16 12a4 4 0 0 0-4-4"/>
                <path d="m19 5-1.256 1.256"/>
                <path d="M20 12h2"/>
            </Fragment>,
        'moon':
            <Fragment>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </Fragment>,
        'moon-star':
            <Fragment>
                <path d="M18 5h4"/>
                <path d="M20 3v4"/>
                <path
                    d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
            </Fragment>,
        'orbit':
            <Fragment>
                <path d="M20.341 6.484A10 10 0 0 1 10.266 21.85"/>
                <path d="M3.659 17.516A10 10 0 0 1 13.74 2.152"/>
                <circle cx="12" cy="12" r="3"/>
                <circle cx="19" cy="5" r="2"/>
                <circle cx="5" cy="19" r="2"/>
            </Fragment>,
        'eclipse':
            <Fragment>
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a7 7 0 1 0 10 10"/>
            </Fragment>,
        'external-link':
            <Fragment>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
            </Fragment>,
        'search':
            <Fragment>
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </Fragment>,
        'filter':
            <Fragment>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </Fragment>,
        'reset':
            <Fragment>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                <line x1="8" y1="2" x2="18" y2="23"/>
            </Fragment>,
        'refresh':
            <Fragment>
                <polyline points="23 4 23 10 17 10"/>
                <polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </Fragment>,
        'rotate':
            <Fragment>
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </Fragment>,
        'sort-asc':
            <Fragment>
                <path d="M11 5h4"/>
                <path d="M11 9h7"/>
                <path d="M11 13h10"/>
                <path d="M3 17l3 3 3-3"/>
                <path d="M6 18V4"/>

            </Fragment>,
        'sort-desc':
            <Fragment>
                <path d="M11 8h10"/>
                <path d="M11 12h7"/>
                <path d="M11 16h4"/>
                <path d="M6 18V4"/>
                <polyline points="10 5 6 2 2 5"/>
            </Fragment>,
        'scissor':
            <Fragment>
                <circle cx="6" cy="6" r="3"/>
                <circle cx="6" cy="18" r="3"/>
                <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                <line x1="8.12" y1="8.12" x2="12" y2="12"/>
            </Fragment>,
        'table':
            <Fragment>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
                <line x1="12" y1="3" x2="12" y2="21"/>
            </Fragment>,
        'layout':
            <Fragment>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
            </Fragment>,
        'sidebar':
            <Fragment>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
            </Fragment>,
        'split-view':
            <Fragment>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="12" y1="3" x2="12" y2="21"/>
            </Fragment>,
        'hash':
            <Fragment>
                <line x1="4" y1="9" x2="20" y2="9"/>
                <line x1="4" y1="15" x2="20" y2="15"/>
                <line x1="10" y1="3" x2="8" y2="21"/>
                <line x1="16" y1="3" x2="14" y2="21"/>
            </Fragment>,
        'dollar':
            <Fragment>
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </Fragment>,
        'credit-card':
            <Fragment>
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
            </Fragment>,
        'box':
            <Fragment>
                <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
            </Fragment>,
        'key':
            <Fragment>
                <path
                    d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </Fragment>,
        'layers':
            <Fragment>
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
            </Fragment>,
        'max':
            <Fragment>
                <polyline points="15 3 21 3 21 9"/>
                <polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/>
                <line x1="3" y1="21" x2="10" y2="14"/>
            </Fragment>,
        'github':
            <Fragment>
                <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </Fragment>,
        'code-pen':
            <Fragment>
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                <line x1="12" y1="22" x2="12" y2="15.5"/>
                <polyline points="22 8.5 12 15.5 2 8.5"/>
                <polyline points="2 15.5 12 8.5 22 15.5"/>
                <line x1="12" y1="2" x2="12" y2="8.5"/>
            </Fragment>,
        'instagram':
            <Fragment>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </Fragment>,
        'linkedin':
            <Fragment>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
            </Fragment>,
        'slack':
            <Fragment>
                <path
                    d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
                <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                <path
                    d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
                <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
                <path
                    d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
                <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
                <path
                    d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
                <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
            </Fragment>,
        'facebook':
            <Fragment>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </Fragment>,
        'twitter':
            <Fragment>
                <path
                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </Fragment>,
        'grid':
            <Fragment>
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
            </Fragment>,
        'user':
            <Fragment>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </Fragment>,
        'user-plus':
            <Fragment>
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
            </Fragment>,
        'user-minus':
            <Fragment>
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
            </Fragment>,
        'users':
            <Fragment>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </Fragment>,
        'meditate':
            <Fragment>
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                <path d="M20 25a8 8 0 0 0-16 0"/>
            </Fragment>,
        'log-in':
            <Fragment>
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
            </Fragment>,
        'log-out':
            <Fragment>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
            </Fragment>,
        'home':
            <Fragment>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
            </Fragment>,
        'bed':
            <Fragment>
                <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
                <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>
                <path d="M12 4v6"/>
                <path d="M2 18h20"/>
            </Fragment>,
        'awake':
            <Fragment>
                <circle cx="12" cy="5" r="1"/>
                <path d="m9 20 3-6 3 6"/>
                <path d="m6 8 6 2 6-2"/>
                <path d="M12 10v4"/>
            </Fragment>,
        'food':
            <Fragment>
                <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/>
                <path d="M7 21h10"/>
                <path d="M19.5 12 22 6"/>
                <path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/>
                <path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"/>
                <path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"/>
            </Fragment>,
        'utensils':
            <Fragment>
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                <path d="M7 2v20"/>
                <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
            </Fragment>,
        'walk':
            <Fragment>
                <path
                    d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/>
                <path
                    d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/>
                <path d="M16 17h4"/>
                <path d="M4 13h4"/>
            </Fragment>,
        'bath':
            <Fragment>
                <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
                <line x1="10" y1="5" x2="8" y2="7"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <line x1="7" y1="19" x2="7" y2="21"/>
                <line x1="17" y1="19" x2="17" y2="21"/>
            </Fragment>,
        'bike':
            <Fragment>
                <circle cx="5.5" cy="17.5" r="3.5"/>
                <circle cx="18.5" cy="17.5" r="3.5"/>
                <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
            </Fragment>,
        'building':
            <Fragment>
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                <path d="M9 22v-4h6v4"/>
                <path d="M8 6h.01"/>
                <path d="M16 6h.01"/>
                <path d="M12 6h.01"/>
                <path d="M12 10h.01"/>
                <path d="M12 14h.01"/>
                <path d="M16 10h.01"/>
                <path d="M16 14h.01"/>
                <path d="M8 10h.01"/>
                <path d="M8 14h.01"/>
            </Fragment>,
        'car':
            <Fragment>
                <path
                    d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
                <circle cx="6.5" cy="16.5" r="2.5"/>
                <circle cx="16.5" cy="16.5" r="2.5"/>
            </Fragment>,
        'anchor':
            <Fragment>
                <circle cx="12" cy="5" r="3"/>
                <line x1="12" y1="22" x2="12" y2="8"/>
                <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
            </Fragment>,
        'book':
            <Fragment>
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </Fragment>,
        'book-text':
            <Fragment>
                <path d="M12 7v14"/>
                <path d="M16 12h2"/>
                <path d="M16 8h2"/>
                <path
                    d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
                <path d="M6 12h2"/>
                <path d="M6 8h2"/>
            </Fragment>,
        'notebook':
            <Fragment>

                <path d="M2 6h4"/>
                <path d="M2 10h4"/>
                <path d="M2 14h4"/>
                <path d="M2 18h4"/>
                <rect width="16" height="20" x="4" y="2" rx="2"/>
                <path d="M9.5 8h5"/>
                <path d="M9.5 12H16"/>
                <path d="M9.5 16H14"/>
            </Fragment>,
        'briefcase':
            <Fragment>
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </Fragment>,
        'more':
            <Fragment>
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="5" r="1"/>
                <circle cx="12" cy="19" r="1"/>
            </Fragment>,
        'dot':
            <Fragment>
                <circle cx="12" cy="12" r="1"/>
            </Fragment>,
        'share':
            <Fragment>
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
            </Fragment>,
        'trash':
            <Fragment>
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
            </Fragment>,
        'muncher':
            <Fragment>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="7" y1="10" x2="17" y2="10"/>
                <line x1="7" y1="14" x2="17" y2="14"/>
                <line x1="7" y1="18" x2="17" y2="18"/>
            </Fragment>,
        'tithi':
            <Fragment>
                <path d="M17 18a5 5 0 0 0-10 0"/>
                <line x1="12" y1="6" x2="12" y2="9"/>
                <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/>
                <line x1="1" y1="18" x2="3" y2="18"/>
                <line x1="21" y1="18" x2="23" y2="18"/>
                <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/>
                <line x1="23" y1="22" x2="1" y2="22"/>
            </Fragment>,
        'save':
            <Fragment>
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
            </Fragment>,
        'copy':
            <Fragment>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </Fragment>,
        'crop':
            <Fragment>
                <path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"/>
                <path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"/>
            </Fragment>,
        'clipboard':
            <Fragment>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            </Fragment>,
        'bookmark':
            <Fragment>
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </Fragment>,
        'rss':
            <Fragment>
                <path d="M4 11a9 9 0 0 1 9 9"/>
                <path d="M4 4a16 16 0 0 1 16 16"/>
                <circle cx="5" cy="19" r="1"/>
            </Fragment>,
        'calendar':
            <Fragment>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
            </Fragment>,
        'mail':
            <Fragment>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
            </Fragment>,
        'message':
            <Fragment>
                <path
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </Fragment>,
        'phone':
            <Fragment>
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
            </Fragment>,
        'voicemail':
            <Fragment>
                <circle cx="5.5" cy="11.5" r="4.5"/>
                <circle cx="18.5" cy="11.5" r="4.5"/>
                <line x1="5.5" y1="16" x2="18.5" y2="16"/>
            </Fragment>,
        'inbox':
            <Fragment>
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
                <path
                    d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
            </Fragment>,
        'upload':
            <Fragment>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
            </Fragment>,
        'download':
            <Fragment>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </Fragment>,
        'send':
            <Fragment>
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </Fragment>,
        'archive':
            <Fragment>
                <polyline points="21 8 21 21 3 21 3 8"/>
                <rect x="1" y="3" width="22" height="5"/>
                <line x1="10" y1="12" x2="14" y2="12"/>
            </Fragment>,
        'lock':
            <Fragment>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </Fragment>,
        'unlock':
            <Fragment>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
            </Fragment>,
        'bell':
            <Fragment>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </Fragment>,
        'bell-off':
            <Fragment>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                <path d="M18.63 13A17.89 17.89 0 0 1 18 8"/>
                <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"/>
                <path d="M18 8a6 6 0 0 0-9.33-5"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
            </Fragment>,
        'star':
            <Fragment>
                <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </Fragment>,
        'thumbs-down':
            <Fragment>
                <path
                    d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
            </Fragment>,
        'thumbs-up':
            <Fragment>
                <path
                    d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </Fragment>,
        'flag':
            <Fragment>
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                <line x1="4" y1="22" x2="4" y2="15"/>
            </Fragment>,
        'tag':
            <Fragment>
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
            </Fragment>,
        'heart':
            <Fragment>
                <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </Fragment>,
        'map':
            <Fragment>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
            </Fragment>,
        'settings':
            <Fragment>
                <circle cx="12" cy="12" r="3"/>
                <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </Fragment>,
        'user-settings':
            <Fragment>
                <path d="m14.305 19.53.923-.382"/>
                <path d="m15.228 16.852-.923-.383"/>
                <path d="m16.852 15.228-.383-.923"/>
                <path d="m16.852 20.772-.383.924"/>
                <path d="m19.148 15.228.383-.923"/>
                <path d="m19.53 21.696-.382-.924"/>
                <path d="M2 21a8 8 0 0 1 10.434-7.62"/>
                <path d="m20.772 16.852.924-.383"/>
                <path d="m20.772 19.148.924.383"/>
                <circle cx="10" cy="8" r="5"/>
                <circle cx="18" cy="18" r="3"/>
            </Fragment>,
        'calendar-settings':
            <Fragment>
                <path d="m15.228 16.852-.923-.383"/>
                <path d="m15.228 19.148-.923.383"/>
                <path d="M16 2v4"/>
                <path d="m16.47 14.305.382.923"/>
                <path d="m16.852 20.772-.383.924"/>
                <path d="m19.148 15.228.383-.923"/>
                <path d="m19.53 21.696-.382-.924"/>
                <path d="m20.772 16.852.924-.383"/>
                <path d="m20.772 19.148.924.383"/>
                <path d="M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
                <path d="M3 10h18"/>
                <path d="M8 2v4"/>
                <circle cx="18" cy="18" r="3"/>
            </Fragment>,
        'tool':
            <Fragment>
                <path
                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </Fragment>,
        'toggle-left':
            <Fragment>
                <rect x="1" y="5" width="22" height="14" rx="7" ry="7"/>
                <circle cx="8" cy="12" r="3" color="grey"/>
            </Fragment>,
        'toggle-right':
            <Fragment>
                <rect x="1" y="5" width="22" height="14" rx="7" ry="7"/>
                <circle cx="16" cy="12" r="3" color="green"/>
            </Fragment>,

        'at':
            <Fragment>
                <circle cx="12" cy="12" r="4"/>
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
            </Fragment>,
        'award':
            <Fragment>
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
            </Fragment>,
        'shopping-cart':
            <Fragment>
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </Fragment>,
        'bar-chart':
            <Fragment>
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
            </Fragment>,
        'pie-chart':
            <Fragment>
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                <path d="M22 12A10 10 0 0 0 12 2v10z"/>
            </Fragment>,
        'trending-up':
            <Fragment>
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
            </Fragment>,
        'trending-down':
            <Fragment>
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
                <polyline points="17 18 23 18 23 12"/>
            </Fragment>,
        'gift':
            <Fragment>
                <polyline points="20 12 20 22 4 22 4 12"/>
                <rect x="2" y="7" width="20" height="5"/>
                <line x1="12" y1="22" x2="12" y2="7"/>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </Fragment>,
        'bulb':
            <Fragment>
                <line x1="9" y1="18" x2="15" y2="18"/>
                <line x1="10" y1="22" x2="14" y2="22"/>
                <path
                    d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/>
            </Fragment>,
        '360':
            <Fragment>
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                <text x="6" y="14" fontSize="6" fontFamily="'Lucida Grande', sans-serif">360</text>
            </Fragment>,
        'fingerprint':
            <Fragment>
                <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/>
                <path d="M14 13.12c0 2.38 0 6.38-1 8.88"/>
                <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/>
                <path d="M2 12a10 10 0 0 1 18-6"/>
                <path d="M2 16h.01"/>
                <path d="M21.8 16c.2-2 .131-5.354 0-6"/>
                <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/>
                <path d="M8.65 22c.21-.66.45-1.32.57-2"/>
                <path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>
            </Fragment>,
        'user-lock':
            <Fragment>
                <path d="M19 16v-2a2 2 0 0 0-4 0v2"/>
                <path d="M9.5 15H7a4 4 0 0 0-4 4v2"/>
                <circle cx="10" cy="7" r="4"/>
                <rect x="13" y="16" width="8" height="5" rx=".899"/>
            </Fragment>,
        'hand-shake':
            <Fragment>
                <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
                <path
                    d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
                <path d="m21 3 1 11h-2"/>
                <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
                <path d="M3 4h8"/>
            </Fragment>,
        'rose':
            <Fragment>
                <path d="M17 10h-1a4 4 0 1 1 4-4v.534"/>
                <path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"/>
                <path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"/>
                <path d="M9.77 12C4 15 2 22 2 22"/>
                <circle cx="17" cy="8" r="2"/>
            </Fragment>,
        'leaf':
            <Fragment>
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </Fragment>,
        'flower':
            <Fragment>
                <path
                    d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/>
                <circle cx="12" cy="8" r="2"/>
                <path d="M12 10v12"/>
                <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/>
                <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>
            </Fragment>,
        'microscope':
            <Fragment>
                <path d="M6 18h8"/>
                <path d="M3 22h18"/>
                <path d="M14 22a7 7 0 1 0 0-14h-1"/>
                <path d="M9 14h2"/>
                <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/>
                <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>
            </Fragment>,
        'telescope':
            <Fragment>
                <path
                    d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"/>
                <path d="m13.56 11.747 4.332-.924"/>
                <path d="m16 21-3.105-6.21"/>
                <path
                    d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"/>
                <path d="m6.158 8.633 1.114 4.456"/>
                <path d="m8 21 3.105-6.21"/>
                <circle cx="12" cy="13" r="2"/>
            </Fragment>,
        'atom':
            <Fragment>
                <circle cx="12" cy="12" r="1"/>
                <path
                    d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/>
                <path
                    d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>
            </Fragment>,
        'activity':
            <Fragment>
                <rect width="18" height="18" x="3" y="3" rx="2"/>
                <path d="M17 12h-2l-2 5-2-10-2 5H7"/>
            </Fragment>,
        'alarm-clock':
            <Fragment>
                <circle cx="12" cy="13" r="8"/>
                <path d="M12 9v4l2 2"/>
                <path d="M5 3 2 6"/>
                <path d="m22 6-3-3"/>
                <path d="M6.38 18.7 4 21"/>
                <path d="M17.64 18.67 20 21"/>
            </Fragment>,
        'palm-tree':
            <Fragment>
                <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"/>
                <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"/>
                <path
                    d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"/>
                <path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/>
            </Fragment>,
        'calendar-heart':
            <Fragment>
                <path d="M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125"/>
                <path
                    d="M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/>
                <path d="M16 2v4"/>
                <path d="M3 10h18"/>
                <path d="M8 2v4"/>
            </Fragment>,
        'a-z':
            <Fragment>
                <path d="m3 16 4 4 4-4"/>
                <path d="M7 20V4"/>
                <path d="M20 8h-5"/>
                <path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10"/>
                <path d="M15 14h5l-5 6h5"/>
            </Fragment>,
        'z-a':
            <Fragment>
                <path d="m3 8 4-4 4 4"/>
                <path d="M7 4v16"/>
                <path d="M15 4h5l-5 6h5"/>
                <path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"/>
                <path d="M20 18h-5"/>
            </Fragment>,
        '0-1':
            <Fragment>
                <path d="m3 16 4 4 4-4"/>
                <path d="M7 20V4"/>
                <rect x="15" y="4" width="4" height="6" ry="2"/>
                <path d="M17 20v-6h-2"/>
                <path d="M15 20h4"/>
            </Fragment>,
        '1-0':
            <Fragment>
                <path d="m3 8 4-4 4 4"/>
                <path d="M7 4v16"/>
                <path d="M17 10V4h-2"/>
                <path d="M15 10h4"/>
                <rect x="15" y="14" width="4" height="6" ry="2"/>
            </Fragment>,
        'arm-chair':
            <Fragment>
                <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/>
                <path
                    d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/>
                <path d="M5 18v2"/>
                <path d="M19 18v2"/>
            </Fragment>
    }
;
