students = ["Hermione", "Harry", "Ron"]

print(students[0])
print(students[2])
print(students[3])

for student in students:
    print(student)

for i in range(len(students)):
    print(i+1, students[i])