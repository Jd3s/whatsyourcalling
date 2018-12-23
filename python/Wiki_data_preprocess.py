# -*- coding: utf-8 -*-
"""
Created on Sat Dec  8 19:57:03 2018

@author: Balaji
"""
import pandas as pd
from bs4 import BeautifulSoup as B
from nltk.corpus import stopwords
import re
label=['aero','civil','chem','ece','eee','mech','cs']
data=pd.DataFrame()
for each in label:
    data=data.append(pd.read_pickle(each+'.pkl'),ignore_index=True)

def clean(review):
    text=B(review)
    text=text.get_text()
    text=re.sub("[^a-zA-Z]"," ",text)
    text=text.lower().split()
    text=[w for w in text if w not in stop]
    return text
total=0
total_before=[]
mech=[]
stop=stopwords.words("english")
for i,k in enumerate(data['articles']):
    if data['dept'][i]=='mech':
        total_before.append(len(data['articles'][i].split()))
        mech.append(data['articles'][i])
    data['articles'][i]=clean(k)
    total=total+len(data['articles'][i])
    if i%10==0:
        print(i)
        
full_data=dict()  
for i,k in enumerate(data['articles']):
    if data['dept'][i] not in full_data:
        full_data[data['dept'][i]]=data['articles'][i]
    else:
        full_data[data['dept'][i]]=full_data[data['dept'][i]]+data['articles'][i]
        
for key in full_data.keys():
    full_data[key]=[full_data[key][x:x+300] for x in range(0,len(full_data[key]),300)]
i=0
df=pd.DataFrame(columns=['dept','article'])
for key in full_data.keys():
    for each in full_data[key]:
        df.loc[i]=[key,each]
        i=i+1
        
df.to_pickle('final_wiki.pkl')
        
                

    
        
        