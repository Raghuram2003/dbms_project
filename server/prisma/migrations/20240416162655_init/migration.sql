-- CreateTable
CREATE TABLE "emp_data" (
    "id" INTEGER NOT NULL,
    "emp_name" VARCHAR(255) NOT NULL,
    "emp_password" VARCHAR(255) NOT NULL,
    "is_signed_in" BOOLEAN NOT NULL,

    CONSTRAINT "emp_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emp_log" (
    "id" SERIAL NOT NULL,
    "emp_name" VARCHAR(255) NOT NULL,
    "time" TIMESTAMPTZ(6),
    "is_signed_in" BOOLEAN,
    "emp_id" INTEGER,

    CONSTRAINT "emp_log_pkey" PRIMARY KEY ("id")
);
