import { PrismaClient } from "@prisma/client"

/*
id Int @id @default(autoincrement())
  firstname String?
  lastname String?
  email String @unique
  phone BigInt @unique
  password String
  balances Int
  userFrom Transaction[] @relation("userFrom")
  userTo Transaction[] @relation("userTo")
  balance Balances[]
*/

const prisma = new PrismaClient();
async function main(){
/*
 const alice = await prisma.user.upsert({
    where: { phone: '9999999999' },
    update: {},
    create: {
      phone: '9999999999',
      password: 'alice',
      name: 'alice',
      transactions: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })
*/
    try{
        const jhon = await prisma.user.upsert({
            where:{
                phone:"9999999999"
            },
            update:{},
            create:{
                    firstname:"Jhon",
                    lastname:"Doe",
                    email:"jhondoe@xyz.com",
                    phone:"9999999999",
                    password:"abc@1234A",
                    transaction:{
                        create:{
                            amount:200000,
                            status: "sent",
                            startTime: new Date(Date.now()),
                            completionTime:new Date(Date.now()+10000),
                            token:"123",
                            provider:"HDFC"
                        }
                    }
            }
        })

        const sid = await prisma.user.upsert({
            where:{
                phone:"9999999998"
            },
            update:{},
            create:{
                    firstname:"Siddhartha",
                    lastname:"Mudgal",
                    email:"sidharthamudgal@xyz.com",
                    phone:"9999999998",
                    password:"abc@1234A",
                    transaction:{
                        create:{
                            amount:400000,
                            status: "sent",
                            startTime: new Date(Date.now()),
                            completionTime:new Date(Date.now()+10000),
                            token:"124",
                            provider:"HDFC"
                        }
                    }
            }
        });
        console.log({ jhon, sid })
    }catch(err : any){
        console.log("Error occured while seeding data to Prisma DB err = "+err.message)
    }

}

main().then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    // process.exit(1)
  })