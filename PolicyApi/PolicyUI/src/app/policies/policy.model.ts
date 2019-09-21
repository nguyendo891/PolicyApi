import { SubPolicy } from "../shared/sub-policy.model";

export class Policy{
    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;
    public subPolicies: SubPolicy[];

  constructor(id: number, name: string, desc: string, imagePath: string, subPolicies: SubPolicy[]) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.subPolicies = subPolicies;
    }
}
