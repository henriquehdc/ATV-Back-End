import app = require("teem");


class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

    public async listagem(req: app.Request, res: app.Response) {

        let livro : any [];
        await app.sql.connect(async (sql) => {

		livro = await sql.query("SELECT * FROM livro");

		});
        
        let lista = {livro:livro};

        res.render("index/listagem", lista);
	}

	@app.http.post()
	public async criarlivro(req: app.Request, res: app.Response) {
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


			await sql.query("INSERT INTO livro (titulo, ano ,autor, paginas) VALUES (?, ?, ?, ?)", [livro.titulo, livro.ano,livro.autor,livro.paginas]);

		});

		res.json(true);
	}
}

export = IndexRoute;
