-- Table of 'vehicles makes' for autolist module
-- ============================================================================

create table llx_autolist_makes
(
  rowid                     integer AUTO_INCREMENT PRIMARY KEY,       -- id of the record
  entity                    integer DEFAULT 1 NOT NULL,               -- entity the record exists in (multicompany feature)
  datec                     datetime,                                 -- time the record was created
  tms                       timestamp DEFAULT CURRENT_TIMESTAMP,                                -- timestamp of the last time the data was modified
  makename                  varchar(255),                             -- Name of make / manufacturer
  image                     varchar(255),                             -- The image for the manufacturer / make
  country                   varchar(255),                             -- The country of origin of the make / manufacturer
  fk_user_creat             integer      DEFAULT NULL,                -- User that created the record
  fk_user_modif             integer      DEFAULT NULL,                -- Last modifing user
  active                    tinyint      DEFAULT 1  NOT NULL,         -- If the make / manufacturer is available or not
  extraparams               varchar(255)                              -- for other parameters with json format
)ENGINE=innodb;
