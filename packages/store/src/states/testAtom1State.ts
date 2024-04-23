import { useRecoilState } from "recoil";
import { testAtom } from "../atom/testAtom";

export function getTestState(){
    const [testatom1, settestatom1] = useRecoilState(testAtom);
    return [testatom1, settestatom1];
}

