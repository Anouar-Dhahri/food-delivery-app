import { Item } from '../models/Item.js'
import { Menu } from './../models/Menu.js'

export const findAll = async ( req, res, next ) => {
  const menus = await Menu.find()
  res.json({
    success: true,
    menus: menus
  })
}

export const findByRestaurent = async ( req, res, next ) => {
  const id = req.params.id;
  const menus = await Menu.find({
    restaurantId:id,
  });
  res.json({
    success: true,
    menus: menus
  })
}

export const findMenuItems = async ( req, res, next ) => {
  const id = req.params.id;

  const dd = new Date().getDate();
  const mm = new Date().getMonth() + 1;
  const yyyy = new Date().getFullYear();

  await Menu.findOne({
    restaurentId:id,
  }).sort({createdAt:-1})
  .then((menu) => {
    console.log(menu)
    //console.log(dd)
    Item.find({menuId: menu._id})
    .then((items) => {
      res.json({
        success: true,
        menu:menu,
        items:items
      })
    })
    /*menus.forEach((menu) => {
      if(menu.jour.getDate() == dd && menu.jour.getMonth() + 1 == mm){
        Item.find({menuId: menu._id})
        .then((items) => {
          res.json({
            success: true,
            menu:menu,
            items:items
          })
        })
      }
    })*/

  }).catch(err => {
    res.send(err)
  })
}

export const create = async ( req, res, next ) => {
  const { day, name, restaurantId } = req.body;
  await Menu.find({name:name, day:day, restaurantId:restaurantId})
  .then(result => {
    if(result.length >=1) {
      res.json({
        success: false,
        message: "The menu already exist !"
      });
    }else {
      let menu = new Menu ({
        day:day, 
        name:name, 
        restaurantId:restaurantId, 
      })
      menu.save().then(()=> {
        res.json({
          success: true,
          message: "Menu was created successfully."
        });
      }).catch(err => {
        res.json({
          success: false,
          message: `Cannot create This Menu.`
        });
      })
    }
  })
}

export const update = async ( req, res, next ) => {
  const id = req.params.id;
  const { day, name } = req.body;
  await Menu.findByIdAndUpdate(
    {_id: id},
    {
      $set:{
        name:name, 
        day:day
      }
    }, 
    {new: true }
  )
  .then(() => {
    res.json({
      success: true,
      message: "Menu was updated successfully."
    });
  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot update Menu with id=${id}.`
    });
  });
}

export const remove = async ( req, res, next ) => {
  const id = req.params.id;
  await Menu.deleteOne({ _id:id })
  .then(() => {
    Item.deleteMany({menuId:id})
    .then(() => {
      res.json({
        success: true,
        message: "Menu was deleted successfully!"
      });
    })
  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot delete Menu with id=${id}.`
    });
  });
}
