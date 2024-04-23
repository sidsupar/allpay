import { v4 as uuidv4 } from 'uuid';

export default function generateTxnToken(){
    const txnToken = uuidv4();
    console.log(`generated new token for transaction ${txnToken.toString()}`);
    return txnToken.toString();
}