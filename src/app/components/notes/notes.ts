import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { distinct, orderBy, selectMany } from "@array";
import * as app from "@app";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-notes",
    templateUrl: "./notes.html"
})
export class NotesComponent implements OnInit, OnDestroy {

    notes: app.Note[];
    visibleNotes: app.Note[];
    tags: string[] = [];
    isLoading: boolean;
    currentTag: string;
    currentTagName: string;

    private notesSubscription: app.Cancellable<app.Note[]>;
    private authSubscription: Subscription;

    constructor(
        private authService: app.AuthService,
        private noteService: app.NoteService,
        private ref: ChangeDetectorRef) {

        document.title = "Notes";
        let tagState = <app.TagState>JSON.parse(localStorage.getItem(app.config.localStorage.tags));
        if (tagState) {
            this.tags = tagState.all.sort();
            this.currentTag = tagState.current;
        }
        this.updateCurrentTagName();
        this.authSubscription = authService.subscribe(() => this.sync());
    }

    ngOnInit() {
        this.sync();
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();

        if (this.notesSubscription) {
            this.notesSubscription.cancel();
        }
    }

    onCurrentTagChanged = () => {
        let tagState = {
            all: this.tags,
            current: this.currentTag
        };

        localStorage.setItem(app.config.localStorage.tags, JSON.stringify(tagState));
        this.updateCurrentTagName();
        this.filterNotes();
    }

    private loadNotes = async () => {
        let user = this.authService.getAuthUser();
        if (!user) {
            return;
        }

        this.isLoading = true;
        this.notesSubscription = this.noteService.getByQuery({ owner: user.id });
        try {
            this.notes = await this.notesSubscription.promise;
            this.onNotesLoaded();
        }
        finally {
            this.isLoading = false;
            delete this.notesSubscription;
            this.ref.markForCheck();
        }
    }

    private onNotesLoaded = () => {
        this.notes = orderBy(this.notes, note => note.preview);
        this.tags = distinct(selectMany(this.notes.map(note => note.tags))).sort();
        if (this.currentTag && this.tags.indexOf(this.currentTag) === -1) {
            this.currentTag = undefined;
        }
        this.onCurrentTagChanged();
    }

    private filterNotes = () => {
        if (!this.notes || this.notes.length === 0) {
            delete this.visibleNotes;
            return;
        }

        switch (this.currentTag) {
            case undefined:
                this.visibleNotes = this.notes;
                break;
            case null:
                this.visibleNotes = this.notes.filter(note => note.tags.length === 0);
                break;
            default:
                this.visibleNotes = this.notes.filter(note => note.tags.indexOf(this.currentTag) > -1);
        }
    }

    private updateCurrentTagName = () => {
        this.currentTagName = this.currentTag === undefined ? "All" : this.currentTag === null ? "Untagged" : this.currentTag;
    }

    private sync = () => {
        let authUser = this.authService.getAuthUser();

        if (!authUser) {
            delete this.notes;
            delete this.visibleNotes;
            delete this.currentTag;
            this.isLoading = false;
            this.tags = [];
            this.updateCurrentTagName();
            if (this.notesSubscription) {
                this.notesSubscription.cancel();
                delete this.notesSubscription;
            }
        }
        else if (!this.notesSubscription && !this.notes) {
            this.loadNotes();
        }
    }
}
