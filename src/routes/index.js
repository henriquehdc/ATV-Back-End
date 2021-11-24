"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const app = require("teem");
class IndexRoute {
    async index(req, res) {
        res.render("index/index");
    }
    async listagem(req, res) {
        let livro;
        await app.sql.connect(async (sql) => {
            livro = await sql.query("SELECT * FROM livro");
        });
        let lista = { livro: livro };
        res.render("index/listagem", lista);
    }
    async criarlivro(req, res) {
        // Os dados enviados via POST ficam dentro de req.body
        let livro = req.body;
        if (!livro) {
            res.status(400);
            res.json("Dados inválidos");
            return;
        }
        if (!livro.titulo) {
            res.status(400);
            res.json("Título inválido");
            return;
        }
        if (!livro.autor) {
            res.status(400);
            res.json("Autor inválido");
            return;
        }
        if (!livro.ano) {
            res.status(400);
            res.json("Ano inválido");
            return;
        }
        if (!livro.paginas) {
            res.status(400);
            res.json("Páginas invalidas");
            return;
        }
        await app.sql.connect(async (sql) => {
            await sql.query("INSERT INTO livro (titulo, ano ,autor, paginas) VALUES (?, ?, ?, ?)", [livro.titulo, livro.ano, livro.autor, livro.paginas]);
        });
        res.json(true);
    }
}
__decorate([
    app.http.post()
], IndexRoute.prototype, "criarlivro", null);
module.exports = IndexRoute;
//# sourceMappingURL=index.js.map