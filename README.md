# Case Traveller 
## Your timeline for smart navigation in legal cases

### Team
Lead: 

- Dr. Silke Graf, (https://www.linkedin.com/in/silke-graf-110a71b3/)

Team Members:
- Sara Gillipsie
- Clemens Henökl, MA MSc (https://www.linkedin.com/in/clemens-henökl-789843134/)
- Michel Burkhalter

### 1. The Problem

### 2. The Solution

### 3. The Advantages

### 4. Demo
 The demo will only be provided in form of an image. To test the app please follow the installation guide in paragraph 6.
 
 ![Loaded timeline with keyword tagging](https://github.com/SwissLegalTech/timeline/blob/master/demo/demo.jpg )


### 5. Technical Requirements
- Angular 6
- Angular Material
- Bootstrap 4
- Normalize CSS
- Stanford Named Entity Recognizer (NER) version 3.9.1 (https://nlp.stanford.edu/software/CRF-NER.shtml) - JAVA
- Stanford NLP Tagger (https://github.com/patrickschur/stanford-nlp-tagger) - PHP

### 6. Installation
After installing the packages with npm install you need to run composer install in the src/assets/nlp-tagger-php directory.
This will add the packages for patrickschur/stanford-nlp-tagger which is a wrapper written in PHP. You can use this library to trigger the Stanford NER Library.

The patrickschur/stanford-nlp-tagger won't add the Stanford NER Library automatically. You need to download it from https://nlp.stanford.edu/software/stanford-ner-2018-02-27.zip and copy it into the src/assets/nlp-tagger-php folder.
Please also follow the instruction on https://github.com/patrickschur/stanford-nlp-tagger.

Just to be clear the classifiers need to be placed in the \src\assets\nlp-tagger-php\stanford-ner\classifiers directory. For this app the 7 category classifier with the name english.muc.7class.distsim.crf.ser.gz has been used.

Once all of this has been done, the app should work as expected by executing ng serve in the root directory.

### 7. Workflow
- run ng serve in the root directory
- open the browser with http://localhost:4200
- In the upload screen choose the file src/assets/timeline-items.json to test the app
- After the button "upload" has been clicked, the app will load the timeline and immediately starts to analyze the texts related to an event with the Stanford NER Library.
- The Stanford NER Library will extract data and tags them with categories such as PERSON, DATE, TIME, MONEY, LOCATION,... and delivers them in XML format. To use them with the Angular app, the XML structure will be transformed into JSON by using PHP.
- Once the PHP script sends the JSON response to the Angular app, the extracted keywords will be displayed in the frontend.
- Users will now be able to get an overview of the whole case only by viewing the keywords in the summary box.
- Additionally, by clicking on a keyword chip, it is possible to add a custom tag to an entity (e.g.: A person can be tagged as a lawyer)
- Finally, by clicking on a keyword in the summary box every equal keyword in the timeline will be highlighted to display the relation to the events.
- This is it!
