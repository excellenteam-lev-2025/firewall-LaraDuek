import { RuleMode } from "../../utils/constants";
export interface IpRule {
  id: number;
  value: string;
  mode: RuleMode;
  active: boolean;
}

