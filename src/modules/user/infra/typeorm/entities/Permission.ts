import { Column, Entity } from "typeorm";

import { BaseEntity } from "@shared/infra/typeorm/entities/BaseEntity";

@Entity("permissions")
class Permission extends BaseEntity {
  constructor(name: string, description?: string) {
    super();
    this.name = name;
    this.description = description;
  }

  @Column()
  name?: string;

  @Column()
  description?: string;
}

export { Permission };
