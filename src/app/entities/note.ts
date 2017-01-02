module app {
    export class Note {
        id: string;
        text: string;

        constructor(
            private $q: ng.IQService,
            private NoteService: NoteService) {
        }

        save = (): ng.IPromise<any> => {
            var deferred = this.$q.defer();
            if (this.id) {
                this.NoteService.put(this).then(deferred.resolve, deferred.reject);
            } else {
                this.NoteService.post(this).then(id => {
                    this.id = id;
                    deferred.resolve();
                }, deferred.reject);
            }
            return deferred.promise;
        }

        delete = (): ng.IPromise<any> => {
            var deferred = this.$q.defer();
            if (this.id) {
                this.NoteService.delete(this.id).then(deferred.resolve, deferred.reject);
            } else {
                deferred.reject();
            }
            return deferred.promise;
        }
    }
}