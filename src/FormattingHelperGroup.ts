import powerbi from 'powerbi-visuals-api';
import DataView = powerbi.DataView;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import FormattingCard = powerbi.visuals.FormattingCard;
import FormattingComponent = powerbi.visuals.FormattingComponent;
import FormattingGroup = powerbi.visuals.FormattingGroup;
import FormattingSlice = powerbi.visuals.FormattingSlice;
import AlignmentGroupMode = powerbi.visuals.AlignmentGroupMode;

export class FormattingHelperGroup<T> implements FormattingGroup {
  disabledReason?: string | undefined;
  topLevelToggle?: powerbi.visuals.EnabledSlice | undefined;
  slices: (FormattingSlice | powerbi.visuals.FormattingSlicePlaceholder)[] = [];
  container?: powerbi.visuals.FormattingContainer | undefined;
  containerDisabled?: boolean | undefined;
  sliceWithContainer?: boolean | undefined;
  delaySaveSlices?: boolean | undefined;
  inheritDisabled?: boolean | undefined;
  description?: string | undefined;
  aliasName?: string | undefined;
  suppressDisplayName?: boolean | undefined;
  public uid: string = '';
  public groupName;
  constructor(
    public displayName: string,
    public objectName: string,
    public settingsObject: any,
    topLevelTogglePropertyName?: keyof T,
    public disabled?: boolean,
    public collapsible?: boolean,
  ) {
    this.groupName = displayName.split(' ').join('');
    this.uid = `${objectName}Card_${this.groupName}_uid`;
    if (topLevelTogglePropertyName) {
      this.topLevelToggle = {
        uid: `${objectName}Card_${this.groupName}_${String(topLevelTogglePropertyName)}_uid`,
        suppressDisplayName: true,
        disabled,
        control: {
          type: FormattingComponent.ToggleSwitch,
          properties: {
            descriptor: { objectName, propertyName: String(topLevelTogglePropertyName) },
            value: settingsObject[topLevelTogglePropertyName],
          },
        },
      };
    }
  }

  color(displayName: string, propertyName: keyof T) {
    this.slices.push({
      uid: `${this.objectName}Card_${this.groupName}Group_${String(propertyName)}_uid`,
      displayName,
      control: {
        type: FormattingComponent.ColorPicker,
        properties: {
          descriptor: { objectName: this.objectName, propertyName: String(propertyName) },
          value: { value: this.settingsObject[propertyName] },
        },
      },
    });
    return this;
  }

  number(displayName: string, propertyName: keyof T, minValue: number, maxValue: number) {
    this.slices.push({
      uid: `$${this.objectName}Card_${this.groupName}Group_${String(propertyName)}_uid`,
      displayName,
      control: {
        type: FormattingComponent.NumUpDown,
        properties: {
          options: {
            minValue: {
              value: minValue,
              type: powerbi.visuals.ValidatorType.Min,
            },
            maxValue: {
              value: maxValue,
              type: powerbi.visuals.ValidatorType.Max,
            },
          },
          descriptor: {
            objectName: this.objectName,
            propertyName: String(propertyName),
          },
          value: this.settingsObject[propertyName],
        },
      },
    });
    return this
  }

  text(displayName: string, propertyName: keyof T, placeholder: string) {
    this.slices.push({
      uid: `${this.objectName}_${this.groupName}Group_${String(propertyName)}_uid`,
      displayName,
      control: {
        type: FormattingComponent.TextInput,
        properties: {
          placeholder,
          descriptor: {
            objectName: this.objectName,
            propertyName: String(propertyName),
          },
          value: this.settingsObject[propertyName],
        },
      },
    });
    return this;
  }

  dropdown(displayName: string, propertyName: keyof T, disabled?: boolean) {
    this.slices.push({
      uid: `${this.objectName}_${this.groupName}Group_${String(propertyName)}_uid`,
      displayName,
      disabled,
      control: {
        type: FormattingComponent.Dropdown,
        properties: {
          descriptor: {
            objectName: this.objectName,
            propertyName: String(propertyName),
          },
          value: this.settingsObject[propertyName],
        },
      },
    });
    return this;
  }

  fontControl(displayName: string, fontProps: FormatSliceFontParams) {
    let fontControl!: powerbi.visuals.FontControl;
    if (fontProps.stylePropertyName !== undefined) {
      fontControl = {
        ...fontControl,
        fontFamily: {
          descriptor: {
            objectName: this.objectName,
            propertyName: fontProps.stylePropertyName,
          },
          value: this.settingsObject[fontProps.stylePropertyName],
        },
      };
    }

    if (fontProps.sizePropertyName !== undefined) {
      fontControl = {
        ...fontControl,
        fontSize: {
          options: {
            minValue: {
              value: 8,
              type: powerbi.visuals.ValidatorType.Min,
            },
            maxValue: {
              value: 60,
              type: powerbi.visuals.ValidatorType.Max,
            },
          },
          descriptor: {
            objectName: this.objectName,
            propertyName: fontProps.sizePropertyName,
          },
          value: this.settingsObject[fontProps.sizePropertyName],
        },
      };
    }

    if (fontProps.boldPropertyName !== undefined) {
      fontControl = {
        ...fontControl,
        bold: {
          descriptor: {
            objectName: this.objectName,
            propertyName: fontProps.boldPropertyName,
          },
          value: this.settingsObject[fontProps.boldPropertyName],
        },
      };
    }

    if (fontProps.italicPropertyName !== undefined) {
      fontControl = {
        ...fontControl,
        italic: {
          descriptor: {
            objectName: this.objectName,
            propertyName: fontProps.italicPropertyName,
          },
          value: this.settingsObject[fontProps.italicPropertyName],
        },
      };
    }

    if (fontProps.underlinePropertyName !== undefined) {
      fontControl = {
        ...fontControl,
        underline: {
          descriptor: {
            objectName: this.objectName,
            propertyName: fontProps.underlinePropertyName,
          },
          value: this.settingsObject[fontProps.underlinePropertyName],
        },
      };
    }

    const obj: FormattingSlice = {
      uid: `${this.objectName}Card_${this.groupName}Group_${this.groupName}Font_uid`,
      displayName,
      control: {
        type: FormattingComponent.FontControl,
        properties: fontControl,
      },
    };
    this.slices.push(obj);
    return this;
  }

  alignment(displayName: string, propertyName: keyof T, mode: AlignmentGroupMode, disabled?: boolean) {
    this.slices.push({
      uid: `${this.objectName}_${this.groupName}Group_${String(propertyName)}_uid`,
      displayName,
      disabled,
      control: {
        type: FormattingComponent.AlignmentGroup,
        properties: {
          descriptor: {
            objectName: this.objectName,
            propertyName: String(propertyName),
          },
          mode,
          value: this.settingsObject[propertyName],
        },
      },
    });
    return this;
  }

  marginPadding(displayName: string, params: FormatSliceMarginPaddingParams<T>) {
    this.slices.push({
      uid: `${this.objectName}_${this.groupName}Group_${String(params?.leftPropertyName)}_uid`,
      displayName,
      control: {
        type: FormattingComponent.MarginPadding,
        properties: {
          left: {
            descriptor: {
              objectName: this.objectName,
              propertyName: String(params.leftPropertyName),
            },
            value: this.settingsObject[params.leftPropertyName],
          },
          right: {
            descriptor: {
              objectName: this.objectName,
              propertyName: String(params.rightPropertyName),
            },
            value: this.settingsObject[params.rightPropertyName],
          },
          top: {
            descriptor: {
              objectName: this.objectName,
              propertyName: String(params.topPropertyName),
            },
            value: this.settingsObject[params.topPropertyName],
          },
          bottom: {
            descriptor: {
              objectName: this.objectName,
              propertyName: String(params.bottomPropertyName),
            },
            value: this.settingsObject[params.bottomPropertyName],
          },
        },
      },
    });
    return this;
  }

  toggle(displayName: string, propertyName: string) {
    this.slices.push({
      uid: `${this.objectName}_${this.groupName}Group_${propertyName}_uid`,
      displayName,
      control: {
        type: FormattingComponent.ToggleSwitch,
        properties: {
          descriptor: {
            objectName: this.objectName,
            propertyName,
          },
          value: this.settingsObject[propertyName],
        },
      },
    });
    return this;
  }
}

interface FormatSliceFontParams {
  stylePropertyName?: string;
  sizePropertyName?: string;
  boldPropertyName?: string;
  italicPropertyName?: string;
  underlinePropertyName?: string;
}
interface FormatSliceMarginPaddingParams<T> {
  leftPropertyName: keyof T;
  rightPropertyName: keyof T;
  topPropertyName: keyof T;
  bottomPropertyName: keyof T;
}
