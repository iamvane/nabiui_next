import Warning from "@material-ui/icons/WarningRounded";

import { MissingFieldsComponent } from "./constants";
interface Props {
  children?: React.ReactNode;
}
export const MissingFields = (props: Props) => (
  <div className="nabi-display-flex nabi-flex-column nabi-background-yellow nabi-border-radius nabi-padding-small nabi-margin-bottom-small nabi-full-width">
    <div className="nabi-display-flex nabi-flex-align-flex-end nabi-margin-bottom-xsmall">
      <Warning className="nabi-color-white" />
      <span className="nabi-text-mediumbold nabi-margin-left-xsmall nabi-color-white nabi-text-uppercase">{MissingFieldsComponent.ActionRequired}</span>
    </div>
    {props.children}
  </div>
)
