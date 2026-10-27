import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    errorMessage = "";

    loginForm = this.fb.group({
        username: ["", Validators.required],
        password: ["", Validators.required]
    });

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value as any).subscribe({
                next: () => {
                    this.router.navigate(["/modules"])
                },
                error: (err) => {
                    this.errorMessage = "Credencias inválidas ou erro de ligação";
                    console.error(err);
                }
            });
        }
    }
}