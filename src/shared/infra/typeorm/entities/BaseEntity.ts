import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export class BaseEntity {
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn({
    name: "id",
    type: "uuid",
    nullable: false,
    primary: true,
  })
  id?: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp with time zone",
    onUpdate: "now()",
  })
  updatedAt?: Date;
}
