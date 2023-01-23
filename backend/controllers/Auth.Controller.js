import { Client } from './../models/Client.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { sendMail } from './../helpers/email.helper.js'

export const register = async (req, res, next) => {
  try {
    const { name, surname, phone, address, state, email, password } = req.body;
    if(validator.isEmail(email)){
      await Client.find({email:email})
      .then(result => {
        if(result.length >=1) {
          res.json({
            success: false,
            message: "User already exist !"
          });
        }else {
          bcrypt.hash(password, 10, (err, hash) => {
            if(err){
              res.json({
                success:false,
                message: "Error, unable to encrypt password !",
              })
            }else {
              const plainPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
              let client = new Client ({
                name:name, 
                surname:surname,
                phone:phone,
                address: address,
                state:state, 
                email:email, 
                password:hash,
                plainPassword: plainPassword
              })
              client.save((err, doc) => {
                if(err){
                  res.json({
                    success: false,
                    message: `Cannot create This Account.`
                  });
                }else {
                  res.json({
                    success: true,
                    message: "Your Account was created successfully.",
                    user: doc
                  });
                } 
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
  } catch (error) {
    res.json({
      success: false,
      message: error
    });
  }
}

export const login = async (req, res, next) => {
  try {
    const  { email, password } = req.body;
    if(validator.isEmail(email)){
      await Client.find({email:email})
      .then((result) => {
        if(result.length === 0) {
          res.json({
            success:false,
            message:"User not found !"
          });
        }else {
          result.map(item => {
            bcrypt.compare(password, item.password).then(function(match) {
              if(match) {
                if(item.status) {
                  const token = jwt.sign({
                    id:item._id, 
                    name:item.name, 
                    surname:item.surname, 
                    email:item.email
                  }, process.env.TOKEN_SECRET, {expiresIn: '24h'})
                  res.json({
                    success:true,
                    message:"Welcome "+item.name+' '+item.surname,
                    user: item,
                    token:token
                  })
                }else {
                  res.json({
                    success:false,
                    message:'You account not yet activated !'
                  })
                }
              }else {
                res.json({
                  success:false,
                  message:"Wrong password. try again !"
                })
              }
            });
          })
        }
      })
    }else {
      res.json({
        success:false,
        message: "Invalid email format !"
      })
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal error"
    })
  }
}

export const profile = async ( req, res, next ) => {
  const id = req.params.id;
  const { name, surname, phone, address, state } = req.body;
  await Client.findByIdAndUpdate(
    {_id: id},
    { 
      $set:{
        name:name, 
        surname:surname,
        phone:phone,
        address: address,
        state:state, 
      }
    },
    {new:true}
  ).then(() => {
    res.json({
      success: true,
      message: "Your Profil was Updated successfully."
    });
  }).catch((error) => {
    res.json({
      success: false,
      message: error
    });
  })
}

export const resetpassword = async( req, res, next ) => {
  const { email } = req.body;

  await Client.find({email:email})
  .then((result) => {
    if(result.length === 0) {
      res.json({
        success:false,
        message:"This email "+email+" don't exist, please check your email",
      });
    }else {
      result.map(item => {
        let plainpass = CryptoJS.AES.decrypt(item.plainPassword, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
        var message = {
          from: "shopeefood@application.com",
          to: email,
          subject: "Reset Email",
          html: "<p> Hello, <strong>"+item.name+' '+item.surname+"</strong> </p> <br> <p> Your Password :<strong>"+plainpass +"</strong></p>"
        }
        let mail = sendMail(message);
        res.json({
          success: true,
          message: "Check your email to find your password"
        })
      })
    }
  })
}

export const changePassword = async (req, res, next) => {
  const id = req.params.id;
  const { currentPassword, newPassword } = req.body;
  await Client.find({_id:id})
  .then((result) => {
    if(result.length === 0) {
      res.json({
        success:false,
        message:"Utilisateur non trouvé",
      });
    }else {
      result.map(item => {
        bcrypt.compare(currentPassword, item.password).then(function(match) {
          if(match) {
            bcrypt.hash(newPassword, 10, (err, hash) => {
              if(err){
                res.json({
                  success:false,
                  message: "Something went wrong, Impossible to encrypt the new password",
                })
              }else {
                const plainPassword = CryptoJS.AES.encrypt(newPassword, process.env.CRYPTO_SECRET).toString();
                Client.findByIdAndUpdate(
                  {
                    _id:id
                  },
                  {
                    $set:{
                      password:hash,
                      plainPassword: plainPassword
                    }
                  },
                  { new: true }
                ).then(() => {
                  res.json({
                    success: true,
                    message: "Your Password was updated successfully."
                  });
                }).catch((error) => {
                  res.json({
                    success: false,
                    message: error
                  });
                })
              }
            })
          }else {
            res.json({
              success:false,
              message:"Wrong password, please chek your current password !"
            })
          }
        });
      })
    }
  })

}

export const ChangeEmail = async( req, res, next ) => {
  const id = req.params.id;
  const { currentEmail, newEmail } = req.body;
  if(validator.isEmail(currentEmail) || validator.isEmail(newEmail)){
    await Client.find({email:currentEmail, _id:id})
    .then((result) => {
      if(result.length === 0) {
        res.json({
          success:false,
          message:"This email "+currentEmail+" is not yours, please check your current email",
        });
      }else {
        Client.findByIdAndUpdate(
          {_id: id},
          {
            $set:{email:newEmail}
          },
          {
            new:true
          }
        ).then(() => {
          res.json({
            success: true,
            message: "Your Email was updated to "+newEmail+" successfully."
          });
        }).catch((err) => {
          res.json({
            success: false,
            message: err
          });
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