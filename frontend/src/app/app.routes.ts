import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ModuleDetailComponent } from "./components/module/module-detail.component";
import { ModulesComponent } from "./components/module/module.component";
import { AdminDashboardComponent } from "./components/admin/admin.component";
import { adminGuard } from "./services/admin.guard";
// Pode desativar a função do adminGuard para desenvolvimento local

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "modules", component: ModulesComponent},
    { path: "modules/:id", component: ModuleDetailComponent },
    {
        path: "admin",
        component: AdminDashboardComponent,
        canActivate: [adminGuard]
    },
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "**", redirectTo: "login" }
];