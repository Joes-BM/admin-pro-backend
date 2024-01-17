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

const actualizarHospital = (req,res)=>{

    res.json({
        ok:true,
        msg:'actualizarHospital'
    })
}

const eliminarHospital = (req,res)=>{

    res.json({
        ok:true,
        msg:'eliminarHospital'
    })
}

module.exports =  {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}