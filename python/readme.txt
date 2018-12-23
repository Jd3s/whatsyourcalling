jsonToDF.py - the data scraped from internet is processed and seperated into individual articles 
and saved as .pkl files.(DataFrame.pkl,CivilDataframe.pkl)


data_preprocessing.py -  cleaning and preprocessing the above mentioned individual articles and storing the resultant data 
as .pkl files(clean_data.pkl,Civil_clean_data.pkl)

wikidata.py-extracting data from wikipedia for all 7 enggineering branches and storing them in aero.pkl,chem.pkl,civil.pkl,
ece.pkl,eee.pkl,cs.pkl

Wiki_data_preprocess.py  - cleaning the above mentioned wikipedia data and saving it as final_wiki.pkl

Wiki_data_model_tfidf.py - Vectorizing(tf_idf) the Above mentioned Cleaned Wikipedia data using tf_idf and creating a neural networks(Custom neural net) using keras to train 
a text classifier(Got accuracy around 88%). The trained weights are stored in 'text_classifier' keras model file. The vectorizer weights 
are stored in  'vect.sav' file.

Wiki_final_prediction.py - Cleaned Engineering Articles(clean_data.pkl,Civil_clean_data.pkl) are vectorized using 'vect.sav' weights and then 
the vectorized data is sent through the trained neural net('text_classifier' keras model file) and we get a rating with 7 values for each articles
representing how much it belongs to each engg. field.
The rating results are stored in 'results.csv' file.