//* This file is doing most of the heavy work 💪 

// import helper functions
import { wrap } from 'node:module';
import { getDomFallback } from './resources/getDomFallback'; 
import { unique } from './resources/uniqe'; 

// CONSTANTS 
// Boolean str
const TRUE = 'true'; 
const FALSE = 'false'; 
// ARIA str labels 
const ARIA_CONTROLS = 'aria-controls'; 
const ARIA_LABELLEDBY = 'aria-labelledby'; 
const ARIA_HIDDEN = 'aria-hidden'; 
const ARIA_MULTISELECTABLE = 'aria-multiselectable';
const ARIA_ORIENTATION = 'aria-orientation';
const ARIA_SELECTED = 'aria-selected';
// ATTRIBUTE str
const ID = 'id'; 
const DATA_INDEX = 'data-index'; 
// ? I might now need these orientation declarations...
const HORIZONTAL = 'horizontal'; 
const VERTICAL = 'vertical'; 
const ROLE = 'role'; 
const TABINDEX = 'tabindex'; 
const TABLIST = 'tablist'; 
// EVENT str 
const CLICK = 'click'; 
const KEYDOWN = 'keydown'; 
const AFTER_BEGIN = 'afterbegin';
const ARROW_LEFT = 'arrowleft';
const ARROW_RIGHT = 'arrowright';
// KEY event str
const ENTER = 'enter'; 
const FUNCTION = 'function'; 
const SPACE = ' '; 
// ? TAG str
const I = 'i'; 
const LI = 'li'; 

// SELECTOR strs
const TAB = 'tab'; 
const TAB_SELECTOR = `[${ROLE}=${TAB}]`;

const TABPANEL = 'tabpanel'; 
const TABPANEL_SELECTOR = `[${ROLE}=${TABPANEL}]`; 

const TABLIST_CLASS_SELECTOR = '.tabs'; 
const TAB_CLASS_SELECTOR = '.tabs__item'; 
const TABPANEL_CLASS_SELECTOR = '.tabs__panel'; 

// * Get Tab ID 
// passes default values to avoid empty / falsy / errors 
const getTabId = (id = '', index = 0) => {
    return `${TAB}_${id}_${index}`
}

//* Get Panel ID 
const getPanelId = (id = '', index = 0) => {
    return `${TABPANEL}_${id}_${index}`
}

//* GLOBAL click handler (for all tabs)
const globalClick = (event = {}) => {
    // get the target 
    // ? Log this... what's going on here? 
    const {target = getDomFallback() } = event; 

    // get the key 
    let { key = '' } = event; 
    key = key.toLowerCase(); 

    // key (keyboard) events 
    const isArrowLeft = key === ARROW_LEFT; 
    const isArrowRight = key === ARROW_RIGHT; 
    const isArrowKey = isArrowLeft || isArrowRight; 
    const isTriggerKey = key === ENTER || key === SPACE; 

    // grab the PARENT NODE  
    const { parentNode = getDomFallback(), tagName = ''} = target; 

    // ! Set this later 
    let wrapper = getDomFallback(); 

    // testing because the method does not exist on 'document.documentElement' 
    // this whole section is essentially TRUE or FALSE testing various things about the current element, user event, etc. 
    if (typeof target.closest === FUNCTION) {
        // get wrapper - if it does not ecist, getDomFallback
        wrapper = target.closest(TABLIST_CLASS_SELECTOR) || getDomFallback(); 
    }

    // is the element multiselectable? 
    const isMulti = wrapper.getAttribute(ARIA_MULTISELECTABLE) === TRUE; 

    // is the target valid? 
    const isValidTarget = target.getAttribute(ROLE) === TAB && parentNode.getAttribute(ROLE) === TABLIST; 

    // is the target an LI element? 
    const isListItem = isValidTarget && tagName.toLowerCase() === LI; 

    // valid event and event type checking
    const isArrowEvent = isListItem && isArrowKey; 
    const isTriggerEvent = isValidTarget && (!key || isTriggerKey); 
    const isValidEvent = isArrowEvent || isTriggerEvent; 


    // if after all that checking we do have a valid event occuring, prevent default (refresh?)
    if (isValidEvent) {
        event.preventDefault(); 
    }

    // Arrow event? 
    if (isArrowEvent) {
        // get the index of the element involved in the event 
        let index = target.getAttribute(DATA_INDEX); 
        index = parseFloat(index); 

        // get list 
        const list = wrapper.querySelectorAll(TAB_SELECTOR); 

        // ! set later 
        let newIndex = null; 
        let nextItem = null; 

        // What kind of arrow event is it? 
        // * TYPE of event checking
        if (isArrowLeft) {
            newIndex = index - 1; 
            nextItem = list[newIndex]; 
            // what if it's the LAST index in the set? 
            // i.e. - no 'nextItem' exists 
            if (!nextitem) {
                // set new index to the last item in the list 
                newIndex = list.length - 1; 
                nextItem = list[newIndex]; 
            }
        }

        if (isArrowRight) {
            newIndex = index + 1; 
            nextItem = list[newIndex]; 

            if (!nextItem) {
                // if no next item, set to the FIRST item 
                newIndex = 0; 
                nextItem = list[newIndex]
            }
        }

        // Provide a fallback 
        // ? Not entirely sure what's occuring here.... gonna have to break it
        nextItem = nextItem || getDomFallback(); 

        // FOCUS new item 
        nextItem.click(); 
        nextItem.focus(); 
    }

    // if we reached this part of the function... then it's not an arrow left or arrow right event - is it a TRIGGER event? 

    if (isTriggerEvent) {
        // get panel 
        const panelId = target.getAttribute(ARIA_CONTROLS); 
        const panel = wrapper.querySelector(`#${panelId}`) || getDomFallback(); 

        // get hidden and selected variables
        let boolPanel = panel.getAttribute(ARIA_HIDDEN) !== TRUE; 
        let boolTab = target.getAttribute(ARIA_SELECTED) !== TRUE; 

        // is the element a List item? 
        if (isListItem) {
            // the user must have clicked on the LIST item then, so the element is NOT a Panel 
            boolPanel = FALSE; 
            boolTab = TRUE; 
        }
        //TODO - Need to finish this function. When I return we'll finish the handling for trigger events and then we handle adding ARIA labels to the elements - and finally, turning all of this on, binding, etc. 
    }
}