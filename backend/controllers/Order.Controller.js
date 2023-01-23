import { Order } from '../models/Order.js'
import { Employe } from '../models/Employe.js'
import { Client } from '../models/Client.js'
import { sendMail } from '../helpers/email.helper.js'

export const findAll = async ( req, res, next ) => {
  const orders = await Order.find()
  res.json({
    success: true,
    orders: orders
  })
}

export const getHistory = async ( req, res, next ) => {
  const id = req.params.id;
  const orders = await Order.find({ clientId: id })
  res.json({
    success: true,
    orders: orders
  })
}

export const create = async ( req, res, next ) => {
  const { clientId, items, restaurantId, totalPrice, paymentType, paid, state } = req.body;
  let order = new Order({
    clientId:clientId, 
    items:items, 
    restaurantId:restaurantId, 
    totalPrice:totalPrice, 
    paymentType:paymentType, 
    paid:paid,
    state:state, 
  });
  order.save().then(()=> {
    res.json({
      success: true,
      message: "Your Order was saved successfully."
    });
  }).catch(err => {
    res.json({
      success: false,
      message: `Cannot create This Order`
    });
  })
}

export const handleStatus = async ( req, res, next ) => {
  const id = req.params.id;
  const status = req.body.status
  await Order.findByIdAndUpdate(
    {_id: id},
    {$set:{status:status}}, 
    { new: true}
  )
  .then(() => {
    res.json({
      success: true,
      message: "The order was updated successfully."
    });
  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot update The order with id=${id}.`
    });
  });
}

export const affect = async ( req, res, next ) => {
  const id = req.params.id;
  const {employeId} = req.body

  const employe = await Employe.findOne({ _id:employeId })

  await Order.findByIdAndUpdate(
    {_id: id},
    {employeId:employeId}, 
    {new: true}
  )
  .then((docs) => {
    Client.findOne({_id: docs.clientId}).then((client) => {
      var message = {
        from: "shopeefood@application.com",
        to: employe.email,
        subject: "Work ",
        html: "<p> Hello, <strong>"+employe.name+' '+employe.surname+"</strong> Here your work today :D </p> <br>"+
              " Client fullname: "+client.name+' '+client.surname+ "<br>"+
              "Client Contact Information : "+client.phone+" || "+ client.email+ "<br>"+
              "Client Adresse :"+client.adresse+"<br>"+
              " Order Reference :"+docs._id+"<br>"+
              "Items : <br>"+
              docs.items.map((item, index) => (
                "<strong>"+item.name+"</strong><br>"
              ))
              +
              "Total Price: "+ docs.totalPrice+"<br>"+
              "Payement Type : "+docs.paymentType+"<br>"+
              "Payed ? : "+docs.paid+"<br>"
      }
      let mail = sendMail(message);
      res.json({
        success: true,
        message: "The Order was Affected successfully.",
        commande: docs
      });
    })

  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot update The Order with id=${id}.`
    });
  });
}

export const remove = async ( req, res, next ) => {
  const id = req.params.id;
  await Order.deleteOne({_id: id})
  .then(() => {
    res.json({
      success: true,
      message: "Your Order was deleted successfully!"
    });
  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot delete the Order with id=${id}.`
    });
  });
}

