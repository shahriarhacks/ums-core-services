-- AlterTable
ALTER TABLE "faculties" ALTER COLUMN "middleName" DROP NOT NULL,
ALTER COLUMN "profileImage" DROP NOT NULL,
ALTER COLUMN "bloodGroup" DROP NOT NULL;

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "middleName" DROP NOT NULL,
ALTER COLUMN "profileImage" DROP NOT NULL,
ALTER COLUMN "bloodGroup" DROP NOT NULL;
