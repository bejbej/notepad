var app;!function(t){angular.module("app",["templates","ngRoute","ngLocationUpdate","btford.markdown"])}(app||(app={}));var app;!function(t){angular.module("app").constant("config",appConfig),angular.module("app").config(["$locationProvider",function(t){t.html5Mode(!1),t.hashPrefix("")}])}(app||(app={}));var app;!function(t){var e=function(){function t(t){t.when("/notes/:id",{templateUrl:"note/note.html"}).when("/notes",{templateUrl:"notes/notes.html"}).otherwise({templateUrl:"404/404.html"})}return t.$inject=["$routeProvider"],t}();angular.module("app").config(e)}(app||(app={}));var app;!function(t){var e=function(){function t(t,e){var n=this;this.$q=t,this.NoteService=e,this.save=function(){var t=n.$q.defer();return n.id?n.NoteService.put(n).then(t.resolve,t.reject):n.NoteService.post(n).then(function(e){n.id=e,t.resolve()},t.reject),t.promise},this["delete"]=function(){var t=n.$q.defer();return n.id?n.NoteService["delete"](n.id).then(t.resolve,t.reject):t.reject(),t.promise}}return t}();t.Note=e}(app||(app={}));var app;!function(t){var e=function(){function e(e){var n=this;this.$injector=e,this.createNote=function(e){var i=new t.Note(n.$injector.get("$q"),n.$injector.get("NoteService"));return e&&(i.id=e.id,i.text=e.text),i}}return e.$inject=["$injector"],e}();t.NoteFactory=e,angular.module("app").service("NoteFactory",e)}(app||(app={}));var app;!function(t){var e=function(){function t(t,e,n,i){var r=this;this.$http=t,this.$q=e,this.config=n,this.NoteFactory=i,this.getById=function(t){var e=r.$q.defer();return r.$http.get(r.config.notesUrl+"/"+t).then(function(t){e.resolve(r.mapApiDeck(t.data))},function(t){e.reject(t.status)}),e.promise},this.getByQuery=function(){var t=r.$q.defer();return r.$http.get(r.config.notesUrl).then(function(e){return t.resolve(e.data.results)},function(e){return t.reject(e.status)}),t.promise},this.post=function(t){var e=r.$q.defer();return r.$http.post(r.config.notesUrl,t).then(function(t){e.resolve(t.data.id)},function(t){e.reject(t.status)}),e.promise},this.put=function(t){var e=r.$q.defer();return r.$http.put(r.config.notesUrl+"/"+t.id,t).then(function(t){e.resolve()},function(t){e.reject()}),e.promise},this["delete"]=function(t){var e=r.$q.defer();return r.$http["delete"](r.config.notesUrl+"/"+t).then(function(t){e.resolve()},function(t){e.reject(t.status)}),e.promise},this.mapApiDeck=function(t){return r.NoteFactory.createNote(t)}}return t.$inject=["$http","$q","config","NoteFactory"],t}();t.NoteService=e,angular.module("app").service("NoteService",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.scope={id:"="},this.templateUrl="note/note.html"}return t}();angular.module("app").directive("note",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(t,e,n,i){var r=this;this.$location=e,this.NoteService=n,this.NoteFactory=i,this.startEditing=function(){r.noteInput=r.note.text,r.isEditing=!0},this.applyChanges=function(){r.note.text=r.noteInput,r.note.id&&r.note.save(),r.isEditing=!1},this.discardChanges=function(){r.isEditing=!1},this.save=function(){r.isSaving=!0,r.note.save()["finally"](function(){r.isSaving=!1,r.$location.update_path("/notes/"+r.note.id)})},this["delete"]=function(){var t=confirm("Are you sure you want to remove this note from the cloud?");t&&(r.isDeleting=!0,r.note["delete"]()["finally"](function(){r.isDeleting=!1,r.$location.update_path("/decks/new")}))},this.createNewNote=function(){var t=r.NoteFactory.createNote();return t.text="# New Note",t},"new"===t.id?this.note=this.createNewNote():this.NoteService.getById(t.id).then(function(t){r.note=t})}return t.$inject=["$routeParams","$location","NoteService","NoteFactory"],t}();angular.module("app").controller("NoteController",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="notes/notes.html"}return t}();angular.module("app").directive("notes",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(t){var e=this;t.getByQuery().then(function(t){e.notes=t.sort(function(t,e){return t.preview>e.preview?1:-1})})}return t.$inject=["NoteService"],t}();angular.module("app").controller("NotesController",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="pulse/pulse.html"}return t}();angular.module("app").directive("pulse",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="spinner/spinner.html"}return t}();angular.module("app").directive("spinner",function(){return new e})}(app||(app={})),angular.module("templates",[]).run(["$templateCache",function(t){t.put("404/404.html","<div style=color:white;><h1>404</h1><p>Two roads diverged in a yellow wood,<br>And sorry I could not travel both<br>And be one traveler, long I stood<br>And looked down one as far as I could<br>To where it bent in the undergrowth;</p><p>Then took the other, as just as fair,<br>And having perhaps the better claim,<br>Because it was grassy and wanted wear;<br>Though as for that the passing there<br>Had worn them really about the same,</p><p>And both that morning equally lay<br>In leaves no step had trodden black.<br>Oh, I kept the first for another day!<br>Yet knowing how way leads on to way,<br>I doubted if I should ever come back.</p><p>I shall be telling this with a sigh<br>Somewhere ages and ages hence:<br>Two roads diverged in a wood, and I—<br>I took the one less traveled by,<br>And that has made all the difference.</p></div>"),t.put("note/note.html",'<div ng-controller="NoteController as vm"><spinner class=light ng-if=!vm.note></spinner><div class="panel panel-default" ng-if=vm.note><div class="panel-heading form-inline"><div ng-if=!vm.isEditing><button class="btn btn-default" ng-click=vm.startEditing()>Edit</button> <button class="btn btn-default" ng-click=vm.save() ng-if=!vm.note.id ng-disabled=vm.isSaving>{{ vm.isSaving ? "Syncing" : "Sync to Cloud" }}<pulse ng-if=vm.isSaving></pulse></button> <button class="btn btn-default" ng-click=vm.delete() ng-if=vm.note.id ng-disabled=vm.isDeleting>{{ vm.isDeleting ? "Removing" : "Remove from Cloud" }}<pulse ng-if=vm.isDeleting></pulse></button></div><div ng-if=vm.isEditing><button class="btn btn-default" ng-click=vm.applyChanges()>Apply Changes</button> <button class="btn btn-default" ng-click=vm.discardChanges()>Discard Changes</button></div></div><form class=margin ng-if=vm.isEditing><div class=form-group><textarea class=form-control ng-model=vm.noteInput ng-model-options="{updateOn: \'blur\'}"></textarea></div><button class="btn btn-default" type=button ng-click=vm.applyChanges()>Apply Changes</button> <button class="btn btn-default" type=button ng-click=vm.discardChanges()>Discard Changes</button></form><div class=margin btf-markdown=vm.note.text ng-if=!vm.isEditing></div></div></div>'),t.put("notes/notes.html",'<div ng-controller="NotesController as vm"><spinner class=light ng-if=!vm.notes></spinner><div class=list-group><a class=list-group-item href=#/notes/{{::note.id}} ng-repeat="note in ::vm.notes">{{::note.preview}}</a></div></div>'),t.put("pulse/pulse.html",'<div class="sk-spinner sk-spinner-pulse"></div>'),t.put("spinner/spinner.html",'<div class=sk-fading-circle><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>')}]);