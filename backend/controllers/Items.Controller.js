import { Item } from './../models/Item.js'

const findAll = async ( req, res, next ) => {
  const id = req.params.id;
  const items = await Item.find({menuId: id})
  res.json({
    success: true,
    items: items
  })
}

const create = async ( req, res, next ) => {
  const { name, price, menuId } = req.body;
  const image = req.file.path;

  await Item.find({name:name, price:price, menuId:menuId})
  .then(result => {
    if(result.length >=1) {
      res.json({
        success: false,
        message: "The Item already exist !"
      });
    }else {
      let item = new Item({
        image:image,
        name:name, 
        price:price, 
        menuId:menuId
      })
      item.save().then(()=> {
        res.json({
          success: true,
          message: "Menu Item was created successfully."
        });
      }).catch(err => {
        res.json({
          success: false,
          message: `Cannot create This Menu Item.`
        });
      })
    }
  })
}

const update = async ( req, res, next ) => {
  const id = req.params.id;
  const { name, price, menuId } = req.body;
  const image = req.file.path;

  await Item.findByIdAndUpdate(
    {_id: id}, 
    {
      $set: {
        image:image,
        name:name, 
        price:price, 
        menuId:menuId
      }
    },
    { new: true }
  )
  .then(() => {
    res.json({
      success: true,
      message: "Menu Item was updated successfully."
    });
  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot update Menu Item with id=${id}.`
    });
  });
}

const remove = async ( req, res, next ) => {
  const id = req.params.id;
  await Item.deleteOne({_id:id})
  .then(() => {
      res.json({
        success: true,
        message: "Menu Item was deleted successfully!"
      });
  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot delete Menu Item with id=${id}.`
    });
  });
}

export {
  findAll,
  create,
  update,
  remove
}