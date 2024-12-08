import requests 
from bs4 import BeautifulSoup as bs
from openpyxl import Workbook

url = 'https://lolchess.gg/synergies/set11'

try:
    headers = {
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    }
    response = requests.get(url, headers=headers) 
    
    if response.status_code == 200:
        html_text = response.text 
        
        soup = bs(response.text, 'html.parser') 
        
        props = soup.find_all('h6')
        props = list(map(lambda x: x.text.strip(), props))
        
        #print(props)
        
        champs = soup.find_all('p')
        champs = list(map(lambda x: x.text.strip(), champs))
        
        #print(champs) 
        
        prop_explanations = soup.find_all('p', class_='css-u7jnuw edroetd3')
        prop_explanations = list(map(lambda x:x.text.strip(), prop_explanations))
        
        #print(prop_explanations)
        
        wb = Workbook() 
        ws = wb.active 

        ws.append(['index','덱 이름','덱 구성','덱 효과'])

        for i, (p, c, pr) in enumerate(zip(props,champs,prop_explanations)):
            ws.append([i,p,c,pr])

        filename = 'lolchess.xlsx'
        wb.save(filename) 

        print("Succeeded saving.")
    
    else:
        print(f"Connection Error, error code:{response.status_code}")
        
except requests.exceptions.RequestException as e:
    print(f"{e}")
    
