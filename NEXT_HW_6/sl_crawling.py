from selenium import webdriver 
from selenium.webdriver.common.keys import Keys 
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.common.by import By 
from selenium.webdriver.chrome.options import Options 
from datetime import datetime
import csv 

today = datetime.now().strftime("%Y%m%d")
file = open(f"{today}_naver_comics.csv",'w',newline='')
writer = csv.writer(file)

writer.writerow(["rank","title","star","chapter"])

chromedriver_path = '/Users/ralocanho/Desktop/NEXT/HW/NEXT_HW_6/chromedriver'
user_data_dir = '/Users/ralocanho/Desktop/NEXT/HW/NEXT_HW_6/cookies'

chrome_options = Options() 
chrome_options.add_argument(f"user-data-dir={user_data_dir}")
service = Service(executable_path=chromedriver_path) 

driver = webdriver.Chrome(service=service, options=chrome_options)

driver.get('https://series.naver.com/comic/top100List.series')

contents = driver.find_elements(By.XPATH, '//*[@id="content"]/div/ul/li')

for i,content in enumerate(contents,start=1):
    rank = i 
    title = content.find_element(By.XPATH,f'/html/body/div/div[2]/div[3]/div/div[1]/div/ul/li[{i}]/div[2]/h3/a').text
    star = content.find_element(By.XPATH,f'/html/body/div/div[2]/div[3]/div/div[1]/div/ul/li[{i}]/div[2]/p[1]/em[1]').text
    count = content.find_element(By.XPATH,f'/html/body/div/div[2]/div[3]/div/div[1]/div/ul/li[{i}]/div[2]/p[1]/span[3]').text 
    
    writer.writerow([rank,title,star,count])
    
file.close()
