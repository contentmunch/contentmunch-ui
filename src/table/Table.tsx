import React, {type ReactElement, type ReactNode, useMemo, useState} from "react";
import "./assets/table.css";
import {SortButton} from "../button/SortButton";
import {CsvButton} from "../button/CsvButton";
import {Select} from "../input/Select";
import {Button} from "../button/Button";
import {Icon} from "../icon/Icon";
import {CsvInput} from "../input/CsvInput";

export const Table: React.FC<TableProps> = (
    {
        fileName,
        defaultPageSize = 50,
        skeleton,
        handleOnUpload,
        sortBy,
        excludeDownload,
        includeUpload,
        isUploading,
        uploadWarningMessage,
        uploadSuccessMessage,
        excludePagination,
        footer,
        children,
    }) => {
    const {header, rows} = children;
    const [sort, setSort] = useState<Sort>(sortBy ?? {index: 0});
    const [page, setPage] = useState<Page>({num: 0, size: defaultPageSize});

    const handleSortClicked = (index: number) => {
        setSort((prev) =>
            prev.index === index ? {...prev, desc: !prev.desc} : {index}
        );
    };

    const sortedRows = useMemo(() => {
        const cloned = [...rows];
        const sortFn = header[sort.index]?.sort;

        if (sortFn) {
            cloned.sort(sortFn);
        } else {
            cloned.sort((a, b) => {
                const valA = a[sort.index]?.value?.toString().toLowerCase() ?? "";
                const valB = b[sort.index]?.value?.toString().toLowerCase() ?? "";
                return valA.localeCompare(valB);
            });
        }
        return sort.desc ? cloned.reverse() : cloned;
    }, [rows, sort, header]);

    const paginatedRows = useMemo(
        () => sortedRows.slice(page.num * page.size, (page.num + 1) * page.size),
        [sortedRows, page]
    );

    const csvHeader = header.filter(h => !h.csvExclude).map(h => typeof h.name === 'string' ? h.name : "");
    const csvData = rows.map(row =>
        row.filter((_col, i) => !header[i].csvExclude).map(col => col.csv ?? col.value ?? "")
    );

    return (
        <section className="muncher-table">
            <div className="row head">
                {header.map((head, index) =>
                    head.visibility === "hidden" ? null : (
                        <div
                            key={`row-head-${index}`}
                            title={head.title}
                            className={head.visibility ? "col main" : "col"}
                        >
                            {typeof head.name === "string" ? (
                                <div className="sort-button">
                                    <SortButton
                                        onClick={() => handleSortClicked(index)}
                                        active={sort.index === index}
                                        sortAsc={!sort.desc}
                                    >
                                        {head.name}
                                    </SortButton>
                                </div>
                            ) : (
                                head.name
                            )}
                        </div>
                    )
                )}
            </div>

            {skeleton || paginatedRows.map((cols, rowIndex) => (
                <div className="row" key={`row-${rowIndex}`}>
                    {cols.map((col, colIndex) =>
                        header[colIndex].visibility === "hidden" ? null : (
                            <div
                                key={`row-col-${rowIndex}-${colIndex}`}
                                className={header[colIndex].visibility ? "col main" : "col"}
                            >
                                {col.content}
                            </div>
                        )
                    )}
                </div>
            ))}

            {footer ?? null}

            <div className="row-footer">
                <div className="row-footer-buttons">
                    {!excludeDownload && (
                        <CsvButton
                            filename={fileName ?? "download"}
                            variant="secondary"
                            title="Download"
                            header={csvHeader}
                            data={csvData}
                        />
                    )}

                    {includeUpload && (
                        <CsvInput
                            name="csv-input-file"
                            handleOnChange={handleOnUpload}
                            isUploading={isUploading}
                            warningMessage={uploadWarningMessage}
                            successMessage={uploadSuccessMessage}
                        />
                    )}
                </div>

                {!excludePagination && (
                    <div className="pagination">
                        <div className="left">
                            Rows:
                            <Select
                                name="pageSize"
                                options={[
                                    {label: "50", value: "50"},
                                    {label: "100", value: "100"},
                                    {label: "500", value: "500"},
                                ]}
                                value={String(page.size)}
                                onChange={(e) =>
                                    setPage({num: 0, size: parseInt(e.target.value, 10)})
                                }
                            />
                        </div>
                        <div className="center">
                            {page.num * page.size + 1} -
                            {Math.min((page.num + 1) * page.size, rows.length)} of {rows.length}
                        </div>
                        <div className="right">
                            <Button
                                variant="transparent"
                                disabled={page.num === 0}
                                size="small"
                                onClick={() => setPage({...page, num: page.num - 1})}
                            >
                                <Icon name="chevron-left"/>
                            </Button>
                            <Button
                                variant="transparent"
                                disabled={(page.num + 1) * page.size >= rows.length}
                                size="small"
                                onClick={() => setPage({...page, num: page.num + 1})}
                            >
                                <Icon name="chevron-right"/>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export interface TableProps {
    children: {
        header: Head[];
        rows: Col[][];
    };
    skeleton?: ReactNode;
    sortBy?: Sort;
    fileName?: string;
    defaultPageSize?: number;
    excludeDownload?: true;
    excludePagination?: boolean;
    includeUpload?: true;
    isUploading?: boolean;
    handleOnUpload?: (file: File) => void;
    uploadWarningMessage?: string;
    uploadSuccessMessage?: string;
    footer?: ReactNode;
}

export interface Page {
    num: number;
    size: number;
}

export interface Sort {
    index: number;
    desc?: boolean;
}

export interface Head {
    name: ReactElement | string;
    title?: string;
    visibility?: "large-screen" | "hidden";
    csvExclude?: boolean;
    sort?: (a: Col[], b: Col[]) => number;
}

export interface Col {
    value: string;
    content: ReactNode;
    csv?: string;
}
