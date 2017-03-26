module app {

    class NotesController {

        private notes: INoteQueryResult[];
        private visibleNotes: INoteQueryResult[];
        private tags: string[];
        private currentFilter: string;
        private defaultFilterKey = "defaultFilter";

        constructor(NoteService: NoteService) {
            NoteService.getByQuery().then(notes => {
                this.notes = notes.sort((a, b) => {
                    return a.preview > b.preview ? 1 : -1;
                });

                this.tags = notes.reduce((tags, note) => {
                    note.tags.forEach(tag => {
                        tag = tag.toLocaleLowerCase();
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                    return tags;
                }, []);

                var defaultFilter = localStorage.getItem(this.defaultFilterKey);
                if (defaultFilter && this.tags.indexOf(defaultFilter) > -1 ) {
                    this.currentFilter = defaultFilter;
                }
                this.filterNotes();
            });

        }

        filterNotes = () => {
            if (!this.currentFilter) {
                localStorage.removeItem(this.defaultFilterKey);
                this.visibleNotes = this.notes;
                return;
            }
            localStorage.setItem(this.defaultFilterKey, this.currentFilter);
            this.visibleNotes = this.notes.filter(note => {
                return note.tags.some(tag => {
                    return tag.toLocaleLowerCase() === this.currentFilter.toLocaleLowerCase();
                });
            });
        }
    }

    angular.module("app").controller("NotesController", NotesController);
}