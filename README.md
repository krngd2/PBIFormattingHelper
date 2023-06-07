
# PBIFormattingHelper
Helper library to work on the new formatting panel for PowerBI custom visuals. Brings familiar D3js style coding with strict type checking. 
Compatible only with version 5.1.0 and above. 

### Install

    npm i pbiviz-formatting-helper

### Pre-requisites
Make sure you are on pbiviz version 5.1.0
To get the new formatting panel you need to declare `getFormattingModel` function in your `visual.ts` file's `IVisual` implementing class. 

    export class Visual implements IVisual {
	    constructor(options: any, settings: any, config: IConfig) {}
	    
	    public update(options: VisualUpdateOptions) {}
	    
	    public getFormattingModel(): FormattingModel {
			const  cards:  FormattingCard[]  =  [];
			
			// write our code here...
			 
			return cards
		}
	}

Create all your settings in your `settings.ts` file with each section declared in own class declaration.
Example:

    export  class  VisualSettings  extends  DataViewObjectsParser  {
		public title: TitleSettings = new TitleSettings()
	}

    public class TitleSettings {
	    // your properties here
	    show: boolean = false;
	    titleText: string = 'Main Title';
	    // etc...
    }

Decalre them in  `capabilities.json` as well 
	

    {
		 "objects": {
			"title": {
				"displayName":  "Title",
				"properties":  {
					"show": {
						"type":{
							"bool": true
						}
					},
					"titleText": {
						"type": {
							"text":  true
						}
					}			
				} 
			 }
		}
	}

### Usage
##### Import

    import  { FormattingHelperSection }  from  "pbiviz-formatting-helper/dist/FormattingHelperSection";

##### Create a section

    const title = new FormattingHelperSection<TitleSettings>("Title",  "title", this.settings.title)
   To get toggle for section pass its property as 4th parameter

    const title = new FormattingHelperSection<TitleSettings>("Title",  "title", this.settings.title, 'show')

   
##### Create a Group
	  title.group("Fonts")
To get toggle for group pass its property as 2nd parameter

    title.group('Fonts', 'show')

#### Properties

**color** :

    .color(displayName: string, propertyName: keyof T)

**number**

    .number(displayName: string, propertyName: keyof T, minValue: number, maxValue: number)

**text**

    .text(displayName: string, propertyName: keyof T, placeholder: string)

**dropdown**

    .dropdown(displayName: string, propertyName: keyof T, disabled?: boolean)

**fontControl**

    .fontControl(displayName: string, fontProps: FormatSliceFontParams)

**alignment**

    .alignment(displayName: string, propertyName: keyof T, mode: AlignmentGroupMode, disabled?: boolean)

**marginPadding**

    .marginPadding(displayName: string, params: FormatSliceMarginPaddingParams<T>)

**toggle**

    .toggle(displayName: string, propertyName: string)



### Full Example: 

    public getFormattingModel(): FormattingModel {
			const  cards:  FormattingCard[]  =  [];
			
			const legends = new FormattingHelperSection<LegendsSettings>('Legend', 'legends', this.vSettings.legends, 'show')
			
            legends.group('')
                .dropdown('Position', 'position')
                .number('Max Length', 'maxLength', 0, 200)
                .toggle('Show Tooltip', 'tooltip')
                .number('Bullet Pointer Size', 'bulletSize', 0, 50)
    
            legends.group('Font')
                .fontControl('Font', {
                    stylePropertyName: 'font',
                    sizePropertyName: 'size',
                    boldPropertyName: 'fontBold'
                })
                .color('Color', 'textColor')
                
            legends.group('Title', 'showTitle')
                .text('Text', 'titleText', 'type here...')
                .dropdown('Position', 'titlePosition')
                .fontControl('Font', {
                    stylePropertyName: 'titleFont',
                    sizePropertyName: 'titleSize',
                    boldPropertyName: 'titleFontBold'
                })
                .color('Color', 'titleColor')
                
            cards.push(legends)
            
			return cards
		}
    
