module app {
    export class Note {
        id: string;
        text: string;
        tags: string[];

        constructor(
            private $q: ng.IQService,
            private NoteService: NoteService) {
        }

        save = (): ng.IPromise<any> => {
            if (this.id) {
                return this.NoteService.put(this);
            } else {
                return this.NoteService.post(this).then(id => {
                    this.id = id;
                });
            }
        }

        delete = (): ng.IPromise<any> => {
            if (this.id) {
                return this.NoteService.delete(this.id);
            } else {
                return this.$q.reject();
            }
        }
    }
}