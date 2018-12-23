# -*- coding: utf-8 -*-
"""
Created on Sun Dec  2 13:35:32 2018

@author: Balaji
"""
import pandas as pd
from nltk.corpus import stopwords
from bs4 import BeautifulSoup as B
import re
data=pd.read_pickle('F:\education_shaastra\DATASET\Dataframe.pkl')
print(len(data.index))
x=data['text'].tolist()
for i in range(len(x)):
    text=x[i].lower().split()
    new_text=""
    for w in text:
        if not w.startswith("source:"):
            new_text=new_text+" "+w
        else:
            break
    x[i]=new_text
article=x            
stop=stopwords.words("english")

def clean(review):
    text=B(review)
    text=text.get_text()
    text=re.sub("[^a-zA-Z]"," ",text)
    text=text.lower().split()
    text=[w for w in text if w not in stop]
    return(" ".join(text))

cleaned_articles=[]
for j in range(len(x)):
    cleaned_articles.append(clean(article[j]))
    
cleaned_articles=pd.DataFrame(data=cleaned_articles)
cleaned_articles.to_pickle('clean_data.pkl')
