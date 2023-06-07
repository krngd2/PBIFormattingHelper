"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattingHelperSection = void 0;
const FormattingHelperGroup_1 = require("./FormattingHelperGroup");
class FormattingHelperSection {
    constructor(displayName, objectName, settingsObject, topLevelTogglePropertyName) {
        this.displayName = displayName;
        this.objectName = objectName;
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
                uid: `${this.uid}_${String(topLevelTogglePropertyName)}`,
                suppressDisplayName: true,
                control: {
                    type: "ToggleSwitch" /* FormattingComponent.ToggleSwitch */,
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
    group(displayName, togglePropertyName, params) {
        const group = new FormattingHelperGroup_1.FormattingHelperGroup(displayName, this.objectName, this.settingsObject, togglePropertyName, params === null || params === void 0 ? void 0 : params.disabled, params === null || params === void 0 ? void 0 : params.collapsible);
        this.groups.push(group);
        return group;
    }
}
exports.FormattingHelperSection = FormattingHelperSection;
