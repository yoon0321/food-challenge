// 이 코드를 실행하면, DB에 참조키가 만들어짐
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // 1. Likes.userId > Users.id
    await queryInterface.addConstraint('Likes', { 
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_Likes_userId', // FK name (optional)
      references: {
        table: 'Users',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    // 2. Likes.mapId > Maps.id
    await queryInterface.addConstraint('Likes', { 
      fields: ['mapId'],
      type: 'foreign key',
      name: 'FK_Likes_mapId', // FK name (optional)
      references: {
        table: 'Maps',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    // 3. Maps.userId > Users.id
    await queryInterface.addConstraint('Maps', { 
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_Maps_userId', // FK name (optional)
      references: {
        table: 'Users',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    // 4. Map_stores.mapId > Maps.id
    await queryInterface.addConstraint('Map_stores', { 
      fields: ['mapId'],
      type: 'foreign key',
      name: 'FK_MapStores_mapId', // FK name (optional)
      references: {
        table: 'Maps',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    // 5. Map_stores.storeId > Stores.id
    await queryInterface.addConstraint('Map_stores', { 
      fields: ['storeId'],
      type: 'foreign key',
      name: 'FK_MapStores_storeId', // FK name (optional)
      references: {
        table: 'Stores',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    // 6. Reviews.userId > Users.id
    await queryInterface.addConstraint('Reviews', { 
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_Reviews_userId', // FK name (optional)
      references: {
        table: 'Users',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    // 7. Reviews.storeId > Stores.id
    await queryInterface.addConstraint('Reviews', { 
      fields: ['storeId'],
      type: 'foreign key',
      name: 'FK_Reviews_storeId', // FK name (optional)
      references: {
        table: 'Stores',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    // 8. Images.storeId > Stores.id    
    await queryInterface.addConstraint('Images', { 
      fields: ['storeId'],
      type: 'foreign key',
      name: 'FK_Images_storeId', // FK name (optional)
      references: {
        table: 'Stores',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    // 9. Store_categories.storeId > Stores.id
    await queryInterface.addConstraint('Store_categories', { 
      fields: ['storeId'],
      type: 'foreign key',
      name: 'FK_StoreCategories_storeId', // FK name (optional)
      references: {
        table: 'Stores',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    // 10. Store_categories.categoryId > Categories.id
    await queryInterface.addConstraint('Store_categories', { 
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'FK_StoreCategories_categoryId', // FK name (optional)
      references: {
        table: 'Categories',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    // 11. Images.userId > Users.id
    await queryInterface.addConstraint('Images', { 
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_Images_userId', // FK name (optional)
      references: {
        table: 'Users',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // Doesn't work
      // 1. removeConstraint 세번째 파라미터에 query options 가 들어간다고
      // 2. removeIndex 사용 해보기
    // 1. Likes.userId > Users.id
    await queryInterface.removeConstraint('Likes', 'FK_Likes_userId')
    // await queryInterface.removeIndex('Likes', 'FK_Likes_userId') // 
    // Error Message: Cannot drop index 'FK_Likes_userId': needed in a foreign key constraint
        
    // 2. Likes.mapId > Maps.id
    await queryInterface.removeConstraint('Likes', 'FK_Likes_mapId')    
    // 3. Maps.userId > Users.id
    await queryInterface.removeConstraint('Maps', 'FK_Maps_userId')    
    // 4. Map_stores.mapId > Maps.id
    await queryInterface.removeConstraint('Map_stores', 'FK_MapStores_mapId')        
    // 5. Map_stores.storeId > Stores.id
    await queryInterface.removeConstraint('Map_stores', 'FK_MapStores_storeId')            
    // 6. Reviews.userId > Users.id
    await queryInterface.removeConstraint('Reviews', 'FK_Reviews_userId')    
    // 7. Reviews.storeId > Stores.id
    await queryInterface.removeConstraint('Reviews', 'FK_Reviews_storeId')    
    // 8. Images.storeId > Stores.id    
    await queryInterface.removeConstraint('Images', 'FK_Images_storeId')
    // 9. Store_categories.storeId > Stores.id
    await queryInterface.removeConstraint('Store_categories', 'FK_StoreCategories_storeId')    
    // 10. Store_categories.categoryId > Categories.id
    await queryInterface.removeConstraint('Store_categories', 'FK_StoreCategories_categoryId')    
    // 11. Images.userId > Users.id
    await queryInterface.removeConstraint('Images', 'FK_Images_userId')      
  }
};
