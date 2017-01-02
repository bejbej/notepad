module app {

    class NotesController {

        private notes: any[];

        constructor(NoteService: NoteService) {
            NoteService.getByQuery().then(notes => {
                this.notes = notes.sort((a, b) => {
                    return a.preview > b.preview ? 1 : -1;
                });
            });
        }
    }

    angular.module("app").controller("NotesController", NotesController);
}