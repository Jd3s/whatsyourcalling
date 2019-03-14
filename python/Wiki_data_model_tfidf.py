# -*- coding: utf-8 -*-
"""

"""

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelBinarizer
#from sklearn.naive_bayes import MultinomialNB
#import numpy as np
#import tensorflow as tf
import pickle
from keras.models import Sequential
from keras.layers import Activation, Dense, Dropout
df=pd.read_pickle('final_wiki.pkl')
df = df.sample(frac=1).reset_index(drop=True)
X=df['article'].tolist()
Y=df['dept'].tolist()
encoder = LabelBinarizer()
encoder.fit(Y)
Y=encoder.transform(Y)
print(encoder.classes_)
num_labels=7
for i,j in enumerate(X):
    X[i]=" ".join(j)
    
X_train=X[0:800]
X_test=X[800:1042]
Y_train=Y[0:800][:]
Y_test=Y[800:1042][:]
vectorizer = TfidfVectorizer()
X_train=vectorizer.fit_transform(X_train)
X_test=vectorizer.transform(X_test)
print(X_train.shape)
print(X_test.shape)
#clf=MultinomialNB()
#print(clf.fit(X_train,Y_train))
model = Sequential()
model.add(Dense(32, input_shape=(X_train.shape[1],)))
model.add(Activation('relu'))
model.add(Dropout(0.1))
model.add(Dense(num_labels))
model.add(Activation('sigmoid'))
model.summary()
model.compile(loss='binary_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])
history = model.fit(X_train, Y_train,
                    batch_size=100,
                    epochs=15,
                    verbose=1,
                    validation_split=0.1)

score = model.evaluate(X_test, Y_test,
                       batch_size=100, verbose=1)

print(score)

Sample_article=pd.read_pickle('clean_data.pkl')
Sample_article=Sample_article[0].tolist()
#Sample_article=list(set(Sample_article))
sample_art=vectorizer.transform(Sample_article)
pred_list=[]
for i in range(10):
    prediction = model.predict(sample_art[i])
    pred_list.append(prediction)
#prediction = model.predict(sample_art[0])
print(encoder.classes_)
model.model.save('text_classifier')
pickle.dump(vectorizer, open('vect.sav', 'wb'))

