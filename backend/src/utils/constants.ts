export const RULE_MODES = ['blacklist', 'whitelist'] as const;

export type RuleMode = typeof RULE_MODES[number];

export const isRuleMode = (v: string): v is RuleMode =>
  RULE_MODES.includes(v as RuleMode);
