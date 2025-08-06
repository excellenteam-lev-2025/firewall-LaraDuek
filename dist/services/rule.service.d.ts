export declare function getAllRules(): Promise<{
    ip: any[];
    url: any[];
    port: any[];
}>;
type ToggleParams = {
    ids: number[];
    mode: 'blacklist' | 'whitelist';
    active: boolean;
};
export declare function toggleMultipleRules(data: {
    ips?: ToggleParams;
    urls?: ToggleParams;
    ports?: ToggleParams;
}): Promise<any[]>;
export {};
//# sourceMappingURL=rule.service.d.ts.map