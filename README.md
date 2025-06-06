# BehaviorS.js

**BehaviorS.js** is a lightweight, high-performance library for unobtrusive JavaScript event handling, designed as an alternative to `Behaviour.js`, `event:Selectors`, and Low Pro libraries. Born in 2006, it focuses on efficient, declarative event delegation and behavioral rules for DOM elements, with cross-browser compatibility—even for legacy browsers like IE6.

---

## Features

- **Declarative Event Rules**: Attach event handlers to elements using selectors (`*`, `.class`, `#id`, `NODE`) and event types (`click`, `blur`, `focus`, etc.).
- **Event Delegation**: Efficiently handles events by traversing up the DOM tree, minimizing attached listeners.
- **Customizable Depth**: Control how deep to search for matching rules in the DOM hierarchy (`digDepth`, `alwaysDigToDepth`).
- **Flexible Rule Definitions**: Define rules as a map of selectors/events to handler functions.
- **Cross-Browser Support**: Handles event models for both modern and legacy browsers (e.g., IE’s `attachEvent`).
- **Auto Event Extraction**: Optionally autogenerates capture event lists from rule definitions.
- **Extensible and Performant**: Designed for minimal overhead and maximum flexibility.

---

## Quick Start

1. **Include the Script**  
   ```html
   <!-- For development: -->
   <script src="BehaviorS.js"></script>
   <!-- For production (minified): -->
   <script src="BehaviorS-c.js"></script>
   ```
2. **Define Your Rules**  
   ```javascript
   BehaviorS.rules = {
     '*:DOMContentLoaded': function (nd, e) {
       alert('DOM is ready');
     },
     '.highlight:click': function (nd, e) {
       nd.style.background = 'yellow';
     }
   };
   ```
3. **Configure (optional)**
   ```javascript
   BehaviorS.digDepth = 3; // search up to 3 levels up the DOM
   BehaviorS.alwaysDigToDepth = true; // always search up to digDepth, even if a match is found
   ```
4. **Start the Engine**
   ```javascript
   BehaviorS.start();
   ```

---

## Production Use

For performance and smaller payloads in production, use the compressed version:
```html
<script src="BehaviorS-c.js"></script>
```
- `BehaviorS-c.js` is functionally identical to `BehaviorS.js` but minified for faster load times.

---

## Usage Example

See [`demo.html`](demo.html) and [`demo.js`](demo.js):

```html
<form>
  <input type="text" name="t1" /><br />
  <input type="submit" value="Submit" />
</form>
<div id="logger"></div>
```

```javascript
BehaviorS.rules = {
  '*:**': function (nd, e) { /* fires on any event, any node */ },
  'FORM:submit': function (nd, e) {
    stopEvent(e);
    alert('Form submitted!');
  },
  '*:blur': function (nd, e) {
    alert(nd.nodeName + ' lost focus');
  }
};

BehaviorS.captureEvents = { 'submit': 1, 'blur': 1 };
BehaviorS.start();
```

---

## Core Concepts

- **Rules Map**:  
  Keys are of the form `selector:event` where selector can be `*`, `.class`, `#id`, or a node name (e.g., `FORM`).  
  Values are handler functions:  
  `function (node, event) { /* ... */ }`

- **Event Handling Flow**:
  - When an event occurs, BehaviorS searches for matching rules:
    - Generic (`*:**`, `*:*`)
    - Node type (`BODY:loaded`, `FORM:submit`)
    - Class (`.myClass:click`)
    - ID (`#myId:mouseover`)
  - Traverses up the DOM up to `digDepth` levels.
  - Invokes handler(s) as soon as a match is found, or continues if `alwaysDigToDepth` is set.

- **Cross-Browser DOMContentLoaded**:
  - Uses browser-specific hacks for early DOM ready detection (including old IE, KHTML/WebKit).

---

## Performance Notes

- Only a minimal number of actual event listeners are attached; logic is delegated via a central handler.
- Avoids memory leaks and redundant event bindings common in older libraries.
- Designed for rapid event lookup and dispatch, particularly in large/complex documents.

---

## Advanced

- **Multiple Rule Definitions**:  
  If `handleMultipleDefinitions` is true, rules can be assigned to comma-separated selectors/events.
- **Auto-Extract Events**:  
  If `autoExtractCaptureEvents` is true, event types are inferred from rule keys.

---

## File Overview

- `BehaviorS.js` - The core event delegation engine (uncompressed, readable).
- `BehaviorS-c.js` - **Compressed/minified version** for production use.
- `demo.html` - Demo HTML page with form and logger.
- `demo.js` - Example rules and event handling logic.

---

## Author & Credits

- Original concept and implementation: [R. Rajesh Jeba Anbiah](http://rajeshanbiah.blogspot.com/2006/09/behaviorsjs-alternative-to-behaviourjs.html)
- Inspired by JLof’s Behaviour.js hack and the need for performant, legacy-compatible event handling.

---

## See Also

- [Behaviour.js](http://bennolan.com/behaviour/)
- [Low Pro](https://github.com/lowpro/low-pro-for-jquery)
- [event:Selectors](https://web.archive.org/web/20061017041344/http://www.2xlibre.net/event-selectors/)
