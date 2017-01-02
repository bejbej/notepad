module app {
    export interface IApiNote {
        id: string;
        text: string;
    }

    export interface INoteQueryResult {
        id: string;
        preview: string;
    }

    export interface INoteQueryResults {
        results: INoteQueryResult[]
    }
}