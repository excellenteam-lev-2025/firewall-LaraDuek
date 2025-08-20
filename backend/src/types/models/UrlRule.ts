import { RuleMode } from "../../utils/constants";

export interface UrlRule {
  id: number;
  value: string;
  mode: RuleMode;
  active: boolean;
}
