import { Employe } from './../models/Employe.js'
import bcrypt from 'bcrypt';
import validator from 'validator';
import { sendMail } from './../helpers/email.helper.js'

const findAll = async ( req, res, next ) => {
  const employes = await Employe.find()
  res.json({
    success: true,
    employes: employes
  })
}

const findByState = async ( req, res, next ) => {
  const etat = req.params.etat;
  const employes = await Employe.find({etat:etat, disponibilite:true})
  res.json({
    success: true,
    employes: employes
  })
}

const create = async ( req, res, next ) => {
  const { nom, prenom, telephone, email, password, etat, restaurentId } = req.body;
  if(validator.isEmail(email)){
    await Employe.find({email:email})
    .then(result => {
      if(result.length >=1) {
        res.json({
          success: false,
          message: "Email already Exist !"
        });
      }else {
        bcrypt.hash(password, 10, (err, hash) => {
          if(err){
            res.json({
              success:false,
              message: "Error, unable to encrypt password !",
            })
          }else {
            let employe = new Employe ({
              nom:nom, 
              prenom:prenom, 
              telephone:telephone, 
              email:email, 
              password:hash, 
              etat:etat, 
              restaurentId:restaurentId
            })
            var message = {
              from: "shopeefood@application.com",
              to: email,
              subject: "New Employe Account",
              html: "<p> Hello, <strong>"+nom+' '+prenom+"</strong> </p> <br> <p> Your Email & Password for your account are :<strong>"+email +"</strong> ****** Password: <strong>"+password+"</strong></p>"
            }
            
            employe.save().then(()=> {
              let mail = sendMail(message);
              console.log(mail)
              res.json({
                success: true,
                message: "Employee was created successfully.",
                //preview: mail
              });
            }).catch(err => {
              res.json({
                success: false,
                message: `Cannot create This Employee.`
              });
            })
          }
        })
      }
    })
  }else {
    res.json({                  
      success:false,
      message: "Invalid email format !"
    })
  }
}

const available = async ( req, res, next ) => {
  const id = req.params.id;
  const disp = req.body.disponibilite
  await Employe.findByIdAndUpdate(
    {_id: id},
    {
      $set:{
        disponibilite: disp
      }
    },
    { new: true }
  )
  .then(() => {
    res.json({
      success: true,
      message: "Client was updated successfully."
    });
  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot update Employe with id=${id}.`
    });
  });
}

const update = async ( req, res, next ) => {
  const id = req.params.id;
  const { nom, prenom, telephone, email, password, etat, restaurentId } = req.body

  if(validator.isEmail(email)){
    await bcrypt.hash(password, 10, (err, hash) => {
      if(err){
        res.json({
          success:false,
          message: "Error, unable to encrypt password !",
        })
      }else {
        var message = {
          from: "shopeefood@application.com",
          to: email,
          subject: "Update Employe Account",
          html: "<p> Hello, <strong>"+nom+' '+prenom+"</strong> </p> <br> <p> Your Email & Password for your account are :<strong>"+email +"</strong> ****** Password: <strong>"+password+"</strong></p>"
        }
        
        Employe.findByIdAndUpdate(
          {_id: id},
          {
            $set: {
              nom:nom,
              prenom:prenom,
              telephone:telephone,
              email:email,
              password:hash,
              etat:etat,
              restaurentId:restaurentId
            }
          }, 
          { new:true }
        )
        .then(() => {
          let mail = sendMail(message);
          res.json({
            success: true,
            message: "Employee was updated successfully.",
            preview: mail
          });
        })
        .catch(err => {
          res.json({
            success: false,
            message: `Cannot update Employee with id=${id}.`
          });
        });
      }
    })
  }else {
    res.json({                  
      success:false,
      message: "Invalid email format !"
    })
  }
}

const remove = async ( req, res, next ) => {
  const id = req.params.id;
  await Employe.deleteOne({ _id:id })
  .then(() => {
      res.json({
        success: true,
        message: "Employe was deleted successfully!"
      });
  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot delete Employe with id=${id}.`
    });
  });
}

export {
  findAll,
  findByState,
  create,
  available,
  update,
  remove
}