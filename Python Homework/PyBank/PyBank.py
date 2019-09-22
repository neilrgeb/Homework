import os
import csv

with open("Resources/budget_data.csv", "r") as f:

#  The total number of months included in the dataset

    total_months = []
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        total_months.append(row[0])
    total_months = len(total_months)
    print((total_months))

#  The net total amount of "Profit/Losses" over the entire period

    net_amount = []
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        net_amount.append(row[1])
    net_amount = [int(x) for x in net_amount]
    
    sum = 0
    for num in net_amount:
        sum = num + sum
    print(sum)
    
# The average of the changes in "Profit/Losses" over the entire period
    import numpy as np

    net_amount = []
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        net_amount.append(row[1])
    net_amount = [float(x) for x in net_amount]
    
    changes_in_ProfLos = np.diff(net_amount)
    sumx = 0
    for numx in changes_in_ProfLos:
        sumx = numx + sumx
        average = (sumx / len(changes_in_ProfLos))
        
    print(average)

#  The greatest increase in profits (date and amount) over the entire period

    import numpy as np

    net_amount = []
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        net_amount.append(row[1])
    net_amount = [int(x) for x in net_amount]
    
    changes_in_ProfLos = np.diff(net_amount)
    max_change = (max(changes_in_ProfLos))

    print(max_change)

#  The greatest decrease in losses (date and amount) over the entire period

    import numpy as np

    net_amount = []
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        net_amount.append(row[1])
    net_amount = [int(x) for x in net_amount]
    
    changes_in_ProfLos = np.diff(net_amount)
    min_change = (min(changes_in_ProfLos))

    print(min_change)