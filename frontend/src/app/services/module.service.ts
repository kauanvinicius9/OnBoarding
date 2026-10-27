import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface TrainningModule {
    id?: number;
    title: string;
    description: string;
    completed: string;
}

@Injectable({
    providedIn: "root"
})
export class ModuleService {
    private http = inject(HttpClient);
    private apiUrl = "/api/modules";

    getModules(): Observable<TrainningModule[]> {
        return this.http.get<TrainningModule[]>(this.apiUrl);
    }

    createModule(module: TrainningModule): Observable<TrainningModule> {
        return this.http.post<TrainningModule>(this.apiUrl, module);
    }
}