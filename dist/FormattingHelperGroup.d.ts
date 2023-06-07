import powerbi from 'powerbi-visuals-api';
import FormattingGroup = powerbi.visuals.FormattingGroup;
import FormattingSlice = powerbi.visuals.FormattingSlice;
import AlignmentGroupMode = powerbi.visuals.AlignmentGroupMode;
export declare class FormattingHelperGroup<T> implements FormattingGroup {
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
    constructor(displayName: string, objectName: string, settingsObject: any, topLevelTogglePropertyName?: keyof T, disabled?: boolean | undefined, collapsible?: boolean | undefined);
    color(displayName: string, propertyName: keyof T): this;
    number(displayName: string, propertyName: keyof T, minValue: number, maxValue: number): this;
    text(displayName: string, propertyName: keyof T, placeholder: string): this;
    dropdown(displayName: string, propertyName: keyof T, disabled?: boolean): this;
    fontControl(displayName: string, fontProps: FormatSliceFontParams): this;
    alignment(displayName: string, propertyName: keyof T, mode: AlignmentGroupMode, disabled?: boolean): this;
    marginPadding(displayName: string, params: FormatSliceMarginPaddingParams<T>): this;
    toggle(displayName: string, propertyName: string): this;
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
export {};
