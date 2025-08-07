import { RuleMode } from '../models/UrlRule';
export declare function addUrlRules(values: string[], mode: RuleMode): Promise<{
    id: number;
    value: string;
    mode: "blacklist" | "whitelist";
    active: boolean;
}[]>;
export declare function deleteUrlRules(values: string[], mode: RuleMode): Promise<string[]>;
//# sourceMappingURL=url.service.d.ts.map