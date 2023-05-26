"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattingHelperSection = void 0;
const FormattingHelperGroup_1 = require("./FormattingHelperGroup");
class FormattingHelperSection {
    constructor(objectName, displayName, settingsObject, topLevelTogglePropertyName) {
        this.objectName = objectName;
        this.displayName = displayName;
        this.settingsObject = settingsObject;
        this.groups = [];
        this.uid = '';
        this.uid = `${this.objectName}Section`;
        this.revertToDefaultDescriptors = Object.keys(this.settingsObject).map((propertyName) => ({
            objectName,
            propertyName,
        }));
        if (topLevelTogglePropertyName) {
            this.topLevelToggle = {
                uid: `${this.uid}_${topLevelTogglePropertyName}`,
                suppressDisplayName: true,
                control: {
                    type: "ToggleSwitch" /* FormattingComponent.ToggleSwitch */,
                    properties: {
                        descriptor: {
                            objectName,
                            propertyName: topLevelTogglePropertyName,
                        },
                        value: this.settingsObject[topLevelTogglePropertyName],
                    },
                },
            };
        }
    }
    group(displayName, togglePropertyName, params) {
        return new FormattingHelperGroup_1.FormattingHelperGroup(displayName, this.objectName, this.settingsObject, togglePropertyName, params === null || params === void 0 ? void 0 : params.disabled, params === null || params === void 0 ? void 0 : params.collapsible);
    }
}
exports.FormattingHelperSection = FormattingHelperSection;
