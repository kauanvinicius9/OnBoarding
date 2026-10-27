import { Component, OnInit, inject} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModuleService, TrainningModule } from "../../services/module.service";

@Component({
    selector: "app-modules",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./module.component.html",
    styleUrl: "./module.component.scss",
})
export class ModulesComponent implements OnInit {
    private moduleService = inject(ModuleService);
    modules: TrainningModule[] = [];

    ngOnInit(): void {
        this.moduleService.getModules().subscribe({
            next: (data) => this.modules = data,
            error: (err) => console.error("Erro ao carregar módulos do backend", err)
        })
    }
}