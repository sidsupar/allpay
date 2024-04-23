import prisma from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authoptions = 
{
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                phone:{label:"Phone", type:"text", placeholder:"+91 1122334455"},
                password:{label:"Password", type:"password", placeholder:"abc@1234A"},
            },
            async authorize(credentials: {phone:string, password:string}){
                const hashedPass = await bcrypt.hash(credentials.password, 10);
                try{    

                    const user = await prisma.user.findFirst({
                        where:{
                            phone:credentials.phone
                        }
                    })

                    if(user){
                        const userPassCheck = await bcrypt.compare(credentials.password, user.password);
                        console.log(userPassCheck)
                        if(!userPassCheck){
                            return null
                        }
                        return {
                            id:user.id,
                            fname:user.firstname,
                            lname:user.lastname,
                            email:user.email,
                            phone:user.phone
                        };
                    }

                    try{
                        const user = await prisma.user.create(
                            {
                                data:{
                                    phone:credentials.phone,
                                    password:hashedPass
                                }
                            }
                        );
                        if(user){
                            return {
                                id:user.id,
                                phone:user.phone
                            };
                        }

                        return null;
                    }catch(err:any){
                        console.log("Error occured while Regristering user "+err.message);
                    }

                }catch(err:any){
                    console.log("Error occured while logging in "+err.message);
                }

            }
        })
    ],
    secret:process.env.JWT_PASSWORD || "12345",
    callbacks: {
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        session: ({ session, token }: any) => {
            if (session?.user) {
                session.user.id = token.uid
            }
            return session
        },
    }
}