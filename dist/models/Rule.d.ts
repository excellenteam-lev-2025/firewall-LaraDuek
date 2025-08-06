export type RuleType = 'ip' | 'url' | 'port';
export type RuleMode = 'blacklist' | 'whitelist';
export interface Rule {
    id: number;
    type: RuleType;
    mode: RuleMode;
    value: string;
    active: boolean;
}
//# sourceMappingURL=Rule.d.ts.map