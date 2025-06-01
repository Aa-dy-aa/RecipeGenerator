import { pgTable, varchar, serial, json } from 'drizzle-orm/pg-core';

export const RecipeList = pgTable('recipe_list', {
  id: serial('id').primaryKey(),
  recipeId: varchar('recipeId').notNull(),
  name: varchar('name').notNull(),
  cuisine: varchar('cuisine').notNull(),         
  category: varchar('category').notNull(),
  duration: varchar('duration').notNull(),       
  recipeOutput: json('recipeOutput').notNull(),
  createdBy: varchar('createdBy'),
  userName: varchar('userName'),                
  userProfileImage: varchar('userProfileImage')
});
