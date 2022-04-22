import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { BaseEntity } from "@shared/infra/typeorm/entities/BaseEntity";

import { Permission } from "./Permission";

@Entity("roles")
class Role extends BaseEntity {
  constructor(name: string, description?: string) {
    super();
    this.name = name;
    this.description = description;
  }

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "description", type: "varchar", nullable: true })
  description?: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "permissions_roles",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions?: Permission[];
}

export { Role };
