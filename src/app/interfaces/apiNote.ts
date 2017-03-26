module app {
    export interface IApiNote {
        id: string;
        text: string;
        tags: string[];
    }

    export interface INoteQueryResult {
        id: string;
        preview: string;
        tags: string[];
    }

    export interface INoteQueryResults {
        results: INoteQueryResult[]
    }
}