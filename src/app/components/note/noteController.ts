module app {

    interface IRouteParams {
        id: string;
    }

    class NoteController {

        public note: Note;
        public noteInput: string;
        public isSaving: boolean;
        public isDeleting: boolean;
        public view: string = "md";

        constructor(
            $routeParams: IRouteParams,
            NoteFactory: NoteFactory,
            private $location: any,
            private NoteService: NoteService) {

            if ($routeParams.id === "new") {
                this.note = NoteFactory.createNote();
                this.view = "edit";
            } else {
                this.NoteService.getById($routeParams.id).then(note => {
                    this.note = note;
                });
            }
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
                this.note.delete().then(() => {
                    location.hash = "/notes";
                }).finally(() => {
                    this.isDeleting = false;
                });
            }
        }
    }

    angular.module("app").controller("NoteController", NoteController);
}