module app {
    export class NoteService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private config: IConfig,
            private NoteFactory: NoteFactory) {
        }

        getById = (id: string): ng.IPromise<Note> => {
            var deferred = this.$q.defer();
            this.$http.get<IApiNote>(this.config.notesUrl + "/" + id).then(response => {
                deferred.resolve(this.mapApiDeck(response.data));
            }, response => {
                deferred.reject(response.status);
            });
            return deferred.promise;
        }

        getByQuery = (): ng.IPromise<INoteQueryResult[]> => {
            var deferred = this.$q.defer();
            this.$http.get<INoteQueryResults>(this.config.notesUrl).then(response => {
                return deferred.resolve(response.data.results);
            }, response => {
                return deferred.reject(response.status);
            })
            return deferred.promise;
        }

        post = (note: Note): ng.IPromise<string> => {
            var deferred = this.$q.defer();
            this.$http.post<{id:string}>(this.config.notesUrl, note).then(response => {
                deferred.resolve(response.data.id);
            }, response => {
                deferred.reject(response.status);
            });
            return deferred.promise;
        }

        put = (note: Note): ng.IPromise<any> => {
            var deferred = this.$q.defer();
            this.$http.put(this.config.notesUrl + "/" + note.id, note).then(response => {
                deferred.resolve();
            }, response => {
                deferred.reject();
            });
            return deferred.promise;
        }

        delete = (id: string): ng.IPromise<any> => {
            var deferred = this.$q.defer();
            this.$http.delete(this.config.notesUrl + "/" + id).then(response => {
                deferred.resolve();
            }, response => {
                deferred.reject(response.status);
            })
            return deferred.promise;
            
        }

        private mapApiDeck = (apiNote: IApiNote): Note => {
            return this.NoteFactory.createNote(apiNote);
        }
    }

    angular.module("app").service("NoteService", NoteService);
}