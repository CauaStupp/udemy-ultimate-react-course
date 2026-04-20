import "styled-components";
import { ThemeType } from "./lightTheme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
