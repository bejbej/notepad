import { AppComponent } from "src/app//app.component";
import { AppRoutingModule } from "src/app//app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Ng2UiAuthModule } from "ng2-ui-auth";
import { ReactiveFormsModule } from '@angular/forms';
import * as app from "@app";

@NgModule({
    declarations: [
        AppComponent,
        // Components
        app.AuthComponent,
        app.NoteComponent,
        app.NotesComponent,
        app.LargeSpinner,
        app.NotfoundComponent,
        app.SpinnerComponent,
        // Directives
        app.AllowTabsDirective,
        app.AutosizeDirective,
        app.DebounceDirective,
        // Pipes
        app.MarkedPipe
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        Ng2UiAuthModule.forRoot({
            providers: {
                google: {
                    clientId: app.config.authClients.google.clientId,
                    url: app.config.authClients.google.authUrl
                }
            }
        })
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: app.AuthInterceptor,
        multi: true
      }],
    bootstrap: [AppComponent]
})
export class AppModule { }
