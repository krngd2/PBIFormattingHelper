import powerbi from 'powerbi-visuals-api';
import FormattingGroup = powerbi.visuals.FormattingGroup;
import FormattingSlice = powerbi.visuals.FormattingSlice;
import AlignmentGroupMode = powerbi.visuals.AlignmentGroupMode;
export declare class FormattingHelperGroup implements FormattingGroup {
    displayName: string;
    objectName: string;
    settingsObject: any;
    disabled?: boolean | undefined;
    collapsible?: boolean | undefined;
    disabledReason?: string | undefined;
    topLevelToggle?: powerbi.visuals.EnabledSlice | undefined;
    slices: (FormattingSlice | powerbi.visuals.FormattingSlicePlaceholder)[];
    container?: powerbi.visuals.FormattingContainer | undefined;
    containerDisabled?: boolean | undefined;
    sliceWithContainer?: boolean | undefined;
    delaySaveSlices?: boolean | undefined;
    inheritDisabled?: boolean | undefined;
    description?: string | undefined;
    aliasName?: string | undefined;
    suppressDisplayName?: boolean | undefined;
    uid: string;
    groupName: string;
    constructor(displayName: string, objectName: string, settingsObject: any, topLevelTogglePropertyName?: string, disabled?: boolean | undefined, collapsible?: boolean | undefined);
    color(displayName: string, propertyName: string): this;
    number(displayName: string, propertyName: string, minValue: number, maxValue: number): void;
    text(displayName: string, propertyName: string, placeholder: string): this;
    dropdown(displayName: string, propertyName: string, disabled?: boolean): this;
    fontControl(displayName: string, fontProps: FormatSliceFontParams): this;
    alignment(displayName: string, propertyName: string, mode: AlignmentGroupMode, disabled?: boolean): this;
    marginPadding(displayName: string, params: FormatSliceMarginPaddingParams): this;
    toggle(displayName: string, propertyName: string): this;
}
interface FormatSliceFontParams {
    stylePropertyName?: string;
    sizePropertyName?: string;
    boldPropertyName?: string;
    italicPropertyName?: string;
    underlinePropertyName?: string;
}
interface FormatSliceMarginPaddingParams {
    leftPropertyName: string;
    rightPropertyName: string;
    topPropertyName: string;
    bottomPropertyName: string;
}
export {};
