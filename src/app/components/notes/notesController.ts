module app {

    class NotesController {

        private notes: INoteQueryResult[];
        private visibleNotes: INoteQueryResult[];
        private tags: string[];
        private currentFilter: string;
        private tagsKey = "tags";

        constructor(private NoteService: NoteService) {
            this.getNotes();

            var tags = <ITags>JSON.parse(localStorage.getItem(this.tagsKey));
            if (tags) {
                this.tags = tags.all;
                this.currentFilter = tags.current;
            }
        }

        getNotes = () => {
            this.NoteService.getByQuery().then(notes => {
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

                if (this.tags.indexOf(this.currentFilter) < 0) {
                    delete this.currentFilter;
                }

                this.storeTags();
                this.filterNotes();
            });
        }

        filterNotes = () => {
            this.storeTags();
            
            if (!this.currentFilter) {
                this.visibleNotes = this.notes;
                return;
            }

            this.visibleNotes = this.notes.filter(note => {
                return note.tags.some(tag => {
                    return tag.toLocaleLowerCase() === this.currentFilter.toLocaleLowerCase();
                });
            });
        }

        storeTags = () => {
            if (this.tags === undefined) {
                localStorage.removeItem(this.tagsKey);
            }
            var tags: ITags = {
                all: this.tags,
                current: this.currentFilter
            };
            localStorage.setItem(this.tagsKey, JSON.stringify(tags));
        }
    }

    angular.module("app").controller("NotesController", NotesController);
}