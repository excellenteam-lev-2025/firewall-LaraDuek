import { RuleMode } from '../models/PortRule';
export declare function addPortRules(values: number[], mode: RuleMode): Promise<{
    id: number;
    value: number;
    mode: "blacklist" | "whitelist";
    active: boolean;
}[]>;
export declare function deletePortRules(values: number[], mode: RuleMode): Promise<number[]>;
//# sourceMappingURL=port.service.d.ts.map