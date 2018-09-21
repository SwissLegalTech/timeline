# Case Traveller 
## Your timeline for smart navigation in legal cases

### Team
- (Lead) Dr. Silke Graf, LL.M. (https://www.linkedin.com/in/silke-graf-110a71b3/)
- (Conception) Sara Gillipsie
- (Developer) Clemens Henökl, MA MSc (https://www.linkedin.com/in/clemens-henökl-789843134/)
- (Conception) Michel Burkhalter (https://www.linkedin.com/in/michel-burkhalter-78976681/)

### 1. The Problem
Working on a legal case always starts with the study of documents inside the case file. Depending on the case and the time you join the case, this task may only take a couple of minutes or several hours.

Working on long-term cases usually means that you perform this task more than once for the same case! If you want to avoid reiterating this task you most likely create a table of the file content that is chronologically sorted. But: Will you update it continously? Do your team members know this table exists? Will you remeber where you put it several months later when the work on the case proceeds?

For lawyers in law firms the time spent on the study of files is usually nonbillable. Judges, prosecutors, in-house lawyers and legal assistants may not bother about billable hours. Anyway, the more time you save on the study of files the more time you have to actually answer the legal questions of the case. Or to just have less working hours ;)

### 2. The Solution
Case Traveller is a smart Case Visualization Software that helps you getting you an overview of your case by automatically generating a timeline of the events in the case.

How it works? You simply upload all the documents (Word, PDF, e mails, ...) of the case into the web tool and the software immediately creates a vertical timeline of all events, which may consist of one or several documents. Within seconds you can scroll through your case and see what happened and how much time passed between two events.

While you can already get a quick overview of the case, the machine reads all the uploaded documents and recognizes a whole bunch of data categories: NAMES, DATES, NUMBERS, LAWS ... All the different values of those data categories are the keywords of the case that are displayed not only in the Case Summary Box but also in the respective Event Box.

Clicking on one keyword in the Case Summary Box highlights this keyword in each Event Box where this value is mentioned which is most likely important additional information to you and helps you working through your case more efficiently.

Also, you can tag keywords that are important to you. For instance, you can pick a name and tell the tool that this person is "the witness regarding the topic of evidence A)".

The big advantages of the Case Traveller are pretty obvious:
- saves a lot of time
- gives you an overview of the case you can in fact picture (not only a boring table)
- can be updated with new information within seconds
- by tagging keywords you can add important information to the case that helps you structuring your arguments

### 3. The Possibilities
Since the Case Traveller does one of the most basic tasks of the work on legal cases, the target group consists of to kind of lawyers, regardless of the industry and the field of specialization. Hence, the market of this product is huge.

Apart from the business case, there are various ways the functionality of the tool can be expanded. We already have a couple of features in mind that would further simplify the work on legal case ;)

### 4. Demo
The demo will only be provided in form of an image. To test the app please follow the installation guide in paragraph 7.
 
![Loaded timeline with keyword tagging](https://github.com/SwissLegalTech/timeline/blob/master/demo/demo.jpg )

### 5. Workflow
- Start the app in a brower.
- In the upload screen choose the file src/assets/timeline-items.json to test the app.
- After the button "upload" has been clicked, the app will load the timeline and immediately starts to analyze the texts related to an event with the Stanford NER Library.
- The Stanford NER Library will extract data and tags them with categories such as PERSON, DATE, LOCATION, CASE NUMBERS, LAWS ... and delivers them in XML format. To use them with the Angular app, the XML structure will be transformed into JSON by using PHP.
- Once the PHP script sends the JSON response to the Angular app, the extracted keywords will be displayed in the frontend.
- Users will now be able to get an overview of the whole case only by viewing the keywords in the summary box.
- Additionally, by clicking on a keyword chip, it is possible to add a custom tag to an entity (e.g.: A person can be tagged as a lawyer).
- Finally, by clicking on a keyword in the summary box every equal keyword in the timeline will be highlighted to display the relation to the events.
- This is it!


### 6. Technical Requirements
- NPM
- Composer
- Apache Server - to execute the PHP Files
- Angular 6 (https://angular.io/)
- Angular Material (https://material.angular.io/)
- Bootstrap 4 (http://getbootstrap.com/)
- Normalize CSS (https://necolas.github.io/normalize.css/)
- Stanford Named Entity Recognizer (NER) version 3.9.1 (https://nlp.stanford.edu/software/CRF-NER.shtml) - JAVA
- Stanford NLP Tagger (https://github.com/patrickschur/stanford-nlp-tagger) - PHP

### 7. Installation
In short:
- run npm install -save
- run ng serve in the root directory
- run app in a directory where PHP Code can be executed
- open the browser with http://localhost:4200

After cloning the git repository to your local machine, you need to execute npm install in order to add all required packages to the project. We added the vendor packages for patrickschur/stanford-nlp-tagger and the Stanford NER version 3.9.1 from 2018-02-27 to the src/assets/nlp-tagger-php directory because of convenience reasons. Primarily you won't need any changes to the project to test the app as-is.

In case you want to update the patrickschur/stanford-nlp-tagger package you need to run composer install in the src/assets/nlp-tagger-php directory. However, keep in mind that this will overwrite manual changes in the library especially you changed the classifier names in the $lookupTable.

(IMPORTANT) The patrickschur/stanford-nlp-tagger library is written in PHP and has been chosen in order to easily provide access from the Angular frontend in form of HTTP API Calls to the Stanford NER Library which is written in JAVA. However, please keep in mind that you need to run the Angular app in a directory on your local machine which can execute PHP code. Therefor use a local apache environment like for example XAMPP and put the whole Project into the c:\xampp\htdocs\ directory.

In case you update the patrickschur/stanford-nlp-tagger it won't add the Stanford NER Library automatically. You need to download it from https://nlp.stanford.edu/software/stanford-ner-2018-02-27.zip and copy it into the src/assets/nlp-tagger-php folder.
Please also follow the instruction on https://github.com/patrickschur/stanford-nlp-tagger. To review newer versions of the Stanford NER Library please look at this source https://nlp.stanford.edu/software/CRF-NER.shtml.

Just to be clear the classifiers need to be placed in the \src\assets\nlp-tagger-php\stanford-ner\classifiers directory. For this app the English 7-category classifier with the name english.muc.7class.distsim.crf.ser.gz has been used and the $lookupTable in the File \src\assets\nlp-tagger-php\vendor\patrickschur\stanford-nlp-tagger\src\StanfordTagger\CRFClassifier.php has been modified to choose it. 

In case you want to add a different language or your own model to extract different data categories you need to add the classifier (Model) to the \src\assets\nlp-tagger-php\stanford-ner\classifiers directory and update the $lookupTable in \src\assets\nlp-tagger-php\vendor\patrickschur\stanford-nlp-tagger\src\StanfordTagger\CRFClassifier.php.
