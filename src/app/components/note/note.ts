import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Location } from "@angular/common";
import * as app from "@app";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-note",
    templateUrl: "./note.html"
})
export class NoteComponent implements OnInit, OnDestroy {

    // Data
    note: app.Note;
    tags: string;
    private id: string;

    // State Tracking
    isEditing: boolean;
    isDeleting: boolean;
    isDirty: boolean;
    isLoading: boolean;
    isSaving: boolean;

    // Event Management
    private noteSubscription: app.Cancellable<app.Note>;
    private authSubscription: Subscription;

    constructor(
        private authService: app.AuthService,
        private noteService: app.NoteService, 
        private location: Location,
        private ref: ChangeDetectorRef,
        private router: Router,
        route: ActivatedRoute) {

        document.title = "Loading...";
        route.params.subscribe(params => this.id = params.id);
        this.authSubscription = authService.subscribe(() => this.sync());
    }

    async ngOnInit() {
        await this.loadNote(this.id);
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();

        if (this.noteSubscription) {
            this.noteSubscription.cancel();
        }
    }

    tagsChanged = () => {
        if (this.tags.length === 0) {
            this.note.tags = [];
        }
        else {
            this.note.tags = this.tags.split(/\s*,\s*/).map(x => x.toLowerCase());
        }
    }

    delete = async () => {
        if (!confirm("Are you sure you want to delete this note?")) {
            return;
        }

        this.isDeleting = true;
        try
        {
            await this.noteService.deleteNote(this.note.id).toPromise();
        }
        finally
        {
            this.isDeleting = false;
            this.ref.markForCheck();
        }
        this.router.navigateByUrl("/notes");
    }

    private save = async () => {
        if (!this.isDirty) {
            return;
        }

        this.updateTitle();
        let authUser = this.authService.getAuthUser();
        if (authUser === undefined) {
            return;
        }

        if (!this.note.id) {
            this.note.owners = [authUser.id];
        }

        this.isSaving = true;
        try {
            if (this.note.id) {
                await this.noteService.updateNote(this.note).toPromise();
            }
            else {
                this.note.id = await this.noteService.createNote(this.note).toPromise();
                this.location.replaceState("/notes/" + this.note.id);
                this.ref.markForCheck();
            }
            this.isDirty = false;
        }
        finally {
            this.isSaving = false;
        }
    }

    private sync = () => {
        let authUser = this.authService.getAuthUser();
        if (!authUser) {
            if (this.noteSubscription) {
                this.noteSubscription.cancel();
                delete this.noteSubscription;
            }
            if (this.note.id !== undefined) {
                delete this.note;
            }
        }
        else if (authUser && !this.note) {
            this.loadNote(this.id);
        }
        else if (authUser && this.isDirty) {
            this.save();
        }
    }

    private loadNote = async (id: string) => {
        if (this.isLoading) {
            return;
        }
        if (id === "new") {
            this.note = this.createNote();
            this.tags = this.note.tags.join(", ");
            this.isEditing = true;
            this.sync();
            this.updateTitle();
            return;
        }
        this.isLoading = true;
        this.noteSubscription = this.noteService.getById(id);
        try {
            this.note = await this.noteSubscription.promise;
            this.tags = this.note.tags.join(", ");
            this.updateTitle();
        }
        finally {
            this.isLoading = false;
            delete this.noteSubscription;
            this.ref.markForCheck();
        }
    }

    private createNote = () => {
        let tags = [];
        let tagState = JSON.parse(localStorage.getItem(app.config.localStorage.tags)) as app.TagState;
        if (tagState && tagState.current) {
            tags.push(tagState.current);
        }

        return {
            id: undefined,
            text: "",
            owners: [],
            tags: tags
        };
    }

    private updateTitle = () => {
        let index = this.note.text.indexOf("\n");
        let title = index === -1 ? this.note.text : this.note.text.slice(0, index);
        title = title.trim();
        document.title = title.length > 0 ? title : "New Note";
    }
}
