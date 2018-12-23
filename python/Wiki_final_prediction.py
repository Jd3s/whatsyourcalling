# -*- coding: utf-8 -*-
"""
Created on Mon Dec 10 17:50:49 2018

@author: Balaji
"""
import pandas as pd
import pickle
from keras.models import load_model
Sample_article=pd.read_pickle('Civil_clean_data.pkl')
Sample_article=Sample_article[0].tolist()
#Sample_article=list(set(Sample_article))
vectorizer=pickle.load(open('vect.sav','rb'))
sample_art=vectorizer.transform(Sample_article)
pred_list=[]
ten=list(range(7))
total=[]
model = load_model('text_classifier')
data=pd.read_pickle('F:\education_shaastra\DATASET\CivilDataframe.pkl')
index=list(range(101))
data.index=index
dept=['aero','chem','civil','cs','ece','eee','mech']
for d in dept:
    data[d]='nan'
    
for i in range(sample_art.shape[0]):
    prediction = model.predict(sample_art[i])
    pred_list.append(prediction)
    #prediction=prediction.tolist()
    j=0
    for d in dept:
        data.loc[i][d]=prediction[0][j]
        j=j+1
    #result=sorted(zip(prediction[0],ten),reverse=True)
    #total.append(result)
for i in range(sample_art.shape[0]):
    index=data.loc[i]['text'].find('Note:')
    data.loc[i]['text']=data.loc[i]['text'][0:index]
    
   
#data.to_csv('Cresults.csv')
