CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "color" (
    "id" SERIAL PRIMARY KEY,
    "color_name" VARCHAR (50)
);

INSERT INTO "color" ("color_name") VALUES ('red'), ('blue'), ('green'), ('black'), ('item');

CREATE TABLE "card_table" 
("id" SERIAL PRIMARY KEY,
 "color_id" INT REFERENCES "color",
 "type" VARCHAR (50),
 "card_name" VARCHAR (250),
 "rarity" VARCHAR (50),
 "img_url" TEXT
 );

CREATE TABLE "user_rating" 
("id" SERIAL PRIMARY KEY,
"user_card_value" DECIMAL(4,1),
 "user_id" INT REFERENCES "user",
 "card_id" INT REFERENCES "card_table"
 );
 
 CREATE TABLE "admin_table" 
 ("id" SERIAL PRIMARY KEY,
 "default_value" DECIMAL(4,1),
 "card_id" INT REFERENCES "card_table");
 
 ALTER TABLE "user" ADD "clearance_level" INTEGER NOT NULL DEFAULT 0;
