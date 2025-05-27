import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text, check } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey({ autoIncrement: true}),
	username: text('username').notNull().unique(),
	password: text('password').notNull()
});


export const list = sqliteTable('list', {
	id: integer('id').primaryKey({ autoIncrement: true}),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id, {
			onDelete: "cascade"
		}),
	name: text('name').notNull(),
	description: text('description').default("No description"),
})

export const listItem = sqliteTable('list_item', {
	id: integer('id').primaryKey({ autoIncrement: true}),
	listId: integer('list_id')
		.notNull()
		.references(() => list.id, {
			onDelete: "cascade"
		}),
	name: text('name').notNull(),
	weight: integer('weight').default(100).notNull()
},
	(table) => [
		check("weight_check1", sql`${table.weight} >= 0`),
		check("weight_check2", sql`${table.weight} <= 100`)
	]
)