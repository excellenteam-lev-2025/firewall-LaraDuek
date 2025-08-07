type RuleMode = 'blacklist' | 'whitelist';
export declare function addRulesToTable<T extends string | number>(tableName: string, values: T[], mode: RuleMode): Promise<{
    id: number;
    value: T;
    mode: RuleMode;
    active: boolean;
}[]>;
export declare function deleteRulesFromTable<T extends string | number>(tableName: string, values: T[], mode: RuleMode): Promise<T[]>;
export {};
//# sourceMappingURL=ruleOperations.d.ts.map