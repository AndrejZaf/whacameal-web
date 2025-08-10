ALTER TABLE "ingredient" DROP CONSTRAINT "ingredient_recipe_id_recipe_id_fk";
--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE cascade ON UPDATE no action;