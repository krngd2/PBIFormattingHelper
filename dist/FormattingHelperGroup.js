"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattingHelperGroup = void 0;
const powerbi_visuals_api_1 = __importDefault(require("powerbi-visuals-api"));
class FormattingHelperGroup {
    constructor(displayName, objectName, settingsObject, topLevelTogglePropertyName, disabled, collapsible) {
        this.displayName = displayName;
        this.objectName = objectName;
        this.settingsObject = settingsObject;
        this.disabled = disabled;
        this.collapsible = collapsible;
        this.slices = [];
        this.uid = '';
        this.groupName = displayName.split(' ').join('');
        this.uid = `${objectName}Card_${this.groupName}_uid`;
        if (topLevelTogglePropertyName) {
            this.topLevelToggle = {
                uid: `${objectName}Card_${this.groupName}_${topLevelTogglePropertyName}_uid`,
                suppressDisplayName: true,
                disabled,
                control: {
                    type: "ToggleSwitch" /* FormattingComponent.ToggleSwitch */,
                    properties: {
                        descriptor: { objectName, propertyName: topLevelTogglePropertyName },
                        value: settingsObject[topLevelTogglePropertyName],
                    },
                },
            };
        }
    }
    color(displayName, propertyName) {
        this.slices.push({
            uid: `${this.objectName}Card_${this.groupName}Group_${propertyName}_uid`,
            displayName,
            control: {
                type: "ColorPicker" /* FormattingComponent.ColorPicker */,
                properties: {
                    descriptor: { objectName: this.objectName, propertyName },
                    value: { value: this.settingsObject[propertyName] },
                },
            },
        });
        return this;
    }
    number(displayName, propertyName, minValue, maxValue) {
        this.slices.push({
            uid: `$${this.objectName}Card_${this.groupName}Group_${propertyName}_uid`,
            displayName,
            control: {
                type: "NumUpDown" /* FormattingComponent.NumUpDown */,
                properties: {
                    options: {
                        minValue: {
                            value: minValue,
                            type: 0 /* powerbi.visuals.ValidatorType.Min */,
                        },
                        maxValue: {
                            value: maxValue,
                            type: 1 /* powerbi.visuals.ValidatorType.Max */,
                        },
                    },
                    descriptor: {
                        objectName: this.objectName,
                        propertyName,
                    },
                    value: this.settingsObject[propertyName],
                },
            },
        });
    }
    text(displayName, propertyName, placeholder) {
        this.slices.push({
            uid: `${this.objectName}_${this.groupName}Group_${propertyName}_uid`,
            displayName,
            control: {
                type: "TextInput" /* FormattingComponent.TextInput */,
                properties: {
                    placeholder,
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
    dropdown(displayName, propertyName, disabled) {
        this.slices.push({
            uid: `${this.objectName}_${this.groupName}Group_${propertyName}_uid`,
            displayName,
            disabled,
            control: {
                type: "Dropdown" /* FormattingComponent.Dropdown */,
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
    fontControl(displayName, fontProps) {
        let fontControl;
        if (fontProps.stylePropertyName !== undefined) {
            fontControl = Object.assign(Object.assign({}, fontControl), { fontFamily: {
                    descriptor: {
                        objectName: this.objectName,
                        propertyName: fontProps.stylePropertyName,
                    },
                    value: this.settingsObject[fontProps.stylePropertyName],
                } });
        }
        if (fontProps.sizePropertyName !== undefined) {
            fontControl = Object.assign(Object.assign({}, fontControl), { fontSize: {
                    options: {
                        minValue: {
                            value: 8,
                            type: 0 /* powerbi.visuals.ValidatorType.Min */,
                        },
                        maxValue: {
                            value: 60,
                            type: 1 /* powerbi.visuals.ValidatorType.Max */,
                        },
                    },
                    descriptor: {
                        objectName: this.objectName,
                        propertyName: fontProps.sizePropertyName,
                    },
                    value: this.settingsObject[fontProps.sizePropertyName],
                } });
        }
        if (fontProps.boldPropertyName !== undefined) {
            fontControl = Object.assign(Object.assign({}, fontControl), { bold: {
                    descriptor: {
                        objectName: this.objectName,
                        propertyName: fontProps.boldPropertyName,
                    },
                    value: this.settingsObject[fontProps.boldPropertyName],
                } });
        }
        if (fontProps.italicPropertyName !== undefined) {
            fontControl = Object.assign(Object.assign({}, fontControl), { italic: {
                    descriptor: {
                        objectName: this.objectName,
                        propertyName: fontProps.italicPropertyName,
                    },
                    value: this.settingsObject[fontProps.italicPropertyName],
                } });
        }
        if (fontProps.underlinePropertyName !== undefined) {
            fontControl = Object.assign(Object.assign({}, fontControl), { underline: {
                    descriptor: {
                        objectName: this.objectName,
                        propertyName: fontProps.underlinePropertyName,
                    },
                    value: this.settingsObject[fontProps.underlinePropertyName],
                } });
        }
        const obj = {
            uid: `${this.objectName}Card_${this.groupName}Group_${this.groupName}Font_uid`,
            displayName,
            control: {
                type: "FontControl" /* FormattingComponent.FontControl */,
                properties: fontControl,
            },
        };
        this.slices.push(obj);
        return this;
    }
    alignment(displayName, propertyName, mode, disabled) {
        this.slices.push({
            uid: `${this.objectName}_${this.groupName}Group_${propertyName}_uid`,
            displayName,
            disabled,
            control: {
                type: "AlignmentGroup" /* FormattingComponent.AlignmentGroup */,
                properties: {
                    descriptor: {
                        objectName: this.objectName,
                        propertyName,
                    },
                    mode,
                    value: this.settingsObject[propertyName],
                },
            },
        });
        return this;
    }
    marginPadding(displayName, params) {
        this.slices.push({
            uid: `${this.objectName}_${this.groupName}Group_${params === null || params === void 0 ? void 0 : params.leftPropertyName}_uid`,
            displayName,
            control: {
                type: "MarginPadding" /* FormattingComponent.MarginPadding */,
                properties: {
                    left: {
                        descriptor: {
                            objectName: this.objectName,
                            propertyName: params.leftPropertyName,
                        },
                        value: this.settingsObject[params.leftPropertyName],
                    },
                    right: {
                        descriptor: {
                            objectName: this.objectName,
                            propertyName: params.rightPropertyName,
                        },
                        value: this.settingsObject[params.rightPropertyName],
                    },
                    top: {
                        descriptor: {
                            objectName: this.objectName,
                            propertyName: params.topPropertyName,
                        },
                        value: this.settingsObject[params.topPropertyName],
                    },
                    bottom: {
                        descriptor: {
                            objectName: this.objectName,
                            propertyName: params.bottomPropertyName,
                        },
                        value: this.settingsObject[params.bottomPropertyName],
                    },
                },
            },
        });
        return this;
    }
    toggle(displayName, propertyName) {
        this.slices.push({
            uid: `${this.objectName}_${this.groupName}Group_${propertyName}_uid`,
            displayName,
            control: {
                type: "ToggleSwitch" /* FormattingComponent.ToggleSwitch */,
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
exports.FormattingHelperGroup = FormattingHelperGroup;
