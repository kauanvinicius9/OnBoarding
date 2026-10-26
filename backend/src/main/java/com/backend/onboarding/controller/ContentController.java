package com.backend.onboarding.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/training-content")
@CrossOrigin(origins = "*")
public class ContentController {
    
    @GetMapping("/modules")
    public ResponseEntity<?> getTrainningModules() {
        List<Map>String, Object> modules = List.of(
            Map.of("id", 1, "title", "Introdução ao Banco de Dados SQL", "content", "Neste módulo, você vai entender o que é um banco de dados relacional e qual o papel do SQL no dia a dia da empresa. O SQL (Structured Query Language) é a linguagem padrão para conversar com bancos de dados.", "imageUrl", "..."),
            Map.of("id", 2, "title", "Comandos Básicos: SELECT e WHERE", "content", "Aprenda a extrair informações específicas das tabelas usando o SELECT para escolher colunas e o WHERE para filtrar linhas com base em condições.", "imageUrl", "..."),
            Map.of("id", 3, "title", "Unindo Tabelas com JOINs", "content", "Descubra como cruzar dados de diferentes tabelas usando INNER JOIN, LEFT JOIN e RIGHT JOIN para análises mais completas.", "imageUrl", "..."),
            Map.of("id", 4, "title", "Introdução ao Power BI", "content", "O Power BI é a ferramenta da Microsoft para transformar dados brutos em dashboards visuais interativos para a tomada de decisão.", "imageUrl", "..."),
            Map.of("id", 5, "title", "Conectando Fontes de Dados no Power BI", "content", "Como importar dados de arquivos Excel, CSV e bancos SQL direto para o Power BI utilizando o Power Query para limpeza.", "imageUrl", "..."),
            Map.of("id", 6, "title", "Modelagem de Dados e Relacionamentos", "content", "Entenda a importância de criar modelos estrela (Star Schema) e relacionar tabelas de fato e dimensão corretamente.", "imageUrl", "..."),
            Map.of("id", 7, "title", "Primeiros passos com DAX (Medidas e Colunas)", "content", "O DAX é a linguagem de fórmulas do Power BI. Vamos ver como criar medidas básicas de agregação como SUM, AVERAGE e CALCULATE.", "imageUrl", "..."),
            Map.of("id", 8, "title", "Construindo Dashboards Executivos", "content", "Boas práticas de design visual, escolha de gráficos adequados (cartões, barras, mapas) e organização de filtros na tela.", "imageUrl", "..."),
            Map.of("id", 9, "title", "Logística de Dados na Empresa", "content", "Como os fluxos de dados da nossa operação se conectam com as ferramentas de análise que você aprendeu.", "imageUrl", "..."),
            Map.of("id", 10, "title", "Publicação e Compartilhamento no Power BI Service", "content", "Como publicar seus relatórios na nuvem da empresa, configurar atualizações automáticas e dar acesso aos gestores.", "imageUrl", "..."),
        );
        return ResponseEntity.ok(modules);
    }
}
