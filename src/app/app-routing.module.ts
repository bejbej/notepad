import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import * as app from "@app";

const routes: Routes = [
  {
    path: "",
    redirectTo: "notes",
    pathMatch: "full"
  },
  {
    path: "notes",
    component: app.NotesComponent
  },
  {
    path: "notes/:id",
    component: app.NoteComponent
  },
  {
    path: "**",
    component: app.NotfoundComponent,
    pathMatch: "full"
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
