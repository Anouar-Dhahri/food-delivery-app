import { Client } from './../models/Client.js'

export const findAll = async ( req, res, next ) => {
  const clients = await Client.find()
  res.json({
    success: true,
    clients: clients
  })
}

export const handleStatus = async ( req, res, next ) => {
  const id = req.params.id;
  const status = req.body.status

  await Client.findByIdAndUpdate(
    {_id: id},
    {status:status},
    {new: true }
  )
  .then(() => {
    res.json({
      success: true,
      message: "Account is now enabled ."
    });
  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot activate the Account of the client with id=${id}.`
    });
  });
}

export const remove = async ( req, res, next ) => {
  const id = req.params.id;
  await Client.deleteOne({_id: id})
  .then(() => {
    res.json({
      success: true,
      message: "Client was deleted successfully!"
    });
  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot delete Client with id=${id}.`
    });
  });
}