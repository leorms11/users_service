import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { BaseEntity } from "@shared/infra/typeorm/entities/BaseEntity";

import { Permission } from "./Permission";
import { Role } from "./Role";

@Entity("users")
class User extends BaseEntity {
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  @Column({ name: "first_name", type: "varchar", nullable: false })
  firstName: string;

  @Column({ name: "last_name", type: "varchar", nullable: false })
  lastName: string;

  @Column({ name: "email", type: "varchar", nullable: false, unique: true })
  email: string;

  @Column({ name: "password", type: "varchar", nullable: false })
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  roles?: Role[];
}

export { User };
