import { Request, Response } from 'express';
type RuleMode = 'blacklist' | 'whitelist';
type RuleOperationFn<T> = (values: T[], mode: RuleMode) => Promise<any[]>;
export declare function createAddHandler<T>(type: 'ip' | 'url' | 'port', addFn: RuleOperationFn<T>): (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare function createDeleteHandler<T>(type: 'ip' | 'url' | 'port', deleteFn: RuleOperationFn<T>): (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=ruleHandlers.d.ts.map