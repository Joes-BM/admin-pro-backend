const { response } =require ('express')
const Hospital = require ('../models/hospital')

const getHospitales = async(req,res)=>{

    const hospital = await Hospital.find()
                                    .populate('usuario','nombre email');

    res.json({
        ok:true,
        msg:'getHospitales',
        hospital
    })
}

const crearHospital = async(req,res=response)=>{

    const uid=req.uid
    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });

    // console.log(hospital);
    // console.log(uid);
    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok:true,
            hospital:hospitalDB,
            msg:'crearHospital'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"comunicate con el administrador"
        })
    }
}

const actualizarHospital = async(req,res=response)=>{
    const id=req.params.id;
    const uid=req.uid;

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital){
            return res.status(403).json({
                ok:false,
                msg:'hospital no encontrado por Id'
            })
        }
        //* UNA FORMA DE GUARDAR EL NOMBRE - forma valida si solo es un solo campo
        // hospital.nombre= req.body.nombre;

        //* SEGUNDA FORMA
        const cambiosHospital={
            ...req.body,
            usuario:uid
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital, {new:true});
        
        res.json({
            ok:true,
            hospital:hospitalActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })    
    }
}

const eliminarHospital = async(req,res=response)=>{
    const id=req.params.id;
    try {
        const hospital = await Hospital.findById(id);
        if (!hospital){
            return res.status(403).json({
                ok:false,
                msg:'hospital no encontrado por Id'
            })
        }
        await Hospital.findByIdAndDelete(id);
        res.json({
            ok:true,
            msg:'Hospital Eliminado'
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}