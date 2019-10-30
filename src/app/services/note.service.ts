import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as app from "@app";

@Injectable({
    providedIn: "root"
})
export class NoteService {

    private _url = app.config.notesUrl;

    constructor(private http: HttpClient) { }

    getById(id: string): app.Cancellable<app.Note> {
        let observable = this.http.get<app.Note>(this._url + "/" + id);
        return app.Cancellable.fromObservable(observable);
    }

    getByQuery(query?): app.Cancellable<any[]> {
        let observable = this.http.get<{ results: Object[] }>(this._url, { params: query })
            .pipe(map(response => response.results));
        return app.Cancellable.fromObservable(observable);
    }

    createNote(note): Observable<string> {
        return this.http.post<{ id: string }>(this._url, note)
            .pipe(map(response => response.id));
    }

    updateNote(note: app.Note): Observable<any> {
        let url = this._url + "/" + note.id;
        return this.http.put(url, note);
    }

    deleteNote(id: string): Observable<any> {
        let url = this._url + "/" + id;
        return this.http.delete(url);
    }
}
