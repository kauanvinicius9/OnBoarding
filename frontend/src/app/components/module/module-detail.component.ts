import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-module-detail",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./module-detail.component.html",
    styleUrl: './module-detail.component.scss',
})
export class ModuleDetailComponent {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    protected moduleId = signal<string | null>(this.route.snapshot.paramMap.get("id"));
    protected currentStep = signal<number>(1);

    nextStep() {
        const next = this.currentStep() + 1;
        console.log("Avançando para o passo", next);
        this.currentStep.set(next);
    }

    prevStep() {
        const prev = Math.max(1, this.currentStep() - 1);
        console.log("Voltando para o passo", prev);
        this.currentStep.set(prev);
    }

    completeModule() {
        const id = Number(this.moduleId());
        const saved = localStorage.getItem("onboard_modules_progress");
        const completedIds: number[] = saved ? JSON.parse(saved) : [];

        if (!completedIds.includes(id)) {
            completedIds.push(id);
            localStorage.setItem("onboard_modules_progress", JSON.stringify(completedIds));
        }

        alert("Módulo concluído");
        this.router.navigate(["/modules"]);
    }

    goBack() {this.router.navigate(["/modules"]);}
}
