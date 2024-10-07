# PalestineLLM

**PalestineLLM** is a **Pro-Palestine** project designed to facilitate the understanding and exploration of issues related to Palestine through the use of language models. This repository includes various datasets, text documents, and tools for training language models to improve their performance on Palestinian topics.

## Table of Contents

- [Dataset Description](#dataset-description)
- [Installation](#installation)
- [Usage](#usage)
- [How You Can Help](#how-you-can-help)

## Dataset Description

The project includes various text documents and structured data related to Palestinian topics. The datasets are organized into different directories, such as:

- **datasets**: Contains text documents and QA pairs organized by sources.
- **fine-tune**: Includes materials for fine-tuning the language model.

### Key Files

- **concatenated_qr.jsonl**: A JSON Lines file that consolidates question-answer pairs.
- **prompt_generator.js**: Script for generating prompts.
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

## How You Can Help

We encourage contributions from the community to make **PalestineLLM** even more impactful. Here's how you can help:

- **Share Your OpenAI O1 Data**: If you have access to `OpenAI's O1` or other cutting-edge models, you can help by generating high-quality question-answer pairs (QAs) related to **Palestinian** topics and contributing them to this repository. Simply copy `.prompt` file contents and paste it into your AI tool. It will generate a JSON lines of high quality data.

- **Create and Share Custom GPTs**: Consider building **custom GPT models** focused on **Palestinian** issues using **OpenAI's tools**. You can share these models in the OpenAI Marketplace and share them with the community to expand the availability of specialized LLMs.

- **Fine-tune and Share PalestineLLM**: You can help improve **PalestineLLM** by fine-tuning it on additional datasets, especially those related to **Palestine**. Once fine-tuned, feel free to share your model on huggingFace or other platforms to make it accessible to others.

- **Staring this repository and sharing it with others**: By starring this repository, you can help spread the word about this project and encourage others to contribute and use it.

- **Machine Learning and AI Research**: If you are a researcher or student working on machine learning or AI projects, share your ideas and help make **PalestineLLM** better.
