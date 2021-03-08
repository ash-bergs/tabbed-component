// Helper to mock DOM elements - handy when an element might not exist 
//* This function provides common DOM props and methods as no-op
// Essentially returns an object with the DOM equivalents of FALSY results. 

const getDomFallback = () => {
    return {
        // PROPS
        children: [], 
        className: '', 
        classList: {
            contains: () => false,
        }, 
        id: '', 
        innerHTML: '', 
        name: '', 
        nextSibling: null, 
        previousSibiling: null, 
        outerHTML: '', 
        tagName: '', 
        textContent: '', 

        // METHOD FUNCTIONALITY 
        appendChild: () => Object.create(null), 
        blur: () => undefined,
        click: () => undefined, 
        cloneNode: () => Object.create(null), 
        closest: () => null, 
        createElement: () => Object.create(null), 
        focus: () => undefined, 
        getAttribute: () => null, 
        hasAttribute: () => false, 
        insertAdjacentElement: () => Object.create(null), 
        insertBefore: () => Object.create(null), 
        querySelector: () => null, 
        querySelectorAll: () => [], 
        removeAttribute: () => undefined, 
        removeChild: () => Object.create(null), 
        replaceChild: () => Object.create(null), 
        setAttribute: () => undefined
    }; 
}; 

export { getDomFallback }; 