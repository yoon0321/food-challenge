const { Category, Map } = require('../models');

module.exports = {
  root: {
    get: async (req, res) => {
      try {
        const categoryListRaw = await Category.findAll({
          attributes: [ 'id', 'name' ]
        })
        const mapListRaw = await Map.findAll( { 
          attributes: [ 'id', 'name', 'userId', 'description' ]  
        }) 
        //console.log('Category List:', result1);
        //console.log('Map List:', mapList); 
        const categoryList = categoryListRaw.map(item => item.dataValues);     
        const mapList = mapListRaw.map(item => item.dataValues);     
        res.status(200).json({ data: {categoryList: categoryList, mapList: mapList}, message: 'welcome' });

      } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }            
    }
  }
}