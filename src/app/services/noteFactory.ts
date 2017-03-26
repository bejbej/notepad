module app {
    export class NoteFactory {

        constructor(private $injector: ng.auto.IInjectorService) {
        }

        createNote = (data?: any): Note => {
            var note = new Note(
                this.$injector.get<ng.IQService>("$q"),
                this.$injector.get<NoteService>("NoteService"));
            if (data) {
                note.id = data.id;
                note.text = data.text;
                note.tags = data.tags;
            }
            return note;
        }
    }

    angular.module("app").service("NoteFactory", NoteFactory);
}