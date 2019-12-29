CREATE TABLE users (
  id CHAR(36) NOT NULL,
  created_on DATETIME NOT NULL,
  created_creds JSON NOT NULL,
  last_seen_on DATETIME NOT NULL,
  last_seen_creds JSON NOT NULL,
  PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB;


CREATE TABLE groups (
  id CHAR(36) NOT NULL,
  name VARCHAR(191),
  created_by_user_id CHAR(36) NOT NULL,
  created_on DATETIME NOT NULL,
  INDEX IDX_GROUPS_CREATED_BY (created_by_user_id),
  PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB;

ALTER TABLE groups ADD CONSTRAINT FK_GROUPS_CREATED_BY FOREIGN KEY (created_by_user_id) REFERENCES users (id) ON DELETE RESTRICT;


CREATE TABLE group_members (
  id CHAR(36) NOT NULL,
  group_id CHAR(36) NOT NULL,
  name VARCHAR(191),
  created_by_user_id CHAR(36) NOT NULL,
  created_on DATETIME NOT NULL,
  INDEX IDX_GROUP_MEMBERS_GROUP (group_id),
  INDEX IDX_GROUP_MEMBERS_CREATED_BY (created_by_user_id),
  PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB;

ALTER TABLE group_members ADD CONSTRAINT FK_GROUP_MEMBERS_GROUP FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE;
ALTER TABLE group_members ADD CONSTRAINT FK_GROUP_MEMBERS_CREATED_BY FOREIGN KEY (created_by_user_id) REFERENCES users (id) ON DELETE RESTRICT;


CREATE TABLE group_member_users (
  group_member_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  inviter_user_id CHAR(36) NOT NULL,
  invited_on DATETIME NOT NULL,
  INDEX IDX_GROUP_MEMBER_USERS_USER (user_id),
  INDEX IDX_GROUP_MEMBER_USERS_INVITER_USER (inviter_user_id),
  PRIMARY KEY(group_member_id, user_id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB;

ALTER TABLE group_member_users ADD CONSTRAINT FK_GROUP_MEMBER_USER_GROUP_MEMBER FOREIGN KEY (group_member_id) REFERENCES group_members (id) ON DELETE CASCADE;
ALTER TABLE group_member_users ADD CONSTRAINT FK_GROUP_MEMBER_USER_USER FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
ALTER TABLE group_member_users ADD CONSTRAINT FK_GROUP_MEMBER_USER_INVITER_USER FOREIGN KEY (inviter_user_id) REFERENCES users (id) ON DELETE CASCADE;