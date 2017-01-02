module app {

    interface IRouteParams {
        id: string;
    }

    class NoteController {

        public note: Note;
        public noteInput: string;
        public isEditing: boolean;
        public isSaving: boolean;
        public isDeleting: boolean;

        constructor(
            $routeParams: IRouteParams,
            private $location: any,
            private NoteService: NoteService,
            private NoteFactory: NoteFactory) {

            if ($routeParams.id === "new") {
                this.note = this.createNewNote();
            } else {
                this.NoteService.getById($routeParams.id).then(note => {
                    this.note = note;
                });
            }
        }

        private startEditing = () => {
            this.noteInput = this.note.text;
            this.isEditing = true;
        }

        private applyChanges = () => {
            this.note.text = this.noteInput;
            if (this.note.id) {
                this.note.save();
            }
            this.isEditing = false;
        }

        private discardChanges = () => {
            this.isEditing = false;
        }

        private save = () => {
            this.isSaving = true;
            this.note.save().finally(() => {
                this.isSaving = false;
                this.$location.update_path("/notes/" + this.note.id);
            });
        }

        private delete = () => {
            var r = confirm("Are you sure you want to remove this note from the cloud?");
            if (r) {
                this.isDeleting = true;
                this.note.delete().finally(() => {
                    this.isDeleting = false;
                    this.$location.update_path("/decks/new");
                });
            }
        }

        private createNewNote = () => {
            var note = this.NoteFactory.createNote();
            note.text = "# New Note";
            return note;
        }
    }

    angular.module("app").controller("NoteController", NoteController);
}