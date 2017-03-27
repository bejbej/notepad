angular.module("templates",[]).run(["$templateCache",function(t){t.put("404/404.html",'<div class="margin text-center" style=color:#f5f5f5;><h1>404</h1><span>~(=^..^)</span></div>'),t.put("note/note.html",'<div ng-controller="NoteController as vm"><nav><a href=#/notes>My Notes</a></nav><spinner class=light ng-if=!vm.note></spinner><section ng-if=vm.note><ul class="nav nav-tabs flex"><li ng-class="{ \'active\': vm.view == \'md\' }"><a ng-click="vm.view=\'md\'">view</a></li><li ng-class="{ \'active\': vm.view == \'edit\' }"><a ng-click="vm.view=\'edit\'">edit</a></li></ul><div ng-if="vm.view == \'md\'"><div class=margin><span class=badge ng-repeat="tag in vm.note.tags">{{::tag}}</span></div><div class=margin btf-markdown=::vm.note.text></div></div><form ng-if="vm.view == \'edit\'"><div class=margin><button class="btn btn-default" ng-click=::vm.delete() ng-disabled=!vm.note.id><span ng-if=!vm.isDeleting>Delete this Note</span> <span ng-if=vm.isDeleting>Deleting<pulse></pulse></span></button></div><div class="margin form-group"><input class=form-control placeholder=tags ng-model=::vm.note.tags ng-model-options="::{updateOn: \'default blur\', debounce: { default: 4000, blur: 0 }}" ng-list ng-change=::vm.save()></div><div class="margin form-group"><textarea class=form-control ng-model=::vm.note.text ng-model-options="::{updateOn: \'default blur\', debounce: { default: 4000, blur: 0 }}" ng-change=::vm.save() msd-elastic></textarea></div></form></section></div>'),t.put("notes/notes.html",'<div ng-controller="NotesController as vm"><nav><div class=select><div class=select-label>{{vm.currentFilter || "All"}} <span class="chevron bottom"></span></div><select ng-model=::vm.currentFilter ng-options="tag as tag for tag in ::vm.tags" ng-change=::vm.filterNotes() ng-if="vm.tags.length > 0"><option value>- All -</option></select></div></nav><div class="margin-collapse list-group"><a class="list-group-item new-note" href=#/notes/new><strong>+</strong> Create a New Note</a></div><div class="margin-collapse list-group"><a class=list-group-item href=#/notes/{{::note.id}} ng-repeat="note in vm.visibleNotes">{{::note.preview}} <span class=badge ng-repeat="tag in ::note.tags">{{::tag}}</span></a></div><spinner class=light ng-if=!vm.notes></spinner></div>'),t.put("spinner/spinner.html",'<div class=sk-fading-circle><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>'),t.put("pulse/pulse.html",'<div class="sk-spinner sk-spinner-pulse"></div>')}]);var app;!function(t){angular.module("app",["templates","ngRoute","ngLocationUpdate","btford.markdown","monospaced.elastic"])}(app||(app={}));var app;!function(t){angular.module("app").constant("config",appConfig),angular.module("app").config(["$locationProvider",function(t){t.html5Mode(!1),t.hashPrefix("")}])}(app||(app={}));var app;!function(t){var e=function(){function t(t){t.when("/notes/:id",{templateUrl:"note/note.html"}).when("/notes",{templateUrl:"notes/notes.html"}).when("/",{redirectTo:"/notes"}).otherwise({templateUrl:"404/404.html"})}return t.$inject=["$routeProvider"],t}();angular.module("app").config(e)}(app||(app={}));var app;!function(t){var e=function(){function t(t,e){var n=this;this.$q=t,this.NoteService=e,this.save=function(){return n.id?n.NoteService.put(n):n.NoteService.post(n).then(function(t){n.id=t})},this["delete"]=function(){return n.id?n.NoteService["delete"](n.id):n.$q.reject()}}return t}();t.Note=e}(app||(app={}));var app;!function(t){var e=function(){function e(e){var n=this;this.$injector=e,this.createNote=function(e){var i=new t.Note(n.$injector.get("$q"),n.$injector.get("NoteService"));return e&&(i.id=e.id,i.text=e.text,i.tags=e.tags),i}}return e.$inject=["$injector"],e}();t.NoteFactory=e,angular.module("app").service("NoteFactory",e)}(app||(app={}));var app;!function(t){var e=function(){function t(t,e,n){var i=this;this.$http=t,this.config=e,this.NoteFactory=n,this.getById=function(t){return i.$http.get(i.config.notesUrl+"/"+t).then(function(t){return i.mapApiDeck(t.data)})},this.getByQuery=function(){return i.$http.get(i.config.notesUrl).then(function(t){return t.data.results})},this.post=function(t){return i.$http.post(i.config.notesUrl,t).then(function(t){return t.data.id})},this.put=function(t){return i.$http.put(i.config.notesUrl+"/"+t.id,t)},this["delete"]=function(t){return i.$http["delete"](i.config.notesUrl+"/"+t)},this.mapApiDeck=function(t){return i.NoteFactory.createNote(t)}}return t.$inject=["$http","config","NoteFactory"],t}();t.NoteService=e,angular.module("app").service("NoteService",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.scope={id:"="},this.templateUrl="note/note.html"}return t}();angular.module("app").directive("note",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(t,e,n,i){var r=this;this.$location=n,this.NoteService=i,this.view="md",this.save=function(){r.isSaving=!0,r.note.save()["finally"](function(){r.isSaving=!1,r.$location.update_path("/notes/"+r.note.id)})},this["delete"]=function(){var t=confirm("Are you sure you want to remove this note from the cloud?");t&&(r.isDeleting=!0,r.note["delete"]().then(function(){location.hash="/notes"})["finally"](function(){r.isDeleting=!1}))},"new"===t.id?(this.note=e.createNote(),this.view="edit"):this.NoteService.getById(t.id).then(function(t){r.note=t})}return t.$inject=["$routeParams","NoteFactory","$location","NoteService"],t}();angular.module("app").controller("NoteController",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="notes/notes.html"}return t}();angular.module("app").directive("notes",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(t){var e=this;this.defaultFilterKey="defaultFilter",this.filterNotes=function(){return e.currentFilter?(localStorage.setItem(e.defaultFilterKey,e.currentFilter),void(e.visibleNotes=e.notes.filter(function(t){return t.tags.some(function(t){return t.toLocaleLowerCase()===e.currentFilter.toLocaleLowerCase()})}))):(localStorage.removeItem(e.defaultFilterKey),void(e.visibleNotes=e.notes))},t.getByQuery().then(function(t){e.notes=t.sort(function(t,e){return t.preview>e.preview?1:-1}),e.tags=t.reduce(function(t,e){return e.tags.forEach(function(e){e=e.toLocaleLowerCase(),t.indexOf(e)===-1&&t.push(e)}),t},[]);var n=localStorage.getItem(e.defaultFilterKey);n&&e.tags.indexOf(n)>-1&&(e.currentFilter=n),e.filterNotes()})}return t.$inject=["NoteService"],t}();angular.module("app").controller("NotesController",e)}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="spinner/spinner.html"}return t}();angular.module("app").directive("spinner",function(){return new e})}(app||(app={}));var app;!function(t){var e=function(){function t(){this.restrict="E",this.templateUrl="pulse/pulse.html"}return t}();angular.module("app").directive("pulse",function(){return new e})}(app||(app={}));