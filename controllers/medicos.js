const { response } =require ('express');
const Medico = require ('../models/medico');
const getMedicos = async(req,res)=>{

    const medico = await Medico.find()
                                .populate('usuario','nombre email')
                                .populate('hospital','nombre')

    res.json({
        ok:true,
        msg:'getMedicos',
        medico
    })
}

const crearMedico = async(req,res=response)=>{

    const uid=req.uid
    const medico = new Medico({
        usuario:uid,
        ...req.body
    })
    try {
        const medicoDB = await medico.save();
        res.json({
            ok:true,
            medico:medicoDB,
            msg:'crearMedico'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"comunicate con el administrador"
        })
    }

}

const actualizarMedico = (req,res)=>{

    res.json({
        ok:true,
        msg:'actualizarMedico'
    })
}

const eliminarMedico = (req,res)=>{

    res.json({
        ok:true,
        msg:'eliminarMedico'
    })
}

module.exports =  {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}