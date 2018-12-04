import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FileExplorerComponent } from "./file-explorer/file-explorer.component";
import { CockpitComponent } from "./cockpit/cockpit.component";
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";

const appRoutes: Routes = [
  { path: 'media', component: FileExplorerComponent, children: [
    { path: 'management', component: CockpitComponent }
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}