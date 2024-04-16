-- AlterTable
CREATE SEQUENCE emp_data_id_seq;
ALTER TABLE "emp_data" ALTER COLUMN "id" SET DEFAULT nextval('emp_data_id_seq');
ALTER SEQUENCE emp_data_id_seq OWNED BY "emp_data"."id";
