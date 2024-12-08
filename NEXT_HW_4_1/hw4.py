print("1부터 100까지의 숫자 하나를 생각하세요. 제가 성격이 좀 급해서 바로 시작할게요.")

lowest = 1
highest = 100
predicted = None 
count = 0
flag = False 

while flag != True:
  count += 1
  predicted = (lowest+highest) // 2

  print(f"당신이 생각한 숫자는 {predicted} 입니까? 이 숫자보다 더 크면 '큼', 맞으면 '맞음',작으면 '작음' 이라고 입력하세요.")
  
  answer = input() 

  if answer == "큼":
    lowest = predicted+1
  elif answer == "작음":
    highest = predicted-1
  else:
    flag = True 

print(f"당신이 생각한 숫자는 {predicted} 이군요. 제가 {count}번만에 맞혔어요.")


