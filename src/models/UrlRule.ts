export type RuleMode = 'blacklist' | 'whitelist';

export interface UrlRule {
  id: number;
  value: string;
  mode: RuleMode;
  active: boolean;
}
