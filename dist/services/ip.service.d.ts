import { RuleMode } from '../models/IpRule';
export declare function addIpRules(values: string[], mode: RuleMode): Promise<{
    id: number;
    value: string;
    mode: "blacklist" | "whitelist";
    active: boolean;
}[]>;
export declare function deleteIpRules(values: string[], mode: RuleMode): Promise<string[]>;
//# sourceMappingURL=ip.service.d.ts.map