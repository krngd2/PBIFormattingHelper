import powerbi from 'powerbi-visuals-api';
import FormattingCard = powerbi.visuals.FormattingCard;
import FormattingGroup = powerbi.visuals.FormattingGroup;
import { FormattingHelperGroup } from './FormattingHelperGroup';
export declare class FormattingHelperSection implements FormattingCard {
    private objectName;
    displayName: string;
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
    constructor(objectName: string, displayName: string, settingsObject: any, topLevelTogglePropertyName?: string);
    group(displayName: string, togglePropertyName?: string, params?: Partial<FormatCardOptionalParams>): FormattingHelperGroup;
}
interface FormatCardOptionalParams {
    collapsible: boolean;
    disabled: boolean;
}
export {};
