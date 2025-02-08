CREATE TYPE "public"."meal_course" AS ENUM('APPETIZER', 'SOUP', 'SALAD', 'MAIN_COURSE', 'SIDE_DISH', 'DESSERT');--> statement-breakpoint
CREATE TYPE "public"."meal_type" AS ENUM('BREAKFAST', 'BRUNCH', 'LUNCH', 'DINNER', 'SNACK', 'LATE_NIGHT', 'HOLIDAY');--> statement-breakpoint
CREATE TABLE "recipe" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"prep_time" integer NOT NULL,
	"cook_time" integer NOT NULL,
	"servings" integer NOT NULL,
	"instructions" text NOT NULL,
	"meal_type" "meal_type" NOT NULL,
	"meal_course" "meal_course" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "token" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;