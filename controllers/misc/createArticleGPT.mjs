import OpenAI from "openai"; 
import * as fs from 'fs';

const openai = new OpenAI({
    apiKey: "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",
});


function formatTitle(str="") {
    var title = str.replace(":", ",").replace(/\*/g, "").replace('"', "");

    return title;
}

function formatDescription(str="") {
    var title = str.replace(/\"/g, "'");

    return title;
}

function removeHeadings(script) {
    return script
        .split('\n')         // Split the script into an array of lines
        .filter(line => !line.trim().startsWith('#'))  // Filter out lines that start with `#`
        .join('\n');         // Join the filtered lines back into a single string
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function mergeEverySoManyLines(input, separator = ' ') {
    // Split the input string into an array of lines
    let lines = input.split('\n\n');

    // Initialize an array to store the merged lines
    let mergedLines = [];
    
    let numbMerges = Math.floor(lines.length / 3);

    for(let j = 0; j < numbMerges; j++) {
        let nextMerge = randomIntFromInterval(0, lines.length-1);


        mergedLines = [];

        // Iterate through the lines and merge every two consecutive lines
        for (let i = 0; i < lines.length;i += 1) {

            // console.log(`j: ${j}\ni: ${i}\nnextMerge: ${nextMerge}\nlines.length: ${lines.length}\n---`)

            // console.log(`i: ${i} | inc: ${inc}`)

            // Merrge lines if
            // - we don't overflow on the last line
            // - the paragraph won't be too big
            // - it's not a list item (somtimes tabbed or spaced so check more than just first char)
            // - it's not a heading
            // - it's not bold or italics (sometimes used as a heading)
            // if (i == nextMerge && i + 1 < lines.length && lines[i].length < 1300 && !lines[i].substring(10).contains("-") && !lines[i].substring(10).contains(/\d\./) && !lines[i].substring(10).contains(/#/) && !lines[i].substring(10).contains(/\*/)) {
            if (i == nextMerge && i + 1 < lines.length && lines[i].length < 1300) {
                // If there is a next line, merge the current line with the next line
                // console.log(`merging lines ${i} and ${i+1}`)
                mergedLines.push(lines[i] + separator + lines[i + 1]);
            } else {
                // If there is no next line, just push the current line as-is
                mergedLines.push(lines[i]);
            }
        }

        lines = mergedLines;
    }

    // console.log(mergedLines);

    // Join the merged lines back into a single string
    return mergedLines.join('\n\n');
}


function processContent(str) {
    let content = removeHeadings(str);
    content = mergeEverySoManyLines(content, " ");

    return content;
}

// async function runPrompts(args) {
async function createArticleGPT(topic) {
    var args = [topic.title]

    console.log(args)
    // const prompts = [
    //     `Topic: ${args[0]}`,
    // ];
    const prompts = [
        `Topic: ${args[0]}`,
        "Please use the analysis to revise the draft and expand on each section.  Please expand each section to at least 3 paragraphs but ideally 5 paragraphs.\n\nWhile you do so, keep the following in mind:\n- Rewrite this in proper Markdown format.\n- Start with an \"Introduction\" that has heading level 2 (##) as the first level and adjust the rest.\n- Make sure there is proper spacing between paragraphs, headings, subheadings, titles, lists, code blocks, etc.\n- Remove words like \"Section\" and numbering \"1.\" from headings.\n- Don't use **bold** and *italics* for headings, you should use the proper level of subheading.",
        "Please write a 30 word summary for this.",
        "Please write a title:\n- Descriptive\n- Engaging and high click through rate\n- Don't include any colons in the title.\n- It should be 4-7 words long.",
    ];

    let conversationHistory = [];
    conversationHistory = conversationHistory.concat({ role: 'system', content: `You are an expert in ${args[0]}.\n\nDo the following:\n1) Create an outline for the article\n2) Create a rough draft of the article (without any lists or code blocks)\n\t- No lists, no code blocks\n\t- Rewrite this in proper Markdown format.\n\t- Start with an \"Introduction\" that has heading level 2 (##) as the first level and adjust the rest.\n\t- Make sure there is proper spacing between paragraphs, headings, subheadings, titles, lists, code blocks, etc.\n\t- Remove words like \"Section\" and numbering \"1.\" from headings.\n\t- Don't use **bold** and *italics* for headings, you should use the proper level of subheading.\n3) Analyze the draft to see where it should be revised and where it can be improved.`})
    // console.log("conversationHistory:");
    // console.log(conversationHistory);

    for (const prompt of prompts) {
        // Combine the conversation history with the current prompt to maintain context
        let messages = conversationHistory.concat({ role: 'user', content: prompt });
        let botResponseComplete = '';
        let continuationPrompt = '';

        // while (true) {
        //     try {
                const response = await openai.chat.completions.create({
                    model: "gpt-4o",
                    messages,
                    max_tokens: 4095,
                });

                const botResponse = response.choices[0].message.content;
                botResponseComplete += botResponse;

        //         // Check if the response was truncated due to token limit
        //         if (response.usage.total_tokens >= response.usage.completion_tokens) {
        //             // Set continuation prompt to keep the conversation going
        //             continuationPrompt = 'Please continue.';
        //             messages = messages.concat({ role: 'assistant', content: botResponse }, { role: 'user', content: continuationPrompt });
        //         } else {
        //             // No truncation, break loop
        //             break;
        //         }
        //     } catch (error) {
        //         console.error('Error communicating with OpenAI:', error);
        //         break;
        //     }
        // }

        // Store the complete response in the conversation history
        conversationHistory.push({ role: 'user', content: prompt });
        conversationHistory.push({ role: 'assistant', content: botResponseComplete });

        // Print the complete bot's response to the console
        // console.log(`Prompt: ${prompt}`);
        // console.log(`\n\n\n\n\n\n\n\n ${botResponseComplete}\n`);
        console.log("...")
    }

    let title = formatTitle(conversationHistory.at(-1)['content'])
    let description = formatDescription(conversationHistory.at(-3)['content'])
    let content = "";

    if (conversationHistory.length > 9) {
        content = conversationHistory[4]['content'] + "\n\n\n\n\n\n\n" + conversationHistory[6]['content'];
    } else {
        content = conversationHistory[4]['content']
    }

    content = processContent(content)

    console.log("\n\n\n\n\n\n\n\n")

    var slug = `${args[0].trim().replace(/\W+/g, "-")}`

    console.log(`${slug}.md\n\n\n+++\ntitle = "${title}"\ndescription = "${description}"\nurl = "/${slug}"\ndraft = false\n+++\n${content}`);
    // fs.writeFileSync(`output/${slug}.md`, `title = "${title}"\ndescription = "${description}"\nurl = "/${slug}"\ndraft = false\n+++\n${content}`);

    return {
        slug: slug.slice(0, -24),
        title: title,
        description: description,
        content: content
    }
}

// // Capture command line arguments
// const args = process.argv.slice(2);

// // Check if there are any prompts provided via command line
// if (args.length === 0) {
//     console.error('Please provide at least one prompt as a command line argument.');
//     process.exit(1);
// }

// // runPrompts(args);
// createArticleGPT(args);



// createArticleGPT("Business and Professional Services Directory and Jobs 2024");

export default createArticleGPT;