import { User } from "./user";
export declare enum testType {
    SLS = "SLS",
    GAD = "GAD",
    CES = "CES",
    BADS = "BADS",
    EPDS = "EPDS"
}
export interface IResponse {
    question: string;
    response: number;
}
interface IResult {
    number: number;
    interpretation: string;
}
export declare class TestResult {
    id: string;
    testType: testType;
    results: IResult;
    response: IResponse[];
    user: User;
}
export {};
