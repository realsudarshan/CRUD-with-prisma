-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "followerid" TEXT NOT NULL,
    "followingid" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerid_fkey" FOREIGN KEY ("followerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingid_fkey" FOREIGN KEY ("followingid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
