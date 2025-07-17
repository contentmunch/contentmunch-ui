import React, {type ReactElement, type ReactNode, useState} from "react";
import "./assets/table.css";
import {SortButton} from "../button/SortButton";
import {CsvButton} from "../button/CsvButton";
import {Select} from "../input/Select";
import {Button} from "../button/Button";
import {Icon} from "../icon/Icon";
import {CsvInput} from "../input/CsvInput";


export const Table: React.FC<TableProps> = (
    {
        fileName, defaultPageSize, skeleton,
        handleOnUpload, sortBy, excludeDownload,
        includeUpload, isUploading, uploadWarningMessage, uploadSuccessMessage,
        excludePagination, footer, children
    }) => {
    const {header, rows} = children;
    const [sort, setSort] = useState<Sort>(sortBy ? sortBy : {index: 0});
    const [page, setPage] = useState<Page>({num: 0, size: defaultPageSize ? defaultPageSize : 50});
    const handleSortClicked = (index: number) => {
        if (sort.index === index)
            setSort({...sort, desc: !sort.desc});
        else
            setSort({index});
    };
    const sortRows = (): Col[][] => {
        if (header[sort.index].sort) {
            const currentRows = rows.sort(header[sort.index].sort);
            return sort.desc ? currentRows.reverse() : currentRows;
        }

        return rows.sort((a: Col[], b: Col[]): number => {
                if (a[sort.index]?.value === null || b[sort.index]?.value === null)
                    return 0;
                const first = a[sort.index]?.value?.toString().toLowerCase();
                const second = b[sort.index]?.value?.toString().toLowerCase();
                let result = first.localeCompare(second);
                return sort.desc ? -result : result;
            }
        );
    }
    const pageEndIndex = (): number => (page.num + 1) * page.size;
    return (
        <section className="muncher-table">
            <div className="row head">
                {header.map((head, index) =>
                    head.visibility === "hidden" ? "" :
                        <div key={"row-head-" + head.name}
                             title={head.title}
                             className={head.visibility ? "col main" : "col"}>
                            {typeof head.name === 'string' ?
                                <div className="sort-button">
                                    <SortButton
                                        onClick={() => {
                                            handleSortClicked(index)
                                        }}
                                        active={sort.index === index}
                                        sortAsc={!sort.desc}>
                                        {head.name}
                                    </SortButton>
                                </div> : head.name
                            }
                        </div>
                )}
            </div>
            {
                skeleton ? skeleton :
                    sortRows().slice(page.num * page.size, pageEndIndex() - 1).map((cols, rowIndex) =>
                        <div className="row" key={"row-" + rowIndex}>{
                            cols.map((col, colIndex) =>
                                header[colIndex].visibility === "hidden" ? "" :
                                    <div key={"row-col" + rowIndex + colIndex}
                                         className={header[colIndex].visibility ? "col main" : "col"}>
                                        {col.content}
                                    </div>)}
                        </div>
                    )}
            {footer ? footer : ""}
            <div className="row-footer">
                <div className="row-footer-buttons">
                    {excludeDownload ? "" : <CsvButton filename={fileName ? fileName : "download"}
                                                       variant="secondary"
                                                       title="Download"
                                                       header={header.filter(head => !head.csvExclude).map(value => typeof value.name === 'string' ? value.name : "")}
                                                       data={rows.map(value => value
                                                           .filter((_col, colIndex) => !header[colIndex].csvExclude)
                                                           .map(col => col.csv ? col.csv ? col.csv : "" : col.value ? col.value : "")
                                                       )}
                    />}
                    {includeUpload ?
                        <CsvInput name="csv-input-file" handleOnChange={handleOnUpload}
                                  isUploading={isUploading} warningMessage={uploadWarningMessage}
                                  successMessage={uploadSuccessMessage}/> : ""}
                </div>

                {excludePagination ? "" :
                    <div className="pagination">
                        <div className="left">Rows: <Select name="pageSize" options={[{label: "50", value: "50"}, {
                            label: "100",
                            value: "100"
                        }, {label: "500", value: "500"}]}
                                                            value={page.size}
                                                            onChange={e => {
                                                                setPage({
                                                                    ...page,
                                                                    size: parseInt(e.target.value)
                                                                })
                                                            }}/>
                        </div>
                        <div className="center">
                            {page.num * page.size + 1} - {pageEndIndex() < rows.length ? pageEndIndex() : rows.length} of {rows.length}
                        </div>

                        <div className="right">
                            <Button variant="transparent" disabled={page.num === 0} size="small"
                                    onClick={() => {
                                        setPage({...page, num: page.num - 1});
                                    }}
                            >
                                <Icon name="chevron-left"/>
                            </Button>
                            <Button variant="transparent"
                                    disabled={(rows.length - (page.num * page.size)) <= page.size}
                                    size="small"
                                    onClick={() => {
                                        setPage({...page, num: page.num + 1});
                                    }}>
                                <Icon name="chevron-right"/>
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
};

export interface TableProps {
    children: {
        header: Head[],
        rows: Col[][]
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
