import React, {useState} from "react";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {HeadingNode, QuoteNode} from '@lexical/rich-text';
import {CodeHighlightNode, CodeNode} from "@lexical/code-core";
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {ListItemNode, ListNode} from '@lexical/list';
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import {HtmlPlugin} from "./plugins/HtmlPlugin";
import type {HtmlProps} from "./plugins/HtmlPlugin";
import ContentEditorTheme from "./themes/ContentEditorTheme";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import "./assets/content-editor.css";
import {ToolbarPlugin} from "./plugins/ToolbarPlugin";
import {FloatingLinkEditorPlugin} from "./plugins/FloatingLinkEditorPlugin";

export const ContentEditor: React.FC<ContentEditorProps> = ({onChange, html, variant}) => {
    const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
    const [floatingAnchorElem, setFloatingAnchorElem] =
        useState<HTMLElement | null>(null);
    const onError = (error: Error) => console.error(error);

    const initialConfig = {
        namespace: 'ContentEditor',
        theme: ContentEditorTheme,
        onError,
        nodes: [HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode,]
    };
    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

    return (
        <div className="content-editor">
            <LexicalComposer initialConfig={initialConfig}>

                <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} variant={variant}/>
                <div className="content-editor-inner" ref={onRef}>
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="content-editor-input"/>}
                        placeholder={<div className="content-editor-placeholder">Enter some text...</div>}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin/>
                    <AutoFocusPlugin/>
                    <ListPlugin/>
                    <LinkPlugin/>
                    {floatingAnchorElem ? <FloatingLinkEditorPlugin
                        anchorElem={floatingAnchorElem}
                        isLinkEditMode={isLinkEditMode}
                        setIsLinkEditMode={setIsLinkEditMode}
                    /> : ""}

                    <HtmlPlugin
                        onChange={onChange}
                        html={html}
                    />
                </div>
            </LexicalComposer>
        </div>
    );
};

export interface ContentEditorProps extends HtmlProps {
    variant?: "basic" | "simple"
}
