import powerbi from 'powerbi-visuals-api';
import FormattingCard = powerbi.visuals.FormattingCard;
import FormattingGroup = powerbi.visuals.FormattingGroup;
import { FormattingHelperGroup } from './FormattingHelperGroup';
export declare class FormattingHelperSection<T> implements FormattingCard {
    displayName: string;
    private objectName;
    private settingsObject;
    disabled?: boolean | undefined;
    disabledReason?: string | undefined;
    topLevelToggle?: powerbi.visuals.EnabledSlice | undefined;
    groups: (FormattingGroup | powerbi.visuals.FormattingGroupPlaceholder)[];
    revertToDefaultDescriptors?: powerbi.visuals.FormattingDescriptor[] | undefined;
    analyticsPane?: boolean | undefined;
    description?: string | undefined;
    aliasName?: string | undefined;
    suppressDisplayName?: boolean | undefined;
    warningMessage?: powerbi.IVisualErrorMessage | undefined;
    uid: string;
    constructor(displayName: string, objectName: string, settingsObject: any, topLevelTogglePropertyName?: keyof T);
    group(displayName: string, togglePropertyName?: keyof T, params?: Partial<FormatCardOptionalParams>): FormattingHelperGroup<T>;
}
interface FormatCardOptionalParams {
    collapsible: boolean;
    disabled: boolean;
}
export {};
