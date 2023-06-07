import powerbi from 'powerbi-visuals-api';
import DataView = powerbi.DataView;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import FormattingCard = powerbi.visuals.FormattingCard;
import FormattingComponent = powerbi.visuals.FormattingComponent;
import FormattingGroup = powerbi.visuals.FormattingGroup;
import FormattingSlice = powerbi.visuals.FormattingSlice;
import AlignmentGroupMode = powerbi.visuals.AlignmentGroupMode;
import { FormattingHelperGroup } from './FormattingHelperGroup';

export class FormattingHelperSection<T> implements FormattingCard {
  disabled?: boolean | undefined;
  disabledReason?: string | undefined;
  topLevelToggle?: powerbi.visuals.EnabledSlice | undefined;
  groups: (FormattingGroup | powerbi.visuals.FormattingGroupPlaceholder)[] = [];
  revertToDefaultDescriptors?: powerbi.visuals.FormattingDescriptor[] | undefined;
  analyticsPane?: boolean | undefined;
  description?: string | undefined;
  aliasName?: string | undefined;
  suppressDisplayName?: boolean | undefined;
  warningMessage?: powerbi.IVisualErrorMessage | undefined;
  public uid: string = '';

  constructor(
    public displayName: string,
    private objectName: string,
    private settingsObject: any,
    topLevelTogglePropertyName?: keyof T,
  ) {
    this.uid = `${this.objectName}Section`;
    this.revertToDefaultDescriptors = Object.keys(this.settingsObject).map((propertyName) => ({
      objectName,
      propertyName,
    }));
    if (topLevelTogglePropertyName) {
      this.topLevelToggle = {
        uid: `${this.uid}_${String(topLevelTogglePropertyName)}`,
        suppressDisplayName: true,
        control: {
          type: FormattingComponent.ToggleSwitch,
          properties: {
            descriptor: {
              objectName,
              propertyName: String(topLevelTogglePropertyName),
            },
            value: this.settingsObject[topLevelTogglePropertyName],
          },
        },
      };
    }
  }

  group(
    displayName: string,
    togglePropertyName?: keyof T,
    params?: Partial<FormatCardOptionalParams>,
  ): FormattingHelperGroup<T> {
    const group = new FormattingHelperGroup<T>(
      displayName,
      this.objectName,
      this.settingsObject,
      togglePropertyName,
      params?.disabled,
      params?.collapsible,
    );
    this.groups.push(group)
    return group
  }
}

interface FormatCardOptionalParams {
  collapsible: boolean;
  disabled: boolean;
}
interface FormatSliceOptionalParams {
  descriptor: string;
}
