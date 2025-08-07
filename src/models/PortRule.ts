export type RuleMode = 'blacklist' | 'whitelist';

export interface PortRule {
  id: number;
  value: number;
  mode: RuleMode;
  active: boolean;
}
