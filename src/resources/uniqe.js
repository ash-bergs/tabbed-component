// Constants 

const BEFORE = '0.'; 
const AFTER = ''; 

// get a unique string 

const unique = () => {
    let prefix = Math.random(); 
    prefix = String(prefix); 
    prefix = prefix.replace(BEFORE, AFTER); 

    let suffix = Math.random; 
    suffix = String(suffix); 
    suffix = suffix.replace(BEFORE, AFTER); 

    // expose the joined unique ID 
    return `${prefix}_${suffix}`
}; 

// export not as a default, but a destructured function
export { unique }; 

// Later i might do this through UUID 🤷‍♀️