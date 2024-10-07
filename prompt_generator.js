const fs = require('fs');
const path = require('path');

// Path to the QA_generator.prompt file
const promptFile = './fine-tune/QA_generator.prompt';

// Function to find and concatenate the prompt with each part.txt file
function findAndConcatPrompt(directory) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const filePath = path.join(directory, file);

        if (fs.statSync(filePath).isDirectory()) {
            findAndConcatPrompt(filePath); // Recursively process subdirectories
        } else if (file.startsWith('part') && file.endsWith('.txt')) {
				concatPrompt(filePath);
        }
    });
}

// Function to concatenate the prompt with a part.txt file
function concatPrompt(partFilePath) {
    try {
        const promptData = fs.readFileSync(promptFile, 'utf8');
        const partData = fs.readFileSync(partFilePath, 'utf8');

        // Create the full prompt content by concatenating prompt and part
        const fullPrompt = promptData + '\n\n' + partData;

        const partFileName = path.basename(partFilePath, '.txt'); // Get part1 from part1.txt
		  const fullPromptFilePath = path.join(path.dirname(partFilePath), `${partFileName}.prompt`);
        fs.writeFileSync(fullPromptFilePath, fullPrompt, 'utf8');

        console.log(`Full prompt created at: ${fullPromptFilePath}`);
    } catch (error) {
        console.error(`Error processing ${partFilePath}: ${error.message}`);
    }
}

// Starting directory for processing
const startingDirectory = './content';

findAndConcatPrompt(startingDirectory);
