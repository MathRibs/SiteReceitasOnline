require('../modelo/bancozinhohumild');
const Categoria = require('../modelo/Categoria');
const Receitas = require('../modelo/Receitas');
// GET HOME

exports.home = async (req, res) => {
    try {

        const numeroLimite = 5;
        const categories = await Categoria.find({}).limit(numeroLimite);
       const ultimasReceita = await Receitas.find({}).sort({_id: -1}).limit(numeroLimite);

       const comida ={ ultimasReceita };

        res.render('index', { categories , comida } );
    } catch (error) {
        res.satus(500).send({ message: error.message || "Ocorreu um erro grave" });
    }

}



exports.displaycategories = async (req, res) => {
    try {

        const numeroLimite = 20;
        const categories = await Categoria.find({}).limit(numeroLimite);
        res.render('categories', { categories });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Ocorreu um erro grave" });
    }

}
/*async function inserirDadosReceitas() {
    try {
        await Receitas.insertMany([
            {
            "nome": "Buchada de Bode",
            "descricao": `1

                Pique os miúdos - tripas, fígado, pulmão, coração, passarinha e língua - em cubinhos e transfira para uma vasilha.
                2
                Pique as cebolas e coloque metade na vasilha com os miúdos e a outra metade em outro recipiente.
                3
                Faça o mesmo com os pimentões, os tomates, o alho, a hortelã e o coentro. Pique e coloque metade com os miúdos e a outra metade no recipiente com a cebola e reserve.
                4
                Adicione aos miúdos uma colher de colorau, uma de pimenta-do-reino, uma de cominho, sal a gosto e misture bem. Reserve.
                5
                Corte o bucho em 6 pequenos pedaços, para formar pequenos travesseirinhos. Costure todas as laterais com a agulha e a linha, deixando apenas um lado aberto, por onde deve preencher com os miúdos temperados até a borda.
                6
                Costure a parte aberta para que o recheio não vaze.
                7
                Corte pequenos pedaços do restante do bucho, amarre com a tripa, fazendo várias voltas ao redor deste bucho, para que o mesmo não se solte. Reserve.
                8
                No fundo de uma panela, arrume os travesseirinhos de bucho.
                9
                Adicione o restante do colorau, do cominho, da pimenta-do-reino, sal a gosto e a reserva preparada de tomate, pimentão, cebola, coentro, hortelã e alho.
                10
                Em seguida, na panela que contém a buchada, coloque as trouxinhas envoltas em tripa, regue com azeite e adicione água em temperatura ambiente até cobrir por completo os travesseirinhos.
                11
                Deixe cozinhar por uma hora em fogo baixo.
                12
                Sirva em seguida.`,
                "email":"aldo_melhor_prof@gmail.com",
                "ingredientes": [
                " Vísceras de 1 bode - bucho, tripas, fígado, pulmão, coração, passarinha e língua",
                "2 cebolas",
                "2 pimentões",
                "2 tomates",
                "2 colheres de sopa de cominho",
                "Meio maço de hortelã",
                "2 colheres de chá de pimenta-do-reino",
                "2 colheres de sopa de colorau",
                "Azeite",
                "Sal a gosto",
                "10 dentes de alho",
                "Meio maço de coentro",
                "Agulha e linha - para costurar os travesseirinhos de bucho"
            ],
            "categoria": "Nordeste",
            "image": "buchada.png"
        },
            {
                "nome": "Espinhaço de ovelha com aipim",
                "descricao": `1.  Cozinhe o aipim em uma panela com água, mas desligue o fogo um pouco antes de estar no ponto. Reserve.
              2.  Tempere os pedaços de carne com sal e pimenta. Aqueça a gordura em uma caçarola ou panela de ferro e doure a carne, em porções, até que todos os pedaços estejam fritos. Retire a carne da panela e reserve. Na mesma gordura, ponha a cebola e o alho para dourar. Em seguida, junte o tomate e o pimentão, refogue por alguns minutos e ponha a metade do vinho branco, deixando reduzir por um instante. Volte a carne para a panela, com a folha de louro e somente as folhas da manjerona. Cozinhe por meia hora, até que os pedaços de tomate e pimentão desmanchem bem. Adicione o restante do vinho e o aipim escorrido e deixe cozinhar, até que a carne esteja bem macia (mais 40 minutos, mais ou menos). Salpique o cheiro verde por cima e sirva em seguida. Rende 8 porções.`,
              "email":"aldo_melhor_prof@gmail.com",
              "ingredientes":["2 kg de espinhaço de ovelha cortado em bistecas",
                "1 kg de aipim",
                "6 unidades de tomate sem pele, picados",
                "1 unidade de pimentão verde picado",
                "3 dentes de alho esmagados",
                "1 xícara de vinho branco",
                "2 colheres de sopa de banha",
                "* a gosto de sal",
                "* a gosto de pimenta-do-reino",
                "2 ramos de manjerona",
                "1 folha de louro",
                "* a gosto de cheiro verde picado"],
                "categoria": "Sul",
                "image": "espinhaco.png"
            },
            {
                "nome": "Feijoada",
                "descricao": `Limpe as carnes, tire o excesso de gorduras, e deixe de molho por 12 horas. Vá trocando a água, e coloque gelo por cima;
                Cozinhe o feijão, apenas com a folha de louro. E, depois tempere com a cebola, alho, cebolinha verde, pimenta e sal;
                Coloque, em outra panela, as carnes para cozinhar (primeiro as carnes duras, depois as carnes moles). Escorra a água e reserve;
                Coloque novamente as carnes para cozinhar e depois adicione o feijão temperado.`,
                "email":"aldo_melhor_prof@gmail.com",
                "ingredientes":[
                   " ⇒ 1 kg de feijão preto",
"⇒ 100 g de carne seca",
"⇒ 70 g de orelha de porco",
"⇒ 70 g de rabo de porco",
"⇒ 70 g de pé de porco",
"⇒ 100 g de costelinha de porco",
"⇒ 50 g de lombo de porco",
"⇒ 100 g de paio",
"⇒ 150 g de linguiça portuguesa",
"⇒ 2 cebolas (picadas)",
"⇒ 1 maço de cebolinha verde (picada)",
"⇒ 3 folhas de louro",
"⇒ 6 dentes de alho",
"⇒ pimenta e sal a gosto",
                ],
                "categoria": "Sudeste",
                "image": "feijoada.png"
            },
            {
                "nome": "Tacacá",
                "descricao":`Coloque o tucupi em uma panela com o alho bem amassado, o sal, a chicória e as pimentas.
                Leve ao fogo.
                Quando começar a ferver, abaixe o fogo, tampe a panela e deixe cozinhar por 30 minutos aproximadamente.
                Simultaneamente em outra panela, cozinhe o jambu até ficar tenro.
                Retire do fogo, escorra e reserve.
                Lave bem os camarões e leve-os ao fogo em uma panela com 4 xícaras de água.
                Deixe ferver por aproximadamente 5 minutos.
                Retire a cabeça e a casca.
                Em uma panela, misture o polvilho com a água dos camarões, leve ao fogo e mexa até obter um mingau.
                Sirva em uma cuia com uma concha de tucupi, um pouco do mingau, algumas folhas de jambu e os camarões.
                `,
                "email":"aldo_melhor_prof@gmail.com",
                "ingredientes" :[
                   " 4 xícaras (chá) de água",
"1/2 xícara (chá) de polvilho azedo (ou goma de mandioca)",
"1 colher (chá) de sal",
"500 g de camarão salgado (seco)",
"4 folhas de chicória",
"4 dentes de alho bem amassados",
"3 pimentas-de-cheiro",
"2 maços de jambu",
"2 litros de tucupi",
                ],
                "categoria": "Norte",
                "image": "tacaca.jpg"
            },
            {
                "nome": "Frango com Pequi",
                "descricao": `Corte o frango em pedaços.
                Lave com o vinagre em 1/2 copo (americano) de água.
                Enxágüe em água corrente.
                Tempere com tempero caseiro, deixe por cerca de 15 minutos.
                Esquente o óleo em uma panela.
                Adicione o alho amassado, o colorau e deixe dourar.
                Adicione o pequi já limpo em água corrente.
                Adicione o frango em pedaços, deixe refogar.
                Adicione a cebola, pimentão, e o tomate, cortados em cubos.
                Adicione água aos poucos, até cozinhar, deixando um caldo grosso.
                Adicione a pimenta malagueta amassada a gosto.
                Prove, adicione mais sal a gosto.
                Servir com arroz branco.`,
                "email":"aldo_melhor_prof@gmail.com",
                "ingredientes" :[
                    "1 frango de aproximadamente 2 kg",
                    "15 a 20 pequis",
                    "2 tomates maduros",
                    "1 pimentão grande",
                    "2 cebolas grandes",
                   "3 dentes de alho",
                    "2 colheres (sopa) de tempero caseiro (alho, sal, pimenta - do - reino)",
                    "1 colher bem cheia de colorau",
                    "3 colheres (sopa) de óleo",
                    "4 colheres (sopa) de vinagre",
                    "3 pimentas malaguetas",
                    "1 colher (sopa) de sal",
                 ],
                 "categoria": "Centro-Oeste",
                 "image": "pequi.jpg"
        }
     ]);
    } catch (Erro) {
        console.log('Erro:', + Erro)
    }
}

inserirDadosReceitas();
*/
