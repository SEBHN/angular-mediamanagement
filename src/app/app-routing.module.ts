import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FileExplorerComponent } from "./file-explorer/file-explorer.component";
import { CockpitComponent } from "./cockpit/cockpit.component";
import { AuthenticationComponent } from "./authentication/authentication.component";

const appRoutes: Routes = [
  { path: 'media', component: FileExplorerComponent, children: [
    { path: 'management', component: CockpitComponent }
  ] },
  { path: 'auth', component: AuthenticationComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}