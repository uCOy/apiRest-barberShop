const Services = require('../models/services');

exports.findAll = async (req, res) => {
    await Services.findAll({
        attributes: ['id', 'name', 'price'],
        order:[['name', 'ASC']]
    })
    .then( (services) =>{
        return res.json({
            erro: false,
            services
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhum Serviço foi encontrado!!!`
        })
    })


};

exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const services = await Services.findByPk(id);
        if(!services){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum Serviço foi encontrado!"
            })
        }
        res.status(200).json({
            erro:false,
            services
        })
    } catch (err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
};

exports.create = async (req, res) => {

    var dados = req.body;

    await Services.create(dados)
    .then( ()=>{
        return res.json({
            erro: false,
            mensagem: 'Serviço cadastrado com sucesso!'
        });
    }).catch( (err)=>{
        return res.status(400).json({
            erro:true,
            mensagem: `Erro: Serviço não cadastrado... ${err}`
        })
    })
};

exports.update = async (req, res) => {
    const { id } = req.body;

    await Services.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro:false,
            mensagem: 'Serviço alterado com sucesso!'
        })
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Serviço não alterado ...${err}`
        })
    })
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    await Services.destroy({ where: {id}})
    .then( () => {
        return res.json({
            erro: false,
            mensagem: "Seviço apagado com sucesso!"
        });
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} Serviço não apagado...`
        });
    });
};