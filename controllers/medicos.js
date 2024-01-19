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

const actualizarMedico = async(req,res=response)=>{
    const id= req.params.id;
    const uid=req.uid;
    try {
        const medico = await Medico.findById(id);
        if(!medico){
            return res.status(403).json({
                ok:false,
                msg:'Medico no encontrado por Id'
            })
        }
        const cambiosMedico={
            ...req.body,
            usuario:uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico, {new:true});
        
        res.json({
            ok:true,
            medico:medicoActualizado
       })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'comuniquese con el Administrador'
        })
    }

}

const eliminarMedico = async(req,res=response)=>{
    const id= req.params.id;
    try {
        const medico = await Medico.findById(id);
        if (!medico){
            return res.status(403).json({
                ok:false,
                msg:'medico no encontrado por Id'
            })
        }
        await Medico.findByIdAndDelete(id);
        res.json({
            ok:true,
            msg:'Medico Eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'comuniquese con el Administrador'
        })
    }

    
}

module.exports =  {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}