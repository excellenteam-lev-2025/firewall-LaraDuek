export type RuleMode = 'blacklist' | 'whitelist';

export interface IpRule {
  id: number;
  value: string;
  mode: RuleMode;
  active: boolean;
}
