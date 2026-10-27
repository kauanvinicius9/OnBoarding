import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ModulesComponent } from "./components/module/module.component";
import { AdminDashboardComponent } from "./components/admin/admin.component";
import { adminGuard } from "./services/admin.guard";

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "modules", component: ModulesComponent },
    {
        path: "admin",
        component: AdminDashboardComponent,
        canActivate: [adminGuard]
    },
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "**", redirectTo: "login" }
];
