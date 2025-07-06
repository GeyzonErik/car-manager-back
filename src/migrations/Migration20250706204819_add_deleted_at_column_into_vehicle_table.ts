import { Migration } from '@mikro-orm/migrations';

export class Migration20250706204819_add_deleted_at_column_into_vehicle_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "vehicles" add column "deleted_at" timestamptz null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "vehicles" drop column "deleted_at";`);
  }

}
