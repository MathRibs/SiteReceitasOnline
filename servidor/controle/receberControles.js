require("../modelo/bancozinhohumild");
const { userInfo } = require("os");
const Categoria = require("../modelo/Categoria");
const Receitas = require("../modelo/Receitas");
// GET HOME

exports.home = async (req, res) => {
  try {
    const numeroLimite = 5;
    const categories = await Categoria.find({}).limit(numeroLimite);
    const ultimasReceita = await Receitas.find({})
      .sort({ _id: -1 })
      .limit(numeroLimite);

    const nordestina = await Receitas.find({ categoria: "Nordeste" }).limit(
      numeroLimite
    );
    const sulista = await Receitas.find({ categoria: "Sul" }).limit(
      numeroLimite
    );
    const nortista = await Receitas.find({ categoria: "Norte" }).limit(
      numeroLimite
    );
    const centro = await Receitas.find({ categoria: "Centro-Oeste" }).limit(
      numeroLimite
    );
    const sudeste = await Receitas.find({ categoria: "Sudeste" }).limit(
      numeroLimite
    );

    const comida = {
      ultimasReceita,
      nordestina,
      sulista,
      nortista,
      centro,
      sudeste,
    };

    res.render("index", { categories, comida });
  } catch (error) {
    res.status(500).send({ message: error.message || "Ocorreu um erro grave" });
  }
};

exports.displaycategories = async (req, res) => {
  try {
    const numeroLimite = 20;
    const categories = await Categoria.find({}).limit(numeroLimite);
    res.render("categories", { categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Ocorreu um erro grave" });
  }
};

exports.showCategoriesId = async (req, res) => {
  try {
    let categoriaID = req.params.id;

    const numeroLimite = 20;
    const categoriesID = await Receitas.find({ categoria: categoriaID }).limit(
      numeroLimite
    );
    res.render("categories", { categoriesID });
  } catch (error) {
    res.status(500).send({ message: error.message || "Ocorreu um erro grave" });
  }
};

exports.showReceita = async (req, res) => {
  try {
    let receitasId = req.params.id;
    const receitinha = await Receitas.findById(receitasId);
    res.render("receita", { receitinha });
  } catch (error) {
    res.status(500).send({ message: error.message || "Ocorreu um erro grave" });
  }
};

exports.pesquisaReceitas = async (req, res) => {
  //pesquisarTermo
  try {
    let pesquisarTermo = req.body.pesquisarTermo;
    let receita = await Receitas.find({
      $text: { $search: pesquisarTermo, $diacriticSensitive: true },
    });
    res.render("pesquisar", { receita });
  } catch (error) {
    res.status(500).send({ message: error.message || "Ocorreu um erro grave" });
  }
};

exports.adicionadaRecentemente = async (req, res) => {
  try {
    const numeroLimmite = 30;
    const receitinha = await Receitas.find({})
      .sort({ _id: -1 })
      .limit(numeroLimmite);

    res.render("explorar-ultimo", { receitinha });
  } catch (error) {
    res.status(500).send({ message: error.message || "Ocorreu um erro grave" });
  }
};

exports.receitasAleatorias = async (req, res) => {
  try {
    let conta = await Receitas.find().countDocuments();
    let aletorio = Math.floor(Math.random() * conta);
    let aleatoriasReceitas = await Receitas.findOne().skip(aletorio).exec();

    res.render("receita-aleatoria", { aleatoriasReceitas });
  } catch (error) {
    res.status(500).send({ message: error.message || "Ocorreu um erro grave" });
  }
};

exports.enviarReceitas = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("enviar-receita", { infoErrorsObj, infoSubmitObj });
};

exports.enviarReceitas2 = async (req, res) => {
  try {
    let imageUploadFile;
    let imagePath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length == 0) {
      console.log("Nenhum arquivo foi enviado");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;
      imagePath =
        require("path").resolve("./") + "/project/imagens/" + newImageName;
      imageUploadFile.mv(imagePath, function (err) {
        if (err) return res.status(500).send(err);
      });
    }
    const novaRceita = new Receitas({
      nome: req.body.nome,
      descricao: req.body.descricao,
      email: req.body.email,
      ingredientes: req.body.ingredientes,
      categoria: req.body.categoria,
      image: newImageName,
    });

    await novaRceita.save();

    req.flash("infoSubmit", "Receitinha adicionada com Sucesso.");
    res.redirect("/enviar-receita");
  } catch (error) {
    req.flash("infoErrors", "Falha ao enviar Receita" + error);
    res.redirect("/enviar-receita");
  }
};


exports.deletar_receitas = async (req, res) => {
  try {
    Receitas.deleteOne({ _id: req.params.id }, function (err) {});
  } catch {
    res.status(500).send({ message: error.message || "Ocorreu um erro grave" });
  }

  

  res.render("receitadeletada");
};

exports.editreceita = async (req, res) => {
  try {
    const id = req.query.id;

    let recipeData = await Receitas.findById({ _id: id });

    res.render("atualizap", { Receitas: recipeData });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updatereceita = async (req, res) => {
  try {
    await Receitas.findByIdAndUpdate(
      { _id: req.body.recipe_id },
      {
        $set: {
          nome: req.body.nome,
          email: req.body.email,
          descricao: req.body.descricao,
          ingredientes: req.body.ingredientes,
          categoria: req.body.categoria,
        },
      }
    );

    res.render("receitaatualizada");
  } catch (error) {
    req.flash("infoErrors", "Falha ao enviar Receita" + error);
    console.log(error.message);
  }
};

exports.redcontato = async (req, res) => {
  res.render("contato");
};


exports.redsobre = async (req, res) => {
  res.render("sobre");
};


//FUNCAO QUE USAMOS PARA INSERIR DADOS ESTATICAMENTE ANTES DE FAZER A ROTA
// PARA ADICIONAR AS RECEITAS

/*async function inserirDadosReceitas() {
    try {
        await Receitas.insertMany([
            {
                
            ///
            
              "nome": "X-Gaúcho",
                "descricao": `Como Fazer X-Gaúcho

    Hora de fritar
    De fato, fazer esse X é realmente muito fácil. Tudo o que você precisa fazer é fritar a carne em óleo, dentro de uma frigideira.


    Ovo, pão e maionese...
    Depois disso, frite o ovo. Agora, abra o pão e espalhe a maionese. Em seguida, coloque todos os ingredientes dentro.


    Finalizando
    Para finalizar, coloque o pão na frigideira e pressione bem para ficar prensado. Pronto! Você já pode aproveitar!`,
    "ingredientes": ["1 pão de xis (ou pão de hambúrguer)",
    "Maionese de sua preferencia",
    "1-2 colheres (sopa) de milho enlatado ou congelado",
    "1-2 colheres (sopa) de ervilha enlatada ou congelada",
    "100-120g de carne bovina cortada em tiras",
   " 1 ovo",
    "1-2 fatias de queijo",
    "Alface",
    "3-4 fatias de tomate"],
    "categoria":"Sul",
    "image": "xgaucho.png"
            },
            { 
                "nome": "Cuca",
                "descricao": `MODO DE PREPARO
                Inicialmente preparar a farofa.
                Misturar todos os ingredientes da farofa numa panela e levar ao fogo, mexendo sem parar, até secar.
                Separar.
                Preparo da massa: bater as claras em neve e separar.
                Bater na batedeira o açúcar, as gemas e a margarina até formar um creme e depois acrescentar a farinha de trigo, o leite e o fermento em pó, batendo sem parar.
                Acrescentar as claras em neve mexendo lentamente.
                Pré-aquecer o forno.
                Untar e enfarinhar uma forma de aproximadamente 40 cm de diâmetro e 4 cm de altura e despejar a massa.
                Por cima da massa crua ir espalhando a farofa delicadamente.
                Levar ao forno em temperatura aproximada de 180º graus.
                O bolo estará pronto quando as laterais estiverem douradas e ao espetar o palito, este sair limpo.`,
                "ingredientes":["4 colheres (sopa) de óleo",
                    "1 colher (sopa) canela em pó",
                    "6 colheres (sopa) de farinha de trigo",
                   " 6 colheres (sopa) de açúcar",
                    "MASSA:",
                    "4 xícaras de farinha de trigo",
                   "3 xícaras de açúcar",
                   " 4 ovos (claras em neve)",
                   " 1 colher de sopa cheia de margarina",
                   " 1 xícara e meia de leite",
                    "1 colher de sopa de fermento em pó"],
                    "categoria": "Sul",
                    "image": "cuca.png"
            },
            {"nome":"Galeto Assado com Laranja e Mel", 
            "descricao":`MODO DE PREPARO
            Preaqueça o forno a 200 ºC (temperatura média). 
            No pilão, bata o sal para ficar um pouco mais fino. Com um zester, faça raspas da casca de meia laranja-baía e junte ao sal. Misture o gengibre, o cravo, a cúrcuma, o colorau e pimenta-do-reino moída na hora a gosto. 
            Seque bem o galeto com um pedaço de papel-toalha e transfira para uma tigela. Tempere o galeto com a mistura de especiarias – esfregue bem sobre toda a pele, dentro da cavidade do galeto e entre a pele e a carne do peito, com cuidado para não rasgar a pele. 
            Tampe a tigela e mantenha em temperatura ambiente para marinar por  no mínimo 30 minutos (se preferir, você pode temperar o galeto algumas horas antes do preparo). 
            Enquanto isso, corte a laranja ao meio e uma metade ao meio novamente – esses dois quartos de laranja vão ser usados para rechear o galeto e mantê-lo úmido ao assar. Coloque o azeite numa tigela pequena – ele será usado para pincelar o galeto durante o cozimento.
            Passado o tempo da marinada, posicione o galeto na tábua, com o peito para cima. Recheie o galeto com os dois quartos de laranja e os 3 galhos de alecrim.
            Corte um pedaço grande de barbante, segure uma ponta em cada mão e posicione o meio por baixo do curranchinho do galeto – aquele rabinho, que forma um bico. Levante o barbante e cruze sobre as coxas; enrole cada ponta de barbante na ponta de uma coxa, puxe para cima e amarre – assim o galeto assa de maneira uniforme.
            Regue uma assadeira média com um fio de azeite. Disponha o galeto no centro. Pincele toda a superfície do galeto com um pouco do azeite e leve ao forno para assar por cerca de 40 minutos. 
            Na metade do tempo, abra o forno com cuidado e pincele o galeto com azeite. Nos últimos 5 minutos, misture o mel ao restante do azeite e pincele sobre toda a pele do galeto para dar um sabor e brilho extra. 
            Para conferir se o galeto está assado: com a ponta de uma faca, faça um furinho na junção da sobrecoxa com o peito. Se o líquido sair transparente, sem sangue, é sinal que está pronto, do contrário volte ao forno por mais alguns minutos. Se estiver usando um termômetro: a temperatura da carne deve ser no mínimo 75 ºC.
            Retire o galeto do forno e espere 5 minutos antes de servir. Não pule essa etapa: nesse tempo, os sucos da carne se redistribuem, o que garante um assado úmido e saboroso. Sirva a seguir com salada caprese e molho pesto. `,
            "ingredientes":["1 galeto inteiro com pele e osso (cerca de 800g)",
            "½ laranja-baía",
            "½ colher (chá) de mel",
           "1 colher (chá) de sal grosso",
            "1 colher (chá) de gengibre em pó",
            "½ colher (chá) de colorau",
            "¼ de colher (chá) de cúrcuma",
            "1 pitada de cravo-da-índia em pó",
           "pimenta-do-reino moída na hora a gosto",
            "3 galhos de alecrim pequenos",
            "4 colheres (chá) de azeite"],
            "categoria":"Sul",
            "image":"galeto.png" 
        },
                {"nome": "Marreco Rechado",
                "descricao": `MODO DE PREPARO
                Tempere o marreco com sal, limão e pimenta-do-reino. Moa os miúdos junto com os pãezinhos amolecidos na água, tempere com sal, salsinha e cebolinha e cebola. Misture bem os ingredientes e recheie o marreco com esta massa. Leve ao forno moderado ( 180ºC).
                
                Coloque o marreco para assar com o peito para cima em uma assadeira profunda (ferro ou alumínio). Adicione 1/2 copo de água. Quando estiver dourado, retire o líquido que se formou na assadeira. Adicione 1/2 copo de água. Regue o marreco com o molho que se formou para que ficar bem dourado.`,
                "ingredientes":["INGREDIENTES",
                    "1 marreco limpo com miúdos (coração, moela e fígado)",
                    "1 limão",
                    "1 cebola média",
                    "3 pãezinhos franceses",
                    "1/3 xícara (de chá) de água",
                    "1 colher (sopa) de salsinha picada",
                    "1 colher (sopa) de cebolinha picada"
                    ],
                    "categoria":"Sul",
                    "image":"marreco.png"
                },
            ///
           
            
        ]);
    } catch (Erro) {
        console.log('Erro:', + Erro)
    }
}

inserirDadosReceitas();
*/
