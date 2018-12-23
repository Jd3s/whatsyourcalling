# -*- coding: utf-8 -*-
"""
Created on Sun Dec  2 11:33:45 2018

@author: Balaji
"""

import json 
import csv
import pandas as pd
import pickle
data=pd.DataFrame(columns=['title','text'])
i=0
files=["dataforelectronics.txt"]
for j in range(len(files)):
    text=open(files[j],'r',encoding='utf8')
    text1=text.read()
    text.close()
    res=""
    flag=0
    for i,a in enumerate(text1):
        if a=='{':
                flag=1
        if flag==1:
            res=res+a
        if a=='}':
                JSON=json.loads(res)
                data.loc[i]=[JSON['title'],JSON['text']]
                i=i+1
                res=""
                flag=0
    
        

#text=json.loads(text)
print(type(JSON))
print(JSON['title'])
data.drop_duplicates(subset='text',keep='first',inplace=True)
data.to_pickle('elecDataframe.pkl')


