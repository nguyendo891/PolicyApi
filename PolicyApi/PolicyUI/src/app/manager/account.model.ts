import { SubPolicy } from "../shared/sub-policy.model";
import { Policy } from "../policies/policy.model";

export class Account{
    public username: string;
    public role: string;
    public policies: Policy[];
}