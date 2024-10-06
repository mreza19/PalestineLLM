# PalestineLLM

## Overview

**PalestineLLM** is a **Pro-Palestine** project designed to facilitate the understanding and exploration of issues related to Palestine through the use of language models. This repository includes various datasets, text documents, and tools for training language models to improve their performance on Palestinian topics.

## Table of Contents

- [Dataset Description](#dataset-description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Dataset Description

The project includes various text documents and structured data related to Palestinian topics. The datasets are organized into different directories, such as:

- **content**: Contains text documents and QA pairs organized by sources.
- **fine-tune**: Includes materials for fine-tuning the language model.
- **ollama**: Contains JavaScript files and configuration for the Ollama tool.

### Key Files

- **concatenated_qr.jsonl**: A JSON Lines file that consolidates question-answer pairs.
- **QA.jsonl**: Structured QA pairs extracted from various sources for training and evaluation purposes.

## Installation

To set up the project, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/PalestineLLM.git
   cd PalestineLLM
   ```

2. **Run Ollama_Unsloth on Google colab**
3. **Download The Model**

## Usage

The project includes scripts for concatenating QA pairs and running fine-tuning processes. You can execute the `qa_concater.js` script to gather QA data:

```bash
node qa_contacter.js
```

This script will create a consolidated file (`concatenated_qa.jsonl`) in the fine-tune directory.

For fine-tuning, run the Jupyter notebook found in the `fine-tune` directory:

1. Open the notebook using Jupyter:

   ```bash
   jupyter notebook Ollama_Unsloth_Llama3_jsonl.ipynb
   ```

2. Follow the instructions in the notebook to fine-tune the model.

## Contributing

- <m.gh@linuxmail.org>

## License