# Case Traveller 
## The e-Management-System: Inefficiency ends here.

### Team
Lead: 

- Dr. Silke Graf, slack: Silke Graf (https://www.linkedin.com/in/silke-graf-110a71b3/)

Team Members:
- Sara Gillipsie
- Clemens Henökl, MA MSc (https://www.linkedin.com/in/clemens-henökl-789843134/)
- Michel Burkhalter

### 1. The Problem

### 2. The Solution

### 3. The Advantages

### 4. Technical Requirements
- Angular 6
- Angular Material
- Bootstrap 4
- Normalize CSS
- Stanford CoreNLP (https://stanfordnlp.github.io/CoreNLP)
- Stanford NLP Tagger (https://github.com/patrickschur/stanford-nlp-tagger)

After installing the packages with npm install you need to run composer install in the src/assets/nlp-tagger-php directory.
This will add the packages for patrickschur/stanford-nlp-tagger which is a wrapper written in PHP. You can use this to trigger the Stanford CoreNLP Library.

The patrickschur/stanford-nlp-tagger won't add the Stanford CoreNLP Library automatically. You need to download the Core Library from https://nlp.stanford.edu/software/stanford-ner-2017-06-09.zip and copy it into the src/assets/nlp-tagger-php folder.
Please also follow the instruction on https://github.com/patrickschur/stanford-nlp-tagger.

Once all of this has been done, the app should work as expected by executing ng serve in the root directory.
