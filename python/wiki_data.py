# -*- coding: utf-8 -*-
"""
Created on Fri Dec  7 20:33:14 2018

@author: Balaji
"""

import wikipedia as wp
import pandas as pd
mech=['mechanical systems', 'mechanics','Fluid dynamics','thermodynamics','materials science',
      'structural analysis','computer-aided manufacturing','manufacturing plants','industrial equipment',
      'heat transfer','fluid mechanics','biomechanics','Hydraulics','robotics'
      ,'energy conversion','control theory','Internal combustion engine',
      'Strength of materials','solid mechanics','Statics']

eee=['Electrical engineering','electric power','electricity','Power engineering',
     'transformers','electric generators', 'electric motors',
     'Control engineering','power grid','circuit theory',
     'magnetism','steam turbine',' induction motors','control theory',
     'industrial automation','Ground (electricity)','Hydroelectricity',
     'Magnetization current','Power inverter']
ece=['sensor','Electronic engineering','transistor',' diodes','integrated circuits'
     'Passivity (engineering)','electronic circuits','VLSI','printed circuit boards',
     'analog electronics','digital electronics',' consumer electronics','embedded systems','power electronics',
     'solid-state physics', 'radio engineering','telecommunications','control systems', 'signal processing',
     'Transmission (telecommunications)','transmitters','Radio-Frequency',' electromagnetic theory']
cs=['computer engineering','computer science','computer architecture', 'processor design'
    ,'high-performance computing', 'parallel computing', 'computer networks','embedded systems',
    'operating systems', 'theory of computation','algorithms', 'data structures',
    'database systems','software development','artificial intelligence', 'cryptography','machine learning',
    'deep learning']

chem=['Chemical engineering','chemistry','fuel cell'
      'Polymer engineering','Natural environment','Materials science',
      'Chemical reactor','Process design (chemical engineering)',
      'Nanotechnology','Transport Phenomena','Unit operations',
      'Ceramics','Electrochemistry','Food engineering','Plastics engineering',
      'Separation processes','Chemical substance']
civil=['Civil engineering','soil',' hydrology', 'environmental science','Coastal engineering',
       'Construction engineering','Earthquake engineering',' Environmental engineering',
       'Structural engineering','Surveying','Engineering drawing',
       'Geotechnical engineering','Transportation engineering','Architecture',
       'Urban planning','Structural steel','Reinforced concrete']
aero=['Aerospace engineering',' aircraft ',' spacecraft','Flight','Radar cross-section'
      ,'Orbital mechanics ','Propeller (aeronautics)','avionics','wind tunnels',
      'Turbulence','Flight test','Fluid mechanics','Aeroelasticity','Aeroacoustics','Rocket'
      ,'Air traffic control']
print(len(aero))    #1
print(len(list(set(aero))))            #2
key_word=[aero]   #remove
content=[]
i=0
for key in key_word:
    for each in key:
        text=wp.page(each).content
        content.append(text)
        i=i+1
        print(i)
        
assert len(content)==len(list(set(content)))
data=pd.DataFrame(content,columns=['articles'])
data['dept']='aero'     #3
data.to_pickle('aero.pkl')        #4

        
    