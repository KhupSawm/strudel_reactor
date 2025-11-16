let originalLog = null;
const logArray = [];

export default function console_monkey_patch() {
    // Avoid running more than once
    if (originalLog) return;

    originalLog = console.log;

    console.log = function (...args) {
        // Join all args as a string
        const joined = args.join(" ");

        // Check if it's a Strudel note log like "%c[hap]"
        if (joined.substring(0, 8) === "%c[hap] ") {
            // Clean it and store in array
            const cleaned = joined.replace("%c[hap] ", "");
            logArray.push(cleaned);

            // Limit to last 100 values
            if (logArray.length > 100) logArray.splice(0, 10);

            // Dispatch data event for the app to listen to
            const event = new CustomEvent("d3Data", { detail: [...logArray] });
            document.dispatchEvent(event);
        }

        // Call original log function too
        originalLog.apply(console, args);
    };
}

// Export helper to get current graph data
export function getD3Data() {
    return [...logArray];
}

// Export subscribe/unsubscribe helpers
export function subscribe(eventName, listener) {
    document.addEventListener(eventName, listener);
}

export function unsubscribe(eventName, listener) {
    document.removeEventListener(eventName, listener);
}