import type {Meta, StoryFn} from '@storybook/react';
import {useState} from "react";
import {type Col, Table} from "./Table";
import {Icon} from "../icon/Icon";
import "./assets/table-stories.css";


const meta = {
    title: "Data Display/Table",
    component: Table,
    decorators: [
        (Story) => (
            <div style={{width: '95vw'}}>
                <Story/>
            </div>)
    ],
} satisfies Meta<typeof Table>;
export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = () =>
    <Table excludePagination={true} excludeDownload={true}>{{
        header: [
            {name: "Id", title: "Id"},
            {name: "Name", title: "First name and Last name"},
            {name: "Email", title: "Email Address", visibility: "large-screen"},
            {name: "Phone", title: "Phone Number", visibility: "large-screen"},
            {name: "Eligibility", title: "Eligibility"},
            {name: <Icon name="plus"/>, csvExclude: true},
            {name: "Employee", title: " Employee", visibility: "hidden"},

        ], rows: [
            [
                {value: "1", content: <a href="google.com">1</a>},
                {value: "James Dean", content: "James Dean"},
                {
                    value: "jamesdean@gmail.com",
                    content: <a href="mailto:jamesdean@gmail.com">jamesdean@gmail.com</a>
                },
                {value: "123456", content: <a href="test:123456">123-456</a>},
                {value: "false", csv: "no", content: "No"},
                {value: "1", content: <Icon name="plus"/>},
                {value: "employee", csv: "yes", content: "Yes"},
            ],
            [
                {value: "2", content: <a href="google.com">2</a>},
                {value: "Dean Smith", content: "Dean Smith"},
                {value: "dean@gmail.com", content: <a href="mailto:dean@gmail.com">dean@gmail.com</a>},
                {value: "111456", content: <a href="test:111456">111-456</a>},
                {value: "true", csv: "yes", content: "Yes"},
                {value: "1", content: <Icon name="plus"/>},
                {value: "employee", csv: "yes", content: "Yes"},
            ],
            [
                {value: "3", content: <a href="google.com">3</a>},
                {value: "James Buckner", content: "James Buckner"},
                {value: "james@gmail.com", content: <a href="mailto:james@gmail.com">james@gmail.com</a>},
                {value: "123777", content: <a href="test:123777">123-777</a>},
                {value: "true", csv: "yes", content: "Yes"},
                {value: "1", content: <Icon name="plus"/>},
                {value: "employee", csv: "yes", content: "Yes"},
            ],
            [
                {value: "4", content: <a href="google.com">4</a>},
                {value: "Robert Muller", content: "Robert Muller"},
                {value: "muller@gmail.com", content: <a href="mailto:muller@gmail.com">muller@gmail.com</a>},
                {value: "112576", content: <a href="test:112576">112-576</a>},
                {value: "true", csv: "yes", content: "Yes"},
                {value: "1", content: <Icon name="plus"/>},
                {value: "employee", csv: "yes", content: "Yes"},
            ],
            [
                {value: "5", content: <a href="google.com">5</a>},
                {value: "Herman Miller", content: "Herman Miller"},
                {value: "millern@gmail.com", content: <a href="mailto:millern@gmail.com">millern@gmail.com</a>},
                {value: "116754", content: <a href="test:116754">116-754</a>},
                {value: "false", csv: "yes", content: "No"},
                {value: "1", content: <Icon name="plus"/>},
                {value: "employee", csv: "no", content: "No"},
            ],
        ]
    }}</Table>;
const generatePhone = (): Col => {
    const num = Math.floor(100000 + Math.random() * 900000).toString();
    return {value: num, content: <a href={"tel:" + num}>{num}</a>};
};

export const Pageable: Story = () => {

    const names = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "Ut", "at", "libero", "eu", "risus", "blandit", "semper", "Duis", "euismod", "aliquam", "lectus", "id", "rhoncus", "Cras", "eget", "nisi", "quis", "mi", "feugiat", "viverra", "Nunc", "vehicula", "eu", "dolor", "nec", "laoreet", "Integer", "ut", "felis", "sit", "amet", "libero", "feugiat", "sagittis", "In", "hac", "habitasse", "platea", "dictumst", "Nam", "viverra", "lectus", "pulvinar", "feugiat", "iaculis", "In", "non"];
    const rows = (): Col[][] => {
        const data: Col[][] = [];
        names.forEach((name, index) => {
            data.push([
                {value: index.toString(), content: <a href="google.com">{index.toString()}</a>},
                {value: name, content: name},
                {
                    value: name + "@gmail.com",
                    content: <a href={"mailto:" + name + "@gmail.com"}>{name + "@gmail.com"}</a>
                },
                generatePhone()
            ]);
        });
        return data;
    };
    return (
        <Table>{{
            header: [
                {name: "Id", title: "Id", sort: (a, b) => +a - +b},
                {name: "Name", title: "First name and Last name"},
                {name: "Email", title: "Email Address", visibility: "large-screen"},
                {name: "Phone", title: "Phone Number", visibility: "large-screen"}

            ], rows: rows()
        }
        }</Table>
    );
};

export const WithUploadTemplate: Story = () => {

    const names = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "Ut", "at", "libero", "eu", "risus", "blandit", "semper", "Duis", "euismod", "aliquam", "lectus", "id", "rhoncus", "Cras", "eget", "nisi", "quis", "mi", "feugiat", "viverra", "Nunc", "vehicula", "eu", "dolor", "nec", "laoreet", "Integer", "ut", "felis", "sit", "amet", "libero", "feugiat", "sagittis", "In", "hac", "habitasse", "platea", "dictumst", "Nam", "viverra", "lectus", "pulvinar", "feugiat", "iaculis", "In", "non"];
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
    const rows = (): Col[][] => {
        const data: Col[][] = [];
        names.forEach((name, index) => {
            data.push([
                {value: index.toString(), content: <a href="google.com">{index.toString()}</a>},
                {value: name, content: name},
                {
                    value: name + "@gmail.com",
                    content: <a href={"mailto:" + name + "@gmail.com"}>{name + "@gmail.com"}</a>
                },
                generatePhone()
            ]);
        });
        return data;
    };
    return (
        <Table includeUpload={true} handleOnUpload={() => {
            setIsUploading(true);
            setTimeout(() => {
                setIsUploading(false);
                setUploadSuccessMessage("Upload Successful");
            }, 1000);
        }} isUploading={isUploading} uploadSuccessMessage={uploadSuccessMessage}>{{
            header: [
                {name: "Id", title: "Id", sort: (a, b) => +a - +b},
                {name: "Name", title: "First name and Last name"},
                {name: "Email", title: "Email Address", visibility: "large-screen"},
                {name: "Phone", title: "Phone Number", visibility: "large-screen"}

            ], rows: rows()
        }
        }</Table>
    );
};
