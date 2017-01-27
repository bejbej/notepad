module app {
    export class NoteService {

        constructor(
            private $http: ng.IHttpService,
            private config: IConfig,
            private NoteFactory: NoteFactory) {
        }

        getById = (id: string): ng.IPromise<Note> => {
            return this.$http.get<IApiNote>(this.config.notesUrl + "/" + id).then(response => {
                return this.mapApiDeck(response.data);
            });
        }

        getByQuery = (): ng.IPromise<INoteQueryResult[]> => {
            return this.$http.get<INoteQueryResults>(this.config.notesUrl).then(response => {
                return response.data.results;
            })
        }

        post = (note: Note): ng.IPromise<string> => {
            return this.$http.post<{id:string}>(this.config.notesUrl, note).then(response => {
                return response.data.id;
            });
        }

        put = (note: Note): ng.IPromise<any> => {
            return this.$http.put(this.config.notesUrl + "/" + note.id, note);
        }

        delete = (id: string): ng.IPromise<any> => {
            return this.$http.delete(this.config.notesUrl + "/" + id);
        }

        private mapApiDeck = (apiNote: IApiNote): Note => {
            return this.NoteFactory.createNote(apiNote);
        }
    }

    angular.module("app").service("NoteService", NoteService);
}