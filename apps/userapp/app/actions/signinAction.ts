'use server'

import { signIn } from "next-auth/react";

export default async function signin(){
    signIn();
}