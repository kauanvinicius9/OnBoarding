import { Component, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

interface ModuleItem {
    id: number;
    title: string;
    category: string;
    progress: number;
    completed: boolean;
    content: string;
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
        { 
            id: 1, 
            title: "SQL e banco de dados relacionais", 
            category: "Banco de Dados", 
            progress: 0, 
            completed: false,
            content: "Um Banco de Dados Relacional é um sistema organizado para armazenar e gerenciar dados estruturados em formato de tabelas. As suas características principais incluem as tabelas ou relações, onde os dados são organizados em linhas (registros) e colunas (atributos), lembrando uma folha de cálculo. Possui também as chaves primárias, que funcionam como identificadores únicos para cada linha ou registro dentro de uma tabela, garantindo que não haja duplicidade, e as chaves estrangeiras, que são campos responsáveis por criar o relacionamento lógico e a conexão entre duas tabelas diferentes, como por exemplo ligar um pedido a um cliente. Além disso, garante a integridade de dados através de regras rígidas que evitam dados órfãos, inconsistentes ou corrompidos no sistema. Alguns exemplos comuns no mercado são o PostgreSQL, o MySQL, o SQL Server e o Oracle Database."
        },
        { 
            id: 2, 
            title: "Comandos SQL", 
            category: "Banco de Dados", 
            progress: 0, 
            completed: false,
            content: "O SQL divide-se em diferentes categorias de comandos, consoante a função que executam no banco de dados relacional. As principais categorias são: DQL, SELECT, DML, INSERT, UPDATE, DELETE, DDL, CREATE, ALTER, DROP, DCL, GRANT, COMMIT e ROLLBACK"
        },
        { 
            id: 3, 
            title: "Merge de Tabelas", 
            category: "Banco de Dados", 
            progress: 0, 
            completed: false,
            content: "O merge de tabelas, vulgarmente conhecido como junção ou JOIN em SQL, é o processo de combinar colunas ou linhas de duas ou mais tabelas diferentes com base numa coluna ou condição comum entre elas, como por exemplo uma chave estrangeira. Como os dados num banco de dados relacional são normalmente divididos e normalizados em várias tabelas para evitar redundância, o JOIN permite unir essa informação para ser visualizada ou processada em conjunto."
        },
        { 
            id: 4, 
            title: "Introdução ao Power BI", 
            category: "Banco de Dados", 
            progress: 0, 
            completed: false,
            content: "O Power BI é uma ferramenta de Business Intelligence (BI) e análise de negócios desenvolvida pela Microsoft, concebida para transformar dados brutos de diversas origens em dashboards e relatórios interativos, visuais e fáceis de compreender. O principal objetivo da plataforma é capacitar os profissionais e as empresas a tomarem decisões baseadas em dados concretos, permitindo monitorizar o desempenho, identificar tendências e partilhar insights por toda a organização de forma rápida e intuitiva."
        },
        { 
            id: 5, 
            title: "Fontes de Dados do Power BI", 
            category: "Banco de Dados", 
            progress: 0, 
            completed: false,
            content: "As fontes de dados do Power BI representam o ponto de partida de qualquer projeto de Business Intelligence na ferramenta. Como o Power BI foi concebido para se conectar a praticamente qualquer ecossistema tecnológico, ele permite extrair, consolidar e unificar informações de centenas de origens diferentes."
        },
        { 
            id: 6, 
            title: "Modelagem e Relacionamentos", 
            category: "Banco de Dados", 
            progress: 0, 
            completed: false,
            content: "A modelagem e os relacionamentos no Power BI são a base para garantir que os seus relatórios funcionem de forma correta, rápida e precisa. Depois de importar os dados (por exemplo, de bases de dados relacionais ou ficheiros Excel) e tratá-los no Power Query, o passo seguinte é estruturá-los num Modelo de Dados."
        },
        { 
            id: 7, 
            title: "DAX - Medidas e Colunas", 
            category: "Banco de Dados", 
            progress: 0, 
            completed: false,
            content: "O DAX (Data Analysis Expressions) é a linguagem de fórmulas e expressões utilizada no Power BI, no Analysis Services e no Power Pivot no Excel. Foi desenvolvida especificamente para criar cálculos personalizados, agregações avançadas e manipulação de dados sobre os modelos relacionais construídos nas ferramentas."
        },
        { 
            id: 8, 
            title: "Execução de Dashboards", 
            category: "Banco de Dados", 
            progress: 0, 
            completed: false,
            content: "Os dashboards no Power BI são painéis visuais interactivos que consolidam num único ecrã os principais indicadores de desempenho (KPIs), gráficos e métricas fundamentais de um negócio. O principal objetivo de um dashboard é permitir que gestores e equipas avaliem o estado atual da operação à distância de uma vista de olhos identificando rapidamente tendências, alertas ou pontos de atenção sem necessidade de analisar relatórios longos ou tabelas complexas."
        },
        { 
            id: 9, 
            title: "Dados Logísticos da Empresa", 
            category: "Logística", 
            progress: 0, 
            completed: false,
            content: "A introdução aos dados logísticos é fundamental para compreender como uma empresa gere o fluxo eficiente de mercadorias, informações e recursos desde o ponto de origem até ao consumidor final. No contexto empresarial e de supply chain, os dados logísticos servem para monitorizar o desempenho das operações, otimizar rotas, controlar stocks e garantir que os prazos de entrega são cumpridos com o menor custo operacional possível." 
        },
        { 
            id: 10, 
            title: "Deploy Power BI Service", 
            category: "BLogística", 
            progress: 0, 
            completed: false,
            content: "O Power BI Service é a plataforma online baseada na nuvem (hospedada no Microsoft Fabric) onde os relatórios e dashboards criados no Power BI Desktop são publicados, partilhados e geridos. Enquanto o Power BI Desktop é a ferramenta de desenvolvimento e criação, o Power BI Service é o ambiente de colaboração e consumo corporativo."
        }
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