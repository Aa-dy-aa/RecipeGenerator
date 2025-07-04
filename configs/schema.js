import { pgTable, varchar, serial, json,integer,text,timestamp} from 'drizzle-orm/pg-core';

export const RecipeList = pgTable('recipe_list', {
  id: serial('id').primaryKey(),
  recipeId: varchar('recipeId').notNull(),
  name: varchar('name').notNull(),
  cuisine: varchar('cuisine').notNull(),
  category: varchar('category').notNull(),
  duration: varchar('duration').notNull(),       
  recipeOutput: json('recipeOutput').notNull(),
  includeVideo:varchar('includeVideo').notNull().default('Yes'),
  createdBy: varchar('createdBy'),
  userName: varchar('userName'),                
  userProfileImage: varchar('userProfileImage'),
  info:varchar('info').notNull(),
  serves:integer('serves').notNull(),
  caloriesPerServing:integer('calories').notNull(),
  description:varchar('description')    
});

export const Recipes=pgTable('recipes',{
  id:serial('id').primaryKey(),
  recipeId:varchar('recipeId').notNull(),
  content:json('content').notNull(),
  videoId:varchar('videoId').notNull(),
  recipeBanner: text("recipe_banner"), 
  createdAt: timestamp("created_at").defaultNow()
})
