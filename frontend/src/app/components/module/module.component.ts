import { Component, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

interface ModuleItem {
    id: number;
    title: string;
    category: string;
    progress: number;
    completed: boolean
};

@Component({
    selector: "app-modules",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./module.component.html",
    styleUrl: "./module.component.scss",
})
export class ModulesComponent {
    protected readonly modules = signal<ModuleItem[]>([
        { id: 1, title: "Introdução ao SQL e banco de dados relacionais", category: "Banco de Dados", progress: 0, completed: false },
        { id: 2, title: "Comandos SQL", category: "Banco de Dados", progress: 0, completed: false },
        { id: 3, title: "Merge de Tabelas", category: "Banco de Dados", progress: 0, completed: false },
        { id: 4, title: "Introdução ao Power BI", category: "Banco de Dados", progress: 0, completed: false },
        { id: 5, title: "Fontes de Dados do Power BI", category: "Banco de Dados", progress: 0, completed: false },
        { id: 6, title: "Modelagem e Relacionamentos", category: "Banco de Dados", progress: 0, completed: false },
        { id: 7, title: "DAX - Medidas e Colunas", category: "Banco de Dados", progress: 0, completed: false },
        { id: 8, title: "Execução de Dashboards", category: "Banco de Dados", progress: 0, completed: false },
        { id: 9, title: "Dados Logísticos da Empresa", category: "Banco de Dados", progress: 0, completed: false },
        { id: 10, title: "Deploy Power BI Service", category: "Banco de Dados", progress: 0, completed: false }
    ]);

    protected readonly isAllCompleted = computed(() => {
        return this.modules().every(mod => mod.completed);
    });

    constructor() {
        this.loadProgress();
    }

    private loadProgress() {
        const savedProgress = localStorage.getItem("onboard_modules_progress");
        if (savedProgress) {
            const completedIds: number[] = JSON.parse(savedProgress);

            this.modules.update(mods => mods.map(mod => {
                if (completedIds.includes(mod.id)) {
                    return { ...mod, progress: 100, completed: true };
                }
                return mod;
            }))
        };
    }
}