# maxHeightCheck()
## Implementation
### HTML implementation
`data-max-height` attribute needs to be added to an HTML element that we want the text restriction to apply to.
#### Available modes
##### Number
- `data-max-height=“50”`
- 50px will be set as limit-height
##### css
- `data-max-height=“css”`
- max-height property set in css will be set as limit-height
- this is very useful with templates that have multiple variations and can be combined with css media queries.
##### dynamic
- `data-max-height=“dynamic”`
- parent div’s height will be used to set limit-height of an element
- if our target element has sibling elements, we need to give them ‘js-subtrahend’ class, 
so their heights will be subtracted from parent’s height
---
#### Additional options
##### maxHeightUnit
- `data-max-height-unit=“rem”`
- if user wants to set max-height is some other unit rather than px, just add additional `data-max-height-unit`
attribute and pass ‘rem’ or ‘pt’ as value.
