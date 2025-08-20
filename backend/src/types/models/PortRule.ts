import { RuleMode } from "../../utils/constants";

export interface PortRule {
  id: number;
  value: number;
  mode: RuleMode;
  active: boolean;
}
