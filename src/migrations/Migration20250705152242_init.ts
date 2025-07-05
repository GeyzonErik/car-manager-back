import { Migration } from '@mikro-orm/migrations';

export class Migration20250705152242_init extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" uuid not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "users_pkey" primary key ("id"));`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);

    this.addSql(`create table "vehicles" ("id" uuid not null, "owner_id" uuid not null, "model" varchar(255) not null, "plate" varchar(20) not null, "active" boolean not null default true, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "vehicles_pkey" primary key ("id"));`);

    this.addSql(`create table "vehicle_logs" ("id" uuid not null, "vehicle_id" uuid not null, "user_id" uuid not null, "action" varchar(50) not null, "description" text not null, "created_at" timestamptz not null, constraint "vehicle_logs_pkey" primary key ("id"));`);

    this.addSql(`alter table "vehicles" add constraint "vehicles_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "vehicle_logs" add constraint "vehicle_logs_vehicle_id_foreign" foreign key ("vehicle_id") references "vehicles" ("id") on update cascade;`);
    this.addSql(`alter table "vehicle_logs" add constraint "vehicle_logs_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "vehicles" drop constraint "vehicles_owner_id_foreign";`);

    this.addSql(`alter table "vehicle_logs" drop constraint "vehicle_logs_user_id_foreign";`);

    this.addSql(`alter table "vehicle_logs" drop constraint "vehicle_logs_vehicle_id_foreign";`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "vehicles" cascade;`);

    this.addSql(`drop table if exists "vehicle_logs" cascade;`);
  }

}
