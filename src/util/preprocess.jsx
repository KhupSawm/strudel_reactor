export function preprocess(inputText, volume) {
    //// Match text blocks like "key:\n ... until next key or end"
    //const regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?(?=[a-zA-Z0-9_]+:|$)/gm;
    //let m;
    //let matches = [];

    //// Collect all matches
    //while ((m = regex.exec(outputText)) !== null) {
    //    if (m.index === regex.lastIndex) regex.lastIndex++;
    //    matches.push(m);
    //}

    //// Multiply gain() values by volume (ignore :postgain)
    //let matches2 = matches.map(match =>
    //    match[0].replaceAll(/(?<!:post)gain\(([\d.]+)\)/g, (_, x) =>
    //        `gain(${x}*${volume})`
    //    )
    //);

    //// Replace original blocks with updated versions
    //let matches3 = matches.map((match, i) =>
    //    outputText.replace(match[0], matches2[i])
    //);

    // Return modified text or original if no change
    //return matches3.length > 0 ? matches3[matches3.length - 1] : outputText;
    return inputText.replaceAll("vol", volume);
;

}
