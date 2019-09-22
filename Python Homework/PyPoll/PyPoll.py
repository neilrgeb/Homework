import os
import csv
from collections import Counter

with open("Resources/election_data.csv", "r") as f:
    reader = csv.reader(f)
    next(reader)  



    # TOTAL NUMBER OF VOTES CAST.

    total_votes = 0
    for row in reader:
        total_votes = total_votes + 1
    print(total_votes)

    # CANDIDATES WHO RECEIVED VOTES

    candidate_list = []
    for row in reader:
        candidate_list.append(row[2])
    indiv_candidate = []
    for x in set(candidate_list):
        indiv_candidate.append(x)
    print(indiv_candidate)    

    # TOTAL NUMBER OF VOTES EACH CANDIDATE WON

    votes_per_candidate = []
    for x in set(candidate_list):
         blue = candidate_list.count(x)
         votes_per_candidate.append(blue)
    print(votes_per_candidate)     

    # PERCENTAGE OF VOTES EACH CANDIDATE WON
    vote_percent = []
    for x in set(candidate_list):
         blue = candidate_list.count(x)
         votes_per_candidate.append(blue)
         red = (blue/total_votes)*100
         vote_percent.append(red)
    print(vote_percent)

    

        
        






    