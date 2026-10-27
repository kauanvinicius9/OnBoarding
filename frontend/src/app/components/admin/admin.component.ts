import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ModuleService, TrainningModule } from "../../services/module.service";

@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: "./admin.component.scss",
  templateUrl: "./admin.component.html",
})
export class AdminDashboardComponent implements OnInit {
  private fb = inject(FormBuilder);
  private moduleService = inject(ModuleService);

  modules: TrainningModule[] = [];

  moduleForm = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required]
  });

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules(): void {
    this.moduleService.getModules().subscribe({
      next: (data) => this.modules = data,
      error: (err) => console.error("Erro ao carregar módulos:", err)
    });
  }

  onCreateModule(): void {
    if (this.moduleForm.valid) {
      const newModule: TrainningModule = {
        title: this.moduleForm.value.title!,
        description: this.moduleForm.value.description!,
        completed: false
      };

      this.moduleService.createModule(newModule).subscribe({
        next: () => {
          this.moduleForm.reset();
          this.loadModules();
        },
        error: (err) => console.error("Erro ao criar módulo:", err)
      });
    }
  }

  onDeleteModule(id?: number): void {
    if (id && confirm("Tem certeza de que deseja excluir esse módulo?")) {
      this.moduleService.deleteModule(id).subscribe({
        next: () => this.loadModules(),
        error: (err) => console.error("Erro ao excluir módulo:", err)
      });
      console.log(`Exclusão do módulo ID ${id} solicitado`);
    }
  }
}
